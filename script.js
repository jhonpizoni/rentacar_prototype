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