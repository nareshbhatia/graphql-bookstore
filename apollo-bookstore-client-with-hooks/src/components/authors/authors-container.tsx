import React from 'react';

import { useQuery } from 'react-apollo-hooks';
import { HandleQuery } from '..';
import { AuthorsPanel } from './authors-panel';
import { GET_AUTHORS } from './authors-queries';

export const AuthorsContainer = () => {
    const { loading, error, data } = useQuery(GET_AUTHORS);
    return (
        <HandleQuery loading={loading} error={error}>
            <AuthorsPanel data={data} />
        </HandleQuery>
    );
};
