import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, Stack, Typography, Avatar,useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import Footer from "../../components/footer";
import Pricing from "./pricing";
import Features from "./features";

export default function LandingPage() {
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery("(max-width: 600px)");


    return (
        <Box sx={{ flexGrow: 1, py: 2, px: 2 }}>
            <Container disableGutters maxWidth="lg" component="main" sx={{ py:5,pb: 10}}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} mb={4}>
                    <Grid item sm={12} md={5} mt={2}>
                        <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold" }}>
                            <span style={{ color: "#DE2538" }}>Simple </span>Inventory Management Software.
                        </Typography>
                        <Typography variant="h6" gutterBottom sx={{ mb: 4, color: "grey" }}>
                            The best inventory software for small businesses to manage inventory, supplies, and everything else.
                        </Typography>
                        <Stack spacing={2} direction={!isSmallScreen ? "row":"column"} >
                            <Button variant="contained" onClick={() => navigate('/auth/login')}>Try Sortly Free</Button>
                            <Button variant="text" onClick={() => navigate('/pricing')} endIcon={<ArrowForwardIcon />}>See all plans</Button>
                        </Stack>

                    </Grid>
                    <Grid item sm={12} md={7}>
                        <Avatar variant="square"
                            sx={{ height: "100%", width: "100%" }}
                            src="https://media.sortly.com/wp-content/uploads/2022/04/12125817/overflow-screens.png"
                            alt="sortly"
                        />
                    </Grid>
                </Grid>
            </Container>
            <Pricing/>
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
            <Features/>
          
            <Footer />
        </Box>
    );
}

