import React from 'react'
import { TextField } from "formik-mui";
import { Field } from 'formik';
import { MenuItem } from '@mui/material';

export default function SelectField(
    { name, placeholder, label, options }: {  name: string, placeholder?: string, label: string, options: any }
){
    console.log(`options`,options[0].value)
    return (
        <Field
            fullWidth
            select
            // size="small"
            component={TextField}
            type='search'
            name={name}
            placeholder={placeholder}
            label={label}
            InputProps={{
                style: {
                    borderRadius: "7px",
                }
            }}
        >
            {options.map((value: string, label: any) => (
                <MenuItem value={value}>
                    {label}
                </MenuItem>
            ))}
        </Field>
    )
}