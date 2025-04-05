const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const carRoutes = require('./routes/carRoutes');
const app = express();

mongoose.connect("mongodb://localhost:27017/rentacar", {
})
.then(() => console.log("Conectado ao MongoDB"))
.catch(err => console.error("Erro ao conectar ao MongoDB:", err));


app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/cars', carRoutes);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});