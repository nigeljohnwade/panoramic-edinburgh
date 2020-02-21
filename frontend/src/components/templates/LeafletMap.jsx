import React, {
    useEffect,
    useState,
} from 'react';
import {
    Map,
    Marker,
    Popup,
    TileLayer
} from 'react-leaflet';

import MapHUD from 'components/organisms/MapHUD';

const markerPositionArray = (position, count, areaSize, scale) => {
    let returnArray = [];
    for (let i = 0; i < count; i++) {
        returnArray.push([
            position[0] + ((Math.random() * areaSize) - (areaSize / 2)) / scale,
            position[1] + ((Math.random() * areaSize) - (areaSize / 2)) / scale,
        ]);
    }
    return returnArray;
};

export const LeafletMap = ({
    accessToken,
    attribution,
    id,
    markersArray = markerPositionArray([55.950, -3.19], 15, 7, 100),
    position = [55.950, -3.19],
    tileLayerUrl,
    zoom = 13,
}) => {
    const [markers, setMarkers] = useState(markersArray);

    useEffect(() => {
        setMarkers(markersArray);
    }, [markersArray]);

    return (
        <>
            <div className="map-wrapper">

                <Map
                    center={position}
                    zoom={zoom}
                    onMousemove={e => console.log(e)}
                >
                    <TileLayer
                        attribution={attribution}
                        url={tileLayerUrl}
                        accessToken={accessToken}
                        id={id}
                        onload={e => console.log(e)}
                        ontileunload={e => console.log(e)}
                        ontileload={e => console.log(e)}
                        ontileerror={e => console.log(e)}
                        ontileloadstart={e => console.log(e)}
                        onloading={e => console.log(e)}
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
            </div>
            <MapHUD />
        </>
    );
};

export default LeafletMap;