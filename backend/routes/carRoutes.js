const express = require('express');
const router = express.Router();
const multer = require('multer');
const Car = require('../models/Car');
const fs = require('fs');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { brand, model, year, price, owner } = req.body;
        const image = req.file ? `http://localhost:8080/uploads/${req.file.filename}` : '';

        if (!owner) {
            return res.status(400).json({ error: "ID do usuário (owner) é obrigatório." });
        }

        const car = new Car({ brand, model, year, price, image, owner });
        await car.save();
        res.status(201).json(car);
    } catch (err) {
        console.error("Erro ao cadastrar carro:", err);
        res.status(500).json({ error: "Erro ao cadastrar carro." });
    }
});


router.get('/', async (req, res) => {
    const cars = await Car.find();
    res.json(cars);
});

router.delete('/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Veículo não encontrado' });
        }
        if (car.image) {
            const filename = car.image.split('/').pop();
            const imagePath = path.join(__dirname, '..', 'uploads', filename);
        
            fs.access(imagePath, fs.constants.F_OK, (err) => {
                if (!err) {
                    fs.unlink(imagePath, (err) => {
                        if (err) {
                            console.error('Erro ao remover imagem:', err);
                        } else {
                            console.log('Imagem removida com sucesso:', imagePath);
                        }
                    });
                } else {
                    console.warn('Imagem não encontrada para exclusão:', imagePath);
                }
            });
        }

        await Car.findByIdAndDelete(req.params.id);
        res.json({ message: 'Veículo removido com sucesso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao remover veículo' });
    }
});

module.exports = router;