import React from 'react';
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';

import awsconfig from './aws-exports';
import Routes from './Routes';
import './App.css';

Amplify.configure(awsconfig);

function App() {
    return (
        <div className="app row">
            <Routes/>
        </div>
    );
}

export default withAuthenticator(App);
