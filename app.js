/* =========================================================
   Robótica | Lógica da página
   Você não precisa editar este arquivo para adicionar recursos.
   Para criar ou renomear turmas, altere SEGMENTOS abaixo.
   ========================================================= */

const SEGMENTOS = [
  {
    nome: "Fundamental Anos Iniciais",
    turmas: [
      { id: "exploradores", nome: "Exploradores Digitais", cor: "#FFC857" },
      { id: "construtores", nome: "Construtores Digitais", cor: "#35C4D8" },
      { id: "inovadores",   nome: "Inovadores Digitais",   cor: "#22A699" }
    ]
  },
  {
    nome: "Fundamental Anos Finais",
    turmas: [
      { id: "descobridores", nome: "Descobridores Digitais", cor: "#1677C8" },
      { id: "criadores",     nome: "Criadores Digitais",     cor: "#4B63D6" },
      { id: "inventores",    nome: "Inventores Digitais",    cor: "#7657D9" },
      { id: "olimpica",      nome: "Equipe Olímpica",        cor: "#F27A38" }
    ]
  }
];

const TIPOS = {
  plano: "Plano de aula", atividade: "Atividade", apostila: "Apostila",
  projeto: "Projeto", codigo: "Código", video: "Vídeo",
  rubrica: "Rubrica", apresentacao: "Apresentação"
};

const DIAS_NOVO = 30;
const TURMAS = SEGMENTOS.flatMap((s) => s.turmas);
const turmaPorId = (id) => TURMAS.find((t) => t.id === id);

/* Um recurso pode pertencer a uma turma ("inovadores") ou a várias (["exploradores", "inovadores"]) */
const turmasDe = (r) => [].concat(r.turma || []).map(turmaPorId).filter(Boolean);

const params = new URLSearchParams(location.search);
const estado = {
  turma: turmaPorId(params.get("turma")) ? params.get("turma") : "todas",
  busca: params.get("busca") || ""
};

const el = {
  turmas: document.getElementById("filtro-turma"),
  verTodas: document.getElementById("ver-todas"),
  busca: document.getElementById("busca"),
  grade: document.getElementById("grade"),
  contagem: document.getElementById("contagem"),
  vazio: document.getElementById("vazio")
};

