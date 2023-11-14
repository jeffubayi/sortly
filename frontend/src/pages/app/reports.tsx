import React from 'react';
import { Grid, Container } from '@mui/material';
// import CourseCard from "../../components/courseCard";
import useRedirectLoggedOutUser from "../../utility/useRedirectLoggedOutUser";

export default function Courses() {
    useRedirectLoggedOutUser('/auth/login')
    return (
        <Container maxWidth="md" component="main" sx={{ p: 2 }} >
            <Grid container spacing={3} sx={{ mb: 6, p: 1 }}>

            </Grid>
        </Container>
    );
}