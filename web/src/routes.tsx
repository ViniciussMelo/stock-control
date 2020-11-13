import React from "react";
import { Router, Switch, Route } from 'react-router-dom';
import {createBrowserHistory} from "history";

import Navbar from "./components/Navbar/Navbar";
import Products from "./pages/Products";
import Stocks from "./pages/Stocks";
import Moviments from "./pages/Moviments";

const history = createBrowserHistory();

const Routes = () => {
    return (
        <Router history={history}>
            <Navbar />
            <Switch>
                <Route path="/products" component={Products} />
                <Route path="/stocks" component={Stocks} />
                <Route path="/moviments" component={Moviments} />
            </Switch>
        </Router>
    )
}

export default Routes;