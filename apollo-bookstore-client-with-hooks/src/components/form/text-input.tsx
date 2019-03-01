import React from 'react';
import TextField from '@material-ui/core/TextField';

export const TextInput = ({
    field,
    form: { touched, errors },
    ...props
}: any) => (
    <TextField
        {...props}
        name={field.name}
        value={field.value}
        helperText={
            touched[field.name] && errors[field.name]
                ? errors[field.name]
                : undefined
        }
        error={touched[field.name] && errors[field.name] ? true : false}
        onChange={field.onChange}
        margin="normal"
    />
);
