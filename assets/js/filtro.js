/**
 * ============================================================
 * ELEMENTOS DO DOM
 * ============================================================
 */

// Container de cards
const grid = document.getElementById("grid-cards");

// Span que exibe os números da paginação
const numerosSpan = document.getElementById("numeros");

// Container da paginação
const paginacaoContainer = document.getElementById("paginacao-container");

// Input de busca
const searchInput = document.getElementById("search-input");

// Modal de filtros
const filterModal = document.getElementById("filter-modal");

// Formulário de filtros
const filterForm = document.getElementById("filter-form");

// Selects do modal de filtros
const filtroTipo = document.getElementById("tipo");
const filtroFormato = document.getElementById("formato");
const filtroCidade = document.getElementById("local");

// Badges clicáveis (habilidades)
const badges = document.querySelectorAll(".habilidades-baloes .badge");

// Container que exibe filtros ativos
const filtroAtivosContainer = document.getElementById("filtros-ativos");


/**
 * ============================================================
 * DADOS E CONFIGURAÇÃO
 * ============================================================
 */

// Lista de estágios/vagas
const estagios = [
    { titulo: "Estágio em Business Intelligence (BI)", empresa: "Porto Digital", local: "Recife, PE", descricao: "Auxiliar na criação de dashboards em Power BI, extração e tratamento de dados SQL, e análise de indicadores de negócio.", tipo: "Estágio", formato: "Híbrido", cidade: "Recife-PE", stack: ["SQL", "Power BI"], url: "https://gestaodainformacao.netlify.app/o-curso" },
    { titulo: "Analista de Dados Jr.", empresa: "Neurotech", local: "Recife, PE", descricao: "Foco em análise exploratória de dados com Python, construção de modelos preditivos e apresentação de resultados para stakeholders.", tipo: "CLT", formato: "Remoto", cidade: "Recife-PE", stack: ["Python"], url: "https://gestaodainformacao.netlify.app/o-curso" },
    { titulo: "Estágio em UX Design / Arquitetura da Informação", empresa: "Accenture", local: "Recife, PE", descricao: "Participar de pesquisas com usuários, criação de wireframes e protótipos, e documentação de jornadas de usuário.", tipo: "Estágio", formato: "Presencial", cidade: "Recife-PE", stack: ["UX/UI", "Figma"], url: "https://gestaodainformacao.netlify.app/o-curso" },
    { titulo: "Estágio em Governança de Dados", empresa: "CESAR", local: "Recife, PE", descricao: "Apoiar na implementação de políticas de governança de dados, mapeamento de metadados e garantia da qualidade dos dados mestres.", tipo: "Estágio", formato: "Presencial", cidade: "Recife-PE", stack: ["Governança"], url: "https://gestaodainformacao.netlify.app/o-curso" },
    { titulo: "Estágio em Engenharia de Software", empresa: "In Loco", local: "Recife, PE", descricao: "Acompanhar o desenvolvimento de aplicações web e mobile, revisão de código e integração de APIs.", tipo: "Estágio", formato: "Híbrido", cidade: "Recife-PE", stack: ["JavaScript", "React"], url: "https://gestaodainformacao.netlify.app/o-curso" }
];

// Quantidade de cards por página
const porPagina = 4;

// Calcula o total de páginas
const totalPaginas = () => Math.ceil(filtrarVagas().length / porPagina);

// Filtros ativos e atuais
let filtrosStack = [];
let filtrosAplicados = {};
let paginaAtual = 1;


/**
 * ============================================================
 * FUNÇÕES
 * ============================================================
 */

/**
 * Mostra skeleton cards enquanto os dados não são carregados
 * @param {number} qtd - quantidade de skeletons a exibir
 */
