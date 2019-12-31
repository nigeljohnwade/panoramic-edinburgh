import gql from 'graphql-tag';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import AWSAppSyncClient from 'aws-appsync';
import awsconfig from '../aws-exports';
import { Auth } from 'aws-amplify';

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

console.log(client);

const calls = {
    listResources: async () => {
        return await client.query({
            query: gql(queries.listResources),
            variables:{
                limit: 100
            }
        }).then(({data: {listResources}}) => {
            console.log(listResources.items);
            return listResources.items;
        });
    },
    createResource: () => {
        client.mutate({
            mutation: gql(mutations.createResource),
            variables: {
                input: {
                    type: 'PANORAMA',
                    title: 'Nigel\'s House'
                }
            }
        }).then(({data: {createResource}}) => {
            console.log(createResource);
        });
    },
    updateResource: () => {
        client.mutate({
            mutation: gql(mutations.updateResource),
            variables: {
                input: {
                    id: 'c8e2e3d7-d467-4a9a-8e32-81f7c8dd9477',
                    type: 'PANORAMA',
                    title: 'Update test'
                }
            }
        }).then(({data: {updateResource}}) => {
            console.log(updateResource);
        });
    }
};

export default calls;