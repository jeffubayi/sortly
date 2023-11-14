import * as React from 'react';
import {  Grid, Box } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
// import { useLocalStorage } from 'react-use';
import { useNavigate } from "react-router-dom";

import {  MainButton } from "../../components/Buttons";
import { InputField } from "../../components/TextFields";
import { loginUser } from "../../services/authService";
import { SET_NAME, SET_LOGIN, SET_USER } from "../../redux/features/auth/authSlice"


//login fields validation
const validationSchema = Yup.object({
    oldPassword:  Yup.string().required('Required'),
    password: Yup.string().required('Required'),
});

export default function Forgot() {
    const dispatch = useDispatch()
    // const [setToken] = useLocalStorage("token", );
    const navigate = useNavigate();

    //email and password login
    const handleReset = async (userData: any, { setSubmitting }: { setSubmitting: any }) => {
        try {
            const user = await loginUser(userData)
            if (user !== undefined) {
                await dispatch(SET_LOGIN(true))
                await dispatch(SET_NAME(user?.name))
                await dispatch(SET_USER(user))
                // setToken(user.token)
                navigate('/dashboard');
                setSubmitting(false)
            }
        } catch (error) {
            setSubmitting(false);
            console.log(error)
        }
    };


    return (
        <React.Fragment>
                    <Formik
                        initialValues={{
                            oldPassword: "",
                            password: "",
                        }}
                        onSubmit={handleReset}
                        validationSchema={validationSchema}>
                        {({
                            isSubmitting,
                        }) => (
                            <Form>
                                <Box sx={{ mx: 4 }}>
                                    {/* <Stack direction="row" spacing={3}>
                                        <LogoButton
                                            icon="/google.png"
                                            label="Google"
                                            handleClick={handleGoogleLogin}
                                        />

                                    </Stack> */}
                                    {/* <Divider orientation="horizontal" flexItem sx={{ my: 4 }}>
                                        Or with email and password
                                    </Divider> */}
                                    <Grid container
                                        rowSpacing={2}
                                        columnSpacing={{ xs: 2, sm: 3, md: 5 }}
                                    >

                                        <Grid item xs={12}>
                                            <InputField
                                                type='email'
                                                name="email"
                                                placeholder='Type password'
                                                label="Old Password"
                                            />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <InputField
                                                name="password"
                                                label="New Password"
                                                placeholder='Type your password'
                                                type="password"
                                            />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <MainButton
                                                type="submit"
                                                disabled={isSubmitting}
                                                variant="contained"
                                                label="Reset Password"
                                            />
                                        </Grid>

                                    </Grid>
                                </Box>
                            </Form>
                        )}
                    </Formik>
        </React.Fragment >
    );
}