const apiBase = "https://parallelum.com.br/fipe/api/v1/";
const tipoVeiculo = "carros";
let vehicles = [];

document.addEventListener("DOMContentLoaded", function () {
    const userButton = document.getElementById("user-button");
    const userMenu = document.getElementById("user-menu");

    userButton.addEventListener("click", function () {
        userMenu.style.display = userMenu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function (event) {
        if (!userButton.contains(event.target) && !userMenu.contains(event.target)) {
            userMenu.style.display = "none";
        }
    });
});


function toggleMenu() {
    document.getElementById("menu").classList.toggle("show");
}

function showView(view) {
    let content = document.getElementById("content");
    content.innerHTML = "";
    if (view === "registerUser") {
        content.innerHTML = `<div class='card'>
            <h2>Cadastro de Usuário</h2>
            <input type='text' id='userName' placeholder='Nome'>
            <input type='email' id='userEmail' placeholder='Email'>
            <input type='text' id='userCity' placeholder='Cidade'>
            <input type='text' id='userPostalCode' placeholder='Código postal'>
            <button onclick='registerUser()'>Cadastrar</button>
        </div>`;
    } else if (view === "registerCar") {
        let currentYear = new Date().getFullYear();
        let yearOptions = "";
        for (let year = currentYear; year >= 2009; year--) {
            yearOptions += `<option value='${year}'>${year}</option>`;
        }
        
        content.innerHTML = `<div class='card'>
            <h2>Cadastro de Veículo</h2>
            <input type='text' id='carBrand' placeholder='Marca'>
            <input type='text' id='carModel' placeholder='Modelo'>
            <select id='carYear' class='custom-select'>
                <option value=''>Selecione o ano</option>
                ${yearOptions}
            </select>
            <input type='text' id='carPrice' placeholder='Preço'>
            <button onclick='registerCar()'>Cadastrar</button>
            <p id='errorMessage' style='color: red;'></p>
        </div>`;
    } else if (view === "listCars") {
        renderCarList(vehicles);
    }
}

function registerCar() {
    let brand = document.getElementById("carBrand").value.trim();
    let model = document.getElementById("carModel").value.trim();
    let year = document.getElementById("carYear").value;
    let price = document.getElementById("carPrice").value.trim();
    let errorMessage = "";

    if (!brand) errorMessage += "Preencha a marca do veículo.\n";
    if (!model) errorMessage += "Preencha o modelo do veículo.\n";
    if (!year) errorMessage += "Selecione o ano do veículo.\n";
    if (!price) errorMessage += "Preencha o preço do veículo.\n";
    
    if (errorMessage) {
        let errorElement = document.getElementById("errorMessage");
        errorElement.innerText = errorMessage;
        setTimeout(() => errorElement.innerText = "", 1500);
        return;
    }
    
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
