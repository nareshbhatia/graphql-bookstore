/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreatePublisher
// ====================================================

export interface CreatePublisher_createPublisher {
    __typename: 'Publisher';
    id: string;
    name: string;
}

export interface CreatePublisher {
    createPublisher: CreatePublisher_createPublisher;
}

export interface CreatePublisherVariables {
    name: string;
}
