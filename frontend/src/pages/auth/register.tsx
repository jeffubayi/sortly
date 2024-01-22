
import React from 'react';
import { Grid, Box, Divider, Typography, Stack } from '@mui/material';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux'
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'

import Google from "../../images/google.png"
import { LogoButton, MainButton } from "../../components/Buttons";
import { InputField } from "../../components/TextFields";
import { registerUser } from "../../services/authService";
import { SET_NAME, SET_LOGIN, SET_USER } from "../../redux/features/auth/authSlice"


const validationSchema = Yup.object({
    lastName: Yup.string().required('First name is required'),
    firstName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Please enter a valid email').required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Passwords must be upto 6 characters!'),
    password2: Yup.string().required().oneOf([Yup.ref('password')], 'Passwords do not match.')
});


export default function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [phone, setPhone] = React.useState('')
    const [phoneError, setPhoneError] = React.useState('')

    const handleChange = (newPhone: string) => {
        setPhone(newPhone)
        const isValid = matchIsValidTel(newPhone) // boolean
        if (isValid) {
            setPhone(newPhone)
        } else {
            setPhoneError('Invalid phone number')
        }
    }


    const handleSignUp = async (values: any, { setSubmitting }: { setSubmitting: any }) => {
        const userData = {
            name: values.firstName + values.lastName,
            email: values.email,
            password: values.password,
            phone
        }
        try {
            const data = await registerUser(userData);
            if (data !== undefined) {
                await dispatch(SET_LOGIN(true))
                await dispatch(SET_NAME(values.firstName))
                await dispatch(SET_USER(data))
                localStorage.setItem('user_email', data?.email)
                localStorage.setItem('user_phone', phone)
                if (data.bio === "bio") {
                    navigate('/auth/onboarding');
                } else {
                    navigate('/dashboard');
                }
                setSubmitting(false)
            }
        } catch (error: any) {
            setSubmitting(false)
            console.log(error.message)
        }
    };

    const handleGoogleLogin = async () => {
        toast.error("still in progress")
    };


    return (
        <React.Fragment>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    firstName: "",
                    lastName: "",
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
                                    icon={Google}
                                    label="Sign up with Google"
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
                                    <MuiTelInput
                                        value={phone}
                                        label="Phone Number"
                                        onChange={handleChange}
                                        // helperText={phoneError}
                                        defaultCountry="KE"
                                        fullWidth
                                        autoFocus
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
                                        placeholder='ReType your password'
                                        type="password"
                                    />
                                </Grid>

                                <Grid item xs={12} >
                                    <MainButton
                                        type="submit"
                                        disabled={isSubmitting}
                                        variant="contained"
                                        label="Get Started"
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
                                    <MainButton handleClick={() => navigate('/auth/login')} label="Sign in" />
                                </Grid>

                            </Grid>
                        </Box>
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    );
}