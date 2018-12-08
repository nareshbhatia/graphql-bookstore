import * as React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { PanelHeader, ScrollingPaper } from '..';
import { GetPublishers_publishers } from './__generated__/GetPublishers';

export interface PublishersPanelProps {
    publishers: Array<GetPublishers_publishers>;
}

export class PublishersPanel extends React.Component<PublishersPanelProps> {
    public render() {
        const { publishers } = this.props;

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
            </React.Fragment>
        );
    }

    editNewPublisher = () => {
        console.log('editNewPublisher');
    };

    editPublisher = publisher => {
        console.log('editPublisher', publisher.name);
    };
}
