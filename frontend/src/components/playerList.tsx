import * as React from 'react';
import { Typography, Chip, Stack, Divider } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

export default function MediaControlCard({ label, handlePlay }: { label: any, handlePlay: any }) {
    return (
        <>
            <ListItem
               sx={{cursor:"pointer"}}
                key={label}
                onClick={handlePlay}
                secondaryAction={
                    <Chip size="small" color="primary" sx={{ fontSize: "0.7rem", borderRadius: "10px" }} label='mentorship' />
                }
            >
                <ListItemAvatar>
                    <Avatar variant="square" sx={{ height: "3rem", width: "3rem", borderRadius: "0.1rem" }} src='/thumbnail.png' />
                </ListItemAvatar>
                <ListItemText primary={label} secondary={
                    <Stack
                        direction="row" spacing={0.5}
                        justifyContent="flex-start"
                    >
                        <div>
                            <Typography>By </Typography>
                        </div>
                    </Stack>
                } />
            </ListItem>

            <Divider variant="inset" component="li" />
        </>
    );
}
