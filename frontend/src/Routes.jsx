import React, { lazy, Suspense, } from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import { accessToken } from './config/mapbox';
import { attribution, HeadsUp, PanoramicEdinburghId, url, } from './config/mapbox-styles';
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
            <Route path='/user/:username'>
                <Suspense fallback={<Fetching />}>
                    <ViewResourcesByOwner />
                </Suspense>
            </Route>
            <Route path='/leaflet-map'>
                <Suspense fallback={<Fetching />}>
                    <LeafletMap
                        accessToken={accessToken}
                        id={PanoramicEdinburghId}
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
            <Route path='/view-resources'>
                <Suspense fallback={<Fetching />}>
                    <ViewResources />
                </Suspense>
            </Route>
            <Route path='/view-sites'>
                <Suspense fallback={<Fetching />}>
                    <ViewResourcesByType type='SITE' />
                </Suspense>
            </Route>
            <Route path='/view-panoramas'>
                <Suspense fallback={<Fetching />}>
                    <ViewResourcesByType type='PANORAMA' />
                </Suspense>
            </Route>
            <Route path='/view-tours'>
                <Suspense fallback={<Fetching />}>
                    <ViewResourcesByType type='TOUR' />
                </Suspense>
            </Route>
            <Route path='/view-journeys'>
                <Suspense fallback={<Fetching />}>
                    <ViewResourcesByType type='JOURNEY' />
                </Suspense>
            </Route>
            <Route
                exact
                path={[
                    '/user/:username/view-resource/:id',
                    '/view-resources/view-resource/:id',
                    '/view-sites/view-resource/:id',
                    '/view-panoramas/view-resource/:id',
                    '/view-journeys/view-resource/:id',
                    '/view-tours/view-resource/:id',
                ]}
            >
                <Suspense fallback={<Fetching />}>
                    <ViewResource />
                </Suspense>
            </Route>
            <Route
                exact
                path={[
                    '/user/:username/view-resource/:id/edit',
                    '/view-resources/view-resource/:id/edit',
                    '/view-sites/view-resource/:id/edit',
                    '/view-panoramas/view-resource/:id/edit',
                    '/view-journeys/view-resource/:id/edit',
                    '/view-tours/view-resource/:id/edit',
                ]}
            >
                <Suspense fallback={<Fetching />}>
                    <EditResource />
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
