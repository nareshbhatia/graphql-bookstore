/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAuthors
// ====================================================

export interface GetAuthors_authors {
    __typename: 'Author';
    id: string;
    name: string;
}

export interface GetAuthors {
    authors: GetAuthors_authors[];
}
