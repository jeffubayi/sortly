import { Button } from '@mui/material'
import React from 'react'

function mainButton(
    { label, disabled, variant, type,handleClick }:
    { label: string, disabled?: any, variant?: any, type?: string,handleClick?:any }) {
    return (
        <Button
            disabled={disabled}
            fullWidth
            type="submit"
            variant={variant}
            onClick={handleClick}
        >
            {label}
        </Button>
    )
}

export default mainButton