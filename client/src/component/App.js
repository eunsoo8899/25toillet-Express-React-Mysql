import React from 'react';
import './App.css'
import Header from './Header/Header'
import { Helmet } from 'react-helmet'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// pages
import Home from './Home/Home'
import UsersPage from './Users/Users_page';

function App() {
  return (
    <div className="app">
      <Helmet>
        <title>25Toillet</title>
      </Helmet>
      
      <Router>
        <Header />        
        <Switch>
          <Route path='/' exact render={()=> <Home/>}/>
          <Route path='/users_page/:id' exact render={()=> <UsersPage/>}/>          
        </Switch>        
      </Router>

      
    </div>
  );
}

export default App;
