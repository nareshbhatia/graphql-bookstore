import * as React from 'react';

import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';

const styles = theme =>
    createStyles({
        dialogPaper: {
            width: 400
        },
        content: {
            display: 'flex',
            flexDirection: 'column'
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap'
        },
        chip: {
            margin: theme.spacing.unit / 4
        }
    });

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

interface SaveAuthorsFunc {
    (bookId, authorIds: Array<string>): void;
}

export interface AuthorsDialogProps extends WithStyles<typeof styles> {
    book: any;
    authors: Array<any>;
    onSave: SaveAuthorsFunc;
    onCancel: React.EventHandler<any>;
}

export interface AuthorsDialogState {
    authorIds: Array<string>;
}

export const AuthorsDialog = withStyles(styles, { withTheme: true })(
    class extends React.Component<AuthorsDialogProps, AuthorsDialogState> {
        constructor(props) {
            super(props);
            this.state = {
                authorIds: props.book.authors.map(author => author.id)
            };
        }

        render() {
            const { classes, authors, onCancel } = this.props;

            return (
                <Dialog open={true} classes={{ paper: classes.dialogPaper }}>
                    <DialogTitle>Edit Authors</DialogTitle>
                    <DialogContent className={classes.content}>
                        <FormControl>
                            <InputLabel htmlFor="select-multiple-chip">
                                Authors
                            </InputLabel>
                            <Select
                                multiple
                                value={this.state.authorIds}
                                onChange={this.handleChange}
                                input={<Input id="select-multiple-chip" />}
                                renderValue={(selected: any) => (
                                    <div className={classes.chips}>
                                        {selected.map(value => (
                                            <Chip
                                                key={value}
                                                label={this.getAuthorName(
                                                    value
                                                )}
                                                className={classes.chip}
                                            />
                                        ))}
                                    </div>
                                )}
                                MenuProps={MenuProps}
                            >
                                {authors.map(author => (
                                    <MenuItem
                                        key={author.id}
                                        value={author.id}
                                        style={this.getStyles(author.id)}
                                    >
                                        {author.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onCancel} color="secondary">
                            CANCEL
                        </Button>
                        <Button onClick={this.handleSave} color="primary">
                            SAVE
                        </Button>
                    </DialogActions>
                </Dialog>
            );
        }

        getStyles = authorId => {
            const { theme } = this.props as any;
            return {
                fontWeight:
                    this.state.authorIds.indexOf(authorId) === -1
                        ? theme.typography.fontWeightRegular
                        : theme.typography.fontWeightMedium
            };
        };

        getAuthorName = authorId => {
            const { authors } = this.props;
            return authors.find(author => author.id === authorId).name;
        };

        handleChange = event => {
            this.setState({
                authorIds: event.target.value
            });
        };

        handleSave = () => {
            const { book, onSave } = this.props;
            onSave(book.id, this.state.authorIds);
        };
    }
);
