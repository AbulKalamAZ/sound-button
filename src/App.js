import React from 'react';
import './App.css';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Home from './pages/home/Home';
import Buttons from './pages/buttons/Buttons';
import New from './pages/new/New';

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/buttons" component={Buttons} />
          <Route path="/new-button" component={New} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
