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
                <Suspense fallback={<Fetching />}>
                    <Header />
                </Suspense>
            </Route>
            <Route path='/user'>
                <Suspense fallback={<Fetching />}>
                    <ViewResourcesByOwner />
                </Suspense>
            </Route>
            <Route path='/leaflet-map'>
                <Suspense fallback={<Fetching />}>
                    <LeafletMap
                        accessToken={accessToken}
                        id={HeadsUpId}
                        attribution={attribution}
                        tileLayerUrl={url}
                    />
                </Suspense>
            </Route>
            <Route path='/mapbox-map'>
                <Suspense fallback={<Fetching />}>
                    <MapboxMap
                        accessToken={accessToken}
                        style={HeadsUp}
                    />
                </Suspense>
            </Route>
            <Route exact path='/view-resources'>
                <Suspense fallback={<Fetching />}>
                    <ViewResources />
                </Suspense>
            </Route>
            <Route exact path='/view-resources/view-resource/:id'>
                <Suspense fallback={<Fetching />}>
                    <ViewResources />
                    <ViewResource />
                </Suspense>
            </Route>
            <Route exact path='/view-resources/view-resource/:id/edit'>
                <Suspense fallback={<Fetching />}>
                    <ViewResources />
                    <EditResource />
                </Suspense>
            </Route>
            <Route exact path='/view-sites'>
                <Suspense fallback={<Fetching />}>
                    <ViewResourcesByType type='SITE' />
                </Suspense>
            </Route>
            <Route exact path='/view-sites/view-resource/:id'>
                <Suspense fallback={<Fetching />}>
                    <ViewResourcesByType type='SITE' />
                    <ViewResource />
                </Suspense>
            </Route>
            <Route exact path='/view-panoramas'>
                <Suspense fallback={<Fetching />}>
                    <ViewResourcesByType type='PANORAMA' />
                </Suspense>
            </Route>
            <Route exact path='/view-panoramas/view-resource/:id'>
                <Suspense fallback={<Fetching />}>
                    <ViewResourcesByType type='PANORAMA' />
                    <ViewResource />
                </Suspense>
            </Route>
            <Route exact path='/view-tours'>
                <Suspense fallback={<Fetching />}>
                    <ViewResourcesByType type='TOUR' />
                </Suspense>
            </Route>
            <Route exact path='/view-tours/view-resource/:id'>
                <Suspense fallback={<Fetching />}>
                    <ViewResourcesByType type='TOUR' />
                    <ViewResource />
                </Suspense>
            </Route>
            <Route exact path='/view-journeys'>
                <Suspense fallback={<Fetching />}>
                    <ViewResourcesByType type='JOURNEY' />
                </Suspense>
            </Route>
            <Route exact path='/view-journeys/view-resource/:id'>
                <Suspense fallback={<Fetching />}>
                    <ViewResourcesByType type='JOURNEY' />
                    <ViewResource />
                </Suspense>
            </Route>
            <Route path='/create-resource'>
                <Suspense fallback={<Fetching />}>
                    <CreateResource />
                </Suspense>
            </Route>
            <Route path='/'>
                <Suspense fallback={<Fetching />}>
                    <Interference />
                </Suspense>
            </Route>
        </Router>
    );
};

export default Routes;
