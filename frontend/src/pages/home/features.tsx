import * as React from 'react';
import { Box, Grid, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import FolderIcon from '@mui/icons-material/Folder';
import Footer from "../../components/footer";

export default function LandingPage() {
    // const isSmallScreen = useMediaQuery("(max-width: 600px)");


    return (
        <Box sx={{ flexGrow: 1, py: 6, px: 10 }}>
            <Container disableGutters maxWidth="xl" component="main">
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item sm={12} md={5} mt={2}>
                        <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
                            Organize and automate your inventory at the touch of a button.
                        </Typography>

                        <List >
                            <ListItem>
                                {/* <ListItemIcon>
                                    <FolderIcon />
                                </ListItemIcon> */}
                                <ListItemText
                                    primary={
                                        <Typography variant="h6" gutterBottom sx={{ mb: 4, color: "grey" }}>
                                            Easily upload your existing inventory list into Sortly.
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <ListItem>
                                {/* <ListItemIcon>
                                    <FolderIcon />
                                </ListItemIcon> */}
                                <ListItemText
                                    primary={
                                        <Typography variant="h6" gutterBottom sx={{ mb: 4, color: "grey" }}>
                                            Organize inventory folders by location, type, and more.
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <ListItem>
                                {/* <ListItemIcon>
                                    <FolderIcon />
                                </ListItemIcon> */}
                                <ListItemText
                                    primary={
                                        <Typography variant="h6" gutterBottom sx={{ mb: 4, color: "grey" }}>
                                            Add critical item details with custom fields.
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </List>


                        <Stack spacing={2} direction="row" >
                            {/* <Button variant="contained" onClick={() => navigate('/auth/login')}>Try Sortly Free</Button> */}
                            {/* <Button variant="text" onClick={() => navigate('/pricing')} endIcon={<ArrowForwardIcon />}>See all plans</Button> */}
                        </Stack>

                    </Grid>
                    <Grid item sm={12} md={7}>
                        <img
                            src="https://media.sortly.com/wp-content/uploads/2022/08/12125645/all_items_table.png.webp"
                            // style={{ height: "500", width: "750" }}
                            alt="sortly"
                        />
                    </Grid>
                </Grid>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item sm={12} md={5} mt={2}>
                        <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>Access and update your entire visual inventory with one easy app

                        </Typography>
                        <List >

                            <ListItem>
                                <ListItemIcon>
                                    <FolderIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Speed up inventory counts with in-app barcode and QR code scanner."
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <FolderIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Upload high-resolution photos to visually track each item."
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <FolderIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Get alerted when you’re running low on stock."
                                />
                            </ListItem>
                        </List>
                        <Stack spacing={2} direction="row" >
                            {/* <Button variant="contained" onClick={() => navigate('/auth/login')}>Try Sortly Free</Button> */}
                            {/* <Button variant="text" onClick={() => navigate('/pricing')} endIcon={<ArrowForwardIcon />}>See all plans</Button> */}
                        </Stack>

                    </Grid>
                    <Grid item sm={12} md={7}>
                        <img
                            src="https://media.sortly.com/wp-content/uploads/2022/09/15172605/item_details_construction.png.webp"
                            // style={{ height: "500", width: "750" }}
                            alt="sortly"
                        />

                    </Grid>

                </Grid>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
             
                    <Grid item sm={12} md={5} mt={2}>
                    <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>Get real-time reporting insights

</Typography>
                        <List >
                            <ListItem>
                                <ListItemIcon>
                                    <FolderIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="  Get in-depth data on items, folders, and, user histories."
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <FolderIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Easily export custom PDF or CSV reports."
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <FolderIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="  Perfect for audits, budgeting, and forecasting."
                                />
                            </ListItem>
                        </List>
                        <Stack spacing={2} direction="row" >
                            {/* <Button variant="contained" onClick={() => navigate('/auth/login')}>Try Sortly Free</Button> */}
                            {/* <Button variant="text" onClick={() => navigate('/pricing')} endIcon={<ArrowForwardIcon />}>See all plans</Button> */}
                        </Stack>

                    </Grid>
                    <Grid item sm={12} md={7}>
                        <img
                            src="https://media.sortly.com/wp-content/uploads/2022/08/12125644/sortly_report_2-1-1.png.webp"
                            // style={{ height: "500", width: "750" }}
                            alt="sortly"
                        />
                    </Grid>
                </Grid>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Container disableGutters maxWidth="md" component="main" sx={{mb:8}}>
                    <Grid item sm={12} mt={2}>
                        <Typography
                            variant="h3"
                            align="center"
                            sx={{ fontWeight: "bold" }}
                            color="text.primary"
                            gutterBottom
                        >
                            Automatically sync your inventory across all devices, all teams
                        </Typography>
                        <Typography variant="h6" align="center" sx={{ color: "grey" }} component="p">
                        Use Sortly on mobile, desktop, or tablet, thanks to automatic, cloud-based syncing. You and your team can update inventory in real time from any location.
                        </Typography>
                        <Stack spacing={2} direction="row" >
                            {/* <Button variant="contained" onClick={() => navigate('/auth/login')}>Try Sortly Free</Button> */}
                            {/* <Button variant="text" onClick={() => navigate('/pricing')} endIcon={<ArrowForwardIcon />}>See all plans</Button> */}
                        </Stack>
                    </Grid>
                    
                    </Container>
                </Grid>
            </Container>
            <Footer />
        </Box>
    );
}