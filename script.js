const apiBase = "https://parallelum.com.br/fipe/api/v1/";
const tipoVeiculo = "carros";

let vehicles = [];

function loadCars() {
    fetch("http://localhost:8080/api/cars")
        .then(res => res.json())
        .then(data => {
            const userId = localStorage.getItem("userId");
            if (userId) {
                vehicles = data.filter(v => v.owner === userId);
            } else {
                vehicles = [];
            }
            renderCarList(vehicles);
        })
        .catch(err => {
            console.error("Erro ao buscar carros:", err);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    updateUserUI();
    loadCars();
});

function showView(view) {
    let content = document.getElementById("content");
    content.innerHTML = "";
    
    if (view === "registerUser") {
        content.innerHTML = `
        <div class='card'>
            <h2>Cadastro de Usuário</h2>
            <input type='text' id='name' placeholder='Nome'>
            <input type='email' id='email' placeholder='Email'>
            <input type='password' id='password' placeholder='Senha'>
            <input type='text' id='cidade' placeholder='Cidade'>
            <input type='text' id='codigoPostal' placeholder='Código postal'>
            <input type='file' id='driverLicense' accept='image/jpeg,image/png,application/pdf'>
            <small style='font-size: 11px; color: #555;'>CNH (JPEG, PNG ou PDF)</small>
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
                <input type='text' id='carPrice' placeholder='Preço Diária'>
                <input type='file' id='carImage' accept='image/jpeg,image/png'>
                <small style='display:block; margin-top:5px; font-size: 11px; color: #555;'>Imagens JPEG ou PNG</small>
                <button onclick='registerCar()'>Cadastrar</button>
                <p id='errorMessage' style='color: red;'></p>
            </div>`;
    
    } else if (view === "listCars") {
        loadCars();
    }
}

function registerCar() {
    const brand = document.getElementById("carBrand").value.trim();
    const model = document.getElementById("carModel").value.trim();
    const year = document.getElementById("carYear").value;
    const price = document.getElementById("carPrice").value.trim();
    const imageFile = document.getElementById("carImage").files[0];
    const errorElement = document.getElementById("errorMessage");

    const owner = localStorage.getItem("userId");

    let errorMessage = "";

    if (!owner) errorMessage += "Usuário não autenticado.\n";
    if (!brand) errorMessage += "Preencha a marca do veículo.\n";
    if (!model) errorMessage += "Preencha o modelo do veículo.\n";
    if (!year) errorMessage += "Selecione o ano do veículo.\n";
    if (!price) {
        errorMessage += "Preencha o preço do veículo.\n";
    } else if (isNaN(price) || parseFloat(price) <= 0) {
        errorMessage += "Preço inválido.\n";
    }
    if (!imageFile) {
        errorMessage += "Selecione uma imagem do veículo.\n";
    } else if (!["image/jpeg", "image/png"].includes(imageFile.type)) {
        errorMessage += "Formato de imagem não suportado\n";
    }

    if (errorMessage) {
        errorElement.innerText = errorMessage;
        setTimeout(() => errorElement.innerText = "", 2000);
        return;
    }

    const formData = new FormData();
    formData.append("brand", brand);
    formData.append("model", model);
    formData.append("year", year);
    formData.append("price", price);
    formData.append("image", imageFile);
    formData.append("owner", owner);

    fetch("http://localhost:8080/api/cars", {
        method: "POST",
        body: formData,
    })
    .then(res => res.json())
    .then(data => {
        alert("Veículo cadastrado com sucesso!");
        showView("listCars");
        loadCars();
    })
    .catch(err => {
        console.error("Erro ao cadastrar carro:", err);
        alert("Erro ao cadastrar veículo.");
    });
}

async function registerUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const city = document.getElementById('cidade').value;
    const postalCode = document.getElementById('codigoPostal').value;

    try {
        const response = await fetch('http://localhost:8080/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, city, postalCode })
        });

        if (response.ok) {
            const user = await response.json();
            localStorage.setItem('userId', user._id);
            updateUserUI();
            alert('Usuário cadastrado com sucesso!');
            showView('listCars');
        } else {
            const err = await response.text();
            throw new Error(err);
        }
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Erro ao cadastrar usuário');
    }
}


function renderCarList(filteredVehicles) {
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    let content = document.getElementById("content");
    content.innerHTML = `
        <div class='card'>
            <h2>Lista de Veículos Disponíveis</h2>
            <div class="vehicle-grid">
            ${filteredVehicles.map(v => `
                <div class="vehicle-card">
                    ${v.image ? `<img src="${v.image}" alt="Imagem do carro">` : ""}
                    <p><strong>${v.brand} ${v.model} (${v.year})</strong><br>
                    ${formatter.format(parseFloat(v.price))} <span style="font-size: 13px; color: #555;">p/ dia</span></p>
                    <button onclick="deleteCar('${v._id}')">Excluir</button>
                </div>
            `).join('')}            
            </div>
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

function deleteCar(id) {
    if (confirm("Tem certeza que deseja excluir este veículo?")) {
        fetch(`http://localhost:8080/api/cars/${id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(data => {
            alert("Veículo excluído com sucesso!");
            loadCars();
        })
        .catch(err => {
            console.error("Erro ao excluir veículo:", err);
            alert("Erro ao excluir veículo.");
        });
    }
}

function updateUserUI() {
    const userId = localStorage.getItem("userId");
    const btnRegisterUser = document.getElementById("btnRegisterUser");
    const userIconText = document.getElementById("userIconText");

    if (userId) {
        btnRegisterUser.style.display = "none";
        userIconText.textContent = "logout";
    } else {
        btnRegisterUser.style.display = "inline-block";
        userIconText.textContent = "person";
    }
}

function handleUserButtonClick() {
    const userId = localStorage.getItem("userId");
    if (userId) {
        if (confirm("Deseja sair da conta?")) {
            localStorage.removeItem("userId");
            updateUserUI();
            showView("listCars");
        }
    } else {
        showView("registerUser");
    }
}