import { dataSources } from '../../datasources';

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
            return dataSources.bookService.createPublisher({
                name: args.name
            });
        },
        updatePublisher(parent, args) {
            return dataSources.bookService.updatePublisher(args.publisherId, {
                name: args.name
            });
        }
    },

    Publisher: {
        books(parent) {
            return dataSources.bookService.getPublisherBooks(parent.id);
        }
    }
};
