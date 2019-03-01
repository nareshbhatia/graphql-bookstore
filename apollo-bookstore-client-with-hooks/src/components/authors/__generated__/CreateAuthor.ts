/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateAuthor
// ====================================================

export interface CreateAuthor_createAuthor {
    __typename: 'Author';
    id: string;
    name: string;
}

export interface CreateAuthor {
    createAuthor: CreateAuthor_createAuthor;
}

export interface CreateAuthorVariables {
    name: string;
}
