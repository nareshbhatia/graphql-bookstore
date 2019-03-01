import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import MuiSelect from '@material-ui/core/Select';

export const Select = ({
    field,
    form: { touched, errors },
    label,
    options,
    className,
    ...props
}: any) => (
    <FormControl
        error={touched[field.name] && errors[field.name] ? true : false}
        margin="normal"
        className={className}
    >
        <InputLabel
            error={touched[field.name] && errors[field.name] ? true : false}
        >
            {label}
        </InputLabel>
        <MuiSelect
            {...props}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            input={<Input />}
        >
            <MenuItem value="">&nbsp;</MenuItem>
            {options.map((option: any) => (
                <MenuItem key={option.id} value={option.id}>
                    {option.name}
                </MenuItem>
            ))}
        </MuiSelect>
        {touched[field.name] && errors[field.name] ? (
            <FormHelperText error={true}>{errors[field.name]}</FormHelperText>
        ) : null}
    </FormControl>
);
