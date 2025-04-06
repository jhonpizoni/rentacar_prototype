const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    driverLicense: { type: String }, // caminho da imagem da CNH
    cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }] // vinculação com os carros
});

module.exports = mongoose.model('User', userSchema);
