import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
} from "react-router-dom";
import CreateResource from './components/pages/CreateResource';
import ViewResources from './components/pages/ViewResources';


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
                    <Link
                        className="link"
                        to="/view-resources"
                    >
                        View Resources
                    </Link>
                </header>
            </Route>
            <Route exact path={['/', '/view-resources']}>
                <ViewResources/>
            </Route>
            <Route path='/create-resource'>
                <CreateResource/>
            </Route>
        </Router>
    )
};

export default Routes;