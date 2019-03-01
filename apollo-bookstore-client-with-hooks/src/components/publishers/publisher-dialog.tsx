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

interface SavePublisherFunc {
    (publisher: any): void;
}

export interface PublisherDialogProps extends WithStyles<typeof styles> {
    publisher: any;
    onSave: SavePublisherFunc;
    onCancel: React.EventHandler<any>;
}

export const PublisherDialog = withStyles(styles)(
    ({ classes, publisher, onSave, onCancel }: PublisherDialogProps) => {
        const validationSchema = yup.object().shape({
            name: yup.string().required()
        });

        return (
            <Formik
                initialValues={publisher}
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
                            {publisher.id
                                ? 'Edit Publisher'
                                : 'Create Publisher'}
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
