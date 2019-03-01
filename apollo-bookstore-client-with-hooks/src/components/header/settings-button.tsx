import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Settings from '@material-ui/icons/Settings';
import { inject } from 'mobx-react';
import { RootStore } from '../../stores';

export interface SettingsButtonProps {
    rootStore?: RootStore;
}

const SettingsButtonBase = ({ rootStore }: SettingsButtonProps) => {
    return (
        <IconButton
            color="inherit"
            aria-label="Settings"
            onClick={() => {
                rootStore!.routerStore.goTo('settings');
            }}
        >
            <Settings />
        </IconButton>
    );
};

export const SettingsButton = inject('rootStore')(SettingsButtonBase);
