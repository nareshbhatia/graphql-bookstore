/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdatePublisher
// ====================================================

export interface UpdatePublisher_updatePublisher {
    __typename: 'Publisher';
    id: string;
    name: string;
}

export interface UpdatePublisher {
    updatePublisher: UpdatePublisher_updatePublisher;
}

export interface UpdatePublisherVariables {
    publisherId: string;
    name: string;
}
