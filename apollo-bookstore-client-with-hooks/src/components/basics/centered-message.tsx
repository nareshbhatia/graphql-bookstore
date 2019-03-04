import React from 'react';

import Typography from '@material-ui/core/Typography';
import { CenteredContainer } from '..';

export const CenteredMessage: React.FC<{}> = ({ children }) => {
    return (
        <CenteredContainer>
            <Typography variant="h5">{children}</Typography>
        </CenteredContainer>
    );
};

export const Loading = () => <CenteredMessage>Loading...</CenteredMessage>;

export const ErrorMessage: React.FC<{}> = children => (
    <CenteredMessage>{children}</CenteredMessage>
);
