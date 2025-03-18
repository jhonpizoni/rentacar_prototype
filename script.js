<<<<<<< HEAD
let vehicles = [
    { id: 1, brand: "Toyota", model: "Corolla", year: 2020, price: "R$150/dia" },
    { id: 2, brand: "Honda", model: "Civic", year: 2021, price: "R$180/dia" }
];
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
            <input type='city' id='userCity' placeholder='Cidade'>
            <input type='es' id='userPostalCode' placeholder='Código postal'>
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
        content.innerHTML = `<div class='card'><h2>Lista de Veículos Disponíveis</h2>
            ${vehicles.map(v => `<p>${v.brand} ${v.model} (${v.year}) - ${v.price}</p>`).join('')}
        </div>`;
    }
}
function toggleMenu() {
            document.getElementById("menu").classList.toggle("show");
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
=======
document.addEventListener("DOMContentLoaded", function () {
    const sections = {
        cadastro: document.getElementById("cadastro"),
        carros: document.getElementById("carros"),
        meusCarros: document.getElementById("meus-carros")
    };
    
    function hideAllSections() {
        Object.values(sections).forEach(section => section.style.display = "none");
    }
    
    hideAllSections();
    
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            hideAllSections();
            sections[targetId].style.display = "block";
        });
    });
});
>>>>>>> b0e77165300a5e70da386bcb4cc7f91890e22a8f
