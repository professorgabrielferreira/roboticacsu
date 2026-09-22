/* =========================================================
   Robótica & Programação | Lógica da página
   Você não precisa editar este arquivo para adicionar recursos.
   Para criar novas etapas ou tipos, altere FAIXAS ou TIPOS abaixo.
   ========================================================= */

const FAIXAS = [
  { id: "todas",    nome: "Todas",           cor: "#172A46" },
  { id: "1-2",      nome: "1º e 2º ano",     cor: "#FFC857" },
  { id: "3-5",      nome: "3º ao 5º ano",    cor: "#35C4D8" },
  { id: "6-8",      nome: "6º ao 8º ano",    cor: "#1677C8" },
  { id: "9-em",     nome: "9º ano e EM",     cor: "#7657D9" },
  { id: "olimpica", nome: "Equipe Olímpica", cor: "#F27A38" }
];

const TIPOS = {
  plano: "Plano de aula",
  atividade: "Atividade",
  apostila: "Apostila",
  projeto: "Projeto",
  codigo: "Código",
  video: "Vídeo",
  rubrica: "Rubrica",
  apresentacao: "Apresentação"
};

const DIAS_NOVO = 30;

/* Estado atual dos filtros, lido do endereço da página */
const params = new URLSearchParams(location.search);
const estado = {
  faixa: params.get("etapa") || "todas",
  tipo: params.get("tipo") || "todos",
  busca: params.get("busca") || "",
  ordem: "recentes"
};

const el = {
  faixas: document.getElementById("filtro-faixa"),
  tipos: document.getElementById("filtro-tipo"),
  busca: document.getElementById("busca"),
  ordem: document.getElementById("ordem"),
  grade: document.getElementById("grade"),
  contagem: document.getElementById("contagem"),
  vazio: document.getElementById("vazio"),
  limpar: document.getElementById("limpar")
};

/* Remove acentos e padroniza para a busca encontrar "robotica" e "robótica" */
const normalizar = (t) =>
  String(t || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const faixaPorId = (id) => FAIXAS.find((f) => f.id === id) || FAIXAS[0];

function ehNovo(data) {
  const dias = (Date.now() - new Date(data + "T00:00:00")) / 86400000;
  return dias >= 0 && dias <= DIAS_NOVO;
}

function formatarData(data) {
  return new Date(data + "T00:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit", month: "short", year: "numeric"
  });
}

