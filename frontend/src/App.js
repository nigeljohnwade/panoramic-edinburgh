import React from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import AWSAppSyncClient from 'aws-appsync';

import awsconfig from './aws-exports';
import apiCalls from './api/utilities';
import logo from './logo.svg';
import './App.css';

Amplify.configure(awsconfig);
const client = new AWSAppSyncClient({
    url: awsconfig.aws_appsync_graphqlEndpoint,
    region: awsconfig.aws_appsync_region,
    auth: {
        type: awsconfig.aws_appsync_authenticationType,
        // apiKey: awsconfig.aws_appsync_apiKey, // API_KEY
        jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(), // COGNITO_POOLS
        // credentials: () => Auth.currentCredentials(), // IAM
    }
});

console.log(awsconfig);
console.log(client);


function App() {
    apiCalls.listResources(client);
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default withAuthenticator(App);
