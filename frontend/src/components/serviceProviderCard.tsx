/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import { Card, Button, useMediaQuery, Stack, Chip } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import LocalOfferIcon from '@mui/icons-material/LocalOfferOutlined';


const propertyCard = () => {
    const isSmallScreen = useMediaQuery("(max-width: 600px)");

    const handleClickOpen = () => {
        // router.push(`/maid`);
        alert('maid')
    };


    return (
        <div>

            <Card sx={{ minWidth: isSmallScreen ? 320 : 270, borderRadius: "1rem", cursor: "pointer", boxShadow: '10px 10px 8px rgb(157 168 189 / 17%)' }} onClick={handleClickOpen}>
                <CardMedia
                    component="img"
                    height="200"
                    image="https://media.direct.playstation.com/is/image/psdglobal/PS5-console-front"
                    alt="item"
                />
                <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", mb: -1 }} >
                    <Typography variant="h6" color="primary" component='div'>
                        PS5 Digital
                    </Typography>

                    <Stack
                        direction="row" spacing={1}
                        divider={<Divider orientation="vertical" flexItem />}
                    >
                        <Typography variant="body2" color="secondary" component='div'>
                            3 Units
                        </Typography>
                        <Typography variant="body2" color="secondary" component='div'>
                            Ksh 100
                        </Typography>
                    </Stack>
                    <Stack
                        direction="row" spacing={1}
                        mt={1}
                    >
                        <Chip icon={<LocalOfferIcon sx={{ fontSize: 5 }} />} label="Electronics" size="small"   sx={{ fontSize: "0.6rem" }} />
                        <Chip icon={<LocalOfferIcon />} label="White" size="small"  sx={{ fontSize: "0.6rem" }} />
                    </Stack>
                </CardContent>
                <CardActions disableSpacing >
                    <Button
                        color="primary"
                        variant="contained"
                        fullWidth
                        size="small"
                        onClick={handleClickOpen}
                    >
                        View Item
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}
export default propertyCard;