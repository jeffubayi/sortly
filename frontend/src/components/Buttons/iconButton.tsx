import { Button, Avatar } from '@mui/material'
import React from 'react'

function primary({ handleClick, label, icon }: { handleClick: any, label: string, icon: any }) {
    return (
        <Button
            startIcon={<Avatar src={icon} sx={{ height: "1rem", width: "1rem" }} />}
            fullWidth
            variant="outlined"
            color='secondary'
            onClick={handleClick}

        >
            {label}
        </Button>
    )
}

export default primary