import * as React from 'react';
import {   Button, AppBar, Avatar, Box, Toolbar} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import CloseIcon from '@mui/icons-material/ArrowBackIos';
// import ChatIcon from '@mui/icons-material/Chat';
// import Fade from '@mui/material/Fade';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import LocalOfferIcon from '@mui/icons-material/LocalOffer';
// import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
// import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import { useNavigate } from "react-router-dom";

interface Props {
    children: React.ReactNode;
}


export default function HomeLayout({ children }: Props) {
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery("(max-width: 600px)");


    return (
        <React.Fragment>
            <AppBar
                position={"fixed"}
                color="inherit"
                elevation={0}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Box onClick={() => navigate('/')} sx={{ display: "flex", gap: 1, flexGrow: 1 }}>
                        <Avatar
                            variant="square"
                            sx={{ height: "2.4rem", width: "6.6rem", cursor: "pointer" }}
                            src="https://dka575ofm4ao0.cloudfront.net/pages-transactional_logos/retina/231061/Sortly_Logo.png"
                        />
                    </Box >
                        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', textAlign: 'center' }}/>
                    <div>

                        {!isSmallScreen && (
                            <>
                             <Button onClick={() => navigate("/")} variant="text" size="small" sx={{ my: 1, mx: 1.5, borderRadius: "0.5rem", px: 4 }}>
                                Home
                                </Button>
                             <Button onClick={() => navigate("/pricing")} variant="text" size="small" sx={{ my: 1, mx: 1.5, borderRadius: "0.5rem", px: 4 }}>
                                Pricing
                                </Button>
                                <Button onClick={() => navigate("/features")} variant="text" size="small" sx={{ my: 1, mx: 1.5, borderRadius: "0.5rem", px: 4 }}>
                                Features
                                </Button>
                                <Button onClick={() => navigate("/contact-us")} variant="text" size="small" sx={{ my: 1, mx: 1.5, borderRadius: "0.5rem", px: 4 }}>
                                Contact us
                                </Button>
                                <Button onClick={() => navigate("/auth/login")} variant="outlined" size="small" sx={{ my: 1, mx: 1.5, borderRadius: "0.5rem", px: 4 }}>
                                    Sign In
                                </Button>
                                <Button onClick={() => navigate("/auth/register")} variant="contained" size="small" sx={{ my: 1, mx: 1.5, borderRadius: "0.5rem", px: 4 }}>
                                    {isSmallScreen ? "login" : "Start a free trial"}
                                </Button>
                            </>
                        )}
                        {isSmallScreen && (
                            <Button onClick={() => navigate("/auth/login")} variant="contained" size="small" sx={{ my: 1, mx: 1.5, borderRadius: "0.5rem", px: 4 }}>
                                login
                            </Button>
                        )}
                    </div>
                </Toolbar >
            </AppBar>
            <Toolbar />
            <Container disableGutters maxWidth="xl" component="main">
                    {children}
                </Container>
        </React.Fragment>
    );
}