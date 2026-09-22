/* =========================================================
   CATÁLOGO DE RECURSOS
   Este é o único arquivo que você precisa editar para publicar
   um novo material. Copie um bloco { ... }, cole no início da
   lista, altere os campos e salve.

   CAMPOS
   titulo     (obrigatório) nome do recurso
   descricao  (obrigatório) uma ou duas frases sobre o recurso
   faixa      (obrigatório) "1-2" | "3-5" | "6-8" | "9-em" | "olimpica"
   tipo       (obrigatório) "plano" | "atividade" | "apostila" | "projeto"
                            | "codigo" | "video" | "rubrica" | "apresentacao"
   link       (obrigatório) caminho do arquivo em arquivos/ ou endereço externo
   data       (obrigatório) data de publicação no formato "AAAA-MM-DD"
   duracao    (opcional)    ex.: "2 aulas de 50 min"
   bncc       (opcional)    lista de códigos de habilidades da BNCC
   etiquetas  (opcional)    lista de palavras-chave para a busca
   extra      (opcional)    { rotulo: "Ver código", link: "..." } segundo botão

   Recursos publicados há menos de 30 dias recebem o selo "Novo".
   Atenção às vírgulas entre os blocos e às aspas nos textos.
   ========================================================= */

const RECURSOS = [
  {
    titulo: "Semáforo com Arduino",
    descricao: "Projeto guiado em que as equipes montam um semáforo com LEDs e programam a sequência de acendimento, explorando o conceito de algoritmo sequencial.",
    faixa: "6-8",
    tipo: "projeto",
    link: "arquivos/exemplo.pdf",
    data: "2026-09-18",
    duracao: "2 aulas de 50 min",
    etiquetas: ["Arduino", "LEDs", "Sequência", "Protoboard"],
    extra: { rotulo: "Ver código", link: "arquivos/exemplo.pdf" }
  },
  {
    titulo: "Robô de papel: comandos e direções",
    descricao: "Atividade desplugada em que as crianças conduzem um colega pelo tapete quadriculado usando cartões de setas.",
    faixa: "1-2",
    tipo: "atividade",
    link: "arquivos/exemplo.pdf",
    data: "2026-09-10",
    duracao: "1 aula",
    etiquetas: ["Computação desplugada", "Lateralidade", "Algoritmos"]
  },
  {
    titulo: "Primeiros passos no Scratch",
    descricao: "Apostila ilustrada para criar a primeira animação com eventos, movimento e repetição.",
    faixa: "3-5",
    tipo: "apostila",
    link: "arquivos/exemplo.pdf",
    data: "2026-08-28",
    etiquetas: ["Scratch", "Eventos", "Repetição"]
  },
  {
    titulo: "Sensor ultrassônico: medindo distâncias",
    descricao: "Plano de aula que relaciona física do som, leitura de sensores e estruturas condicionais em um robô que desvia de obstáculos.",
    faixa: "9-em",
    tipo: "plano",
    link: "arquivos/exemplo.pdf",
    data: "2026-08-15",
    duracao: "3 aulas de 50 min",
    etiquetas: ["Arduino", "Sensores", "Condicionais", "Física"]
  },
  {
    titulo: "Rubrica de avaliação de protótipos",
    descricao: "Critérios para avaliar funcionamento, documentação, colaboração e apresentação dos projetos de robótica.",
    faixa: "6-8",
    tipo: "rubrica",
    link: "arquivos/exemplo.pdf",
    data: "2026-07-30",
    etiquetas: ["Avaliação", "Projetos"]
  },
  {
    titulo: "Seguidor de linha: ajuste de parâmetros",
    descricao: "Roteiro de treino para a equipe olímpica calibrar sensores e ajustar a velocidade em pistas com curvas fechadas.",
    faixa: "olimpica",
    tipo: "codigo",
    link: "arquivos/exemplo.pdf",
    data: "2026-07-12",
    etiquetas: ["OBR", "Seguidor de linha", "Calibração"]
  }
];
