import * as React from 'react';

import { DefaultQuery } from '..';
import { PublishersPanel } from './publishers-panel';
import { GET_PUBLISHERS } from './publishers-queries';

export class PublishersContainer extends React.Component {
    render() {
        return (
            <DefaultQuery query={GET_PUBLISHERS}>
                {({ data: { publishers } }) => {
                    return <PublishersPanel publishers={publishers} />;
                }}
            </DefaultQuery>
        );
    }
}
