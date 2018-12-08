import * as React from 'react';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { PanelHeader, ScrollingPaper } from '..';
import { GetAuthors_authors } from '../authors/__generated__/GetAuthors';
import { GetPublishers_publishers } from '../publishers/__generated__/GetPublishers';
import { GetBooks_books } from './__generated__/GetBooks';

export interface BooksPanelProps {
    books: Array<GetBooks_books>;
    authors: Array<GetAuthors_authors>;
    publishers: Array<GetPublishers_publishers>;
}

export class BooksPanel extends React.Component<BooksPanelProps> {
    public render() {
        const { books, authors, publishers } = this.props;

        return (
            <React.Fragment>
                <PanelHeader title="Books" onAddClicked={this.editNewBook} />
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
                                    onClick={() => this.editBook(book)}
                                >
                                    <TableCell>{book.name}</TableCell>
                                    <TableCell>{book.publisher.name}</TableCell>
                                    <TableCell>
                                        {book.authors
                                            .map(author => author.name)
                                            .join(', ')}
                                    </TableCell>
                                    <TableCell
                                        onClick={e => {
                                            e.stopPropagation();
                                        }}
                                    >
                                        <Button
                                            onClick={() =>
                                                this.editAuthors(book)
                                            }
                                        >
                                            Edit Authors
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ScrollingPaper>
            </React.Fragment>
        );
    }

    editNewBook = () => {
        console.log('editNewBook');
    };

    editBook = book => {
        console.log('editBook', book.name);
    };

    editAuthors = book => {
        console.log('editAuthors', book.name);
    };
}
