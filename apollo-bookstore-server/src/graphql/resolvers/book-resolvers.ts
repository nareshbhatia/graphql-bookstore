import { dataSources } from '../../datasources';

export default {
    Query: {
        books() {
            return dataSources.bookService.getBooks();
        },
        book(parent, args) {
            return dataSources.bookService.getBook(args.id);
        }
    },

    Mutation: {
        createBook(parent, args) {
            const { publisherId, ...rest } = args.book;
            return dataSources.bookService.createBook(
                {
                    ...rest
                },
                publisherId
            );
        },
        updateBook(parent, args) {
            const { publisherId, ...rest } = args.book;
            return dataSources.bookService.updateBook(
                args.bookId,
                {
                    ...rest
                },
                publisherId
            );
        },
        setBookAuthors(parent, args) {
            return dataSources.bookService.setBookAuthors(
                args.bookId,
                args.authorIds
            );
        }
    },

    Book: {
        publisher(parent) {
            return dataSources.bookService.getBookPublisher(parent.id);
        },
        authors(parent) {
            return dataSources.bookService.getBookAuthors(parent.id);
        }
    }
};
