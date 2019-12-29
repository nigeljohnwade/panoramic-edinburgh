import gql from 'graphql-tag';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';

const call = {
    listResources: (client) => {
        client.query({
            query: gql(queries.listResources)
        }).then(({data: {listResources}}) => {
            console.log(listResources.items);
        });
    },
    createResource: (client) => {
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
    updateResource: (client) => {
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

export default call;