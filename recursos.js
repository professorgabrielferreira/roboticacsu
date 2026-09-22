/* =========================================================
   CATÁLOGO DE RECURSOS
   Este é o único arquivo que você precisa editar para publicar
   um novo material. Copie um bloco { ... }, cole no início da
   lista, altere os campos e salve.

   CAMPOS
   titulo     (obrigatório) nome do recurso
   descricao  (obrigatório) uma ou duas frases sobre o recurso
   turma      (obrigatório) uma turma ou uma lista de turmas:
                            Anos Iniciais: "exploradores" | "construtores" | "inovadores"
                            Anos Finais:   "descobridores" | "criadores" | "inventores" | "olimpica"
                            ex.: turma: "criadores"
                            ex.: turma: ["exploradores", "construtores"]
   tipo       (obrigatório) "plano" | "atividade" | "apostila" | "projeto"
                            | "codigo" | "video" | "rubrica" | "apresentacao"
   link       (obrigatório) nome do arquivo enviado (ex.: "sensor-de-luz.pdf") ou endereço externo
   data       (obrigatório) data de publicação no formato "AAAA-MM-DD"
   duracao    (opcional)    ex.: "2 aulas de 50 min"
   bncc       (opcional)    lista de códigos de habilidades da BNCC
   etiquetas  (opcional)    lista de palavras-chave para a busca
   autor      (opcional)    professor(a) responsável, aparece no cartão
   id         (automático)  criado pela Área da equipe; não altere
   extra      (opcional)    { rotulo: "Ver código", link: "..." } segundo botão

   Recursos publicados há menos de 30 dias recebem o selo "Novo".
   Atenção às vírgulas entre os blocos e às aspas nos textos.
   ========================================================= */

/* MODELO PARA COPIAR (apague as barras e asteriscos ao usar)

  {
    titulo: "Nome do recurso",
    descricao: "Uma ou duas frases explicando o que é e para que serve.",
    turma: "criadores",
    tipo: "atividade",
    link: "nome-do-arquivo.pdf",
    data: "2026-09-25",
    duracao: "2 aulas de 50 min",
    etiquetas: ["Arduino", "Sensores"]
  },

*/

const RECURSOS = [
  {
    titulo: "A Roda dos Segredos: Cifra de César",
    descricao: "Atividade interativa em que as crianças giram um disco de letras para descobrir como Júlio César escondia mensagens e escrevem seus próprios recados secretos. Inclui o Desafio do Mensageiro, com 50 mensagens para decifrar.",
    turma: ["exploradores", "construtores", "inovadores"],
    tipo: "atividade",
    link: "cifra-roda.html",
    data: "2026-09-22",
    duracao: "1 a 2 aulas",
    etiquetas: ["Criptografia", "Cifra de César", "Segurança de dados", "Roma Antiga", "Interativo"],
    extra: { rotulo: "Desafio do Mensageiro", link: "cifra-desafio.html" }
  },
];
