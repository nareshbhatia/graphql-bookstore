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
import { PublisherDialog } from './publisher-dialog';
import { GET_PUBLISHERS } from './publishers-queries';
import { GetPublishers } from './__generated__/GetPublishers';

export interface PublishersPanelProps {
    data: GetPublishers;
}

@observer
export class PublishersPanel extends React.Component<PublishersPanelProps> {
    @observable showPublisherDialog = false;

    @observable isNewPublisher;

    @observable editedPublisher;

    public render() {
        const {
            data: { publishers }
        } = this.props;

        return (
            <React.Fragment>
                <PanelHeader
                    title="Publishers"
                    onAddClicked={this.editNewPublisher}
                />
                <ScrollingPaper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {publishers.map(publisher => (
                                <TableRow
                                    hover
                                    key={publisher.id}
                                    onClick={() =>
                                        this.editPublisher(publisher)
                                    }
                                >
                                    <TableCell>{publisher.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ScrollingPaper>

                {this.showPublisherDialog && this.isNewPublisher && (
                    <Mutation mutation={CREATE_PUBLISHER}>
                        {createPublisher => (
                            <PublisherDialog
                                publisher={this.editedPublisher}
                                onSave={publisher => {
                                    createPublisher({
                                        variables: {
                                            name: publisher.name
                                        },
                                        // Update PublishersQuery in Apollo cache
                                        // Needed only in this "Create" case
                                        update: updatePublishersQuery
                                    });
                                    this.hidePublisherDialog();
                                }}
                                onCancel={this.hidePublisherDialog}
                            />
                        )}
                    </Mutation>
                )}

                {this.showPublisherDialog && !this.isNewPublisher && (
                    <Mutation mutation={UPDATE_PUBLISHER}>
                        {updatePublisher => (
                            <PublisherDialog
                                publisher={this.editedPublisher}
                                onSave={publisher => {
                                    updatePublisher({
                                        variables: {
                                            publisherId: publisher.id,
                                            name: publisher.name
                                        }
                                    });
                                    this.hidePublisherDialog();
                                }}
                                onCancel={this.hidePublisherDialog}
                            />
                        )}
                    </Mutation>
                )}
            </React.Fragment>
        );
    }

    @action
    editNewPublisher = () => {
        this.showPublisherDialog = true;
        this.isNewPublisher = true;
        this.editedPublisher = { name: '' };
    };

    @action
    editPublisher = publisher => {
        this.showPublisherDialog = true;
        this.isNewPublisher = false;
        this.editedPublisher = Object.assign({}, publisher);
    };

    @action
    hidePublisherDialog = () => {
        this.showPublisherDialog = false;
    };
}

function findPublisher(publishers, publisherId) {
    return publishers.find(publisher => publisher.id === publisherId);
}

// Function to update PublishersQuery in Apollo cache
// Needed only in this CREATE_PUBLISHER case
function updatePublishersQuery(store, { data: { createPublisher } }) {
    const data = store.readQuery({
        query: GET_PUBLISHERS
    }) as any;
    // Don't double add the publisher
    if (!findPublisher(data.publishers, createPublisher.id)) {
        data.publishers.push(createPublisher);
        store.writeQuery({
            query: GET_PUBLISHERS,
            data
        });
    }
}

const CREATE_PUBLISHER = gql`
    mutation CreatePublisher($name: String!) {
        createPublisher(name: $name) {
            id
            name
        }
    }
`;

const UPDATE_PUBLISHER = gql`
    mutation UpdatePublisher($publisherId: ID!, $name: String!) {
        updatePublisher(publisherId: $publisherId, name: $name) {
            id
            name
        }
    }
`;
