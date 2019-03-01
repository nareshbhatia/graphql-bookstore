import React from 'react';

import { useQuery } from 'react-apollo-hooks';
import { HandleQuery } from '..';
import { PublishersPanel } from './publishers-panel';
import { GET_PUBLISHERS } from './publishers-queries';

export const PublishersContainer = () => {
    const { loading, error, data } = useQuery(GET_PUBLISHERS);
    return (
        <HandleQuery loading={loading} error={error}>
            <PublishersPanel data={data} />
        </HandleQuery>
    );
};
