import * as React from 'react';

import gql from 'graphql-tag';
import { DefaultQuery } from '..';
import { MutationType } from '../../graphql-types';
import { GET_AUTHORS } from '../authors/authors-queries';
import { GET_PUBLISHERS } from '../publishers/publishers-queries';
import { BooksPanel } from './books-panel';
import { BOOK_FRAGMENT, GET_BOOKS } from './books-queries';
import { BookMutated } from './__generated__/BookMutated';

export class BooksContainer extends React.Component {
    unsubscribe = null;

    render() {
        return (
            <DefaultQuery query={GET_BOOKS}>
                {({ data: { books }, subscribeToMore }) => {
                    // Subscribe to book mutations - only once
                    if (!this.unsubscribe) {
                        this.unsubscribe = subscribeToBookMutations(
                            subscribeToMore
                        );
                    }

                    return (
                        <DefaultQuery query={GET_AUTHORS}>
                            {({ data: { authors } }) => (
                                <DefaultQuery query={GET_PUBLISHERS}>
                                    {({ data: { publishers } }) => (
                                        <BooksPanel
                                            books={books}
                                            authors={authors}
                                            publishers={publishers}
                                        />
                                    )}
                                </DefaultQuery>
                            )}
                        </DefaultQuery>
                    );
                }}
            </DefaultQuery>
        );
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
}

function subscribeToBookMutations(subscribeToMore) {
    return subscribeToMore({
        document: BOOK_MUTATED,
        updateQuery: (prev, { subscriptionData }) => {
            const data: BookMutated = subscriptionData.data;
            if (!data) return prev;

            const bookMutated = data.bookMutated;

            switch (bookMutated.mutation) {
                case MutationType.CREATED: {
                    const newBook = bookMutated.node;
                    // Don't double add the book
                    if (findBook(prev.books, newBook.id)) {
                        return prev;
                    } else {
                        // Book not found, add it
                        return Object.assign({}, prev, {
                            books: [...prev.books, newBook]
                        });
                    }
                }
                case MutationType.UPDATED: {
                    const updatedBook = bookMutated.node;
                    // Replace previous book with updated one
                    return Object.assign({}, prev, {
                        books: prev.books.map(book =>
                            book.id === updatedBook.id ? updatedBook : book
                        )
                    });
                }
                case MutationType.DELETED: {
                    const deletedBook = bookMutated.node;
                    // Delete book
                    return Object.assign({}, prev, {
                        books: prev.books.filter(
                            book => book.id !== deletedBook.id
                        )
                    });
                }
                default:
                    return prev;
            }
        }
    });
}

function findBook(books, bookId) {
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
