import * as React from 'react';

import { DefaultQuery } from '..';
import { AuthorsPanel } from './authors-panel';
import { GET_AUTHORS } from './authors-queries';

export class AuthorsContainer extends React.Component {
    render() {
        return (
            <DefaultQuery query={GET_AUTHORS}>
                {({ data: { authors } }) => {
                    return <AuthorsPanel authors={authors} />;
                }}
            </DefaultQuery>
        );
    }
}
