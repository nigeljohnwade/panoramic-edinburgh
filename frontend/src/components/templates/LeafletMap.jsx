import React, { useState } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

const markerPositionArray = (position, count, areaSize, scale) => {
    let returnArray = [];
    for (let i = 0; i < count; i++) {
        returnArray.push([
            position[0] + ((Math.random() * areaSize) - (areaSize / 2)) / scale,
            position[1] + ((Math.random() * areaSize) - (areaSize / 2)) / scale,
        ]);
    }
    console.log(returnArray);
    return returnArray;
};

export const LeafletMap = ({
    accessToken,
    attribution,
    id,
    markersArray,
    url,
}) => {
    const state = {
        lat: 55.950,
        lng: -3.19,
        zoom: 13,
    };
    const position = [state.lat, state.lng];
    const [markers, setMarkers] = useState(markersArray || markerPositionArray(position, 15, 7, 100));


    return (
        <Map center={position} zoom={state.zoom}>
            <TileLayer
                attribution={attribution}
                url={url}
                accessToken={accessToken}
                id={id}
            />
            {
                markers && markers.map((item, index) => {
                        return (
                            <Marker
                                key={index}
                                position={item}
                            >
                                <Popup>
                                    A random marker popup ({index}) at
                                    longitude: {item[1].toFixed(6)}, and
                                    latitude: {item[0].toFixed(6)}.
                                </Popup>
                            </Marker>);
                    }
                )
            }
        </Map>
    );
};

export default LeafletMap;