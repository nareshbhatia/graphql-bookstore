import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { Select, TextInput } from '..';

const styles = () =>
    createStyles({
        dialogPaper: {
            width: 400
        },
        content: {
            display: 'flex',
            flexDirection: 'column'
        },
        selectStyle: {
            width: '100%'
        }
    });

interface SaveBookFunc {
    (book: any): void;
}

export interface BookDialogProps extends WithStyles<typeof styles> {
    book: any;
    publishers: Array<any>;
    onSave: SaveBookFunc;
    onCancel: React.EventHandler<any>;
}

export const BookDialog = withStyles(styles)(
    ({ classes, book, publishers, onSave, onCancel }: BookDialogProps) => {
        const validationSchema = yup.object().shape({
            name: yup.string().required()
        });

        return (
            <Formik
                initialValues={book}
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
                        <DialogTitle>Create Book</DialogTitle>
                        <DialogContent className={classes.content}>
                            <Form>
                                <Field
                                    name="name"
                                    component={TextInput}
                                    label="Name"
                                    fullWidth
                                />
                                <Field
                                    name="publisherId"
                                    component={Select}
                                    label="Publisher"
                                    options={publishers}
                                    className={classes.selectStyle}
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
