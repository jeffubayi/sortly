import * as React from 'react';
import { Typography, Grid , Avatar, Card, ListItem, ListItemText } from '@mui/material';

const services = [
    {
        name: "House Manager",
        logo: "",
        description: "cleaning"
    },
    {
        name: "Nannies",
        logo: "",
        description: "child care"
    },
    {
        name: "Chefs",
        logo: "",
        description: "cooks"
    },
    {
        name: "Elderly Care",
        logo: "",
        description: " care givers"
    },
    {
        name: "Home Nurses",
        logo: "",
        description: "care givers"
    },
    {
        name: "Home Tutors",
        logo: "",
        description: "child care"
    },
    {
        name: "Butler",
        logo: "",
        description: "personal assistant"
    },
    {
        name: "Pet Attendant",
        logo: "",
        description: " pet care"
    },
    {
        name: "Special Needs",
        logo: "",
        description: "care givers"
    },
    {
        name: "Gardener",
        logo: "",
        description: "home care"
    },
    {
        name: "Restaurant ",
        logo: "",
        description: "Waiter/Waitresses"
    },
    {
        name: "Tenders",
        logo: "",
        description: "store keepers"
    },
]

export default function ServiceList() {
    return (
        <>
            <Grid container spacing={2} alignItems="flex-end" sx={{px:2,pb:2}}>
                {services.map((service: any) => (
                     <Grid
                     item
                     key={service.name}
                     xs={6}
                     md={2}
                   >
                    <Card variant="outlined" sx={{ display: "flex",flexDirection:"column", justifyContent: "center", alignItems: "center",p:1 }}>
                        <Avatar src="https://thumbs.dreamstime.com/z/maid-avatar-babysitter-cleaner-profile-user-person-people-icon-vector-illustration-isolated-220991730.jpg" />
                        <Typography component="div" sx={{fontWeight:"420"}} >{service.name}</Typography>
                        <Typography component="div" color="text.secondary" variant="caption">{service.description}</Typography>
                    </Card>
                    </Grid>
                ))
                }
            </Grid>
        </>
    );
}