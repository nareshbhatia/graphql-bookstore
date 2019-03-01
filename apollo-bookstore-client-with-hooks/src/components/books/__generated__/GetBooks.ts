/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBooks
// ====================================================

export interface GetBooks_books_publisher {
    __typename: 'Publisher';
    id: string;
    name: string;
}

export interface GetBooks_books_authors {
    __typename: 'Author';
    id: string;
    name: string;
}

export interface GetBooks_books {
    __typename: 'Book';
    id: string;
    name: string;
    publisher: GetBooks_books_publisher;
    authors: GetBooks_books_authors[];
}

export interface GetBooks {
    books: GetBooks_books[];
}
