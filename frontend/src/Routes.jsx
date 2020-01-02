import React from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import CreateResource from './components/pages/CreateResource';
import ViewResources from './components/pages/ViewResources';
import ViewResource from './components/pages/ViewResource';
import ViewResourcesByType from './components/pages/ViewResourcesByType';
import { Header } from './components/Header';


const Routes = () => {
    return (
        <Router>
            <Route path='/'>
                <Header/>
            </Route>
            <Route exact path='/view-resources'>
                <ViewResources/>
            </Route>
            <Route path='/view-resources/view-resource/:id'>
                <ViewResources/>
                <ViewResource/>
            </Route>
            <Route exact path='/view-sites'>
                <ViewResourcesByType type='SITE'/>
            </Route>
            <Route path='/view-sites/view-resource/:id'>
                <ViewResourcesByType type='SITE'/>
                <ViewResource/>
            </Route>
            <Route exact path='/view-panoramas'>
                <ViewResourcesByType type='PANORAMA'/>
            </Route>
            <Route path='/view-panoramas/view-resource/:id'>
                <ViewResourcesByType type='PANORAMA'/>
                <ViewResource/>
            </Route>
            <Route exact path='/view-tours'>
                <ViewResourcesByType type='TOUR'/>
            </Route>
            <Route path='/view-tours/view-resource/:id'>
                <ViewResourcesByType type='TOUR'/>
                <ViewResource/>
            </Route>
            <Route exact path='/view-journeys'>
                <ViewResourcesByType type='JOURNEY'/>
            </Route>
            <Route path='/view-journeys/view-resource/:id'>
                <ViewResourcesByType type='JOURNEY'/>
                <ViewResource/>
            </Route>
            <Route path='/create-resource'>
                <CreateResource/>
            </Route>
        </Router>
    );
};

export default Routes;