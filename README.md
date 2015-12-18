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
* Image minification

## Instalação
Pré-requisitos: NodeJS e NPM

1. `git clone git@github.com:tray-tecnologia/opencode-workflow.git`
2. `cd opencode-workflow`
3. `npm install`

## Configuração/Uso OpenCode GEM
Pré-requisito: `gem install opencode_theme`

1. `mkdir opencode.commercesuite.com.br`
2. `cd opencode.commercesuite.com.br`
3. `opencode configure 11451c354c1f95fe60f80d7672bf184a 14ae838d9e971465af45b35803b8f0a4 3` ou utilize suas credenciais: <br>
   `opencode configure API_KEY PASSWORD THEME_ID`
4. `opencode download`

**Obs:** API_KEY e PASSWORD são chaves individuais que o desenvolvedor deve solicitar ao lojista.<br>
Essas chaves que estão na documentação são da loja de teste.

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
