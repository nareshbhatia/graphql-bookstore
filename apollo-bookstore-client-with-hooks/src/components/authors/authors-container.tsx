import React from 'react';

import gql from 'graphql-tag';
import { useQuery, useSubscription } from 'react-apollo-hooks';
import { HandleQuery } from '..';
import { MutationType } from '../../graphql-types';
import { AuthorsPanel } from './authors-panel';
import { GET_AUTHORS } from './authors-queries';
import { AuthorMutated } from './__generated__/AuthorMutated';

export const AuthorsContainer = () => {
    const { loading, error, data } = useQuery(GET_AUTHORS);

    useSubscription(AUTHOR_MUTATED, {
        onSubscriptionData: ({ client, subscriptionData }) => {
            // Get the current value of authors query
            const prevData = client.readQuery({
                query: GET_AUTHORS
            }) as any;

            // Extract mutation type and author from the subscription data
            const authorMutatedWrapper: AuthorMutated = subscriptionData.data;
            const { authorMutated } = authorMutatedWrapper;
            const { mutation, node: subsAuthor } = authorMutated;

            // Determine the next value of authors query
            let nextData;
            switch (mutation) {
                case MutationType.CREATED: {
                    // Don't double add the author
                    if (!findAuthor(prevData.authors, subsAuthor.id)) {
                        nextData = Object.assign({}, prevData, {
                            authors: [...prevData.authors, subsAuthor]
                        });
                    }
                    break;
                }
                case MutationType.UPDATED: {
                    // Replace previous author with updated one
                    nextData = Object.assign({}, prevData, {
                        authors: prevData.authors.map((author: any) =>
                            author.id === subsAuthor.id ? subsAuthor : author
                        )
                    });
                    break;
                }
                case MutationType.DELETED: {
                    // Delete author
                    nextData = Object.assign({}, prevData, {
                        authors: prevData.authors.filter(
                            (author: any) => author.id !== subsAuthor.id
                        )
                    });
                    break;
                }
            }

            // Write updated store data
            if (nextData) {
                client.writeQuery({
                    query: GET_AUTHORS,
                    data: nextData
                });
            }
        }
    });

    return (
        <HandleQuery loading={loading} error={error}>
            <AuthorsPanel data={data} />
        </HandleQuery>
    );
};

function findAuthor(authors: Array<any>, authorId: string) {
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
