import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';


export const LeafletMap = ({
    accessToken,
    attribution,
    id,
    url,
}) => {
    const state = {
        lat: 55.950,
        lng: -3.19,
        zoom: 13,
    };

    const position = [state.lat, state.lng];
    return (
        <Map center={position} zoom={state.zoom}>
            <TileLayer
                attribution={attribution}
                url={url}
                accessToken={accessToken}
                id={id}
            />
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </Map>
    );
};

export default LeafletMap;