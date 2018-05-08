import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Home from './Home';
import Nav from './layout/Nav';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Footer from './layout/Footer';
import Profile from './Profile';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="container">
            <Nav />
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/profile" component={Profile} />
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
