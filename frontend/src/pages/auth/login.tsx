import * as React from 'react';
import {  Grid, Box, Divider,  Typography, Button, Stack } from '@mui/material';
import toast from 'react-hot-toast';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
// import { useLocalStorage } from 'react-use';
import { useNavigate } from "react-router-dom";
import Google from "../../images/google.png"
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
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //email and password login
    const handleLogin = async (userData: any, { setSubmitting }: { setSubmitting: any }) => {
        try {
            const user = await loginUser(userData)
            if (user !== undefined) {
                await dispatch(SET_LOGIN(true))
                await dispatch(SET_NAME(user?.name))
                await dispatch(SET_USER(user))
                navigate('/dashboard');
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
                                            icon={Google}
                                            label="Sign in with Google"
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
                                                label="Sign in "
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
                                            <Button fullWidth onClick={() => navigate('/auth/register')}>Sign Up</Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box onClick={() => navigate('/auth/reset-password')} >
                                                Reset Password
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Form>
                        )}
                    </Formik>
        </React.Fragment >
    );
}