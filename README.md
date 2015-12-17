# Tray OpenCode Workflow

O Tray OpenCode Workflow é um conjunto de ferramentas frontend que agiliza a criação de layouts.

**Ferramentas configuradas:**
* CSS
  * SASS
  * LESS
  * STYLUS
* JS
  * Modularização de arquivos
  * Uglify
* BrowserSync

## Instalação
Pré-requisitos: NodeJS e NPM

1. `git clone git@github.com:tray-tecnologia/opencode-workflow.git`
2. `cd opencode-workflow`
3. `npm install -g gulp`
4. `npm install`

## Configuração/Uso OpenCode GEM
Pré-requisito: `gem install opencode_theme`

1. `mkdir opencode.commercesuite.com.br`
2. `cd opencode.commercesuite.com.br`
3. `opencode configure 11451c354c1f95fe60f80d7672bf184a 14ae838d9e971465af45b35803b8f0a4 3`
4. `opencode download`
5. `opencode watch`

## Configuração/Uso OpenCode Workflow

1. `cd /path/to/opencode-workflow`
2. `gulp --folder opencode.commercesuite.com.br`

## Estrutura de pastas

Para que o task runner funcione corretamente, precisará existir essa estrutura de pastas:

    opencode-workflow/
        opencode.commercesuite.com.br/
            css/
            js/
            img/
            layouts/
            pages/
            config.yml
        lojademo.commercesuite.com.br/
            css/
            js/
            img/
            layouts/
            pages/
            config.yml
        gulpfile.js
