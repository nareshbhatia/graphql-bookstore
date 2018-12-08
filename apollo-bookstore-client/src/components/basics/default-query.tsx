import * as React from 'react';

import { Query } from 'react-apollo';
import { CenteredMessage } from './centered-message';

export const DefaultQuery = ({ query, variables = {}, children }) => (
    <Query query={query} variables={variables}>
        {({ loading, error, data, fetchMore, subscribeToMore }) => {
            if (loading) {
                return <CenteredMessage>Loading...</CenteredMessage>;
            }

            if (error) {
                return <CenteredMessage>{error.message}</CenteredMessage>;
            }

            return children({ data, fetchMore, subscribeToMore });
        }}
    </Query>
);
