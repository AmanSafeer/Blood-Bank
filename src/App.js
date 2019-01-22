import React, { Component } from 'react';
import {BrowserRouter as Router, Route,Link} from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/home'
import Profile from './pages/profile'
import Bloods from './pages/bloods'

import './App.css';

class App extends Component {
  render() {
    return (
        <Router>
          <div >
            
            <Route exact path="/" component={Login} />
            <Route exact path="/home" component={Home}/>
            <Route exact path="/bloods" component={Bloods}/> 
            <Route exact path="/profile" component={Profile}/> 
          </div>
        </Router>
      
    );
  }
}

export default App; 