function mostrarSkeletons(qtd = 4) {
    grid.innerHTML = "";
    for (let i = 0; i < qtd; i++) {
        const skeleton = document.createElement("div");
        skeleton.className = "card skeleton-card";
        skeleton.innerHTML = `
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-line" style="width:50%"></div>
            <div class="skeleton skeleton-line" style="width:40%"></div>
            <div class="skeleton skeleton-line"></div>
            <div>
                <span class="skeleton skeleton-tag"></span>
                <span class="skeleton skeleton-tag"></span>
                <span class="skeleton skeleton-tag"></span>
            </div>
        `;
        grid.appendChild(skeleton);
    }
}

// Inicialização dos skeletons
mostrarSkeletons();


/**
 * Filtra vagas de acordo com:
 * - busca
 * - tipo
 * - formato
 * - cidade
 * - stack
 * @returns {Array} - lista de vagas filtradas
 */
function filtrarVagas() {
    const termoBusca = searchInput.value.toLowerCase();
    return estagios.filter(vaga => {
        let tipoOk = filtrosAplicados.tipo ? vaga.tipo.toLowerCase() === filtrosAplicados.tipo.toLowerCase() : true;
        let formatoOk = filtrosAplicados.formato ? vaga.formato.toLowerCase() === filtrosAplicados.formato.toLowerCase() : true;
        let cidadeOk = filtrosAplicados.cidade ? vaga.cidade.toLowerCase() === filtrosAplicados.cidade.toLowerCase() : true;
        let stackOk = filtrosAplicados.stack && filtrosAplicados.stack.length > 0
            ? filtrosAplicados.stack.every(skill => vaga.stack.map(s => s.toLowerCase()).includes(skill.toLowerCase()))
            : true;
        let buscaOk = termoBusca ? vaga.titulo.toLowerCase().includes(termoBusca) || vaga.descricao.toLowerCase().includes(termoBusca) : true;
        return tipoOk && formatoOk && cidadeOk && stackOk && buscaOk;
    });
}


/**
 * Atualiza os cards exibidos na página atual
 */
function atualizarPagina() {
    grid.innerHTML = "";
    const vagasFiltradas = filtrarVagas();
    const inicio = (paginaAtual - 1) * porPagina;
    const fim = inicio + porPagina;
    const vagasPagina = vagasFiltradas.slice(inicio, fim);

    if (vagasPagina.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">Nenhuma vaga encontrada com os filtros selecionados.</p>`;
        paginacaoContainer.style.display = "none";
        return;
    }

    vagasPagina.forEach(vaga => {
        const card = document.createElement("div");
        card.className = "card estagio-item";
        const tagsPrincipais = [vaga.tipo, vaga.formato, vaga.cidade, ...vaga.stack].filter(Boolean);
        const tagsHTML = tagsPrincipais.map(tag => `<span>${tag}</span>`).join(' ');
        card.innerHTML = `
            <h3>${vaga.titulo}</h3>
            <p><strong>Empresa:</strong> ${vaga.empresa}</p>
            <p><strong>Local:</strong> ${vaga.local}</p>
            <p><strong>Descrição:</strong> ${vaga.descricao}</p>
            <div class="tags">${tagsHTML}</div>
            <a href="${vaga.url}" class="btn btn-primary-dark" style="margin-top:15px;" target="_blank">Ver Detalhes</a>
        `;
        grid.appendChild(card);
    });

    renderizarBotoes();
}


/**
 * Renderiza os botões de paginação de acordo com a página atual
 */
function renderizarBotoes() {
    numerosSpan.innerHTML = "";
    const vagasFiltradas = filtrarVagas();

    if (vagasFiltradas.length <= porPagina) {
        paginacaoContainer.style.display = "none";
        return;
    } else {
        paginacaoContainer.style.display = "flex";
    }

    const maxVisiveis = 3;
    let start = Math.max(1, paginaAtual - 1);
    let end = Math.min(totalPaginas(), start + maxVisiveis - 1);
    if (end - start + 1 < maxVisiveis) start = Math.max(1, end - maxVisiveis + 1);

    if (start > 1) numerosSpan.append("...");
    for (let i = start; i <= end; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        if (i === paginaAtual) btn.classList.add("ativo");
        btn.addEventListener("click", () => { paginaAtual = i; atualizarPagina(); });
        numerosSpan.appendChild(btn);
    }
    if (end < totalPaginas()) numerosSpan.append("...");
}


