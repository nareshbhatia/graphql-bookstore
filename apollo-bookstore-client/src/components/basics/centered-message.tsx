import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import { CenteredContainer } from '..';

export const CenteredMessage = ({ children }) => {
    return (
        <CenteredContainer>
            <Typography variant="h5">{children}</Typography>
        </CenteredContainer>
    );
};
