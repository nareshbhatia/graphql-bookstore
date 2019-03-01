import React, { useState } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import { PanelHeader, ScrollingPaper } from '..';
import { AuthorDialog } from './author-dialog';
import { GetAuthors } from './__generated__/GetAuthors';

export interface AuthorsPanelProps {
    data: GetAuthors;
}

export const AuthorsPanel = ({ data: { authors } }: AuthorsPanelProps) => {
    const [showAuthorDialog, setShowAuthorDialog] = useState(false);
    const [isNewAuthor, setNewAuthor] = useState(true);
    const [editedAuthor, setEditedAuthor] = useState<any>(null);
    const createAuthor = useMutation(CREATE_AUTHOR);
    const updateAuthor = useMutation(UPDATE_AUTHOR);

    const editNewAuthor = () => {
        setShowAuthorDialog(true);
        setNewAuthor(true);
        setEditedAuthor({ name: '' });
    };

    const editAuthor = (author: any) => {
        setShowAuthorDialog(true);
        setNewAuthor(false);
        setEditedAuthor(Object.assign({}, author));
    };

    const hideAuthorDialog = () => {
        setShowAuthorDialog(false);
    };

    return (
        <React.Fragment>
            <PanelHeader title="Authors" onAddClicked={editNewAuthor} />
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
                                onClick={() => {
                                    editAuthor(author);
                                }}
                            >
                                <TableCell>{author.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollingPaper>

            {showAuthorDialog && isNewAuthor && (
                <AuthorDialog
                    author={editedAuthor}
                    onSave={author => {
                        createAuthor({
                            variables: {
                                name: author.name
                            }
                        });
                        hideAuthorDialog();
                    }}
                    onCancel={() => {
                        hideAuthorDialog();
                    }}
                />
            )}

            {showAuthorDialog && !isNewAuthor && (
                <AuthorDialog
                    author={editedAuthor}
                    onSave={author => {
                        updateAuthor({
                            variables: {
                                authorId: author.id,
                                name: author.name
                            }
                        });
                        hideAuthorDialog();
                    }}
                    onCancel={() => {
                        hideAuthorDialog();
                    }}
                />
            )}
        </React.Fragment>
    );
};

const CREATE_AUTHOR = gql`
    mutation CreateAuthor($name: String!) {
        createAuthor(name: $name) {
            id
            name
        }
    }
`;

const UPDATE_AUTHOR = gql`
    mutation UpdateAuthor($authorId: ID!, $name: String!) {
        updateAuthor(authorId: $authorId, name: $name) {
            id
            name
        }
    }
`;
