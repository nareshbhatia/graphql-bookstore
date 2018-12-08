/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BookInput } from './../../../graphql-types';

// ====================================================
// GraphQL mutation operation: CreateBook
// ====================================================

export interface CreateBook_createBook_publisher {
    __typename: 'Publisher';
    id: string;
    name: string;
}

export interface CreateBook_createBook_authors {
    __typename: 'Author';
    id: string;
    name: string;
}

export interface CreateBook_createBook {
    __typename: 'Book';
    id: string;
    name: string;
    publisher: CreateBook_createBook_publisher;
    authors: CreateBook_createBook_authors[];
}

export interface CreateBook {
    createBook: CreateBook_createBook;
}

export interface CreateBookVariables {
    book: BookInput;
}
