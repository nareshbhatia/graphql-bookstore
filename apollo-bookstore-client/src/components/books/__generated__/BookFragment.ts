/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BookFragment
// ====================================================

export interface BookFragment_publisher {
    __typename: 'Publisher';
    id: string;
    name: string;
}

export interface BookFragment_authors {
    __typename: 'Author';
    id: string;
    name: string;
}

export interface BookFragment {
    __typename: 'Book';
    id: string;
    name: string;
    publisher: BookFragment_publisher;
    authors: BookFragment_authors[];
}
