import 'aframe';
import {Entity, Scene} from 'aframe-react';
import React from 'react';

import DummyVR from'resources/target360_8192x4096.jpg';

class AFrameViewer extends React.Component {
    render () {
        return (
            <Scene>
                <Entity geometry={{primitive: 'box'}} material={{color: 'blue'}} position={{x: 1, y: 0, z: -10}}/>
                <Entity geometry={{primitive: 'box'}} material={{color: 'blue'}} position={{x: -1, y: 0, z: -10}}/>
                <Entity primitive="a-sky" src={DummyVR}/>
            </Scene>
        );
    }
}

export default AFrameViewer;