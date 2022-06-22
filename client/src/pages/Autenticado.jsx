import React from 'react';
import axios from 'axios';
import {saveCookie, getCookie, removeCookie} from "../cookie/cookieSession";
import {saveCookieUserInfo, getCookieUserInfo, getAllCookieUserInfo, removeCookieUserInfo} from '../cookie/cookieUserInfo';



//Função de Logout
function logout() {
   
    
    //Coleta dos cookies o idToken e o sessionState
    const idtoken = getCookie('ID_TOKEN');
    const sessionState = getCookie('SESSION_STATE');
    

    //Rota que envia para o back-end o idToken e o sessionState
      axios
      .post('/logout', {
          idToken: idtoken,
          state: sessionState,
      })
      .then(function (url_logout){
          console.log(url_logout);
          removeCookie();
          removeCookieUserInfo();
          window.location.href = url_logout.data;
      })
      
    }



//Função pegar dados do usário do ID ToKen
function token () {
    axios
    .get('/token')
    .then(token_access => {
    console.log("OS DADOS DO TOKEN SAO: ", token_access.data)
    saveCookie(token_access.data); //Armazena os dados do token em cookie
    });

}


//Função que solicita as informações do usuário
function userinfo (){
    axios
    .get('/infouser')
    .then(infouser => {
    console.log("AS USER INFO SAO: ", infouser.data)
    saveCookieUserInfo(infouser.data); //Armazena as informações do usuário em cookie
    });

   
}



function Receita (){
var permition = 5;  

    const rolesCookie = getAllCookieUserInfo();

    console.log(rolesCookie.ROLES);
   for (var i=0; i < 10; i++){
    
        if(rolesCookie.ROLES[i] === "TEAM_TI" ){
            console.log("PERMITIDO ENTRAR");
            window.location.href = "http://localhost:3000/Receita"
            permition = 1;
        }
   }

console.log ("Number of permition: ", permition);

   if (permition === 5){

    axios
    .get('/login2')
    .then(url_login => {
      window.location.href = url_login.data //Abre no brwoser a URL de login recebida.
    })
   }

}




class Logado extends React.Component{
  
    
    
    render (){
        
        token();
        userinfo();
        


            
        return (
            <div className="Logado-header">
                <h2 className="Texto2" >Autenticação Realizada!</h2>
                <h2 className="Texto3"> Aplicação Exemplo</h2>

                <br></br>


<div>
                <button
                            className="botao"
                             onClick = {Receita}
                            >
                                Receita
                    </button>
               

                <button
                            className="botao"
                            
                            >
                                Despesas
                    </button>

                    <button
                            className="botao"
        
                            >
                                Licitações
                    </button>

                    
</div>

                <button
                            className="button-logout"
                             onClick = {logout}
                            >
                                Logout
                            </button>
                <br></br>


                <div >
                
                </div>
            </div>


        )


    }




}




export default Logado;