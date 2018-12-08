import * as React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Settings from '@material-ui/icons/Settings';
import { inject } from 'mobx-react';
import { RootStore } from '../../stores';

export interface SettingsButtonProps {
    rootStore?: RootStore;
}

export const SettingsButton = inject('rootStore')(
    class extends React.Component<SettingsButtonProps> {
        public render() {
            return (
                <IconButton
                    color="inherit"
                    onClick={this.handleSettingsClicked}
                    aria-label="Settings"
                >
                    <Settings />
                </IconButton>
            );
        }

        handleSettingsClicked = () => {
            const { rootStore } = this.props;
            const { routerStore } = rootStore!;
            routerStore.goTo('settings');
        };
    }
);
