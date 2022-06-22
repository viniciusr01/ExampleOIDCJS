const express = require ('express');
const router = express.Router();
const info_login = require('./login');
const client = require ('./config-oidc.js');
const { TokenSet } = require('openid-client');
const { code_verifier } = require('./login');




//PARTE TESTE DE COOKIES    

const Cookies = require ("universal-cookie");
const { authorizationUrl } = require('./config-oidc.js');
const cookies = new Cookies ();
const cookiesUserInfo = new Cookies ();

function saveCookie (token) {
    console.log('To no savecookie');
    console.log(token);
    cookies.set("TOKEN", token, {path: "/"});
    cookies.set("ACCESS_TOKEN", token.access_token, {path: '/',});
    cookies.set("ID_TOKEN", token.id_token, {path: '/'});
    cookies.set("SESSION_STATE", token.session_state, {path: '/'});
    cookies.set("TOKEN_TYPE", token.token_type, {path: '/'});
}


function saveCookieUserInfo (userinfo){

    //Transformar string dos Roles em Array
    const roles = userinfo.groups.split(",");
    console.log("As roles sao: ", roles);
   

    console.log("O que recebi no SaveCookisUserInfo: ", userinfo);
    cookiesUserInfo.set("NOME", userinfo.name, {path: '/'});
    cookiesUserInfo.set("NICKNAME", userinfo.sub, {path: '/'});
    cookiesUserInfo.set("EMAIL", userinfo.email, {path: '/'});
    cookiesUserInfo.set("ROLES", roles, {path: '/'});
    
}

function getAllCookies(){
    return cookies.getAll();
}

function getAllCookiesUserInfo(){
    return cookiesUserInfo.getAll();
}

//FIM DA PARTE TESTE DE COOKIES



//Atenção, está sendo utilizado para ignorar a verifiação de certificado
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;


router.use('/callbackdados', (req, res) =>{
    const params = client.callbackParams(req);

    client.callback('http://localhost:5000/callbackdados/', params, {code_verifier})
    .then(function (tokenSet) {
        console.log('received and validated tokens %j', tokenSet); //Imprime as informações do TokenSet
        console.log('validated ID Token claims %j', tokenSet.claims());  //Imprime as Claims do usuário

        
        saveCookie (tokenSet); // Salvando as informações do token em cookies

        //Solicitando as User Info do usuário 
        client.userinfo(tokenSet.access_token)
        .then (function (userinfo){
            console.log("userinfo %j", userinfo);  //Imprime as User Info do Usuário
            saveCookieUserInfo(userinfo);          //Salva em cookie as User Info
        })
        
     

        

        if (tokenSet.access_token){ //Verifica se recebeu um token de acesso

            if(tokenSet.claims().acr == "acr2"){  //Se receber o ACR2 vai para a página de Receita
                res.redirect('http://localhost:3000/receita');
            }
            else
                res.redirect('http://localhost:3000/login');
        }
        

        else{
        res.redirect('http://localhost:3000');
        }
    });

   

})


router.get('/token', (req, res) => {

    const token = getAllCookies();        
    res.send(token);
  
})



router.get('/infouser', (req, res) => {

    const userinfo = getAllCookiesUserInfo();        
    res.send(userinfo);
  
  
})







//TESTE AUTORIZAÇÃO

const axios = require ('axios');






router.get ('/autorizacao', (req, res) => {

const infoUser = getAllCookiesUserInfo();
//res.send("TA TUDO OK");
console.log("TO AUTORIZANDO TUDO AGORA");
console.log("INFOS: ", infoUser);
const token = getAllCookies();


bodyAuthorizacao = {
    
    "Request": {

        "Action":{
            "Attribute": [
                {
                    "AttributeId": "action-id",
                    "Value": "read"
                }
            ]
        },


        "Resource":{
            "Attribute":[
                {
                    "AttributeId": "resource-id",
                    "Value": "Licitacao"
                }
            ]
        },
     

         "AccessSubject":{
            "Attribute": [
                {
                    "AttributeId": "subject-id",
                    "Value": "vinicius"
                }
            ]
        }
    }

}



    const options = {
        method: 'POST',
        headers: {'Authorization': 'Bearer '+token.ACCESS_TOKEN,
                'Content-Type': 'application/json'
                },
        data: bodyAuthorizacao,
        url: 'https://localhost:9443/api/identity/entitlement/decision/pdp'
    }

    axios(options).then(resposta => {
        console.log('Resposta XACML WSO2: ', resposta.data.Response[0].Decision);
    })

    res.send(resposta.data.Response[0].Decision);

})

//FIM DO TESTE AUTORIZAÇÃO





module.exports = router;

