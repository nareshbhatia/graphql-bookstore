import React from 'react';

import gql from 'graphql-tag';
import { useQuery, useSubscription } from 'react-apollo-hooks';
import { Loading } from '..';
import { MutationType } from '../../graphql-types';
import { GET_AUTHORS } from '../authors/authors-queries';
import { GET_PUBLISHERS } from '../publishers/publishers-queries';
import { BooksPanel } from './books-panel';
import { BOOK_FRAGMENT, GET_BOOKS } from './books-queries';
import { BookMutated } from './__generated__/BookMutated';

export const BooksContainer = () => {
    const {
        loading: loadingBooks,
        error: errorBooks,
        data: dataBooks
    } = useQuery(GET_BOOKS);

    const {
        loading: loadingAuthors,
        error: errorAuthors,
        data: dataAuthors
    } = useQuery(GET_AUTHORS);

    const {
        loading: loadingPublishers,
        error: errorPublishers,
        data: dataPublishers
    } = useQuery(GET_PUBLISHERS);

    const loading = loadingBooks || loadingAuthors || loadingPublishers;

    if (errorBooks) {
        throw errorBooks;
    }
    if (errorAuthors) {
        throw errorAuthors;
    }
    if (errorPublishers) {
        throw errorPublishers;
    }

    useSubscription(BOOK_MUTATED, {
        onSubscriptionData: ({ client, subscriptionData }) => {
            // Get the current value of books query
            const prevData = client.readQuery({
                query: GET_BOOKS
            }) as any;

            // Extract mutation type and book from the subscription data
            const bookMutatedWrapper: BookMutated = subscriptionData.data;
            const { bookMutated } = bookMutatedWrapper;
            const { mutation, node: subsBook } = bookMutated;

            // Determine the next value of books query
            let nextData;
            switch (mutation) {
                case MutationType.CREATED: {
                    // Don't double add the book
                    if (!findBook(prevData.books, subsBook.id)) {
                        nextData = Object.assign({}, prevData, {
                            books: [...prevData.books, subsBook]
                        });
                    }
                    break;
                }
                case MutationType.UPDATED: {
                    // Replace previous book with updated one
                    nextData = Object.assign({}, prevData, {
                        books: prevData.books.map((book: any) =>
                            book.id === subsBook.id ? subsBook : book
                        )
                    });
                    break;
                }
                case MutationType.DELETED: {
                    // Delete book
                    nextData = Object.assign({}, prevData, {
                        books: prevData.books.filter(
                            (book: any) => book.id !== subsBook.id
                        )
                    });
                    break;
                }
            }

            // Write updated store data
            if (nextData) {
                client.writeQuery({
                    query: GET_BOOKS,
                    data: nextData
                });
            }
        }
    });

    return loading ? (
        <Loading />
    ) : (
        <BooksPanel
            dataBooks={dataBooks}
            dataAuthors={dataAuthors}
            dataPublishers={dataPublishers}
        />
    );
};

function findBook(books: Array<any>, bookId: string) {
    return books.find(book => book.id === bookId);
}

const BOOK_MUTATED = gql`
    subscription BookMutated {
        bookMutated {
            mutation
            node {
                __typename
                ...BookFragment
            }
        }
    }

    ${BOOK_FRAGMENT}
`;
