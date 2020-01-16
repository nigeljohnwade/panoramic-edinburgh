import React from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import CreateResource from './components/pages/CreateResource';
import ViewResources from './components/pages/ViewResources';
import ViewResource from './components/pages/ViewResource';
import EditResource from './components/pages/EditResource';
import ViewResourcesByType from './components/pages/ViewResourcesByType';
import ViewResourcesByOwner from './components/pages/ViewResourcesByOwner';
import { Header } from './components/organisms/Header';


const Routes = () => {
    return (
        <Router>
            <Route path='/'>
                <Header/>
            </Route>
            <Route path='/user'>
                <ViewResourcesByOwner/>
            </Route>
            <Route exact path='/view-resources'>
                <ViewResources/>
            </Route>
            <Route exact path='/view-resources/view-resource/:id'>
                <ViewResources/>
                <ViewResource/>
            </Route>
            <Route exact path='/view-resources/view-resource/:id/edit'>
                <ViewResources/>
                <EditResource/>
            </Route>
            <Route exact path='/view-sites'>
                <ViewResourcesByType type='SITE'/>
            </Route>
            <Route exact path='/view-sites/view-resource/:id'>
                <ViewResourcesByType type='SITE'/>
                <ViewResource/>
            </Route>
            <Route exact path='/view-panoramas'>
                <ViewResourcesByType type='PANORAMA'/>
            </Route>
            <Route exact path='/view-panoramas/view-resource/:id'>
                <ViewResourcesByType type='PANORAMA'/>
                <ViewResource/>
            </Route>
            <Route exact path='/view-tours'>
                <ViewResourcesByType type='TOUR'/>
            </Route>
            <Route exact path='/view-tours/view-resource/:id'>
                <ViewResourcesByType type='TOUR'/>
                <ViewResource/>
            </Route>
            <Route exact path='/view-journeys'>
                <ViewResourcesByType type='JOURNEY'/>
            </Route>
            <Route exact path='/view-journeys/view-resource/:id'>
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