/* Escapa texto antes de inserir no HTML, evitando quebras na página */
function esc(t) {
  return String(t ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function combinaBusca(r, termo) {
  if (!termo) return true;
  const alvo = normalizar([r.titulo, r.descricao, TIPOS[r.tipo], faixaPorId(r.faixa).nome,
    ...(r.etiquetas || []), ...(r.bncc || [])].join(" "));
  return normalizar(termo).split(/\s+/).every((p) => alvo.includes(p));
}

function filtrar({ ignorarFaixa = false } = {}) {
  return RECURSOS.filter((r) =>
    (ignorarFaixa || estado.faixa === "todas" || r.faixa === estado.faixa) &&
    (estado.tipo === "todos" || r.tipo === estado.tipo) &&
    combinaBusca(r, estado.busca));
}

/* ---------- Desenho dos filtros ---------- */
function desenharFaixas() {
  const base = filtrar({ ignorarFaixa: true });
  el.faixas.innerHTML = FAIXAS.map((f) => {
    const qtd = f.id === "todas" ? base.length : base.filter((r) => r.faixa === f.id).length;
    const ativo = estado.faixa === f.id;
    return `
      <button type="button" class="no-filtro" role="radio" aria-checked="${ativo}"
              data-faixa="${f.id}" style="--cor:${f.cor}">
        <span class="no-filtro__ponto" aria-hidden="true"></span>
        <span class="no-filtro__nome">${f.nome}</span>
        <span class="no-filtro__qtd">${qtd} ${qtd === 1 ? "recurso" : "recursos"}</span>
      </button>`;
  }).join("");
}

function desenharTipos() {
  const usados = [...new Set(RECURSOS.map((r) => r.tipo))].filter((t) => TIPOS[t]);
  const opcoes = [["todos", "Todos os tipos"], ...usados.map((t) => [t, TIPOS[t]])];
  el.tipos.innerHTML = opcoes.map(([id, nome]) => `
    <button type="button" class="chip" data-tipo="${id}" aria-pressed="${estado.tipo === id}">${nome}</button>
  `).join("");
}

/* ---------- Desenho dos cartões ---------- */
function cartao(r) {
  const faixa = faixaPorId(r.faixa);
  const detalhes = [
    r.duracao && `<dt>Duração</dt><dd>${esc(r.duracao)}</dd>`,
    r.bncc?.length && `<dt>BNCC</dt><dd class="codigo">${r.bncc.map(esc).join(", ")}</dd>`
  ].filter(Boolean).join("");
  const externo = /^https?:/.test(r.link) ? ' target="_blank" rel="noopener"' : "";

  return `
    <article class="recurso" style="--cor:${faixa.cor}">
      <div class="recurso__meta">
        <span class="selo">${esc(TIPOS[r.tipo] || r.tipo)}</span>
        ${ehNovo(r.data) ? '<span class="selo selo--novo">Novo</span>' : ""}
        <span>${esc(faixa.nome)}</span>
      </div>
      <h3>${esc(r.titulo)}</h3>
      <p>${esc(r.descricao)}</p>
      ${detalhes ? `<dl class="recurso__detalhes">${detalhes}</dl>` : ""}
      ${r.etiquetas?.length ? `<ul class="etiquetas">${r.etiquetas.map((e) => `<li>${esc(e)}</li>`).join("")}</ul>` : ""}
      <div class="recurso__acoes">
        <a class="botao" href="${esc(r.link)}"${externo}>Abrir recurso</a>
        ${r.extra ? `<a class="botao botao--secundario" href="${esc(r.extra.link)}"${/^https?:/.test(r.extra.link) ? ' target="_blank" rel="noopener"' : ""}>${esc(r.extra.rotulo)}</a>` : ""}
      </div>
      <small style="color:var(--texto-suave);margin-top:.9rem">Publicado em ${formatarData(r.data)}</small>
    </article>`;
}

function desenharGrade() {
  const lista = filtrar().sort((a, b) =>
    estado.ordem === "titulo"
      ? a.titulo.localeCompare(b.titulo, "pt-BR")
      : b.data.localeCompare(a.data));

  el.grade.innerHTML = lista.map(cartao).join("");
  el.vazio.hidden = lista.length > 0;
  el.contagem.textContent = lista.length
    ? `${lista.length} ${lista.length === 1 ? "recurso encontrado" : "recursos encontrados"}`
    : "";
}

/* Atualiza o endereço para que o link possa ser compartilhado com os filtros */
function atualizarEndereco() {
  const p = new URLSearchParams();
  if (estado.faixa !== "todas") p.set("etapa", estado.faixa);
  if (estado.tipo !== "todos") p.set("tipo", estado.tipo);
  if (estado.busca) p.set("busca", estado.busca);
  const qs = p.toString();
  history.replaceState(null, "", qs ? `?${qs}` : location.pathname);
}

function atualizar() {
  desenharFaixas();
  desenharTipos();
  desenharGrade();
  atualizarEndereco();
}

/* ---------- Eventos ---------- */
el.faixas.addEventListener("click", (e) => {
  const b = e.target.closest("[data-faixa]");
  if (!b) return;
  estado.faixa = b.dataset.faixa;
  atualizar();
  el.faixas.querySelector(`[data-faixa="${estado.faixa}"]`)?.focus();
});

el.tipos.addEventListener("click", (e) => {
  const b = e.target.closest("[data-tipo]");
  if (!b) return;
  estado.tipo = b.dataset.tipo;
  atualizar();
  el.tipos.querySelector(`[data-tipo="${estado.tipo}"]`)?.focus();
});

let espera;
el.busca.addEventListener("input", () => {
  clearTimeout(espera);
  espera = setTimeout(() => {
    estado.busca = el.busca.value.trim();
    atualizar();
  }, 180);
});

el.ordem.addEventListener("change", () => {
  estado.ordem = el.ordem.value;
  desenharGrade();
});

el.limpar.addEventListener("click", () => {
  Object.assign(estado, { faixa: "todas", tipo: "todos", busca: "" });
  el.busca.value = "";
  atualizar();
});

/* ---------- Início ---------- */
if (typeof RECURSOS === "undefined") {
  el.grade.innerHTML = '<p>O arquivo dados/recursos.js não foi carregado. Verifique vírgulas e aspas no último recurso adicionado.</p>';
} else {
  el.busca.value = estado.busca;
  atualizar();
}
