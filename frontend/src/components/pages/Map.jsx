import React, { useEffect, useState, } from 'react';

import LeafletMap from 'components/templates/LeafletMap';

export const Map = ({
    accessToken,
    attribution,
    id,
    markersArray,
    position = [55.950, -3.19],
    tileLayerUrl,
    zoom = 13,
}) => {

    return (
        <>
            <div className="map-wrapper">
                <LeafletMap
                    center={position}
                    zoom={zoom}
                    attribution={attribution}
                    url={tileLayerUrl}
                    accessToken={accessToken}
                    id={id}
                />
            </div>
        </>
    );
};

export default Map;