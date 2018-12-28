import * as React from 'react';

import gql from 'graphql-tag';
import { DefaultQuery } from '..';
import { MutationType } from '../../graphql-types';
import { AuthorsPanel } from './authors-panel';
import { GET_AUTHORS } from './authors-queries';
import { AuthorMutated } from './__generated__/AuthorMutated';

export class AuthorsContainer extends React.Component {
    unsubscribe = null;

    render() {
        return (
            <DefaultQuery query={GET_AUTHORS}>
                {({ data, subscribeToMore }) => {
                    // Subscribe to author mutations - only once
                    if (!this.unsubscribe) {
                        this.unsubscribe = subscribeToAuthorMutations(
                            subscribeToMore
                        );
                    }

                    return <AuthorsPanel data={data} />;
                }}
            </DefaultQuery>
        );
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
}

function subscribeToAuthorMutations(subscribeToMore) {
    return subscribeToMore({
        document: AUTHOR_MUTATED,
        updateQuery: (prev, { subscriptionData }) => {
            const data: AuthorMutated = subscriptionData.data;
            if (!data) return prev;

            const authorMutated = data.authorMutated;

            switch (authorMutated.mutation) {
                case MutationType.CREATED: {
                    const newAuthor = authorMutated.node;
                    // Don't double add the author
                    if (findAuthor(prev.authors, newAuthor.id)) {
                        return prev;
                    } else {
                        // Author not found, add it
                        return Object.assign({}, prev, {
                            authors: [...prev.authors, newAuthor]
                        });
                    }
                }
                case MutationType.UPDATED: {
                    const updatedAuthor = authorMutated.node;
                    // Replace previous author with updated one
                    return Object.assign({}, prev, {
                        authors: prev.authors.map(author =>
                            author.id === updatedAuthor.id
                                ? updatedAuthor
                                : author
                        )
                    });
                }
                case MutationType.DELETED: {
                    const deletedAuthor = authorMutated.node;
                    // Delete author
                    return Object.assign({}, prev, {
                        authors: prev.authors.filter(
                            author => author.id !== deletedAuthor.id
                        )
                    });
                }
                default:
                    return prev;
            }
        }
    });
}

function findAuthor(authors, authorId) {
    return authors.find(author => author.id === authorId);
}

const AUTHOR_MUTATED = gql`
    subscription AuthorMutated {
        authorMutated {
            mutation
            node {
                __typename
                id
                name
            }
        }
    }
`;
