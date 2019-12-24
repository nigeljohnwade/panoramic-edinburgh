/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getResource = `query GetResource($id: ID!) {
  getResource(id: $id) {
    id
    type
    title
  }
}
`;
export const listResources = `query ListResources(
  $filter: ModelResourceFilterInput
  $limit: Int
  $nextToken: String
) {
  listResources(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      type
      title
    }
    nextToken
  }
}
`;
