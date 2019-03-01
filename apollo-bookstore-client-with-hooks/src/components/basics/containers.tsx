import React from 'react';

import Paper from '@material-ui/core/Paper';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import classNames from 'classnames';

const styles = (theme: Theme) =>
    createStyles({
        horizontalContainer: {
            display: 'flex',
            flexDirection: 'row'
        },
        verticalContainer: {
            display: 'flex',
            flexDirection: 'column'
        },
        fullHeightVerticalContainer: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
        },
        centeredContainer: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: theme.spacing.unit
        },
        scrollingContent: {
            flex: 1,
            overflow: 'auto',
            padding: theme.spacing.unit
        },
        scrollingPaper: {
            flex: 1,
            overflow: 'auto'
        }
    });

export interface ContainerProps extends WithStyles<typeof styles> {
    className?: string;
    children?: any;
}

/**
 * HorizontalContainer
 */
export const HorizontalContainer = withStyles(styles)(
    ({ classes, className: classNameProp, children }: ContainerProps) => {
        const className = classNames(
            classes.horizontalContainer,
            classNameProp
        );
        return <div className={className}>{children}</div>;
    }
);

/**
 * VerticalContainer
 */
export const VerticalContainer = withStyles(styles)(
    ({ classes, className: classNameProp, children }: ContainerProps) => {
        const className = classNames(classes.verticalContainer, classNameProp);
        return <div className={className}>{children}</div>;
    }
);

/**
 * FullHeightVerticalContainer - parent should be flex-direction: column
 */
export const FullHeightVerticalContainer = withStyles(styles)(
    ({ classes, className: classNameProp, children }: ContainerProps) => {
        const className = classNames(
            classes.fullHeightVerticalContainer,
            classNameProp
        );
        return <div className={className}>{children}</div>;
    }
);

/**
 * CenteredContainer - parent should be flex-direction: column
 */
export const CenteredContainer = withStyles(styles)(
    ({ classes, className: classNameProp, children }: ContainerProps) => {
        const className = classNames(classes.centeredContainer, classNameProp);
        return <div className={className}>{children}</div>;
    }
);

/**
 * ScrollingContent - parent should be flex-direction: column
 */
export const ScrollingContent = withStyles(styles)(
    ({ classes, className: classNameProp, children }: ContainerProps) => {
        const className = classNames(classes.scrollingContent, classNameProp);
        return <div className={className}>{children}</div>;
    }
);

/**
 * ScrollingPaper - parent should be flex-direction: column
 */
export const ScrollingPaper = withStyles(styles)(
    ({ classes, className: classNameProp, children }: ContainerProps) => {
        const className = classNames(classes.scrollingPaper, classNameProp);
        return <Paper className={className}>{children}</Paper>;
    }
);
