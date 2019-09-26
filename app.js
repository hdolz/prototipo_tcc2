/*Protótipo de aplição referente ao TCC 2 - Ferramenta WEB para desenvolvimento
de páginas front-end de websites*/
//Imports
const express = require('express');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')

dotenv.config();

/** Instância do módulo express */
const app = express();
const porta = process.env.PORT || 5000;

/** Express-handlebars middleware */
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

/** Arquivos staticos */
app.use(express.static('files'));

//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/* Endpoints */
app.get('/', (req, res) => {
    res.render('index', {
        icon: 'assets/images/favicon.ico',
        googleFont: 'https://fonts.googleapis.com/css?family=Open+Sans:400,600',
        bootstrap: 'bower_components/bootstrap/css/bootstrap.min.css',
        feather: 'assets/icon/feather/css/feather.css',
        style: 'assets/css/style.css',
        customScrollBar: 'assets/css/jquery.mCustomScrollbar.css',
        logo: 'assets/images/logo.png'
    });
});

app.post('/renderizar', (req, res) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    console.log(req.body.dados);
    res.send(req.body.dados);
});

app.get('/teste', (req, res) => {
    res.send('ola');
});

/* Rodar servidor */
app.listen(porta, () => {
    console.log(` > Servidor ouvindo na porta ${porta}`);
});