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

const cleanFields = (fields, toNull = false) => {
    delete fields.__typename;
    for(const item in fields){
        if(fields.hasOwnProperty(item) && fields[item] === ''){
            toNull
                ? fields[item] = null
                : fields[item] = undefined;
        }
    }
    return fields;
};

console.log(client);

const calls = {
    listResources: async () => {
        return await client.query({
            query: gql(queries.listResources),
            variables:{
                limit: 100,
            }
        }).then(({data: {listResources}}) => {
            return listResources.items;
        });
    },
    resourcesByType: async (type) => {
        return await client.query({
            query: gql(queries.resourceByType),
            variables:{
                type: type,
                limit: 100,
            }
        }).then(({data: {resourceByType}}) => {
            return resourceByType.items;
        });
    },
    getResource: async (id) => {
        return await client.query({
            query: gql(queries.getResource),
            variables:{
                id: id,
            }
        }).then(({data: {getResource}}) => {
            return getResource;
        });
    },
    createResource: async (fields) => {
        return await client.mutate({
            mutation: gql(mutations.createResource),
            variables: {
                input: {
                    ...cleanFields(fields)
                }
            }
        }).then(({data: {createResource}}) => {
            return createResource;
        });
    },
    updateResource: async (fields) => {
        return await client.mutate({
            mutation: gql(mutations.updateResource),
            variables: {
                input: {
                    ...cleanFields(fields, true)
                }
            }
        }).then(({data: {updateResource}}) => {
            return updateResource;
        });
    },
    deleteResource: async (id) => {
        return await client.mutate({
            mutation: gql(mutations.deleteResource),
            variables: {
                input: {
                    id
                }
            }
        }).then(({data: {deleteResource}}) => {
            return deleteResource;
        });
    },
};

export default calls;