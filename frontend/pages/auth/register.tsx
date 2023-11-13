import Head from 'next/head';
import * as React from 'react';
import { CssBaseline, Grid, Box, Divider, Paper, Typography, Avatar, Button, Stack, Dialog, MenuItem } from '@mui/material';
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import router from 'next/router';
import toast from 'react-hot-toast';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { LogoButton, MainButton } from "../../components/Buttons";
import { InputField, SelectField } from "../../components/TextFields";
import { registerUser } from "../../services/authService";
import { SET_NAME, SET_LOGIN, SET_USER } from "../../redux/features/auth/authSlice"
import { useDispatch } from 'react-redux'

const validationSchema = Yup.object({
    name: Yup.string().required('User name is required'),
    email: Yup.string().email('Please enter a valid email').required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Passwords must be upto 6 characters!'),
    password2: Yup.string().required().oneOf([Yup.ref('password')], 'Passwords do not match.')
});

const initialValues: any = {
    email: "",
    password: "",
    name: "",
    password2: "",
}

export default function Register() {
    const supabase = useSupabaseClient()
    const dispatch = useDispatch()



    const handleSignUp = async (values: any, { setSubmitting }: { setSubmitting: any }) => {
        const userData = {
            name: values.name,
            email: values.email,
            password: values.password
        }
        try {
            const data = await registerUser(userData);
            await dispatch(SET_LOGIN(true))
            await dispatch(SET_NAME(data?.name))
            // await dispatch(SET_USER(data))
            router.push('/dashboard');
            // toast.success(`Please check your email ${data?.email} for the login link`)
            setSubmitting(false)
        } catch (error: any) {
            setSubmitting(false)
            console.log(error.message)
        }
    };

    const handleGoogleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        })
    };


    return (
        <React.Fragment>
            <Head>
                <title> Register | Sortly</title>
            </Head>
            <Grid container component="main" sx={{ height: '100vh' }} >
                <CssBaseline />
                <Grid item xs={12} md={5} component={Paper} square p={{ xs: 1, sm: 2, md: 8 }} >
                    <Box
                        sx={{
                            my: 2,
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
                            {'Register for an account'}
                        </Typography>
                    </Box>
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                            name: "",
                            password2: "",
                        }}
                        onSubmit={handleSignUp}
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
                                                name="name"
                                                placeholder='Type your name'
                                                label="Full Name"
                                                type='text'
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <InputField
                                                type='email'
                                                name="email"
                                                placeholder='Type your email address'
                                                label="Email"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <InputField
                                                name="password"
                                                label="Password"
                                                placeholder='Type your password'
                                                type="password"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <InputField
                                                name="password2"
                                                label="Confirm Password"
                                                placeholder='Type your password'
                                                type="password"
                                            />
                                        </Grid>

                                        <Grid item xs={12} >
                                            <MainButton
                                                type="submit"
                                                disabled={isSubmitting}
                                                variant="contained"
                                                label="Register"
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
                                                Already have an account?
                                            </Typography>
                                            <MainButton handleClick={() => router.push('/auth/login')} label="Login" />
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
        </React.Fragment>
    );
}