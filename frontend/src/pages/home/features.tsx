import * as React from 'react';
import { Box, Grid, Button, List, ListItem, ListItemText, Stack, Typography, Avatar } from '@mui/material';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
// import Footer from "../../components/footer";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function LandingPage() {
    const navigate = useNavigate();

    const organize = [
        " Easily upload your existing inventory list into Sortly.",
        " Organize inventory folders by location, type, and more.",
        "Add critical item details with custom fields."
    ]

    const manage = [
        " Speed up inventory counts with in-app barcode and QR code scanner.",
        " Upload high-resolution photos to visually track each item.",
        "Get alerted when you’re running low on stock."
    ]

    const report = [
        " Get in-depth data on items, folders, and, user histories.",
        " Easily export custom PDF or CSV reports.",
        "  Perfect for audits, budgeting, and forecasting."
    ]

    return (
        <Box sx={{ flexGrow: 1, py: 2, px: 2 }}>
            <Container disableGutters maxWidth="lg" component="main">
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item sm={12} md={5} mt={2}>
                        <Button variant="text" startIcon={<ArrowForwardIcon />}>Organize</Button>
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
                            <span style={{ color: "#DE2538" }}>Organize</span> and automate your inventory at the touch of a button.
                        </Typography>
                        <List >
                            {organize.map((text: string, index) => (
                                <ListItem key={index}>
                                    <ListItemText
                                        primary={
                                            <Typography variant="subtitle1" gutterBottom sx={{ color: "grey", fontWeight: "bold" }}>
                                                {text}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid item sm={12} md={7}>
                        <Avatar variant="square"
                            sx={{ height: "100%", width: "100%" }}
                            src="https://media.sortly.com/wp-content/uploads/2022/08/12125645/all_items_table.png.webp"
                            alt="sortly"
                        />
                    </Grid>
                </Grid>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item sm={12} md={7}>
                        <Avatar variant="square"
                            sx={{ height: "100%", width: "100%" }}
                            src="https://media.sortly.com/wp-content/uploads/2022/09/15172605/item_details_construction.png.webp"
                            alt="sortly"
                        />

                    </Grid>
                    <Grid item sm={12} md={5} mt={2}>
                        <Button variant="text" startIcon={<ArrowForwardIcon />}>Managing</Button>
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}> <span style={{ color: "#DE2538" }}>Access</span> and update your entire visual inventory with one easy app
                        </Typography>
                        <List >
                            {manage.map((text: string, index) => (
                                <ListItem key={index}>
                                    <ListItemText
                                        primary={
                                            <Typography variant="subtitle1" gutterBottom sx={{ color: "grey", fontWeight: "bold" }}>
                                                {text}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>


                </Grid>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item sm={12} md={5} mt={2}>
                        <Button variant="text" startIcon={<ArrowForwardIcon />}>Reporting</Button>
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>Get real-time <span style={{ color: "#DE2538" }}>reporting</span>  insights

                        </Typography>
                        <List >
                            {report.map((text: string, index) => (
                                <ListItem key={index}>
                                    <ListItemText
                                        primary={
                                            <Typography variant="subtitle1" gutterBottom sx={{ color: "grey", fontWeight: "bold" }}>
                                                {text}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid item sm={12} md={7}>
                        <Avatar variant="square"
                            sx={{ height: "100%", width: "100%" }}
                            src="https://media.sortly.com/wp-content/uploads/2022/08/12125644/sortly_report_2-1-1.png.webp"
                            alt="sortly"
                        />
                    </Grid>
                </Grid>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Container disableGutters maxWidth="md" component="main" sx={{ mb: 8 }}>
                        <Grid item sm={12} mt={2}>
                            <Typography
                                variant="h4"
                                align="center"
                                sx={{ fontWeight: "bold" }}
                                color="text.primary"
                                gutterBottom
                            >
                                Automatically <span style={{ color: "#DE2538" }}>sync</span> your inventory across all devices, all teams
                            </Typography>
                            <Typography variant="h6" align="center" sx={{ color: "grey" }} component="p">
                                Use Sortly on mobile, desktop, or tablet, thanks to automatic, cloud-based syncing. You and your team can update inventory in real time from any location.
                            </Typography>
                            <Stack spacing={2} direction="row" justifyContent="center" mt={2}>
                                <Button variant="contained" onClick={() => navigate('/auth/login')}>Try Sortly Free</Button>
                                <Button variant="outlined" onClick={() => navigate('/pricing')} >See all plans</Button>
                            </Stack>
                        </Grid>

                    </Container>
                </Grid>
            </Container>
            {/* <Footer /> */}
        </Box>
    );
}