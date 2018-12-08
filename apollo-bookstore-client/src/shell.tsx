import * as React from 'react';

import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { inject } from 'mobx-react';
import { RouterView, ViewMap } from 'mobx-state-router';
import { HomePage } from './pages/home-page';
import { NotFoundPage } from './pages/not-found-page';
import { SettingsPage } from './pages/settings-page';
import { RootStore } from './stores';

const styles = (theme: Theme) =>
    createStyles({
        '@global': {
            html: {
                height: '100%',
                boxSizing: 'border-box'
            },
            '*, *:before, *:after': {
                boxSizing: 'inherit'
            },
            body: {
                height: '100%',
                margin: 0,
                background: theme.palette.background.default,
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.fontSize,
                color: theme.palette.text.primary,

                // Helps fonts on OSX look more consistent with other systems
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',

                // Use momentum-based scrolling on iOS devices
                WebkitOverflowScrolling: 'touch'
            },
            '#root': {
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }
        },
        root: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
        }
    });

const viewMap: ViewMap = {
    home: <HomePage />,
    notFound: <NotFoundPage />,
    settings: <SettingsPage />
};

export interface ShellProps extends WithStyles<typeof styles> {
    rootStore?: RootStore;
}

export const Shell = withStyles(styles)(
    inject('rootStore')(
        class extends React.Component<ShellProps> {
            public render() {
                const { classes, rootStore } = this.props;
                const { routerStore } = rootStore!;

                return (
                    <div className={classes.root}>
                        <RouterView
                            routerStore={routerStore}
                            viewMap={viewMap}
                        />
                    </div>
                );
            }
        }
    )
);
