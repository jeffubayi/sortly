import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { CssBaseline, Grid, Box, Paper, Typography, Avatar, Stack, Dialog } from '@mui/material';
import { useSession } from '@supabase/auth-helpers-react'

interface Props {
    children: React.ReactNode;
    title:string;
}

const ProtectedRoute = ({ children,title }: Props) => {
    const router = useRouter();
    const session = useSession();

    useEffect(() => {
        // Check if the user is authenticated
        // You can use your authentication logic here
        const isAuthenticated = session?.access_token; // Implement your authentication logic

        if (!isAuthenticated) {
            // Redirect to the login page if not authenticated
            router.push('/auth/login');
        }
    }, []);

    return (
        <Dialog
            maxWidth="xl"
            open={true}
            fullScreen
        >
            <Grid container component="main" sx={{ height: '100vh' }} >
                <CssBaseline />
                <Grid item xs={12} sm={8} md={4} component={Paper} square>
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
                            src="/logo.png"
                        >
                        </Avatar>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            {title}
                        </Typography>
                    </Box>
                    {children}
                </Grid>
                <Grid item xs={false} sm={4} md={8}
                    sx={{
                        backgroundImage: 'url(https://maidsofhonour.africa/static/media/chef3.6d4c44dc59093b00b3f8.jpg)',
                        backgroundRepeat: 'repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

            </Grid>
        </Dialog>
    )
};

export default ProtectedRoute;
