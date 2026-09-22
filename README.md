# Robótica & Programação

Repositório de recursos educacionais de Robótica e Programação, do 1º ano do Ensino Fundamental ao Ensino Médio.

## Estrutura

```
index.html          página principal
css/estilo.css      cores, fontes e layout
js/app.js           filtros, busca e cartões
dados/recursos.js   catálogo de recursos (edite este arquivo)
arquivos/           PDFs, apresentações e demais materiais
assets/             símbolo e imagens do site
```

## Como publicar um novo recurso

1. Coloque o material na pasta `arquivos/` (use nomes sem espaços nem acentos, por exemplo `sensor-ultrassonico.pdf`).
2. Abra `dados/recursos.js`, copie um bloco `{ ... }`, cole no início da lista e altere os campos.
3. Salve, faça o commit e envie:

```
git add .
git commit -m "Adiciona recurso: sensor ultrassônico"
git push
```

Em cerca de um minuto o site é atualizado.

## Links com filtros

É possível compartilhar a página já filtrada:

- `?etapa=3-5` mostra apenas o 3º ao 5º ano
- `?etapa=olimpica&tipo=codigo` mostra códigos da Equipe Olímpica
- `?busca=arduino` abre com a busca preenchida

Valores de `etapa`: `1-2`, `3-5`, `6-8`, `9-em`, `olimpica`.
Valores de `tipo`: `plano`, `atividade`, `apostila`, `projeto`, `codigo`, `video`, `rubrica`, `apresentacao`.
