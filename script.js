const apiBase = "https://parallelum.com.br/fipe/api/v1/";
const tipoVeiculo = "carros";
let vehicles = [];

function showView(view) {
    let content = document.getElementById("content");
    content.innerHTML = "";
    
    if (view === "registerUser") {
        content.innerHTML = `
            <div class='card'>
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

        content.innerHTML = `
            <div class='card'>
                <h2>Cadastro de Veículo</h2>
                <input type='text' id='carBrand' placeholder='Marca'>
                <input type='text' id='carModel' placeholder='Modelo'>
                <select id='carYear' class='custom-select'>
                    <option value=''>Selecione o ano</option>
                    ${yearOptions}
                </select>
                <input type='text' id='carPrice' placeholder='Preço'>
                <input type='file' id='carImage'>
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
    let imageFile = document.getElementById("carImage").files[0];
    let errorElement = document.getElementById("errorMessage");
    let errorMessage = "";

    if (!brand) errorMessage += "Preencha a marca do veículo.\n";
    if (!model) errorMessage += "Preencha o modelo do veículo.\n";
    if (!year) errorMessage += "Selecione o ano do veículo.\n";
    if (!price) errorMessage += "Preencha o preço do veículo.\n";
    if (!imageFile) errorMessage += "Selecione uma imagem do veículo.\n";

    if (errorMessage) {
        errorElement.innerText = errorMessage;
        setTimeout(() => errorElement.innerText = "", 1500);
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        vehicles.push({ brand, model, year, price, image: e.target.result });
        alert("Veículo cadastrado com sucesso!");
        showView("listCars");
    };
    reader.readAsDataURL(imageFile);
}

function renderCarList(filteredVehicles) {
    let content = document.getElementById("content");
    content.innerHTML = `
        <div class='card'>
            <h2>Lista de Veículos Disponíveis</h2>
            ${filteredVehicles.map(v => `
                <div style="border: 1px solid #ccc; border-radius: 10px; margin: 10px; padding: 10px;">
                    <img src="${v.image}" alt="${v.model}" style="width: 100px; height: auto; border-radius: 5px;">
                    <p><strong>${v.brand} ${v.model}</strong> (${v.year}) - ${v.price}</p>
                </div>
            `).join('')}
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