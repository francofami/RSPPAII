const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const criptomonedaSchema = new Schema({
    nombre: {
        type: String,
        required:true,
    },
    simbolo: {
        type: String,
        required:true,
    },
    creacion: {
        type: Number,
        required: true,
    },
    esStablecoin: {
        type: Boolean,
        required: true,
    }
});

criptomonedaSchema.set('toJSON', {
    transform:((document, criptomonedaToJSON) => {
        criptomonedaToJSON.id = criptomonedaToJSON._id.toString();
        delete criptomonedaToJSON._id;
        delete criptomonedaToJSON.__v;
    })
})

module.exports = model('Criptomoneda', criptomonedaSchema);