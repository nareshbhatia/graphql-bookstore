import { BookService } from './book-service';

// TODO: We will not pass dataSources via context because this does not work with subscriptions
// See https://github.com/apollographql/apollo-server/issues/1526

// Set up the dataSources needed by our resolvers
// export const dataSources = () => ({
//     bookService: new BookService()
// });

export const dataSources = {
    bookService: new BookService()
};
