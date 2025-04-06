const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    brand: String,
    model: String,
    year: String,
    price: String,
    image: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // referência para o dono do carro
});

module.exports = mongoose.model('Car', carSchema);
