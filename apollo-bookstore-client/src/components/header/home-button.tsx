import * as React from 'react';

import IconButton from '@material-ui/core/IconButton';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Apps from '@material-ui/icons/Apps';
import { inject } from 'mobx-react';
import { RootStore } from '../../stores';

const styles = () =>
    createStyles({
        root: {
            marginLeft: -12
        }
    });

export interface HomeButtonProps extends WithStyles<typeof styles> {
    rootStore?: RootStore;
}

export const HomeButton = withStyles(styles)(
    inject('rootStore')(
        class extends React.Component<HomeButtonProps> {
            public render() {
                const { classes } = this.props;

                return (
                    <IconButton
                        className={classes.root}
                        color="inherit"
                        onClick={this.handleHomeClicked}
                        aria-label="Home"
                    >
                        <Apps />
                    </IconButton>
                );
            }

            handleHomeClicked = () => {
                const { rootStore } = this.props;
                const { routerStore } = rootStore!;
                routerStore.goTo('home');
            };
        }
    )
);
