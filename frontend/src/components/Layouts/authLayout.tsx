import { Avatar, CssBaseline, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/material";

interface Props {
    children: React.ReactNode;
    title:string;
}

export default function AppLayout({ children,title }: Props) {
    return (
        <Grid container component="main" sx={{ height: '100vh' }} >
            <CssBaseline />
            <Grid item xs={12} md={5} component={Paper} square px={{ xs: 1, sm: 2, md: 8 }}>
                <Box
                    sx={{
                        my: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar
                        sx={{ mb: 2, height: "5.5rem", width: "5.5rem" }}
                        src="https://images.surferseo.art/6171630f-b376-43b5-ad66-732c449a2792.png"
                    >
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {title}
                    </Typography>
                </Box>
                {children}
            </Grid>
            <Grid item xs={false} sm={4} md={7}
                sx={{
                    backgroundImage: 'url(https://cdn.dribbble.com/users/2616177/screenshots/9094753/media/e6e10209f151e988e2a309fe384d1a0c.png)',
                    backgroundRepeat: 'repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

        </Grid>
    );
}