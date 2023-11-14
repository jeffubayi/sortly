import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function CourseList() {
    return (
        <Box>
            <List sx={{ width: '100%',mt:1, maxWidth: 360, bgcolor: 'background.default',borderRadius:"10px" }}>
                <ListItem alignItems="flex-start" 
                // secondaryAction={
                //     <DoneAllIcon/>
                // }
                >
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'background.default' }}>
                            <NotificationsIcon sx={{ fill: '#000' }} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Typography
                                variant="subtitle1"
                                color="text.secondary"
                                sx={{ fontWeight: "450" }}
                            >
                                New Item Created
                            </Typography>
                        }
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    You have a new item added to the inventory...
                                </Typography>
                                <br></br>
                                {"Today"}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                {/* <Divider variant="inset" component="li" /> */}
            </List>
        </Box>
    );
}
