import React from 'react';

import gql from 'graphql-tag';
import { useQuery, useSubscription } from 'react-apollo-hooks';
import { MutationType } from '../../graphql-types';
import { PublishersPanel } from './publishers-panel';
import { GET_PUBLISHERS } from './publishers-queries';
import { PublisherMutated } from './__generated__/PublisherMutated';

export const PublishersContainer = () => {
    const { error, data } = useQuery(GET_PUBLISHERS, { suspend: true });
    if (error) {
        throw error;
    }

    useSubscription(PUBLISHER_MUTATED, {
        onSubscriptionData: ({ client, subscriptionData }) => {
            // Get the current value of publishers query
            const prevData = client.readQuery({
                query: GET_PUBLISHERS
            }) as any;

            // Extract mutation type and publisher from the subscription data
            const publisherMutatedWrapper: PublisherMutated =
                subscriptionData.data;
            const { publisherMutated } = publisherMutatedWrapper;
            const { mutation, node: subsPublisher } = publisherMutated;

            // Determine the next value of publishers query
            let nextData;
            switch (mutation) {
                case MutationType.CREATED: {
                    // Don't double add the publisher
                    if (!findPublisher(prevData.publishers, subsPublisher.id)) {
                        nextData = Object.assign({}, prevData, {
                            publishers: [...prevData.publishers, subsPublisher]
                        });
                    }
                    break;
                }
                case MutationType.UPDATED: {
                    // Replace previous publisher with updated one
                    nextData = Object.assign({}, prevData, {
                        publishers: prevData.publishers.map((publisher: any) =>
                            publisher.id === subsPublisher.id
                                ? subsPublisher
                                : publisher
                        )
                    });
                    break;
                }
                case MutationType.DELETED: {
                    // Delete publisher
                    nextData = Object.assign({}, prevData, {
                        publishers: prevData.publishers.filter(
                            (publisher: any) =>
                                publisher.id !== subsPublisher.id
                        )
                    });
                    break;
                }
            }

            // Write updated store data
            if (nextData) {
                client.writeQuery({
                    query: GET_PUBLISHERS,
                    data: nextData
                });
            }
        }
    });

    return <PublishersPanel data={data} />;
};

function findPublisher(publishers: Array<any>, publisherId: string) {
    return publishers.find(publisher => publisher.id === publisherId);
}

const PUBLISHER_MUTATED = gql`
    subscription PublisherMutated {
        publisherMutated {
            mutation
            node {
                __typename
                id
                name
            }
        }
    }
`;
