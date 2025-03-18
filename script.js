const apiBase = "https://parallelum.com.br/fipe/api/v1/";
const tipoVeiculo = "carros";
let vehicles = [];

function toggleMenu() {
    document.getElementById("menu").classList.toggle("show");
}

function showView(view) {
    let content = document.getElementById("content");
    content.innerHTML = "";
    if (view === "registerUser") {
        content.innerHTML = `<div class='card'>
            <h2>Cadastro de Usuário</h2>
            <input type="radio" name="tipo" checked> Pessoa Física
            <input type="radio" name="tipo"> Pessoa Jurídica
            <input type='text' id='userName' placeholder='Nome'>
            <input type='email' id='userEmail' placeholder='Email'>
            <input type='text' id='userCity' placeholder='Cidade'>
            <input type='text' id='userPostalCode' placeholder='Código postal'>
            <button onclick='registerUser()'>Cadastrar</button>
        </div>`;
    } else if (view === "registerCar") {
        content.innerHTML = `<div class='card'>
            <h2>Cadastro de Veículo</h2>
            <input type='text' id='carBrand' placeholder='Marca'>
            <input type='text' id='carModel' placeholder='Modelo'>
            <input type='number' id='carYear' placeholder='Ano'>
            <input type='text' id='carPrice' placeholder='Preço'>
            <button onclick='registerCar()'>Cadastrar</button>
        </div>`;
    } else if (view === "listCars") {
        renderCarList(vehicles);
    }
}

function registerCar() {
    let brand = document.getElementById("carBrand").value;
    let model = document.getElementById("carModel").value;
    let year = document.getElementById("carYear").value;
    let price = document.getElementById("carPrice").value;
    vehicles.push({ brand, model, year, price });
    alert("Veículo cadastrado com sucesso!");
    showView("listCars");
}

function renderCarList(filteredVehicles) {
    let content = document.getElementById("content");
    content.innerHTML = `<div class='card'><h2>Lista de Veículos Disponíveis</h2>
        ${filteredVehicles.map(v => `<p>${v.brand} ${v.model} (${v.year}) - ${v.price}</p>`).join('')}
    </div>`;
}

function searchCars() {
    let searchText = document.getElementById("search-bar").value.toLowerCase();
    let filteredVehicles = vehicles.filter(v =>
        v.brand.toLowerCase().includes(searchText) ||
        v.model.toLowerCase().includes(searchText) ||
        v.year.toString().includes(searchText) ||
        v.price.toLowerCase().includes(searchText)
    );
    renderCarList(filteredVehicles);
}
