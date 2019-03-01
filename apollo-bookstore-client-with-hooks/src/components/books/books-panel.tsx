import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { DataProxy } from 'apollo-cache';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import { PanelHeader, ScrollingPaper } from '..';
import { GetAuthors } from '../authors/__generated__/GetAuthors';
import { GetPublishers } from '../publishers/__generated__/GetPublishers';
import { AuthorsDialog } from './authors-dialog';
import { BookDialog } from './book-dialog';
import { BOOK_FRAGMENT, GET_BOOKS } from './books-queries';
import { GetBooks } from './__generated__/GetBooks';
import { CreateBookVariables } from './__generated__/CreateBook';
import { UpdateBookVariables } from './__generated__/UpdateBook';
import { SetBookAuthorsVariables } from './__generated__/SetBookAuthors';

export interface BooksPanelProps {
    dataBooks: GetBooks;
    dataAuthors: GetAuthors;
    dataPublishers: GetPublishers;
}

export const BooksPanel = ({
    dataBooks: { books },
    dataAuthors: { authors },
    dataPublishers: { publishers }
}: BooksPanelProps) => {
    const [showBookDialog, setShowBookDialog] = useState(false);
    const [showAuthorsDialog, setShowAuthorsDialog] = useState(false);
    const [isNewBook, setNewBook] = useState(true);
    const [editedBook, setEditedBook] = useState<any>(null);
    const createBook = useMutation(CREATE_BOOK);
    const updateBook = useMutation(UPDATE_BOOK);
    const setBookAuthors = useMutation(SET_BOOK_AUTHORS);

    const editNewBook = () => {
        setShowBookDialog(true);
        setNewBook(true);
        setEditedBook({ name: '', publisherId: '' });
    };

    const editBook = (book: any) => {
        setShowBookDialog(true);
        setNewBook(false);
        setEditedBook(
            Object.assign({}, book, {
                publisherId: book.publisher.id
            })
        );
    };

    const editAuthors = (book: any) => {
        setShowAuthorsDialog(true);
        setNewBook(false);
        setEditedBook(
            Object.assign({}, book, {
                publisherId: book.publisher.id
            })
        );
    };

    const hideBookDialog = () => {
        setShowBookDialog(false);
    };

    const hideAuthorsDialog = () => {
        setShowAuthorsDialog(false);
    };

    return (
        <React.Fragment>
            <PanelHeader title="Books" onAddClicked={editNewBook} />
            <ScrollingPaper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Publisher</TableCell>
                            <TableCell>Authors</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map(book => (
                            <TableRow
                                hover
                                key={book.id}
                                onClick={() => {
                                    editBook(book);
                                }}
                            >
                                <TableCell>{book.name}</TableCell>
                                <TableCell>{book.publisher.name}</TableCell>
                                <TableCell>
                                    {book.authors
                                        .map(author => author.name)
                                        .join(', ')}
                                </TableCell>
                                <TableCell
                                    onClick={(e: any) => {
                                        e.stopPropagation();
                                    }}
                                >
                                    <Button
                                        onClick={() => {
                                            editAuthors(book);
                                        }}
                                    >
                                        Edit Authors
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollingPaper>

            {showBookDialog && isNewBook && (
                <BookDialog
                    book={editedBook}
                    publishers={publishers}
                    onSave={book => {
                        const variables: CreateBookVariables = {
                            book: {
                                name: book.name,
                                publisherId: book.publisherId
                            }
                        };
                        createBook({
                            variables,
                            // Update BooksQuery in Apollo cache
                            // Needed only in this "Create" case
                            update: updateBooksQuery
                        });
                        hideBookDialog();
                    }}
                    onCancel={() => {
                        hideBookDialog();
                    }}
                />
            )}

            {showBookDialog && !isNewBook && (
                <BookDialog
                    book={editedBook}
                    publishers={publishers}
                    onSave={book => {
                        const variables: UpdateBookVariables = {
                            bookId: book.id,
                            book: {
                                name: book.name,
                                publisherId: book.publisherId
                            }
                        };
                        updateBook({ variables });
                        hideBookDialog();
                    }}
                    onCancel={() => {
                        hideBookDialog();
                    }}
                />
            )}

            {showAuthorsDialog && (
                <AuthorsDialog
                    book={editedBook}
                    authors={authors}
                    onSave={(bookId: string, authorIds: Array<string>) => {
                        const variables: SetBookAuthorsVariables = {
                            bookId,
                            authorIds
                        };
                        setBookAuthors({ variables });
                        hideAuthorsDialog();
                    }}
                    onCancel={() => {
                        hideAuthorsDialog();
                    }}
                />
            )}
        </React.Fragment>
    );
};

function findBook(books: Array<any>, bookId: string) {
    return books.find(book => book.id === bookId);
}

// Function to update BooksQuery in Apollo cache
// Needed only in the CREATE_BOOK use case
function updateBooksQuery(store: DataProxy, result: any) {
    const resultBook = result.data.createBook;
    const storeData = store.readQuery({
        query: GET_BOOKS
    }) as any;
    // Don't double add the book
    if (!findBook(storeData.books, resultBook.id)) {
        storeData.books.push(resultBook);
        store.writeQuery({
            query: GET_BOOKS,
            data: storeData
        });
    }
}

const CREATE_BOOK = gql`
    mutation CreateBook($book: BookInput!) {
        createBook(book: $book) {
            ...BookFragment
        }
    }

    ${BOOK_FRAGMENT}
`;

const UPDATE_BOOK = gql`
    mutation UpdateBook($bookId: ID!, $book: BookInput!) {
        updateBook(bookId: $bookId, book: $book) {
            ...BookFragment
        }
    }

    ${BOOK_FRAGMENT}
`;

const SET_BOOK_AUTHORS = gql`
    mutation SetBookAuthors($bookId: ID!, $authorIds: [ID!]!) {
        setBookAuthors(bookId: $bookId, authorIds: $authorIds) {
            ...BookFragment
        }
    }

    ${BOOK_FRAGMENT}
`;
