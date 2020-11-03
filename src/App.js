import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/home/Home';
import SoundButton from './pages/soundButton/SoundButton';
import CreateButton from './pages/createButton/CreateButton';
import Frame from './pages/frame/Frame';
import NewButtonModal from './components/modal/NewButtonModal';

function App() {
    return (
        <Router>
            <div className="app">
                <NewButtonModal />

                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/create-button" component={CreateButton} />
                    <Route path="/button/:id" component={SoundButton} />
                    <Route path="/frame/:id" component={Frame} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
