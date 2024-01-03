import React from 'react';
import { Grid, Container ,Button,  ListItem, List,Typography } from '@mui/material';
import FilterListIcon from '@mui/icons-material/Add';
import useRedirectLoggedOutUser from "../../utility/useRedirectLoggedOutUser";

export default function Reports() {
    useRedirectLoggedOutUser('/auth/login')
    return (
        <Container maxWidth="md" component="main" sx={{ p: 2 }} >
            <List sx={{ borderRadius: "0.5rem", mb: 1, bgcolor: 'background.paper', boxShadow: '10px 10px 8px rgb(157 168 189 / 17%)' }}>
                <ListItem alignItems="flex-start" secondaryAction={
                    <>
                        <Button
                            variant="contained"
                            startIcon={<FilterListIcon />}
                            // onClick={handleClickOpenNew}
                            size="small"
                            sx={{ borderRadius: "0.4rem" }}
                        >
                            Contact us
                        </Button>
                    </>
                }>
                    <Typography color="text.primary" variant="subtitle2" sx={{ fontWeight: "bold" }}>
                        Help
                    </Typography>

                </ListItem>
            </List >
            <Grid container spacing={3} sx={{ mb: 6, p: 1 }}>

            </Grid>
        </Container>
    );
}