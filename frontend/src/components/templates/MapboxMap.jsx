import React, { useEffect, useState } from 'react';
import ReactMapboxGl, { Feature, Layer, Popup, ZoomControl, ScaleControl, RotationControl } from 'react-mapbox-gl';
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
            onClick={(a, b) => {
                console.log(a, b);
            }}
            zoom={zoom}
        >
            <ZoomControl/>
            <ScaleControl measurement={'mi'}/>
            <RotationControl style={{
                height: '20rem'
            }}/>
            <Layer
                type="circle"
                id="marker"
            >
                <Feature coordinates={[lng, lat]}/>
            </Layer>
            <Popup
                className={'eurostile'}
                coordinates={[lng, lat]}
            >
                <p className={'h4'}>Centre</p>
                <p className={'readout'}>
                    <span className="readout-label">Latitude:</span>
                    <span className="tabular-numbers">{lat}</span>
                </p>
                <p className={'readout'}>
                    <span className="readout-label">Longitude:</span>
                    <span className="tabular-numbers">{lng}</span>
                </p>
            </Popup>
            {
                resources && resources.map(item => (
                    <div key={item.id}>
                        <Popup
                            coordinates={[item.latitude, item.longitude]}
                        >
                            <div className={'eurostile'}>
                                <p className={'h4'}>{item.title}</p>
                                <p>{item.description}</p>
                                <p className={'readout'}>
                                    <span className="readout-label">Latitude:</span>
                                    <span className="tabular-numbers">{item.latitude}</span>
                                </p>
                                <p className={'readout'}>
                                    <span className="readout-label">Longitude:</span>
                                    <span className="readout-value tabular-numbers">{item.longitude}</span>
                                </p>
                            </div>
                        </Popup>
                    </div>
                ))
            }
        </Map>
    );
};

export default MapboxMap;