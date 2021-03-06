import gql from 'graphql-tag';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import AWSAppSyncClient from 'aws-appsync';
import awsconfig from '../config/aws-exports-dev';
import { Auth } from 'aws-amplify';

const clientCognito = new AWSAppSyncClient({
    url: awsconfig.aws_appsync_graphqlEndpoint,
    region: awsconfig.aws_appsync_region,
    auth: {
        type: awsconfig.aws_appsync_authenticationType,
        jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
    },
    offlineConfig:{
        keyPrefix: 'private',
    }
});

const clientApiKey = new AWSAppSyncClient({
    url: awsconfig.aws_appsync_graphqlEndpoint,
    region: awsconfig.aws_appsync_region,
    auth: {
        type: 'API_KEY',
        apiKey: awsconfig.aws_appsync_api_key,
    },
    offlineConfig:{
        keyPrefix: 'public',
    }
});

const cleanFields = (fields, toNull = false) => {
    delete fields.__typename;
    for (const item in fields) {
        if (fields.hasOwnProperty(item) && fields[item] === '') {
            toNull
                ? fields[item] = null
                : fields[item] = undefined;
        }
    }
    return fields;
};

const populateFields = (fields) => {
    for (const item in fields) {
        if (fields.hasOwnProperty(item) && fields[item] === null) {
            fields[item] = '';
        }
    }
    return fields;
};

const calls = {
    listResources: async () => {
        return await clientApiKey.query({
            query: gql(queries.listResources),
            variables: {
                limit: 100,
            }
        }).then(({ data: { listResources } }) => {
            return listResources.items;
        });
    },
    resourceByOwnerByDateUpdated: async (owner) => {
        return await clientCognito.query({
            query: gql(queries.resourceByOwnerByDateUpdated),
            variables: {
                owner: owner,
                limit: 100,
            }
        }).then(({ data: { resourceByOwnerByDateUpdated } }) => {
            return resourceByOwnerByDateUpdated.items;
        });
    },
    resourcesByType: async (type) => {
        return await clientCognito.query({
            query: gql(queries.resourceByType),
            variables: {
                type: type,
                limit: 100,
            }
        }).then(({ data: { resourceByType } }) => {
            return resourceByType.items;
        });
    },
    getResource: async (id) => {
        return await clientCognito.query({
            query: gql(queries.getResource),
            variables: {
                id: id,
            }
        }).then(({ data: { getResource } }) => {
            return populateFields(getResource);
        });
    },
    createResource: async (fields) => {
        return await clientCognito.mutate({
            mutation: gql(mutations.createResource),
            variables: {
                input: {
                    ...cleanFields(fields)
                }
            }
        }).then(({ data: { createResource } }) => {
            return createResource;
        });
    },
    updateResource: async (fields) => {
        return await clientCognito.mutate({
            mutation: gql(mutations.updateResource),
            variables: {
                input: {
                    ...cleanFields(fields, true)
                }
            }
        }).then(({ data: { updateResource } }) => {
            return updateResource;
        });
    },
    deleteResource: async (id) => {
        return await clientCognito.mutate({
            mutation: gql(mutations.deleteResource),
            variables: {
                input: {
                    id
                }
            }
        }).then(({ data: { deleteResource } }) => {
            return deleteResource;
        });
    },
};

export default calls;