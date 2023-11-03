import Head from 'next/head';
import * as React from 'react';
import { CssBaseline, Grid, Box, Divider, Paper, Typography, Avatar, Button, Checkbox, FormControlLabel, Link, Stack, Dialog } from '@mui/material';
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import router from 'next/router';
import toast from 'react-hot-toast';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { LogoButton, MainButton } from "../../components/Buttons";
import { InputField } from "../../components/TextFields";
import { loginUser } from "../../services/authService";
import { SET_NAME, SET_LOGIN, SET_USER } from "../../redux/features/auth/authSlice"
import { useDispatch } from 'react-redux';

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
});

const initialValues: any = {
    email: "",
    password: "",
}


export default function Login() {
    const supabase = useSupabaseClient()
    const dispatch = useDispatch()
    
    //email and password login
    const handleLogin = async (userData: any, { setSubmitting }: { setSubmitting: any }) => {
        try {
            const data = await loginUser(userData)
            console.log(`DATAAAA`,data)
            if (data !== undefined) {
                await dispatch(SET_LOGIN(true))
                await dispatch(SET_NAME(data?.name))
                // await dispatch(SET_USER(data))
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
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        })
    };

    return (
        <React.Fragment>
            <Head>
                <title> Login | Maids of Honour Africa</title>
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
                        initialValues={initialValues}
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
                                            <Box onClick={() => router.push('/auth/set')} >
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
                        backgroundImage: 'url(https://maidsofhonour.africa/static/media/chef3.6d4c44dc59093b00b3f8.jpg)',
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