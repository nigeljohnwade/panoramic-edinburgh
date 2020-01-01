import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
} from "react-router-dom";
import CreateResource from './components/pages/CreateResource';
import ViewResources from './components/pages/ViewResources';
import ViewResource from './components/pages/ViewResource';


const Routes = () =>{
    return(
        <Router>
            <Route path='/'>
                <header className="header stack">
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
                    <Link
                        className="link"
                        to="/view-resources"
                    >
                        View Resources
                    </Link>
                </header>
            </Route>
            <Route path='/view-resources'>
                <ViewResources/>
            </Route>
            <Route path='/view-resources/view-resource/:id'>
                <ViewResource/>
            </Route>
            <Route path='/create-resource'>
                <CreateResource/>
            </Route>
        </Router>
    )
};

export default Routes;