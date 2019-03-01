/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BookInput } from './../../../graphql-types';

// ====================================================
// GraphQL mutation operation: UpdateBook
// ====================================================

export interface UpdateBook_updateBook_publisher {
    __typename: 'Publisher';
    id: string;
    name: string;
}

export interface UpdateBook_updateBook_authors {
    __typename: 'Author';
    id: string;
    name: string;
}

export interface UpdateBook_updateBook {
    __typename: 'Book';
    id: string;
    name: string;
    publisher: UpdateBook_updateBook_publisher;
    authors: UpdateBook_updateBook_authors[];
}

export interface UpdateBook {
    updateBook: UpdateBook_updateBook;
}

export interface UpdateBookVariables {
    bookId: string;
    book: BookInput;
}
