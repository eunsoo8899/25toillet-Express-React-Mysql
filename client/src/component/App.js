import React from 'react';
import './App.css'
import Header from './Header/Header'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// pages
import Home from './Home/Home'
import Signin from "./Users/Signin";
import Signup from "./Users/Signup";
import Account from './Account/Account';
import UsersPage from './Users/Users_page';
import Upload from './images/Upload/Upload';

function App() {
  return (
    <div className="app">
      
      <Router>
        <Header />        
        <Switch>
          <Route path='/' exact render={()=> <Home/>}/>
          <Route path='/users/signin' exact render={()=> <Signin/>}/>
          <Route path='/users/signup' exact render={()=> <Signup/>}/>
          <Route path='/account/:id' exact render={()=> <Account/>}/>
          <Route path='/upload/:id' exact render={()=> <Upload/>}/>
          <Route path='/users_page/:id' exact render={()=> <UsersPage/>}/>
          
        </Switch>        
      </Router>

      
    </div>
  );
}

export default App;
