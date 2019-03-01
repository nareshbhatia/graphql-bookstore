import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { TextInput } from '..';

const styles = () =>
    createStyles({
        dialogPaper: {
            width: 400
        },
        content: {
            display: 'flex',
            flexDirection: 'column'
        }
    });

interface SaveAuthorFunc {
    (author: any): void;
}

export interface AuthorDialogProps extends WithStyles<typeof styles> {
    author: any;
    onSave: SaveAuthorFunc;
    onCancel: React.EventHandler<any>;
}

export const AuthorDialog = withStyles(styles)(
    ({ classes, author, onSave, onCancel }: AuthorDialogProps) => {
        const validationSchema = yup.object().shape({
            name: yup.string().required()
        });

        return (
            <Formik
                initialValues={author}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    onSave(values);
                    setSubmitting(false);
                }}
                render={({ submitForm }) => (
                    <Dialog
                        open={true}
                        classes={{ paper: classes.dialogPaper }}
                    >
                        <DialogTitle>
                            {author.id ? 'Edit Author' : 'Create Author'}
                        </DialogTitle>
                        <DialogContent className={classes.content}>
                            <Form>
                                <Field
                                    name="name"
                                    component={TextInput}
                                    label="Name"
                                    fullWidth
                                />
                            </Form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={onCancel} color="secondary">
                                CANCEL
                            </Button>
                            <Button onClick={submitForm} color="primary">
                                SAVE
                            </Button>
                        </DialogActions>
                    </Dialog>
                )}
            />
        );
    }
);
