let iframe = document.getElementById('render');
let iframedoc = iframe.contentDocument || iframe.contentWindow.document;

function getCodigo(dados, callback) {
    return callback(dados);
}

async function renderizar() {
    const codigo = await getCodigo(editor.getValue(), (codigo) => {
        return codigo;
    });
    await (async(codigo) => {
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
    })(codigo).catch((err) => {
        console.log(err)
    })
}