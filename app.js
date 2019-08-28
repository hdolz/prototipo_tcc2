/*Protótipo de aplição referente ao TCC 2 - Ferramenta WEB para desenvolvimento
de páginas front-end de websites*/
//Imports
const express = require('express');
const exphbs = require('express-handlebars');
const script = require('./files/assets/js/testejs.js');
const fs = require('fs');
const dotenv = require('dotenv');
/*=========================================================*/
//Constantes
const naoEncontrado = 404;
dotenv.config();

/** Instância do módulo express */
const app = express();
const porta = process.env.PORT || 5000;

/** Express-handlebars middleware */
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

/** Arquivos staticos */
app.use(express.static('files'));

/** Em caso de rotas não existentes */

// app.use((err, req, res, next) => {
//     if (err.status === naoEncontrado) {
//         return res.status(404).render('notfound',{
//             estilo: 'css/style.css'
//         });
//     }
//     next();
// });

/* Endpoints */
app.get('/', (req, res) => {
    res.render('index',{
        icon: 'assets/images/favicon.ico',
        googleFont: 'https://fonts.googleapis.com/css?family=Open+Sans:400,600',
        bootstrap: 'bower_components/bootstrap/css/bootstrap.min.css',
        feather: 'assets/icon/feather/css/feather.css',
        style: 'assets/css/style.css',
        customScrollBar: 'assets/css/jquery.mCustomScrollbar.css',
        logo: 'assets/images/logo.png'
    });
});

app.get('/render',(req,res)=>{
    res.redirect('/');
});

/* Rodar servidor */
app.listen(porta, () => {
    console.log(` > Servidor ouvindo na porta ${porta}`);
});