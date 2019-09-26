
let editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    mode: 'text/html',
    theme: 'dracula',
    lineNumbers: true,
    autoCloseTags: true,
    matchTags: { bothTags: true },
    indentUnit: 4
});

editor.setValue("<h1> Este é um H1 </h1>\nsasadasdsa\nsadsadsads\nadsasadsada\nsdsad\nasdadas\ndsadasdasdasdasdsadasdsad");

editor.setValue(
    "<!DOCTYPE html>" +
    "\n<html lang='pt-br'>" +
    "\n<head>" +
    "\n   <meta charset='UTF-8'>" +
    "\n   <meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
    "\n   <meta http-equiv='X-UA-Compatible' content='ie=edge'>" +
    "\n   <title> Index </title>" +
    "\n</head>" +
    "\n<body>" +
    "\n    " +
    "\n</body>" +
    "\n</html>");

editor.focus();
editor.setCursor({ line: 9, ch: 4 });

//essa função vai receber um objeto e passa-lo para o editor de
//texto, formatado 
function parseText(objeto) {
    //todo
}

//redefine posição do cursor para linha determinada
function irLinha() {
    let linha = document.getElementById("entradaLinha").value;
    if (linha <= editor.lineCount() && linha > 0) {
        editor.focus();
        let lineSize = editor.getLine(linha - 1).length;
        let pos = {
            line: linha - 1,
            ch: lineSize
        }
        editor.setCursor(pos);
        editor.focus();
        console.log('Foi para linha', linha);
    } else {
        console.log('Linha inválida');
    }

}

//identa a linha onde está o cursor
function identar() {
    editor.focus();
    let cursor = editor.getCursor();
    if (editor.getLine(cursor.line).length > 0) {
        editor.indentLine(cursor.line, "add");
    } else {
        let pos = {
            line: cursor.line,
            ch: 4
        }
        editor.replaceRange("    ", pos);
        editor.focus();
    }

    console.log('Identou');
}

//insere nova linha a partir da posição atual do cursor
function insertNewLine() {
    editor.focus();
    let cursor = editor.getCursor();
    let pos = {
        line: cursor.line + 1,
        ch: 0
    }
    editor.replaceRange("\n", pos);
    editor.setCursor(pos);
}


//insere linha no final do editor
function insertLastLine() {
    editor.focus();
    editor.setCursor(editor.lineCount(), 0);
    let cursor = editor.getCursor();
    let pos = {
        line: cursor.line,
        ch: cursor.ch
    }
    editor.replaceRange("\n", pos);
}

//insere texto no editor para testes
//na posição do cursor em questão 
function inseriu() {
    let entrada = document.getElementById("entrada").value;
    let cursor = editor.getCursor();
    let pos = {
        line: cursor.line,
        ch: cursor.ch
    }
    editor.replaceRange(entrada, pos);
    editor.focus();
}

//define cursor na posição final do editor
function goToFinal() {
    let pos = {
        line: editor.lineCount(),
        ch: 0
    }
    editor.setCursor(pos);
    editor.focus();
}

/* Primeiro dia de desenvolvimento 
4h - Primeiras manipulações da API do editor de texto CodeMirror
Foi criado um arquivo html básico, com um editor de codigo básico
para testar funcionalidades da API do codeMirror.
Nesse periodo foram desenvolvidas 6 funções básicas, dentre elas
 - função para ir a determinada linha do editor
 - função para identar a linha em questão
 - função para inserir nova linha em relação a posição do cursor
 - função para inserir nova linha no final do editor
 - função para colocar cursor na posição final do editor
*/

/*Segundo dia de desenvolvimento
8h - Base do frontend feita com base em template de dashboard em html Adminty
Foi aptado um dashboard em html5 puro, com js e css, do repositorio no github de jovipac
Vale lembrar que o projeto inicial do adminty é do ColorLib.
Isso tudo em meio a um servidor node, com framework express, utilizando handlebars
Integrado tbm os testes anteriores feitos com o codemirror
    Problemas a serem resolvidos:
    O codemirror, de modo geral, foi feito pra rodar no lado cliente, logo ha algumas dificuldades
    em integra-lo com a API rest feita no express. Com o arquivo js estático que manipula o editor do 
    code mirror, consegue-se pegar o valor (codigo) presente nele, porem fica dificil acessar esse dado
    para repassar para a API devolver um tratamento na requisição, dai 2 coisas surgem:
        - Acessar a renderização por meio de JavaScript puro, estatico
        - Acessar a renderização por meio da API rest?
        (resolver esse problema)
    
        Outra coisa é aprender a converter o arquivo de texto HTML em JSON e vice versa. isso vai permitir
        o repasse para o editor na hora de renderizar, alem de permitir salvar o arquivo no banco de dados
        de acordo com o usuário, alem de tbm servir para fazer a conversão dos blocos de códigos
        correspondentes aos comandos de voz provindos do módulo de reconhemento de voz.
*/

let iframe = document.getElementById('render');
let iframedoc = iframe.contentDocument || iframe.contentWindow.document;

function getCodigo(dados,callback){
    return callback(dados);
}

async function renderizar() {
    const codigo = await getCodigo(editor.getValue(),(codigo)=>{
        return codigo;
    });
    console.log('agr vai entrar na que envia');
    await (async (codigo) => {
        const url = '/renderizar';
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ dados: codigo })
        };
        const rawResponse = await fetch(url, config);
        iframedoc.body.innerHTML = await rawResponse.text();
    })(codigo).catch((err)=>{
        console.log(err)
    })
}

//funções testes para renderização

// document.getElementById('request').addEventListener('click', () => {
//     const url = 'http://127.0.0.1:5000/teste';
//     (async () => {
//         const rawResponse = await fetch(url);
//         iframedoc.body.innerHTML = await rawResponse.text();
//     })()
// });

// function getData(callback) {
//     let dados = document.getElementById('entrada').value;
//     callback(dados);
// }


//limitações
// - Melhorar a forma de recuperar o valor presente no editor de codigo
// -> editor.getValue() não é eficiente para processos assincrono
//resolvido

/*
terceiro dia - 5h
testes para funcionalidade de enviar requisições postes do front
com os dados presentes no editor de codigo
para retornar do servidor e ser renderizado no iframe

quarto dia - 4h
Função base para renderização de resultado

*/
