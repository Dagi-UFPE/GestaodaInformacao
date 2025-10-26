/**
 * ============================================================
 * ELEMENTOS DO DOM
 * ============================================================
 */

// Modal de filtros avançados
const modal = document.getElementById("filter-modal");

// Botão que abre o modal
const btn = document.getElementById("advanced-filter-btn");

// Elemento "X" que fecha o modal
const span = document.getElementById("close");

// Botão de aplicar filtros
const filtrarBtn = document.getElementById("filtrar");

// Selects do modal
const tipoSelect = document.getElementById("tipo");
const formatoSelect = document.getElementById("formato");
const localSelect = document.getElementById("local");

// Container para badges de habilidades
const container = document.getElementById("habilidades-container");


/**
 * ============================================================
 * DADOS ESTÁTICOS
 * ============================================================
 */

// Tipos de trabalho
const tipoTrabalho = ["CLT", "Estágio", "PJ", "Freelancer"];

// Formatos de trabalho
const formatoTrabalho = ["Remoto", "Presencial", "Híbrido"];

// Locais de trabalho
const localTrabalho = ["Recife-PE", "Olinda-PE", "Paulista-PE", "Jaboatao-PE"];

// Habilidades disponíveis
const habilidades = ["Python", "JavaScript", "SQL", "Gestão", "UX/UI"];


/**
 * ============================================================
 * POPULAÇÃO DINÂMICA DOS SELECTS E BADGES
 * ============================================================
 */

// Cria opções do select de tipo de trabalho
tipoTrabalho.forEach(tipo => {
    const option = document.createElement("option");
    option.value = tipo;
    option.textContent = tipo;
    tipoSelect.appendChild(option);
});

// Cria opções do select de formato de trabalho
formatoTrabalho.forEach(formato => {
    const option = document.createElement("option");
    option.value = formato;
    option.textContent = formato;
    formatoSelect.appendChild(option);
});

// Cria opções do select de local de trabalho
localTrabalho.forEach(local => {
    const option = document.createElement("option");
    option.value = local;
    option.textContent = local;
    localSelect.appendChild(option);
});

// Cria badges de habilidades dinamicamente
habilidades.forEach(habilidade => {
    const span = document.createElement("span");
    span.className = "badge";
    span.dataset.value = habilidade;
    span.textContent = habilidade;
    container.appendChild(span);
});


/**
 * ============================================================
 * CONTROLE DO MODAL
 * ============================================================
 */

// Abre o modal ao clicar no botão
btn.onclick = () => {
    modal.style.display = "block";
};

// Fecha o modal ao clicar no "X"
span.onclick = () => {
    modal.style.display = "none";
    aplicarFiltros(); // Aplica os filtros ao fechar
};


/**
 * ============================================================
 * INTERAÇÃO COM BADGES
 * ============================================================
 */

// Marca ou desmarca badges ao clicar
document.querySelectorAll('.habilidades-baloes .badge').forEach(bal => {
    bal.addEventListener('click', () => {
        bal.classList.toggle('selected');
    });
});


/**
 * ============================================================
 * FUNÇÃO DE APLICAÇÃO DE FILTROS
 * ============================================================
 */

/**
 * Captura valores selecionados nos selects e badges
 * @returns {Object} - objeto com filtros selecionados
 */
function aplicarFiltros() {
    const tipo = document.getElementById("tipo").value;           // Tipo de trabalho selecionado
    const formato = document.getElementById("formato").value;     // Formato de trabalho selecionado
    const local = document.getElementById("local").value.toLowerCase(); // Local selecionado (minusculo)

    // Habilidades selecionadas (badges)
    const selecionadas = Array.from(document.querySelectorAll('.habilidades-baloes .badge.selected'))
        .map(el => el.dataset.value);

    // Aqui você poderia passar os filtros para outra função que atualize a exibição
    // Exemplo: atualizarPaginaComFiltros({ tipo, formato, local, selecionadas });
}


/**
 * ============================================================
 * EVENTO DO BOTÃO "APLICAR FILTRO"
 * ============================================================
 */

filtrarBtn.onclick = (e) => {
    aplicarFiltros();          // Captura e aplica os filtros
    modal.style.display = "none"; // Fecha o modal
};
