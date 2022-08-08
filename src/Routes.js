import React, { Component } from 'react';


import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

import Register from './Containers/Register/Register'
import Login from './Containers/Login/Login';
import Home from './Containers/Home/Home';
import Portfolio from './Containers/Portfolios/Portfolio';
import EditPortfolio from './Containers/Portfolios/EditPortfolio';

export class Routes extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/register">
                        <Register/>
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/profile">
                        <Portfolio/>
                    </Route>
                    <Route path="/editprofile">
                        <EditPortfolio/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default Routes
