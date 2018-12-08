import gql from 'graphql-tag';

export const GET_AUTHORS = gql`
    query GetAuthors {
        authors {
            id
            name
        }
    }
`;
