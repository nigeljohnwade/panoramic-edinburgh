/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getResource = /* GraphQL */ `
  query GetResource($id: ID!) {
    getResource(id: $id) {
      id
      type
      title
      shortText
      descriptiveText
      primaryImageUrl
      sourceImageUrl
      panoramicImageUrl
      latitude
      longitude
      elevation
      childResources {
        id
        type
        title
        shortText
        descriptiveText
        primaryImageUrl
        sourceImageUrl
        panoramicImageUrl
        latitude
        longitude
        elevation
        childResources {
          id
          type
          title
          shortText
          descriptiveText
          primaryImageUrl
          sourceImageUrl
          panoramicImageUrl
          latitude
          longitude
          elevation
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listResources = /* GraphQL */ `
  query ListResources(
    $filter: ModelResourceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResources(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        title
        shortText
        descriptiveText
        primaryImageUrl
        sourceImageUrl
        panoramicImageUrl
        latitude
        longitude
        elevation
        childResources {
          id
          type
          title
          shortText
          descriptiveText
          primaryImageUrl
          sourceImageUrl
          panoramicImageUrl
          latitude
          longitude
          elevation
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const resourceByType = /* GraphQL */ `
  query ResourceByType(
    $type: ResourceType
    $sortDirection: ModelSortDirection
    $filter: ModelResourceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    resourceByType(
      type: $type
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        title
        shortText
        descriptiveText
        primaryImageUrl
        sourceImageUrl
        panoramicImageUrl
        latitude
        longitude
        elevation
        childResources {
          id
          type
          title
          shortText
          descriptiveText
          primaryImageUrl
          sourceImageUrl
          panoramicImageUrl
          latitude
          longitude
          elevation
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const resourceByOwnerByDateUpdated = /* GraphQL */ `
  query ResourceByOwnerByDateUpdated(
    $owner: String
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelResourceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    resourceByOwnerByDateUpdated(
      owner: $owner
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        title
        shortText
        descriptiveText
        primaryImageUrl
        sourceImageUrl
        panoramicImageUrl
        latitude
        longitude
        elevation
        childResources {
          id
          type
          title
          shortText
          descriptiveText
          primaryImageUrl
          sourceImageUrl
          panoramicImageUrl
          latitude
          longitude
          elevation
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
