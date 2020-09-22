import React from 'react';
import './App.css';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Home from './pages/home/Home';
import Buttons from './pages/buttons/Buttons';
import New from './pages/new/New';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/buttons">
            <Buttons />
          </Route>
          <Route exact path="/new-button">
            <New />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
      
      
    </div>
  );
}

export default App;
