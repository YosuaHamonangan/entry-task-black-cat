import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useAppSelector } from './app/hooks';
import Home from './page/Home';
import Login from './page/Login';
import Event from './page/Event/index';
import User from './page/User/index';
import Page404 from './page/404';
import { selectCurrentUser } from './reducer/user';

function App() {
  const user = useAppSelector(selectCurrentUser);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          {!user && <Redirect to="/login" />}
          <Route path="/event/:id" component={Event} />
          <Route path="/user/:id" component={User} />
          <Route path="/" exact component={Home} />
          <Route path="*" component={Page404} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
