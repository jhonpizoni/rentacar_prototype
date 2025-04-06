const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');

const router = express.Router();

// Configuração do Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Rota para cadastro de usuário
router.post('/', upload.single('driverLicense'), async (req, res) => {
    try {
        const { name, email, city, postalCode } = req.body;
        const driverLicense = req.file ? `/uploads/${req.file.filename}` : null;

        const newUser = new User({ name, email, city, postalCode, driverLicense });
        await newUser.save();

        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao cadastrar usuário', error: err });
    }
});

module.exports = router;
