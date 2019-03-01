import React from 'react';

import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { Header } from '..';
import { FullHeightVerticalContainer, ScrollingContent } from './containers';

const styles = (theme: Theme) =>
    createStyles({
        content: {
            paddingLeft: theme.spacing.unit * 2,
            paddingRight: theme.spacing.unit * 2
        }
    });

export interface PageProps extends WithStyles<typeof styles> {
    children?: any;
}

export const Page = withStyles(styles)(({ classes, children }: PageProps) => {
    return (
        <FullHeightVerticalContainer>
            <Header />
            <ScrollingContent className={classes.content}>
                {children}
            </ScrollingContent>
        </FullHeightVerticalContainer>
    );
});
