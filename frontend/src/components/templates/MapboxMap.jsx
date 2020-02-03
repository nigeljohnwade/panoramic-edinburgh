import React from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';


export const MapboxMap = ({
    accessToken,
    lat = 55.950,
    lng = -3.19,
    zoom = [13],
    style,
}) => {
    const Map = ReactMapboxGl({
        accessToken: accessToken,
    });

    const state = {
        lat: lat,
        lng: lng,
        zoom: zoom,
    };

    const position = [state.lng, state.lat];
    return (
        <Map
            center={position}
            style={style}
            containerStyle={{
                height: '100vh',
                width: 'calc(100vw - 6rem)',
            }}
            onMouseMove={(a,b) => {
                console.log(a, b);
            }}
            zoom={zoom}
        >
            <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                <Feature coordinates={[lng, lat]} />
            </Layer>
        </Map>
        // <Map center={position} zoom={state.zoom}>
        //     <TileLayer
        //         attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        //         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        //     />
        //     <Marker position={position}>
        //         <Popup>
        //             A pretty CSS3 popup. <br/> Easily customizable.
        //         </Popup>
        //     </Marker>
        // </Map>
    );
};

export default MapboxMap;