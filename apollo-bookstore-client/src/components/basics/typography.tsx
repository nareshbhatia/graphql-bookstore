import * as React from 'react';

import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

const styles = (theme: Theme) =>
    createStyles({
        pageTitle: {
            marginTop: theme.spacing.unit * 2
        }
    });

export interface TextProps extends WithStyles<typeof styles> {
    className?: string;
    children?: any;
}

export const PageTitle = withStyles(styles)(
    ({ classes, className: classNameProp, children }: TextProps) => {
        const className = classNames(classes.pageTitle, classNameProp);
        return (
            <Typography variant="h5" className={className}>
                {children}
            </Typography>
        );
    }
);
