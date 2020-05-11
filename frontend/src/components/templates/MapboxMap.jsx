import React, { useEffect, useState } from 'react';
import ReactMapboxGl, { Feature, Layer, Marker, Popup } from 'react-mapbox-gl';
import apiCalls from '../../api/utilities';


export const MapboxMap = ({
    accessToken,
    lat = 55.95052562,
    lng = -3.21251516,
    zoom = [13],
    style,
}) => {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        apiCalls.listResources()
            .then(resources => setResources(resources));
    }, []);

    const Map = ReactMapboxGl({
        accessToken: accessToken,
    });


    const position = [lng, lat];

    return (
        <Map
            center={position}
            style={style}
            containerStyle={{
                height: '100vh',
                width: 'calc(100vw - 6rem)',
            }}
            onMouseMove={(a, b) => {
                console.log(a, b);
            }}
            zoom={zoom}
        >
            <Layer
                type="circle"
                id="marker"
            >
                <Feature coordinates={[lng, lat]}/>
            </Layer>
            <Popup
                coordinates={[lng, lat]}
            >
                A pretty CSS3 popup. <br/> Easily customizable.
            </Popup>
            {
                resources && resources.map(item => (
                    <div key={item.id} >
                        <Marker
                            coordinates={[item.latitude, item.longitude]}
                            anchor="bottom"
                        >
                            <div style={{backgroundColor: 'black', width: '100px', height: '100px'}}/>
                        </Marker>
                        <Popup
                            coordinates={[item.latitude, item.longitude]}
                        >
                            A pretty CSS3 popup. <br/> Easily customizable.
                        </Popup>
                    </div>
                ))
            }
        </Map>
    );
};

export default MapboxMap;