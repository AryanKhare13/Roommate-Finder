import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Landing from './Components/Landing/Landing';
import FormPage from './Components/FormPage/FormPage';
import Dashboard from './Components/Dashboard/Dashboard';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Landing />
                </Route>
                <Route path="/signup">
                    <FormPage />
                </Route>
                <Route path="/dashboard">
                    <Dashboard />
                </Route>
                {/* <Route exact path="/verify">
            <VerifyPage />
          </Route>
          <Route exact path="/login">
            <UserLoginPage />
          </Route> */}
            </Switch>
        </Router>
    );
}

export default App;
