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

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar usuários', error: err });
    }
});

// Rota de login por email
router.post('/login', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao realizar login', error: err });
    }
});


module.exports = router;
