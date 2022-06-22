import React from 'react';
//import logos from "./Logos.png";
import axios from 'axios';





//Função que solicita a url de login e abre a URL.
function login () {


    axios
    .get('/login')
    .then(url_login => {
      console.log(url_login);
      window.location.href = url_login.data //Abre no brwoser a URL de login recebida.
    })


  }
  



  class Home extends React.Component {

    
    render (){
    return (
        <div className = 'App-header'>
          <header className = 'bloco'>
        
            <div className ='texto'>

              <h2> Prototipo de </h2>
              <h2> Confiança </h2>
              <h2> Zero </h2>
              <button
              className = "button-login"
              onClick = {login}
              >
                Login
             </button>

             
            </div>
            <div className = "Position-image">
              
          </div>
          </header>
          
        </div>
      );
    }


  };

export default Home;