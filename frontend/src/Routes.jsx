import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom';
import CreateResource from './components/pages/CreateResource';
import ViewResources from './components/pages/ViewResources';
import ViewResource from './components/pages/ViewResource';
import ViewResourcesByType from './components/pages/ViewResourcesByType';


const Routes = () => {
    return (
        <Router>
            <Route path='/'>
                <header className="header stack">
                    <Link
                        className="link"
                        to="/"
                    >
                        <span>
                            Home
                        </span>
                    </Link>
                    <Link
                        className="link"
                        to="/create-resource"
                    >
                        <span>
                            New Resource
                        </span>
                    </Link>
                    <Link
                        className="link"
                        to="/view-resources"
                    >
                        <span>
                            View Resources
                        </span>
                    </Link>
                </header>
            </Route>
            <Route exact path='/view-resources'>
                <ViewResources/>
            </Route>
            <Route exact path='/view-sites'>
                <ViewResourcesByType type='SITE'/>
            </Route>
            <Route exact path='/view-panoramas'>
                <ViewResourcesByType type='PANORAMA'/>
            </Route>
            <Route exact path='/view-tours'>
                <ViewResourcesByType type='TOUR'/>
            </Route>
            <Route exact path='/view-journeys'>
                <ViewResourcesByType type='JOURNEY'/>
            </Route>
            <Route path='/view-resources/view-resource/:id'>
                <ViewResources/>
                <ViewResource/>
            </Route>
            <Route path='/create-resource'>
                <CreateResource/>
            </Route>
        </Router>
    );
};

export default Routes;