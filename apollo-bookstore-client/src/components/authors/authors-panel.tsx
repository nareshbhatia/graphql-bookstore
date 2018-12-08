import * as React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { PanelHeader, ScrollingPaper } from '..';
import { GetAuthors_authors } from './__generated__/GetAuthors';

export interface AuthorsPanelProps {
    authors: Array<GetAuthors_authors>;
}

export class AuthorsPanel extends React.Component<AuthorsPanelProps> {
    public render() {
        const { authors } = this.props;

        return (
            <React.Fragment>
                <PanelHeader
                    title="Authors"
                    onAddClicked={this.editNewAuthor}
                />
                <ScrollingPaper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {authors.map(author => (
                                <TableRow
                                    hover
                                    key={author.id}
                                    onClick={() => this.editAuthor(author)}
                                >
                                    <TableCell>{author.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ScrollingPaper>
            </React.Fragment>
        );
    }

    editNewAuthor = () => {
        console.log('editNewAuthor');
    };

    editAuthor = author => {
        console.log('editAuthor', author.name);
    };
}
