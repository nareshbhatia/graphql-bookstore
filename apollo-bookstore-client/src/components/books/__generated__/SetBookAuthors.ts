/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetBookAuthors
// ====================================================

export interface SetBookAuthors_setBookAuthors_publisher {
    __typename: 'Publisher';
    id: string;
    name: string;
}

export interface SetBookAuthors_setBookAuthors_authors {
    __typename: 'Author';
    id: string;
    name: string;
}

export interface SetBookAuthors_setBookAuthors {
    __typename: 'Book';
    id: string;
    name: string;
    publisher: SetBookAuthors_setBookAuthors_publisher;
    authors: SetBookAuthors_setBookAuthors_authors[];
}

export interface SetBookAuthors {
    setBookAuthors: SetBookAuthors_setBookAuthors;
}

export interface SetBookAuthorsVariables {
    bookId: string;
    authorIds: string[];
}
