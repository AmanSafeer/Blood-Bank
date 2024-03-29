import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/home'
import Profile from './pages/profile'
import Bloods from './pages/bloods'
import Notifications from './pages/notifications'
import './App.css';


class App extends Component {
  render() {
    return (
        <Router>
            <div>   
              <Route exact path="/" component={Login} />
              <Route exact path="/home" component={Home}/>
              <Route exact path="/donors" component={Bloods}/> 
              <Route exact path="/profile" component={Profile}/> 
              <Route exact path="/requests" component={Notifications}/>
          </div>
        </Router>
      
    );
  }
}

export default App; 
