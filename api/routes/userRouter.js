const usersRouter = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

usersRouter.get('/', (req, res, next) => {   
    try {
        User.find({})
        .then((users) => {
            res.json(users);
        })
    } catch (error) {
        next(error);
    }
});

usersRouter.post('/', async(req, res, next) => {
    try {
        const { username, password } = req.body;
        const saltRounds = 10;
        let flagUsuarioExistente = false;

        await User.find({})
        .then((users) => {
            users.forEach(user => {
                if(user.username == username) {
                    flagUsuarioExistente = true;
                }                               
            });
        })


        if(password.length < 6 || password.length > 30) {
            next({name:"validationError", message:"La contraseña debe tener entre 6 y 30 caracteres"});
        } else if (flagUsuarioExistente) {
            next({name:"validationError", message:"El usuario ya existe"});
        } else {

            const passwordHash = await bcrypt.hash(password, saltRounds);

            const user = new User({
                username,
                passwordHash,
            });

            const userSaved = await user.save();

            res.status(201).json(user);

        }

    } catch (error) {
        next(error);
    }
})

module.exports = usersRouter;