/**
 * Adiciona clique nas badges de habilidades
 */
badges.forEach(badge => {
    badge.addEventListener("click", () => {
        const valor = badge.dataset.value;
        if (filtrosStack.includes(valor)) {
            filtrosStack = filtrosStack.filter(s => s !== valor);
            badge.classList.remove("selecionado");
        } else {
            filtrosStack.push(valor);
            badge.classList.add("selecionado");
        }
    });
});


/**
 * Aplica filtros do modal
 */
filterForm.addEventListener("submit", e => {
    e.preventDefault();
    aplicarFiltros();
    filterModal.style.display = "none";
});


/**
 * Função principal para aplicar filtros
 */
function aplicarFiltros() {
    filtrosStack = Array.from(badges)
        .filter(badge => badge.classList.contains("selecionado"))
        .map(badge => badge.dataset.value);

    filtrosAplicados = {
        tipo: filtroTipo.value,
        formato: filtroFormato.value,
        cidade: filtroCidade.value,
        stack: [...filtrosStack]
    };

    paginaAtual = 1;
    atualizarFiltrosAtivos();
    atualizarPagina();
}


/**
 * Atualiza badges de filtros ativos
 */
function atualizarFiltrosAtivos() {
    filtroAtivosContainer.innerHTML = "";

    Object.entries(filtrosAplicados).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach(v => { if (v) adicionarBadgeAtivo(v, key); });
        } else if (value) { adicionarBadgeAtivo(value, key); }
    });
}


/**
 * Cria badge de filtro ativo clicável para remoção
 * @param {string} valor - valor do filtro
 * @param {string} tipo - tipo do filtro
 */
function adicionarBadgeAtivo(valor, tipo) {
    const span = document.createElement("span");
    span.className = "tag-balao ativo";
    span.textContent = valor;

    span.addEventListener("click", () => {
        if (Array.isArray(filtrosAplicados[tipo])) {
            filtrosAplicados[tipo] = filtrosAplicados[tipo].filter(v => v !== valor);
        } else {
            filtrosAplicados[tipo] = "";
        }

        // Atualiza selects do modal caso o filtro removido seja tipo, formato ou cidade
        if (localTrabalho.includes(valor)) {
            localSelect.selectedIndex = 0;
        } else if (tipoTrabalho.includes(valor)) {
            tipoSelect.selectedIndex = 0;
        } else if (formatoTrabalho.includes(valor)) {
            formatoSelect.selectedIndex = 0;
        }

        // Remove marcação na badge
        badges.forEach(badge => {
            if (badge.dataset.value === valor) {
                badge.classList.remove("selecionado", "selected");
            }
        });

        atualizarFiltrosAtivos();
        atualizarPagina();
    });

    filtroAtivosContainer.appendChild(span);
}


/**
 * ============================================================
 * EVENTOS DE PAGINAÇÃO
 * ============================================================
 */
document.getElementById("primeira").onclick = () => { paginaAtual = 1; atualizarPagina(); };
document.getElementById("anterior").onclick = () => { if (paginaAtual > 1) paginaAtual--; atualizarPagina(); };
document.getElementById("proxima").onclick = () => { if (paginaAtual < totalPaginas()) paginaAtual++; atualizarPagina(); };
document.getElementById("ultima").onclick = () => { paginaAtual = totalPaginas(); atualizarPagina(); };


/**
 * ============================================================
 * PESQUISA EM TEMPO REAL
 * ============================================================
 */
searchInput.addEventListener("input", () => { paginaAtual = 1; atualizarPagina(); });


/**
 * ============================================================
 * INICIALIZAÇÃO
 * ============================================================
 */
setTimeout(atualizarPagina, 1500); // Simula carregamento de dados
