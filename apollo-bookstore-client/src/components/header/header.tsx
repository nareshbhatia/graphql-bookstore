import * as React from 'react';

import AppBar from '@material-ui/core/AppBar';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { HomeButton } from './home-button';
import { SettingsButton } from './settings-button';

const styles = () =>
    createStyles({
        title: {
            flex: 1,
            fontSize: 18
        }
    });

export interface HeaderProps extends WithStyles<typeof styles> {}

export const Header = withStyles(styles)(
    class extends React.Component<HeaderProps> {
        public render() {
            const { classes } = this.props;

            return (
                <AppBar position="static">
                    <Toolbar>
                        <HomeButton />
                        <Typography
                            variant="h6"
                            color="inherit"
                            className={classes.title}
                        >
                            GraphQL Bookstore
                        </Typography>
                        <SettingsButton />
                    </Toolbar>
                </AppBar>
            );
        }
    }
);
