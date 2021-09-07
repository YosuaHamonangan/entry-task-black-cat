import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import Home from './page/Home';
import Login from './page/Login';
import Event from './page/Event/index';
import User from './page/User/index';
import Page404 from './page/404';
import { selectIsAuthenticated, tryRelogin } from './reducer/user';

function App() {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated === null) {
      dispatch(tryRelogin());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <div className="App">
      {isAuthenticated !== null && (
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            {!isAuthenticated && <Redirect to="/login" />}
            <Route path="/event/:id" component={Event} />
            <Route path="/user/:id" component={User} />
            <Route path="/" exact component={Home} />
            <Route path="*" component={Page404} />
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
