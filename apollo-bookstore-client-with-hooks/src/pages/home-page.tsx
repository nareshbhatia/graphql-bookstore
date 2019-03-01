import React from 'react';

import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import {
    AuthorsContainer,
    BooksContainer,
    FullHeightVerticalContainer,
    Header,
    PublishersContainer
} from '../components';

const styles = (theme: Theme) =>
    createStyles({
        topPanel: {
            flex: 1,
            display: 'flex',
            flexDirection: 'row'
        },
        leftPanel: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.unit * 2
        },
        rightPanel: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.unit * 2
        },
        bottomPanel: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.unit * 2
        }
    });

export interface HomePageProps extends WithStyles<typeof styles> {}

export const HomePage = withStyles(styles)(({ classes }: HomePageProps) => {
    return (
        <FullHeightVerticalContainer>
            <Header />
            <div className={classes.topPanel}>
                <div className={classes.leftPanel}>
                    <PublishersContainer />
                </div>
                <div className={classes.rightPanel}>
                    <AuthorsContainer />
                </div>
            </div>
            <div className={classes.bottomPanel}>
                <BooksContainer />
            </div>
        </FullHeightVerticalContainer>
    );
});
