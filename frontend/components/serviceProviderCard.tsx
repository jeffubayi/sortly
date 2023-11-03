/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import { Card, Button, useMediaQuery, Stack, Chip, ListItemText, Tooltip } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import { useRouter } from 'next/router';


export default function propertyCard() {
    const router = useRouter();
    const isSmallScreen = useMediaQuery("(max-width: 600px)");

    const handleClickOpen = () => {
        // router.push(`/maid`);
        alert('maid')
    };


    return (
        <div>

            <Card sx={{ minWidth: isSmallScreen ? 320 : 270, borderRadius: "0.5rem", cursor: "pointer", boxShadow: '10px 10px 8px rgb(157 168 189 / 17%)' }} onClick={handleClickOpen}>
                <CardMedia
                    component="img"
                    height="200"
                    image="https://thumbs.dreamstime.com/z/maid-avatar-babysitter-cleaner-profile-user-person-people-icon-vector-illustration-isolated-220991730.jpg"
                    alt="service provider"
                />
                <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <Typography variant="h6" color="primary" component='div'>
                        Susan Burt
                    </Typography>
                    <Stack
                        direction="row" spacing={1}
                        justifyContent="space-between"
                    >
                        <Rating defaultValue={3} precision={0.5} readOnly size="small" />
                        <Chip label="male" size="small" />
                    </Stack>
                    <Stack
                        direction="row" spacing={1}
                        divider={<Divider orientation="vertical" flexItem />}
                    >
                        <Typography variant="caption" color="primary" component='div'>
                            House Manager
                        </Typography>
                        <Typography variant="caption" color="primary" component='div'>
                            Cook
                        </Typography>
                    </Stack>
                </CardContent>
                <CardActions disableSpacing>
                    <Button
                        color="primary"
                        variant="contained"
                        fullWidth
                        size="small"
                        onClick={handleClickOpen}
                    >
                        View Profile
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}