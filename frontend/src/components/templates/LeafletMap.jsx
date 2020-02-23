import React, { useEffect, useState, } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import MapHUD from 'components/organisms/MapHUD';

export const LeafletMap = ({
    accessToken,
    attribution,
    id,
    markersArray,
    position = [55.950, -3.19],
    tileLayerUrl,
    zoom = 13,
}) => {
    const [markers,] = useState(markersArray);
    const [events, setEvents] = useState({
        load: 0,
        tileunload: 0,
        tileload: 0,
        tileloadstart: 0,
        loading: 0,
        mousemove: 0,
    });

    useEffect(() => {
        console.log(events);
    }, [events]);

    const eventHandler = (e) => {
        console.log(e.type);
        setEvents({...events, [e.type]: events[e.type] + 1});
    };

    return (
        <>
            <div className="map-wrapper">
                <Map
                    center={position}
                    zoom={zoom}
                    onMousemove={e => eventHandler(e)}
                >
                    <TileLayer
                        attribution={attribution}
                        url={tileLayerUrl}
                        accessToken={accessToken}
                        id={id}
                        onload={e => eventHandler(e)}
                        ontileunload={e => eventHandler(e)}
                        ontileload={e => eventHandler(e)}
                        ontileloadstart={e => eventHandler(e)}
                        onloading={e => eventHandler(e)}
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
                <MapHUD events={events}/>
            </div>
        </>
    );
};

export default LeafletMap;