
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
"<!DOCTYPE html>"+
"\n<html lang='pt-br'>"+
"\n<head>"+
"\n   <meta charset='UTF-8'>"+
"\n   <meta name='viewport' content='width=device-width, initial-scale=1.0'>"+
"\n   <meta http-equiv='X-UA-Compatible' content='ie=edge'>"+
"\n   <title> Index </title>"+
"\n</head>"+
"\n<body>"+
"\n    "+
"\n</body>"+
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
    let cursor = editor.getCursor();
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

function renderizar(){
    const codigo = editor.getValue();
    fs.writeFileSync('../../../codigo.html',codigo);
    console.log(codigo);
}