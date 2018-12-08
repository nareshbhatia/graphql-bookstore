/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateAuthor
// ====================================================

export interface UpdateAuthor_updateAuthor {
    __typename: 'Author';
    id: string;
    name: string;
}

export interface UpdateAuthor {
    updateAuthor: UpdateAuthor_updateAuthor;
}

export interface UpdateAuthorVariables {
    authorId: string;
    name: string;
}
