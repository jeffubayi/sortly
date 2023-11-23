import * as React from 'react';
import { Typography, Grid, Avatar, Card, Paper } from '@mui/material';

const services = [
    {
        name: "Category Tags",
        logo: "",
        description: "classify items"
    },
    {
        name: "Brand Tags",
        logo: "",
        description: "manufacturer of an item"
    },
    {
        name: "Location Tags",
        logo: "",
        description: "retrieval and storage"
    },
    {
        name: "Status Tags",
        logo: "",
        description: "in-stock/out-of-stock"
    },
    {
        name: "Condition Tags",
        logo: "",
        description: "condition of item"
    },
    {
        name: "Expiry Tags",
        logo: "",
        description: "item durability"
    },
    {
        name: "Supplier Tags",
        logo: "",
        description: "item quality"
    },
    {
        name: "Weight or Size Tags",
        logo: "",
        description: " weight or size of an item"
    },
    {
        name: "Cost Tags",
        logo: "",
        description: "cost of the item"
    },
    {
        name: "Security Tags",
        logo: "",
        description: "high-security of an item"
    },
    {
        name: "Warranty Tags",
        logo: "",
        description: " warranty claims & repairs"
    },
    {
        name: "Serial Number Tags",
        logo: "",
        description: "unique id to each item"
    },
]

export default function ServiceList() {
    return (
        <Grid item xs={12} md={12}>
            <Typography sx={{ mb: 4, fontWeight: "bold" }}>
                Item Tags
            </Typography>
            <Paper
                sx={{
                    borderRadius: "0.6rem",
                    boxShadow: "10px 10px 8px rgb(157 168 189 / 17%)",
                }}
                elevation={0}
            >
                <Grid container spacing={2} alignItems="flex-end" sx={{ px: 2, pb: 2 }}>
                    {services.map((service: any) => (
                        <Grid
                            item
                            key={service.name}
                            xs={6}
                            md={2}
                        >
                            <Card variant="outlined" sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", p: 1 }}>
                                <Avatar src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.all-free-download.com%2Fimages%2Fgraphiclarge%2Fred_tag_icon_vector_280898.jpg&f=1&nofb=1&ipt=60c3d9d21d55dbec41ee21a6b9c2d5fc2ad93660e2140f83b790e23f4950f176&ipo=images" />
                                <Typography component="div" sx={{ fontWeight: "420" }} >{service.name}</Typography>
                                <Typography component="div" color="text.secondary" variant="caption">{service.description}</Typography>
                            </Card>
                        </Grid>
                    ))
                    }
                </Grid>
            </Paper>
        </Grid>
    );
}