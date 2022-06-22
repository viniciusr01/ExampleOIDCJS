import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './pages/Home'
import Logado from './pages/Autenticado'
import Receita from './pages/Receita'



const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
    
                <Route exact path ="/" component={Home}/>
    
                <Route path ="/login/" component={Logado}/> 

                <Route path ="/Receita" component={Receita}/> 
    
            </Switch>
        </BrowserRouter>
    );
    };
    
export default Routes;
