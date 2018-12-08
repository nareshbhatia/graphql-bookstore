import { dataSources } from '../../datasources';
import { pubsub } from '../pubsub';

const PUBLISHER_MUTATED = 'publisherMutated';

export default {
    Query: {
        publishers() {
            return dataSources.bookService.getPublishers();
        },
        publisher(parent, args) {
            return dataSources.bookService.getPublisher(args.id);
        }
    },

    Mutation: {
        createPublisher(parent, args) {
            return dataSources.bookService
                .createPublisher({
                    name: args.name
                })
                .then(publisher => {
                    pubsub.publish(PUBLISHER_MUTATED, {
                        publisherMutated: {
                            mutation: 'CREATED',
                            node: publisher
                        }
                    });
                    return publisher;
                });
        },
        updatePublisher(parent, args) {
            return dataSources.bookService
                .updatePublisher(args.publisherId, {
                    name: args.name
                })
                .then(publisher => {
                    pubsub.publish(PUBLISHER_MUTATED, {
                        publisherMutated: {
                            mutation: 'UPDATED',
                            node: publisher
                        }
                    });
                    return publisher;
                });
        }
    },

    Subscription: {
        publisherMutated: {
            subscribe: () => pubsub.asyncIterator(PUBLISHER_MUTATED)
        }
    },

    Publisher: {
        books(parent) {
            return dataSources.bookService.getPublisherBooks(parent.id);
        }
    }
};
