const express = require ('express')
const bodyParser = require ('body-parser')


const port = process.env.PORT || 5000;

const app = express ();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//Login
const login = require ('./src/login');
app.use(login.router);


//Logout
const logout = require ('./src/logout');
app.use(logout);



/* COLETA DE DADOS */
const dados = require('./src/dados');
app.use(dados);

/*
// Autorização 
const autorizacao = require('./src/autorizacao');
app.use(autorizacao);
*/



app.use(express.static(__dirname +'./client'))
app.listen(port, () => console.log(`Listening on port ${port}`));