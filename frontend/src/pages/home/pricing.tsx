import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import StarIcon from '@mui/icons-material/StarBorder';
import Container from '@mui/material/Container';
// import Footer from "../../components/footer";
import { useNavigate } from "react-router-dom";

const tiers = [
    {
        title: 'Free',
        price: '0',
        description: [
            '100 Items Included',
            '1 User License',
            'Help Center Access',
            'Email Support',
        ],
        buttonText: 'Start Free Trial',
        buttonVariant: 'outlined',
    },
    {
        title: 'Pro',
        subheader: 'Most popular',
        price: '15',
        description: [
            '2,000 Items included',
            '5 User License',
            'Help Center Access',
            'Priority Email Support',
            'Unlimited QR Code scan',
            'Mpesa Payments'
        ],
        buttonText: 'Get started',
        buttonVariant: 'contained',
    },
    {
        title: 'Enterprise',
        price: '30',
        description: [
            'Unlimited Items ',
            '10+ User license',
            'Help Center Access',
            'Phone & Email Support',
            'Unlimited QR Code scan',
            'Mpesa Payments'
        ],
        buttonText: 'Contact us',
        buttonVariant: 'outlined',
    },
];



export default function Pricing() {
    // const isSmallScreen = useMediaQuery("(max-width: 600px)");
    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1, py: 2, px: 2 }}>
            {/* pricing */}
            <Container disableGutters maxWidth="md" component="main" sx={{ mb: 8,mt:6 }}>
                <Typography
                    variant="h4"
                    align="center"
                    sx={{ fontWeight: "bold" }}
                    color="text.primary"
                    gutterBottom
                >
                    Start Your 14-Day Free Trial Today.
                </Typography>
                <Typography variant="h6" align="center" sx={{ color: "grey" }} component="p">
                    Transform how your business does inventory with our powerful, easy-to-use solution. Find the right Sortly plan for you.
                </Typography>
            </Container>
            <Container maxWidth="lg" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                    {tiers.map((tier) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid
                            item
                            key={tier.title}
                            xs={12}
                            sm={tier.title === 'Enterprise' ? 12 : 6}
                            md={4}
                        >
                            <Card>
                                <CardHeader
                                    title={tier.title}
                                    subheader={tier.subheader}
                                    titleTypographyProps={{ align: 'center' }}
                                    action={tier.title === 'Pro' ? <StarIcon /> : null}
                                    subheaderTypographyProps={{
                                        align: 'center',
                                    }}
                                    sx={{
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'light'
                                                ? theme.palette.grey[200]
                                                : theme.palette.grey[700],
                                    }}
                                />
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'baseline',
                                            mb: 2,
                                        }}
                                    >
                                        <Typography component="h2" variant="h3" color="text.primary">
                                            ${tier.price}
                                        </Typography>
                                        <Typography variant="h6" color="text.secondary">
                                            /mo
                                        </Typography>
                                    </Box>
                                    <ul>
                                        {tier.description.map((line) => (
                                            <Typography
                                                sx={{ fontWeight: "bold" ,color:"grey"}}
                                                variant="subtitle1"
                                                align="center"
                                                key={line}
                                            >
                                                {line}
                                            </Typography>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        fullWidth
                                        onClick={() => navigate(tier.title === "Enterprise" ? "/contact-us" : '/auth/register')}
                                        variant={tier.buttonVariant as 'outlined' | 'contained'}
                                    >
                                        {tier.buttonText}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            {/* <Footer /> */}
        </Box>
    );
}