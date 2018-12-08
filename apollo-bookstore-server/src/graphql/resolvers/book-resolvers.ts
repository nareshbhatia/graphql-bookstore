import { dataSources } from '../../datasources';
import { pubsub } from '../pubsub';

const BOOK_MUTATED = 'bookMutated';

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
            return dataSources.bookService
                .createBook(
                    {
                        ...rest
                    },
                    publisherId
                )
                .then(book => {
                    pubsub.publish(BOOK_MUTATED, {
                        bookMutated: {
                            mutation: 'CREATED',
                            node: book
                        }
                    });
                    return book;
                });
        },
        updateBook(parent, args) {
            const { publisherId, ...rest } = args.book;
            return dataSources.bookService
                .updateBook(
                    args.bookId,
                    {
                        ...rest
                    },
                    publisherId
                )
                .then(publishBookUpdated);
        },
        setBookAuthors(parent, args) {
            return dataSources.bookService
                .setBookAuthors(args.bookId, args.authorIds)
                .then(publishBookUpdated);
        }
    },

    Subscription: {
        bookMutated: {
            subscribe: () => pubsub.asyncIterator(BOOK_MUTATED)
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

function publishBookUpdated(book) {
    pubsub.publish(BOOK_MUTATED, {
        bookMutated: {
            mutation: 'UPDATED',
            node: book
        }
    });
    return book;
}
