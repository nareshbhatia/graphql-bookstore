import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import {
    CenteredContainer,
    FullHeightVerticalContainer,
    Header
} from '../components';

export function NotFoundPage() {
    return (
        <FullHeightVerticalContainer>
            <Header />
            <CenteredContainer>
                <Typography variant="h3" color="textSecondary">
                    Page Not Found
                </Typography>
            </CenteredContainer>
        </FullHeightVerticalContainer>
    );
}
