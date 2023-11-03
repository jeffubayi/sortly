import React, { useEffect, useState } from 'react';
import { Box, Grid, useMediaQuery, Container } from '@mui/material';
import Title from "../../components/addAction";
import ServiceProviderCard from "../../components/serviceProviderCard";
import PageTitle from '../../components/pageTitle';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function SProviders() {
    return (
        <Container maxWidth="md" component="main" sx={{ p: 2 }} >
            <PageTitle title='Hire' />
            <Title title="Filter" collection="Our Service Providers" icon={<FilterListIcon />} />
            <Grid container spacing={3} sx={{ mb: 6, p: 1 }}>
                {[1, 2, 3, 4].map((listing: any, index) => (
                    <Grid key={index} item md={4} sm={12}>
                        <ServiceProviderCard />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}