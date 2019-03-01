import React, { useState } from 'react';

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
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { GetAuthors_authors } from '../authors/__generated__/GetAuthors';

const styles = (theme: Theme) =>
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
    (bookId: string, authorIds: Array<string>): void;
}

export interface AuthorsDialogProps extends WithStyles<typeof styles> {
    theme: any;
    book: any;
    authors: Array<GetAuthors_authors>;
    onSave: SaveAuthorsFunc;
    onCancel: React.EventHandler<any>;
}

export interface AuthorsDialogState {
    authorIds: Array<string>;
}

export const AuthorsDialog = withStyles(styles, { withTheme: true })(
    (props: AuthorsDialogProps) => {
        const { classes, theme, book, authors, onSave, onCancel } = props;
        const [authorIds, setAuthorIds] = useState<Array<string>>(
            book.authors.map((author: GetAuthors_authors) => author.id)
        );

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
                            value={authorIds}
                            onChange={(event: any) => {
                                setAuthorIds(event.target.value);
                            }}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={(selected: any) => (
                                <div className={classes.chips}>
                                    {selected.map((value: any) => (
                                        <Chip
                                            key={value}
                                            label={getAuthorName(
                                                value,
                                                authors
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
                                    style={getStyles(
                                        author.id,
                                        authorIds,
                                        theme
                                    )}
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
                    <Button
                        color="primary"
                        onClick={() => {
                            onSave(book.id, authorIds);
                        }}
                    >
                        SAVE
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
);

function getStyles(authorId: string, authorIds: Array<string>, theme: any) {
    return {
        fontWeight:
            authorIds.indexOf(authorId) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium
    };
}

function getAuthorName(authorId: string, authors: Array<any>) {
    return authors.find(author => author.id === authorId)!.name;
}
