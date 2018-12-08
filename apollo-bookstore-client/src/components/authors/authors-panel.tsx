import * as React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import gql from 'graphql-tag';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import { Mutation } from 'react-apollo';
import { PanelHeader, ScrollingPaper } from '..';
import { AuthorDialog } from './author-dialog';
import { GET_AUTHORS } from './authors-queries';
import { GetAuthors_authors } from './__generated__/GetAuthors';

export interface AuthorsPanelProps {
    authors: Array<GetAuthors_authors>;
}

@observer
export class AuthorsPanel extends React.Component<AuthorsPanelProps> {
    @observable showAuthorDialog = false;

    @observable isNewAuthor;

    @observable editedAuthor;

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

                {this.showAuthorDialog && this.isNewAuthor && (
                    <Mutation mutation={CREATE_AUTHOR}>
                        {createAuthor => (
                            <AuthorDialog
                                author={this.editedAuthor}
                                onSave={author => {
                                    createAuthor({
                                        variables: {
                                            name: author.name
                                        },
                                        // Update AuthorsQuery in Apollo cache
                                        // Needed only in this "Create" case
                                        // TODO: Does not work. See
                                        // https://github.com/apollographql/apollo-client/issues/2415
                                        update: (
                                            store,
                                            { data: { createAuthor } }
                                        ) => {
                                            const data = store.readQuery({
                                                query: GET_AUTHORS
                                            }) as any;
                                            data.authors.push(createAuthor);
                                            store.writeQuery({
                                                query: GET_AUTHORS,
                                                data
                                            });
                                        }
                                    });
                                    this.hideAuthorDialog();
                                }}
                                onCancel={this.hideAuthorDialog}
                            />
                        )}
                    </Mutation>
                )}

                {this.showAuthorDialog && !this.isNewAuthor && (
                    <Mutation mutation={UPDATE_AUTHOR}>
                        {updateAuthor => (
                            <AuthorDialog
                                author={this.editedAuthor}
                                onSave={author => {
                                    updateAuthor({
                                        variables: {
                                            authorId: author.id,
                                            name: author.name
                                        }
                                    });
                                    this.hideAuthorDialog();
                                }}
                                onCancel={this.hideAuthorDialog}
                            />
                        )}
                    </Mutation>
                )}
            </React.Fragment>
        );
    }

    @action
    editNewAuthor = () => {
        this.showAuthorDialog = true;
        this.isNewAuthor = true;
        this.editedAuthor = { name: '' };
    };

    @action
    editAuthor = author => {
        this.showAuthorDialog = true;
        this.isNewAuthor = false;
        this.editedAuthor = Object.assign({}, author);
    };

    @action
    hideAuthorDialog = () => {
        this.showAuthorDialog = false;
    };
}

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
