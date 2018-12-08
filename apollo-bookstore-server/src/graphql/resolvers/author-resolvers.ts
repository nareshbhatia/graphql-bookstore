import { dataSources } from '../../datasources';

export default {
    Query: {
        authors() {
            return dataSources.bookService.getAuthors();
        },

        author(parent, args) {
            return dataSources.bookService.getAuthor(args.id);
        }
    },

    Mutation: {
        createAuthor(parent, args) {
            return dataSources.bookService.createAuthor({
                name: args.name
            });
        },
        updateAuthor(parent, args) {
            return dataSources.bookService.updateAuthor(args.authorId, {
                name: args.name
            });
        }
    },

    Author: {
        books(parent) {
            return dataSources.bookService.getAuthorBooks(parent.id);
        }
    }
};
