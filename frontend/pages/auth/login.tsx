import Head from 'next/head';
import * as React from 'react';
import { CssBaseline, Grid, Box, Divider, Paper, Typography, Avatar, Button, Stack } from '@mui/material';
import router from 'next/router';
import toast from 'react-hot-toast';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useLocalStorage } from 'react-use';

import { LogoButton, MainButton } from "../../components/Buttons";
import { InputField } from "../../components/TextFields";
import { loginUser } from "../../services/authService";
import { SET_NAME, SET_LOGIN, SET_USER } from "../../redux/features/auth/authSlice"


//login fields validation
const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
});

export default function Login() {
    const dispatch = useDispatch()
    const [token, setToken] = useLocalStorage("token", );

    //email and password login
    const handleLogin = async (userData: any, { setSubmitting }: { setSubmitting: any }) => {
        try {
            const user = await loginUser(userData)
            if (user !== undefined) {
                await dispatch(SET_LOGIN(true))
                await dispatch(SET_NAME(user?.name))
                await dispatch(SET_USER(user))
                setToken(user.token)
                router.push('/dashboard');
                setSubmitting(false)
            }
        } catch (error) {
            setSubmitting(false);
            console.log(error)
        }
    };

    //login via google
    const handleGoogleLogin = async () => {
        toast.error('Not yet implemented')
    };

    return (
        <React.Fragment>
            <Head>
                <title> Login | Sortly</title>
            </Head>
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
                            {'Login to your account'}
                        </Typography>
                    </Box>
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        onSubmit={handleLogin}
                        validationSchema={validationSchema}>
                        {({
                            isSubmitting,
                        }) => (
                            <Form>
                                <Box sx={{ mx: 4 }}>
                                    <Stack direction="row" spacing={3}>
                                        <LogoButton
                                            icon="/google.png"
                                            label="Google"
                                            handleClick={handleGoogleLogin}
                                        />

                                    </Stack>
                                    <Divider orientation="horizontal" flexItem sx={{ my: 4 }}>
                                        Or with email and password
                                    </Divider>
                                    <Grid container
                                        rowSpacing={2}
                                        columnSpacing={{ xs: 2, sm: 3, md: 5 }}
                                    >

                                        <Grid item xs={12}>
                                            <InputField
                                                type='email'
                                                name="email"
                                                placeholder='Type your email address'
                                                label="Email"
                                            />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <InputField
                                                name="password"
                                                label="Password"
                                                placeholder='Type your password'
                                                type="password"
                                            />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <MainButton
                                                type="submit"
                                                disabled={isSubmitting}
                                                variant="contained"
                                                label="Login to continue"
                                            />
                                        </Grid>

                                    </Grid>
                                    <Grid container
                                        direction="column"
                                        justifyContent="center"
                                        alignItems="center"
                                        spacing={0.7}
                                        mt={1}
                                    >
                                        <Grid item xs={12} >
                                            <Typography>
                                                Don't have an account?
                                            </Typography>
                                            <Button fullWidth onClick={() => router.push('/auth/register')}>Register</Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box onClick={() => router.push('/auth/reset-password')} >
                                                Reset Password
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Form>
                        )}
                    </Formik>
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
        </React.Fragment >
    );
}