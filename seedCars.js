// seedCars.js
const mongoose = require("mongoose");
const Car = require("./models/Car");
const User = require("./models/User");

const MONGO_URI = "mongodb://localhost:27017/rentacar";

async function seedCars() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Conectado ao MongoDB");

        // ⚠️ Pegando o primeiro usuário cadastrado
        const users = await User.find();
        if (users.length === 0) {
            throw new Error("Nenhum usuário encontrado no banco. Cadastre um usuário primeiro.");
        }

        const owner = users[0]._id;

        const cars = [
            {
                brand: "Chevrolet",
                model: "Onix",
                year: "2021",
                price: "120",
                image: "http://localhost:8080/uploads/onix.jpg",
                owner
            },
            {
                brand: "Volkswagen",
                model: "Gol",
                year: "2019",
                price: "100",
                image: "http://localhost:8080/uploads/gol.jpg",
                owner
            },
            {
                brand: "Hyundai",
                model: "HB20",
                year: "2020",
                price: "110",
                image: "http://localhost:8080/uploads/hb20.jpg",
                owner
            },
            {
                brand: "Fiat",
                model: "Argo",
                year: "2022",
                price: "115",
                image: "http://localhost:8080/uploads/argo.jpg",
                owner
            },
            {
                brand: "Renault",
                model: "Kwid",
                year: "2021",
                price: "90",
                image: "http://localhost:8080/uploads/kwid.jpg",
                owner
            }
        ];

        const result = await Car.insertMany(cars);
        console.log("Carros cadastrados com sucesso:", result);

    } catch (err) {
        console.error("Erro ao cadastrar veículos:", err);
    } finally {
        await mongoose.disconnect();
        console.log("Conexão encerrada.");
    }
}

seedCars();
