import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './page/Home';
import Login from './page/Login';
import Event from './page/Event';
import Page404 from './page/404';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/event/:id">
            <Event />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
