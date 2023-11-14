import React from 'react'
import { TextField } from "formik-mui";
import { Field } from 'formik';

export default function inputField(
    { name, placeholder, label, type }: { name: string, placeholder?: string, label: string, type?: string }
) {
    return (
        <Field
            fullWidth
            // size="small"
            component={TextField}
            type={type}
            name={name}
            placeholder={placeholder}
            label={label}
            InputProps={{
                style: {
                    borderRadius: "7px",
                }
            }}
        />
    )
}
