const criptomonedasRouter = require('express').Router();
const Criptomoneda = require('../models/Criptomoneda');
const { verifyToken } = require('../utils/middleware');

criptomonedasRouter.use(verifyToken);

const {
    getCriptomonedas, 
    getCriptomoneda, 
    createCriptomoneda, 
    deleteCriptomoneda, 
    updateCriptomoneda,
} = require('../controllers/criptomonedaController');

criptomonedasRouter.get('/', (req, res, next) => {
    
    getCriptomonedas().then((personas) => {
        res.json(personas);
    })
    .catch((err) => {
        next(err);
    });
});

criptomonedasRouter.get('/:id', (req, res) => {
    const id = req.params.id;

    getCriptomoneda(id)
    .then((persona) => {
        persona ? res.status(200).json(persona).end() : res.status(404).end();
    })
});

criptomonedasRouter.delete('/:id', (req, res) => {
    const id = req.params.id;

    deleteCriptomoneda(id)
    .then((respuesta) => {
        respuesta
        ? res.status(200).json({ ok: true, error: "Criptomoneda eliminada"}).end()
        : res
            .status(200)
            .json({ ok: false, error: "No existe Criptomoneda con ese id"});
    })     
});

criptomonedasRouter.put('/', (req, res) => {
    
    const body = req.body;

    updateCriptomoneda(body)
    .then((respuesta) => {
        respuesta ? res.status(200).json({ ok: true, error: "Criptomoneda actualizada"}).end()
        : res
            .status(200)
            .json({ ok: false, error: "No existe Criptomoneda con ese id"});
    })
        
});

criptomonedasRouter.post('/', (req, res) => {

    const body = req.body;

    createCriptomoneda(body)
    .then((nuevaCriptomoneda) => {
        nuevaCriptomoneda 
        ? res.status(201).json(nuevaCriptomoneda).end()
        :res.status(400).end();
    });
});


module.exports = criptomonedasRouter;