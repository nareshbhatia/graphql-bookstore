import React, { ReactElement } from 'react';

import { CenteredMessage } from './centered-message';

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
        return <CenteredMessage>Loading...</CenteredMessage>;
    }

    if (error) {
        return <CenteredMessage>{error.message}</CenteredMessage>;
    }

    return children as ReactElement<any>;
};
