const Criptomoneda = require('../models/Criptomoneda');


const getCriptomonedas = () => {
    return Criptomoneda.find({});
};

const getCriptomoneda = (id) => {    
    return Criptomoneda.findById(id);
};

const deleteCriptomoneda = (id) => {
    return Criptomoneda.findByIdAndRemove(id);   
};

const createCriptomoneda = (data) => {

    const { nombre, simbolo, creacion, esStablecoin } = data;

    if(nombre && simbolo && creacion && esStablecoin) {
        const nuevaCriptomoneda = new Criptomoneda({
            nombre,
            simbolo,
            creacion,
            esStablecoin,
        });

        return nuevaCriptomoneda.save();
    } 

    return null;
    
}

const updateCriptomoneda = (criptomoneda) => {

    return Criptomoneda.findByIdAndUpdate(criptomoneda.id, criptomoneda)

   

};

module.exports = {
    getCriptomonedas,
    getCriptomoneda,
    deleteCriptomoneda,
    createCriptomoneda,
    updateCriptomoneda,
}