import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Map from './pages/map';
import Login from './pages/login';
import Signup from './pages/signup';
import { loadUserRequest } from './store/actions/authActions';
import store from './store/store';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import NotFound from './components/layout/NotFound';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {

    useEffect(() => {
        store.dispatch(loadUserRequest());
    }, [])

    return (
      <Router>
        <div className="App">
            <Switch>
                <PrivateRoute exact path='/' component={Map} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={Signup} />
                <Route component={NotFound} />
            </Switch>
        </div>
      </Router>
    );
}

export default App;
