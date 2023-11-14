import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, Stack, Typography, Avatar } from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import Footer from "../../components/footer";

export default function LandingPage() {
    const navigate = useNavigate();
    // const isSmallScreen = useMediaQuery("(max-width: 600px)");


    return (
        <Box sx={{ flexGrow: 1, py: 6, px: 10 }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item sm={12} md={5} mt={2}>
                    <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold" }}>
                        <span style={{ color: "#DE2538" }}>Simple </span>Inventory Management Software.
                    </Typography>
                    <Typography variant="h6" gutterBottom sx={{ mb: 4, color: "grey" }}>
                        The best inventory software for small businesses to manage inventory, supplies, and everything else.
                    </Typography>
                    <Stack spacing={2} direction="row" >
                        <Button variant="contained" onClick={() => navigate('/auth/login')}>Try Sortly Free</Button>
                        <Button variant="text" onClick={() => navigate('/pricing')} endIcon={<ArrowForwardIcon />}>See all plans</Button>
                    </Stack>

                </Grid>
                <Grid item sm={12} md={7}>
                    <img
                        src="https://media.sortly.com/wp-content/uploads/2022/04/12125817/overflow-screens.png"
                        // style={{ height: "500", width: "750" }}
                        alt="sortly"
                    />
                </Grid>
            </Grid>
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6}}>
                <Typography
                    variant="h4"
                    align="center"
                    sx={{ fontWeight: "bold", mb: 4 }}
                    color="text.primary"
                    gutterBottom
                >
                    Inventory from anywhere.
                </Typography>
                <Typography variant="h6" align="center" gutterBottom sx={{ mb: 4, color: "grey" }}>
                    Our top-rated mobile app makes it easy to inventory anywhere even when you’re offline.
                </Typography>
                <Stack spacing={6} direction="row" justifyContent="center" mt={2}>
                    <Avatar variant="square" sx={{ width: "8rem" }} src="https://www.sortly.com/wp-content/themes/sortly_2022_redesign/assets/img/app-store.svg" />
                    <Avatar variant="square" sx={{ width: "8rem" }} src="https://www.sortly.com/wp-content/themes/sortly_2022_redesign/assets/img/google-play.svg" />
                </Stack>
            </Container>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} mb={4}>

                <Grid item sm={12} md={6}>
                    <img
                        src="https://jetruby.com/wp-content/uploads/2020/12/ezgif-3-6b4027e6baa1.jpg"
                        // style={{ height: "100", width: "750" }}
                        alt="sortly"
                    />
                </Grid>
            </Grid>
            <Container disableGutters maxWidth="md" component="main" sx={{ pt: 8, pb: 6 }}>
                <Typography
                    variant="h4"
                    align="center"
                    sx={{ fontWeight: "bold" }}
                    color="text.primary"
                    gutterBottom
                >
                    Experience the simplest inventory management software.
                </Typography>
                <Typography variant="h6" align="center" sx={{ color: "grey" }} component="p">
                    Are you ready to transform how your business does inventory?
                </Typography>
                <Stack spacing={2} direction="row" justifyContent="center" mt={4}>
                    <Button variant="contained" onClick={() => navigate('/auth/login')}>Try Sortly Free</Button>
                    <Button variant="outlined" onClick={() => navigate('/pricing')}>See all plans</Button>
                </Stack>
            </Container>
            <Footer />
        </Box>
    );
}

