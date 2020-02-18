import React, { lazy, Suspense, } from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import { accessToken } from './config/mapbox';
import { attribution, HeadsUp, HeadsUpId, url, } from './config/mapbox-styles';
import Fetching from './components/organisms/Fetching';

const Header = lazy(() => import('components/organisms/Header'));
const Interference = lazy(() => import('components/organisms/Interference'));
const ViewResourcesByOwner = lazy(() => import('components/pages/ViewResourcesByOwner'));
const CreateResource = lazy(() => import('components/pages/CreateResource'));
const ViewResources = lazy(() => import('components/pages/ViewResources'));
const ViewResourcesByType = lazy(() => import('components/pages/ViewResourcesByType'));
const ViewResource = lazy(() => import('components/pages/ViewResource'));
const EditResource = lazy(() => import('components/pages/EditResource'));
const LeafletMap = lazy(() => import('components/templates/LeafletMap'));
const MapboxMap = lazy(() => import('./components/templates/MapboxMap'));


const Routes = () => {
    return (
        <Router>
            <Route path='/'>
                <Suspense fallback={<Fetching/>}>
                    <Header/>
                </Suspense>
            </Route>
            <Route path='/user'>
                <Suspense fallback={<Fetching/>}>
                    <ViewResourcesByOwner/>
                </Suspense>
            </Route>
            <Route path='/leaflet-map'>
                <LeafletMap
                    accessToken={accessToken}
                    id={HeadsUpId}
                    attribution={attribution}
                    tileLayerUrl={url}
                />
            </Route>
            <Route path='/mapbox-map'>
                <MapboxMap
                    accessToken={accessToken}
                    style={HeadsUp}
                />
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
            <Route path='/'>
                <Suspense fallback={<Fetching/>}>
                    <Interference/>
                </Suspense>
            </Route>
        </Router>
    );
};

export default Routes;
