import React from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import AWSAppSyncClient from 'aws-appsync';

import awsconfig from './aws-exports';
import apiCalls from './api/utilities';
import Routes from './Routes';
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
            <Routes/>
        </div>
    );
}

export default withAuthenticator(App);
