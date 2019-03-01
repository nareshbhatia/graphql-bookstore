import React from 'react';

import Button from '@material-ui/core/Button';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }
    });

export interface PanelHeaderProps extends WithStyles<typeof styles> {
    title: string;
    onAddClicked: React.EventHandler<any>;
}

export const PanelHeader = withStyles(styles)(
    ({ classes, title, onAddClicked }: PanelHeaderProps) => {
        return (
            <div className={classes.root}>
                <Typography variant="h6">{title}</Typography>
                <Button size="small" color="primary" onClick={onAddClicked}>
                    Add
                </Button>
            </div>
        );
    }
);
