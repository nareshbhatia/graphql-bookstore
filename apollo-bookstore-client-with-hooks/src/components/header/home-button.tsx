import React from 'react';

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

const HomeButtonBase = ({ classes, rootStore }: HomeButtonProps) => {
    return (
        <IconButton
            className={classes.root}
            color="inherit"
            aria-label="Home"
            onClick={() => {
                rootStore!.routerStore.goTo('home');
            }}
        >
            <Apps />
        </IconButton>
    );
};

export const HomeButton = withStyles(styles)(
    inject('rootStore')(HomeButtonBase)
);
