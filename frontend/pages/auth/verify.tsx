import Head from 'next/head';
import * as React from 'react';
import { DialogContent, CssBaseline, Grid, Box, Divider, Paper, Typography, Avatar, Button, Stack, Dialog, MenuItem } from '@mui/material';
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import router from 'next/router';
import toast from 'react-hot-toast';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { LogoButton, MainButton } from "../../components/Buttons";
import { InputField, SelectField } from "../../components/TextFields";

import { useUser } from '@supabase/auth-helpers-react'
import { useRouter } from "next/router";

export default function Verify() {
    const router = useRouter();
    const user = useUser()
    const supabase = useSupabaseClient()
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required'),
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
    });

    const initialValues: any = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    }

    const handleSignUp = async (values: any) => {
        const {
            email,
            password,
            first_name,
            last_name,
        } = values
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    first_name,
                    last_name,
                },
                emailRedirectTo: process.env.NEXT_PUBLIC_APP_URL + '/auth/success',
            }
        });

        if (error) {
            // handle the error however you like
            toast.error(` ${error} `)
            return;
        }

        // if there is a session it means that we do not need to verify the email beforehand
        if (session) {
            toast.success(`Successfully registered with ${email} `)
            router.push('/auth/profile');
        } else {
            router.push('/auth/verify');
            toast.success(`Please check your email ${email} for the login link`)
        }
    };

    return (
        <React.Fragment>
            <Head>
                <title>Account Setup | Maids of Honour</title>
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
                            src="/logo.png"
                        >
                        </Avatar>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            {'Setup Your Profile'}
                        </Typography>
                    </Box>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSignUp}
                        validationSchema={validationSchema}>
                        {({
                            isSubmitting,
                        }) => (
                            <Form>
                                <Box sx={{ mx: 4 }}>
                                    <Divider orientation="horizontal" flexItem sx={{ my: 4 }}>
                                        Tell us about yourself
                                    </Divider>
                                    <Grid container
                                        rowSpacing={2}
                                        columnSpacing={{ xs: 2, sm: 3, md: 5 }}
                                    >
                                        <Grid item xs={12} md={6}>
                                            <InputField
                                                name="firstName"
                                                placeholder='Type your name'
                                                label="First Name"
                                                type='text'
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <InputField
                                                name="lastName"
                                                placeholder='Type your name'
                                                label="Last Name"
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
                                        <Grid item xs={12} >
                                            <InputField
                                                name="password"
                                                label="Password"
                                                placeholder='Type your password'
                                                type="password"
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
                                                label="Continue"
                                            />
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
            {/* </DialogContent>
            </Dialog> */}

        </React.Fragment>
    );
}