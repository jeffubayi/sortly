import React from 'react'
import { TextField } from "formik-mui";
import { Field } from 'formik';

export default function inputField(
    { name, placeholder, label, type, rows, disabled, multiline }: { name: string, placeholder?: string, label: string, type?: string, disabled?: boolean, multiline?: boolean, rows?: number }
) {
    return (
        <Field
            fullWidth
            // size="small"
            component={TextField}
            disabled={disabled}
            type={type}
            name={name}
            placeholder={placeholder}
            multiline={multiline}
            rows={rows}
            label={label}
            InputProps={{
                style: {
                    borderRadius: "7px",
                }
            }}
        />
    )
}
