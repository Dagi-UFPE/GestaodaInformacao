// Abrir/Fechar Modal
const modal = document.getElementById("filter-modal");
const btn = document.getElementById("advanced-filter-btn");
const span = document.querySelector(".close-modal");

btn.onclick = () => modal.style.display = "block";
span.onclick = () => modal.style.display = "none";
window.onclick = (event) => {
    if (event.target === modal) modal.style.display = "none";
};

// Captura do formulário de filtro
const filterForm = document.getElementById("filter-form");
filterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const tipo = document.getElementById("tipo").value;
    const area = document.getElementById("area").value.toLowerCase();
    const local = document.getElementById("local").value.toLowerCase();

    console.log({ tipo, area, local }); // Aqui você aplica o filtro nos cards

    modal.style.display = "none"; // Fecha o modal ao aplicar filtro
});
document.querySelectorAll('.habilidades-baloes .badge').forEach(bal => {
    bal.addEventListener('click', () => {
        bal.classList.toggle('selected'); // marca/desmarca
    });
});

// Para coletar os valores selecionados ao enviar o formulário:
document.getElementById('filter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const selecionadas = Array.from(document.querySelectorAll('.habilidades-baloes .badge.selected'))
                              .map(el => el.dataset.value);
    console.log('Habilidades selecionadas:', selecionadas);
    // Aqui você pode aplicar o filtro nos cards
});
