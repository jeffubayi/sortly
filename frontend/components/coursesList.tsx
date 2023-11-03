import * as React from 'react';
import { Typography, List, Chip, Stack } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
// import { Property, Listing } from "../types"
import Divider from '@mui/material/Divider';
import CommentIcon from '@mui/icons-material/LocationOn';
import BathtubIcon from '@mui/icons-material/Bathtub';
import HotelIcon from '@mui/icons-material/Hotel';
import NightShelterIcon from '@mui/icons-material/NightShelter';
import fetchData from "../utility/fetchData"

export default function CoursesList() {
    // const [listings, setListings] = React.useState<Listing | any>([])
    // React.useEffect(() => {
    //     fetchData('listings').then(function (listing) {
    //         setListings(listing);
    //     });
    // }, [])

    return (
        <List sx={{ p: 2.5, borderRadius: "0.7rem" }}>
            <Typography sx={{fontWeight:"bold"}}>Recent Products</Typography>
            {[1, 2, 3, 5].map((listing: any, index) => (
                <div key={index}>
                    <ListItem
                        secondaryAction={
                            <Chip size="small" color="primary" sx={{ fontSize: "0.7rem", borderRadius: "10px" }} label='mentorship' />
                        }
                    >
                        <ListItemAvatar>
                            <Avatar variant="square" sx={{ height: "3rem", width: "3rem", borderRadius: "0.1rem" }} src='/thumbnail.png'/>
                        </ListItemAvatar>
                        <ListItemText primary="Mentorship 101" secondary={
                            <Stack
                                direction="row" spacing={0.5}
                                justifyContent="flex-start"
                            >
                                <div>
                                    <Typography>By Evelyne Kihia</Typography>
                                </div>
                            </Stack>
                        } />
                    </ListItem>

                    <Divider variant="inset" component="li" />
                </div>
            ))
            }
        </List >
    );
}