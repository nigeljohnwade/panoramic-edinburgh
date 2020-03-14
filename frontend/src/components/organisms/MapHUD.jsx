import React from 'react';

const MapHUD = ({ events }) => {
    return (
        <div className="map-hud-wrapper">
            {Object.keys(events).map(item => {
                return (
                    <p className={'hud-row'} key={item}>
                        <span className={'hud-value'}>
                            {((events[item] * (Math.random() * 1200)) % (251 * 259)).toString(16)}
                        </span>
                    </p>
                )
            })}
        </div>
    )
};

export default MapHUD;