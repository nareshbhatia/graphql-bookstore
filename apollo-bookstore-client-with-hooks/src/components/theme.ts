import red from '@material-ui/core/colors/red';
import createMuiTheme, { Theme } from '@material-ui/core/styles/createMuiTheme';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { TypographyOptions } from '@material-ui/core/styles/createTypography';
import { Overrides } from '@material-ui/core/styles/overrides';

export function getTheme(): Theme {
    const palette: PaletteOptions = {
        primary: {
            main: '#1277eb',
            dark: '#0366d6'
        },
        secondary: {
            main: '#28a745'
        },
        error: {
            main: red.A400
        }
    };

    const typography: TypographyOptions = {
        useNextVariants: true
    };

    const overrides: Overrides = {
        MuiButton: {
            root: {
                fontSize: 11,
                minWidth: 60,
                minHeight: 21,
                padding: '3px 8px'
            }
        }
    };

    return createMuiTheme({ palette, typography, overrides });
}
