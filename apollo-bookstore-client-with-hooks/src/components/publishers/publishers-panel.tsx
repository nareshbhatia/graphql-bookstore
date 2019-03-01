import React, { useState } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import { PanelHeader, ScrollingPaper } from '..';
import { PublisherDialog } from './publisher-dialog';
import { GetPublishers } from './__generated__/GetPublishers';

export interface PublishersPanelProps {
    data: GetPublishers;
}

export const PublishersPanel = ({
    data: { publishers }
}: PublishersPanelProps) => {
    const [showPublisherDialog, setShowPublisherDialog] = useState(false);
    const [isNewPublisher, setNewPublisher] = useState(true);
    const [editedPublisher, setEditedPublisher] = useState<any>(null);
    const createPublisher = useMutation(CREATE_PUBLISHER);
    const updatePublisher = useMutation(UPDATE_PUBLISHER);

    const editNewPublisher = () => {
        setShowPublisherDialog(true);
        setNewPublisher(true);
        setEditedPublisher({ name: '' });
    };

    const editPublisher = (publisher: any) => {
        setShowPublisherDialog(true);
        setNewPublisher(false);
        setEditedPublisher(Object.assign({}, publisher));
    };

    const hidePublisherDialog = () => {
        setShowPublisherDialog(false);
    };

    return (
        <React.Fragment>
            <PanelHeader title="Publishers" onAddClicked={editNewPublisher} />
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
                                onClick={() => {
                                    editPublisher(publisher);
                                }}
                            >
                                <TableCell>{publisher.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollingPaper>

            {showPublisherDialog && isNewPublisher && (
                <PublisherDialog
                    publisher={editedPublisher}
                    onSave={publisher => {
                        createPublisher({
                            variables: {
                                name: publisher.name
                            }
                        });
                        hidePublisherDialog();
                    }}
                    onCancel={() => {
                        hidePublisherDialog();
                    }}
                />
            )}

            {showPublisherDialog && !isNewPublisher && (
                <PublisherDialog
                    publisher={editedPublisher}
                    onSave={publisher => {
                        updatePublisher({
                            variables: {
                                publisherId: publisher.id,
                                name: publisher.name
                            }
                        });
                        hidePublisherDialog();
                    }}
                    onCancel={() => {
                        hidePublisherDialog();
                    }}
                />
            )}
        </React.Fragment>
    );
};

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
