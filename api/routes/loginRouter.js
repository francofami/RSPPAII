const loginRouter = require('express').Router();
const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {SECRET} = require('../utils/config');

loginRouter.post("/", async(req, res, next) => {    
    try {
        const { username, password } = req.body;

        const user = await User.findOne({username});

         if (user) {
            if(!await bcrypt.compare(password, user.passwordHash)) {
                return next({
                    name:"validationError", 
                    message:"El password o el username son inválidos"
                });
            }
         } else {
            return next({
                name:"validationError", 
                message:"El password o el username son inválidos"
            });
         }

         const userToken = {
            username: user.username,
            id: user._id,
         };

         const token = await jwt.sign(userToken, SECRET, {expiresIn:'1000s'});

         res.status(200).json({
            token,
            username,
         })


    } catch (error) {
        next(error);
    }
})

module.exports = loginRouter;