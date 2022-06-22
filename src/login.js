const express = require ('express');
const router = express.Router();


const client = require ('./config-oidc.js');


const {generators} = require('openid-client');
const code_verifier = generators.codeVerifier();
const code_challenge = generators.codeChallenge(code_verifier);


//usando os cookies
const Cookies = require ("universal-cookie");
const cookies = new Cookies ();


function getAllCookies(){
    return cookies.getAll();
}


//fim do uso de cookies




//Gera a URL de Login, o modo usado é o implicito.
const url_login = client.authorizationUrl({
    scope: "openid internal_manage_pep profile email",
    acr_values: 'acr1',
    //state: "http:\\oi.com",
    code_challenge,
    code_challenge_method: 'S256',
});


//Rota que efetua o Login
router.get('/login', (req, res) => {

    console.log(url_login);
    res.send(url_login);
    console.log("URL DE LOGIN ENVIADA");
})





const url_login2 = client.authorizationUrl({
    scope: "openid profile ",
    acr_values: 'acr2',
    //state: "http:\\fui.com",
    code_challenge,
    code_challenge_method: 'S256',
});


router.get('/login2', (req, res) => {


    console.log('A URL 2 DE LOGIE E: ', url_login2);
    res.send(url_login2);
    console.log("URL DE LOGIN 2 ENVIADA");
    
})



const info_login = {
    url_login: url_login,
    code_verifier: code_verifier,
    router: router,
}

module.exports = info_login;
