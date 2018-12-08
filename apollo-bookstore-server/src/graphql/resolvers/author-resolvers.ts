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

    Author: {
        books(parent) {
            return dataSources.bookService.getAuthorBooks(parent.id);
        }
    }
};
