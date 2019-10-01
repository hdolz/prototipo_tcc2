let editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    mode: 'text/html',
    theme: 'dracula',
    lineNumbers: true,
    autoCloseTags: true,
    matchTags: { bothTags: true },
    indentUnit: 4,
    fontSize: 24,
    lineWrapping: true
});



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
    "\n   <form>" +
    "\n        <label>Nome</label>" +
    "\n        <input type='text'>" +
    "\n        <input type='submit'>" +
    "\n   </form>" +
    "\n</body>" +
    "\n</html>");

editor.setSize("100%", "100%");
editor.focus();
editor.setCursor({ line: 9, ch: 4 });


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