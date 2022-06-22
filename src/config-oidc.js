/************************************************************************************
 *                CONFIGURAÇÕES CONFORME A BIBLIOTECA OPENID-CLIENT                 *
 *                                                                                  *
 * Library: https://github.com/panva/node-openid-client/blob/master/docs/README.md  *
 *                                                                                  *          
 ************************************************************************************/

const { Issuer } = require('openid-client');


//URLS que são referentes ao Servidor de Autorização, neste caso o WSO2 
config_issuer = {
    issuer: "https://localhost:9443/",
    authorization_endpoint:"https://localhost:9443/oauth2/authorize",
    token_endpoint:"https://localhost:9443/oauth2/token",
    jwks_uri: "https://localhost:9443/oauth2/jwks",
    userinfo_endpoint: "https://localhost:9443/oauth2/userinfo",
    revocation_endpoint: "https://localhost:9443/oauth2/revoke",
    introspection_endpoint: "https://localhost:9443/oauth2/introspect",
    end_session_endpoint: "https://localhost:9443/oidc/logout",
}


//Criação de um novo servidor de autorização
var Wso2_config = new Issuer (config_issuer);

//
const client = new Wso2_config.Client({
    client_id: 'TkxPe4Uxe3lqSmA8N4sXuyC9u2oa',
    client_secret: 'YCYXlZvcubgtD9xI767CL8pKvKka',
    redirect_uris: ['http://localhost:5000/callbackdados/'],
    response_types: ['code'],
  });

//Exportando o client criado
module.exports = client;