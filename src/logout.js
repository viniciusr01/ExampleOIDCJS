const express = require ('express');
const router = express.Router();
const client = require ('./config-oidc.js');


//parte teste cookies
const Cookies = require ("universal-cookie");
const cookies = new Cookies ();
const cookiesUserInfo = new Cookies ();


function removeCookie (){
  cookies.remove("ACCESS_TOKEN", {path: '/',});
  cookies.remove("ID_TOKEN", {path: '/'});
  cookies.remove("SESSION_STATE", {path: '/'});
  cookies.remove("TOKEN_TYPE", {path: '/'});
 }


function removeCookieUserInfo (){
  cookiesUserInfo.remove("NOME", {path: '/'});
  cookiesUserInfo.remove("EMAIL", {path: '/'});
  cookiesUserInfo.remove("ROLES", {path: '/'});

}
//fim do teste cookies


//Rota que realiza o logout
router.post('/logout', (req, res) => {

    removeCookieUserInfo();
    removeCookie();

    //Coletando o idToken e State enviando pelo client
    const idToken = req.body.idToken;
    const state = req.body.state;

    //Criando a URL de logout
    const url_logout = client.endSessionUrl ({
      idToken,
      post_logout_redirect_uri: 'https://www.google.com/',
      state,
    })

    //Enviando a URL de logout
    console.log('URL DE LOGOUT ENVIADA')
    res.send(url_logout);



  })
  



module.exports = router; 