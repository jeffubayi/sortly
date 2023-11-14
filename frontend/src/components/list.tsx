import React from 'react'
import { Avatar, List, ListItem, Typography, ListItemText, ListItemAvatar, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function CardTitle({ handleAddJoke }: { handleAddJoke: any }) {
  return (
    <List sx={{ borderRadius: "1rem", mb: 1, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start" secondaryAction={
        <>
          <Button
              variant="contained"
              startIcon={< AddIcon />}
              onClick={handleAddJoke}
              size="small"
              sx={{ borderRadius: "0.4rem" }}
            >
              Add joke
            </Button>
        </>}>

        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src='https://i.pinimg.com/736x/7c/ee/6f/7cee6fa507169843e3430a90dd5377d4.jpg' />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography color="text.primary">
              {"No User found!!"}
            </Typography>
          }
          secondary={
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              { "Please login to add jokes"}
            </Typography>
          }
        />
      </ListItem>
    </List >
  );
}