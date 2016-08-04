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

1. `git clone https://github.com/tray-tecnologia/opencode-workflow.git`
2. `cd opencode-workflow`
3. `npm install`

## Configuração/Uso

Configure a loja que você vai trabalhar:

1. `mkdir opencode.commercesuite.com.br`
2. `cd opencode.commercesuite.com.br`
3. `opencode configure API_KEY PASSWORD THEME_ID` (veja a Obs: logo abaixo)
4. `opencode download`

**Obs:** API_KEY e PASSWORD são chaves individuais que o desenvolvedor deve solicitar ao lojista.<br>
Essas chaves que estão na documentação são da loja de teste: https://opencode.commercesuite.com.br.<br>
Se quiser poderá utilizar essa loja com as seguintes credenciais:<br>
`opencode configure 20a699301d454509691f3ea02c1cba4b ea0727075e1639a42fd966a2f6e67abc 1`

Após baixar todos os arquivos, volte para a pasta que contém o gulpfile.js e rode esse comando:

`gulp --folder opencode.commercesuite.com.br`

Pronto, comece a editar seus arquivos e você verá o `gulp` e o `opencode` trabalhando por você!

## Estrutura de pastas

Para que o `gulp` funcione corretamente, precisará existir essa estrutura de pastas:

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
        outraloja.com.br/
            css/
            js/
            img/
            layouts/
            pages/
            config.yml
        gulpfile.js
