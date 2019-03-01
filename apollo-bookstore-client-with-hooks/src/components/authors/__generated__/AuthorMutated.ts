/* tslint:disable */
// This file was automatically generated and should not be edited.

import { MutationType } from './../../../graphql-types';

// ====================================================
// GraphQL subscription operation: AuthorMutated
// ====================================================

export interface AuthorMutated_authorMutated_node {
    __typename: 'Author';
    id: string;
    name: string;
}

export interface AuthorMutated_authorMutated {
    __typename: 'AuthorMutationPayload';
    mutation: MutationType;
    node: AuthorMutated_authorMutated_node;
}

export interface AuthorMutated {
    authorMutated: AuthorMutated_authorMutated;
}
