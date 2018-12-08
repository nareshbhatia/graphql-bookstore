import * as React from 'react';

import { DefaultQuery } from '..';
import { GET_AUTHORS } from '../authors/authors-queries';
import { GET_PUBLISHERS } from '../publishers/publishers-queries';
import { BooksPanel } from './books-panel';
import { GET_BOOKS } from './books-queries';

export class BooksContainer extends React.Component {
    render() {
        return (
            <DefaultQuery query={GET_BOOKS}>
                {({ data: { books } }) => {
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
}
