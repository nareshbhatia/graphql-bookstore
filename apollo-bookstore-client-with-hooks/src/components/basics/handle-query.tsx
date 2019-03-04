import React, { ReactElement } from 'react';

import { ErrorMessage, Loading } from '..';

export interface HandleQueryProps {
    loading: boolean;
    error?: Error;
}

export const HandleQuery: React.FC<HandleQueryProps> = ({
    loading,
    error,
    children
}) => {
    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorMessage>{error.message}</ErrorMessage>;
    }

    return children as ReactElement<any>;
};
