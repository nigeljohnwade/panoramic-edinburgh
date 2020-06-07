import React, { useEffect, useState } from 'react';
import ReactMapboxGl, { Feature, Layer, Marker, RotationControl, ScaleControl, ZoomControl } from 'react-mapbox-gl';
import { Link } from 'react-router-dom';

import apiCalls from '../../api/utilities';
import Crosshairs from '../../resources/svg/crosshairs.svg';
import MapMarker from '../../resources/svg/map-marker.svg';
import MapMarkerPath from '../../resources/svg/map-marker-path.svg';
import Rotate3D from '../../resources/svg/rotate-3d.svg';

const getIconByType = (type) =>{
  switch (type){
      case 'JOURNEY':
          return MapMarkerPath;
      case 'SITE':
          return MapMarker;
      case 'PANORAMA':
      case 'TOUR':
          return Rotate3D;
      default:
          return Crosshairs;
  }
};

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
            <RotationControl
                style={{
                    height: '20rem'
                }}
            />
            <Layer
                type="circle"
                id="marker"
            >
                <Feature coordinates={[lng, lat]}/>
            </Layer>
            {
                resources && resources.map(item => (
                    <div key={item.id}>
                        <Marker
                            coordinates={[item.latitude, item.longitude]}
                            anchor="center"
                        >
                            <div
                                style={{
                                    position: 'relative',
                                }}
                            >
                                <img
                                    src={getIconByType(item.type)}
                                    style={{
                                        width: 'calc(var(--base-unit) * 3)',
                                    }}
                                    alt=""
                                />
                                <p
                                    className={'h4'}
                                    style={{
                                        position: 'absolute',
                                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                        minWidth: '20ch',
                                        padding: 'var(--base-unit)',
                                    }}
                                >
                                    <Link to={`/mapbox-map/view-resource/${item.id}`}>
                                        {item.title}
                                    </Link>
                                </p>
                            </div>
                        </Marker>
                    </div>
                ))
            }
        </Map>
    );
};

export default MapboxMap;