import React from 'react';

import { useQuery } from 'react-apollo-hooks';
import { HandleQuery } from '..';
import { GET_AUTHORS } from '../authors/authors-queries';
import { GET_PUBLISHERS } from '../publishers/publishers-queries';
import { BooksPanel } from './books-panel';
import { GET_BOOKS } from './books-queries';

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
    const error = errorBooks
        ? errorBooks
        : errorAuthors
        ? errorAuthors
        : errorPublishers;

    return (
        <HandleQuery loading={loading} error={error}>
            <BooksPanel
                dataBooks={dataBooks}
                dataAuthors={dataAuthors}
                dataPublishers={dataPublishers}
            />
        </HandleQuery>
    );
};
