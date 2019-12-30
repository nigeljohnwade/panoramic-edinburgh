import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";
import CreateResource from './components/pages/CreateResource';


const Routes = () =>{
    return(
        <Router>
            <Route path='/'>
                <header className="header">
                    <Link
                        className="link"
                        to="/"
                    >
                        Home
                    </Link>
                    <Link
                        className="link"
                        to="/create-resource"
                    >
                        New Resource
                    </Link>
                </header>
            </Route>
            <Route path='/create-resource'>
                <CreateResource/>
            </Route>
        </Router>
    )
};

export default Routes;