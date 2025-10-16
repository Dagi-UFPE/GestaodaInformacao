// Abrir/Fechar Modal
const modal = document.getElementById("filter-modal");
const btn = document.getElementById("advanced-filter-btn");
const span = document.getElementById("close");
const filtrarBtn = document.getElementById("filtrar");
const habilidades = ["Python", "JavaScript", "SQL", "Gestão", "UX/UI"];
const container = document.getElementById("habilidades-baloes");

habilidades.forEach(habilidade => {
    const span = document.createElement("span");
    span.className = "badge";
    span.dataset.value = habilidade;
    span.textContent = habilidade;

    // Adicionar evento de clique (opcional)
    span.addEventListener("click", () => {
        span.classList.toggle("selecionado");
    });

    container.appendChild(span);
});

btn.onclick = () => modal.style.display = "block";

// Fechar modal ao clicar no X
span.onclick = () => {
    modal.style.display = "none";
    aplicarFiltros();
};

// Fechar modal ao clicar fora dele
window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
        aplicarFiltros();
    }
};

// Clique nos balões (marca/desmarca)
document.querySelectorAll('.habilidades-baloes .badge').forEach(bal => {
    bal.addEventListener('click', () => {
        bal.classList.toggle('selected');
    });
});

// Captura e aplica filtros
function aplicarFiltros() {
    const tipo = document.getElementById("tipo").value;
    const formato = document.getElementById("formato").value;
    const local = document.getElementById("local").value.toLowerCase();

    const selecionadas = Array.from(document.querySelectorAll('.habilidades-baloes .badge.selected'))
                              .map(el => el.dataset.value);
}

// Ao clicar no botão "Aplicar Filtro"
filtrarBtn.onclick = (e) => {
    aplicarFiltros();   // Aplica os filtros
    modal.style.display = "none"; // Fecha o modal
};


