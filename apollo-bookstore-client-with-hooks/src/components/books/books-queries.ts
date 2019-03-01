import gql from 'graphql-tag';

export const BOOK_FRAGMENT = gql`
    fragment BookFragment on Book {
        id
        name
        publisher {
            id
            name
        }
        authors {
            id
            name
        }
    }
`;

export const GET_BOOKS = gql`
    query GetBooks {
        books {
            ...BookFragment
        }
    }

    ${BOOK_FRAGMENT}
`;
