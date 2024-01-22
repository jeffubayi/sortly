import { Button, Avatar } from '@mui/material'
import React from 'react'

function primary({ handleClick, label, icon }: { handleClick: any, label: string, icon: any }) {
    return (
        <Button
            startIcon={<Avatar src={icon} sx={{ height: "1rem", width: "1rem" }} />}
            fullWidth
            variant="outlined"
            color='secondary'
            sx={{borderRadius:"7px"}}
            onClick={handleClick}
            size="small"

        >
            {label}
        </Button>
    )
}

export default primary