const normalizar = (t) =>
  String(t || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const ehExterno = (link) => /^https?:/.test(link) ? ' target="_blank" rel="noopener"' : "";

function ehNovo(data) {
  const dias = (Date.now() - new Date(data + "T00:00:00")) / 86400000;
  return dias >= 0 && dias <= DIAS_NOVO;
}

function formatarData(data) {
  return new Date(data + "T00:00:00").toLocaleDateString("pt-BR",
    { day: "2-digit", month: "short", year: "numeric" });
}

function combinaBusca(r, termo) {
  if (!termo) return true;
  const alvo = normalizar([r.titulo, r.descricao, TIPOS[r.tipo],
    ...turmasDe(r).map((t) => t.nome), ...(r.etiquetas || []), ...(r.bncc || []), r.autor].join(" "));
  return normalizar(termo).split(/\s+/).every((p) => alvo.includes(p));
}

function filtrar({ ignorarTurma = false } = {}) {
  return RECURSOS.filter((r) =>
    (ignorarTurma || estado.turma === "todas" || turmasDe(r).some((t) => t.id === estado.turma)) &&
    combinaBusca(r, estado.busca));
}

/* ---------- Trilhas por segmento ---------- */
function desenharTurmas() {
  const base = filtrar({ ignorarTurma: true });
  el.turmas.innerHTML = SEGMENTOS.map((seg) => `
    <div class="segmento" style="--n:${seg.turmas.length}">
      <h3 class="segmento__nome">${seg.nome}</h3>
      <div class="circuito-filtro" role="radiogroup" aria-label="${seg.nome}">
        ${seg.turmas.map((t) => {
          const qtd = base.filter((r) => turmasDe(r).some((x) => x.id === t.id)).length;
          return `
          <button type="button" class="no-filtro" role="radio" aria-checked="${estado.turma === t.id}"
                  data-turma="${t.id}" style="--cor:${t.cor}">
            <span class="no-filtro__ponto" aria-hidden="true"></span>
            <span class="no-filtro__nome">${t.nome}</span>
            <span class="no-filtro__qtd">${qtd} ${qtd === 1 ? "recurso" : "recursos"}</span>
          </button>`;
        }).join("")}
      </div>
    </div>`).join("");
  el.verTodas.hidden = estado.turma === "todas";
}

/* ---------- Cartões ---------- */
function cartao(r) {
  const turmas = turmasDe(r);
  /* A cor do cartão acompanha a turma selecionada; sem seleção, usa a primeira turma do recurso */
  const cor = (turmas.find((t) => t.id === estado.turma) || turmas[0])?.cor || "#1677C8";
  const detalhes = [
    r.duracao && `<dt>Duração</dt><dd>${esc(r.duracao)}</dd>`,
    r.bncc?.length && `<dt>BNCC</dt><dd class="codigo">${r.bncc.map(esc).join(", ")}</dd>`
  ].filter(Boolean).join("");

  return `
    <article class="recurso" style="--cor:${cor}">
      <div class="recurso__meta">
        ${TIPOS[r.tipo] ? `<span class="selo">${TIPOS[r.tipo]}</span>` : ""}
        ${ehNovo(r.data) ? '<span class="selo selo--novo">Novo</span>' : ""}
      </div>
      <h3>${esc(r.titulo)}</h3>
      <p class="recurso__turmas">${turmas.map((t) => esc(t.nome)).join(", ")}</p>
      <p>${esc(r.descricao)}</p>
      ${detalhes ? `<dl class="recurso__detalhes">${detalhes}</dl>` : ""}
      ${r.etiquetas?.length ? `<ul class="etiquetas">${r.etiquetas.map((e) => `<li>${esc(e)}</li>`).join("")}</ul>` : ""}
      <div class="recurso__acoes">
        <a class="botao" href="${esc(r.link)}"${ehExterno(r.link)}>Abrir recurso</a>
        ${r.extra ? `<a class="botao botao--secundario" href="${esc(r.extra.link)}"${ehExterno(r.extra.link)}>${esc(r.extra.rotulo)}</a>` : ""}
      </div>
      <small class="recurso__data">Publicado em ${formatarData(r.data)}${r.autor ? ` por ${esc(r.autor)}` : ""}</small>
    </article>`;
}

function desenharGrade() {
  const lista = filtrar().sort((a, b) => b.data.localeCompare(a.data));
  el.grade.innerHTML = lista.map(cartao).join("");
  el.contagem.textContent = lista.length
    ? `${lista.length} ${lista.length === 1 ? "recurso encontrado" : "recursos encontrados"}` : "";

  el.vazio.hidden = lista.length > 0;
  if (!lista.length) {
    const turma = turmaPorId(estado.turma);
    el.vazio.innerHTML = estado.busca
      ? `<h3>Nenhum recurso encontrado para "${esc(estado.busca)}".</h3>
         <p>Tente outra palavra ou veja todas as turmas.</p>`
      : `<h3>${turma ? esc(turma.nome) + ": em breve." : "Os primeiros recursos estão sendo preparados."}</h3>
         <p>Novos materiais aparecerão aqui assim que forem publicados.</p>`;
  }
}

function atualizarEndereco() {
  const p = new URLSearchParams();
  if (estado.turma !== "todas") p.set("turma", estado.turma);
  if (estado.busca) p.set("busca", estado.busca);
  const qs = p.toString();
  history.replaceState(null, "", qs ? `?${qs}` : location.pathname);
}

function atualizar() {
  desenharTurmas();
  desenharGrade();
  atualizarEndereco();
}

/* ---------- Eventos ---------- */
el.turmas.addEventListener("click", (e) => {
  const b = e.target.closest("[data-turma]");
  if (!b) return;
  /* Clicar de novo na turma ativa volta a mostrar todas */
  estado.turma = estado.turma === b.dataset.turma ? "todas" : b.dataset.turma;
  atualizar();
  el.turmas.querySelector(`[data-turma="${b.dataset.turma}"]`)?.focus();
});

el.verTodas.addEventListener("click", () => {
  estado.turma = "todas";
  atualizar();
});

let espera;
el.busca.addEventListener("input", () => {
  clearTimeout(espera);
  espera = setTimeout(() => { estado.busca = el.busca.value.trim(); atualizar(); }, 180);
});

/* ---------- Início ---------- */
if (typeof RECURSOS === "undefined") {
  el.grade.innerHTML = "<p>O arquivo recursos.js não foi carregado. Verifique vírgulas e aspas no último recurso adicionado.</p>";
} else {
  el.busca.value = estado.busca;
  atualizar();
}
