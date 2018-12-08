/* tslint:disable */
// This file was automatically generated and should not be edited.

import { MutationType } from './../../../graphql-types';

// ====================================================
// GraphQL subscription operation: BookMutated
// ====================================================

export interface BookMutated_bookMutated_node_publisher {
    __typename: 'Publisher';
    id: string;
    name: string;
}

export interface BookMutated_bookMutated_node_authors {
    __typename: 'Author';
    id: string;
    name: string;
}

export interface BookMutated_bookMutated_node {
    __typename: 'Book';
    id: string;
    name: string;
    publisher: BookMutated_bookMutated_node_publisher;
    authors: BookMutated_bookMutated_node_authors[];
}

export interface BookMutated_bookMutated {
    __typename: 'BookMutationPayload';
    mutation: MutationType;
    node: BookMutated_bookMutated_node;
}

export interface BookMutated {
    bookMutated: BookMutated_bookMutated;
}
