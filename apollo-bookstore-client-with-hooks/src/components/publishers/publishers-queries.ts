import gql from 'graphql-tag';

export const GET_PUBLISHERS = gql`
    query GetPublishers {
        publishers {
            id
            name
        }
    }
`;
