
import * as React from 'react';
import {  Grid, Box, TextField, Divider, StepLabel, Step, Paper, Stepper, Button, MenuItem } from '@mui/material';
import toast from 'react-hot-toast';
// import { Formik, Field, Form } from 'formik';
// import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';

import { selectName } from '../../redux/features/auth/authSlice';
import { updateUser } from "../../services/authService";
import { SET_USER } from "../../redux/features/auth/authSlice"

const steps = ['Select Role', 'Personal Details', 'Verify Account'];

export default function Login() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [formData, setFormData] = React.useState<any>({});
    const [formErrors] = React.useState<any>({});
    const userName = useSelector(selectName)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    // const handleBack = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // };

    const handleReset = () => {
        navigate('/dashboard');
    };

    const handleChange = (event: any) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    // const validationSchema = Yup.object({
    //     phone: Yup.number().required('Required'),
    //     bio: Yup.string().required('Required'),
    //     role: Yup.string().required('Required'),
    //     image: Yup.string().required('Required'),
    // });

    // const initialValues: any = {
    //     phone: "",
    //     bio: "",
    //     image: "",
    //     role: "",
    // }



    const handleSignUp = async () => {
        try {
            const data = await updateUser(formData);
            if (data !== undefined) {
                await dispatch(SET_USER({ ...formData, name: userName }))
                // setSubmitting(false)
            }
        } catch (error: any) {
            // setSubmitting(false)
            console.log(error.message)
        }
    };

    const handleNext = (event: any) => {
        if (activeStep === steps.length - 1) {
            toast.success("post db")
            // console.log(`formData`, formData,activeStep)
            handleSignUp()
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        // if (activeStep === 0) {
        //     if (formData.role != "") {
        //         setActiveStep((prevActiveStep) => prevActiveStep + 1);
        //     }else{
        //         setFormErrors({
        //             ...formErrors,
        //             [event.target.name]: 'required',
        //         }); 
        //     }
        // }
        // if (activeStep === 1) {
        //     if (formData.phone!= "" && formData.image != ""  && formData.bio!= "" ) {
        //         setActiveStep((prevActiveStep) => prevActiveStep + 1);
        //     }
        // }

    };

    return (
        <React.Fragment
        >
            <Box sx={{ px: 2 }}>

                {/* <Paper sx={{ px: 2, my: 2, py: 1 }} elevation={0}> */}
                <Stepper activeStep={activeStep} alternativeLabel >
                    {steps.map((label, index) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: {
                            optional?: React.ReactNode;
                        } = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>

                {/* </Paper> */}
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Alert icon={false} severity="success" sx={{ mt: 2 }}>
                            Thanks  {userName},well use your answers to create a more personalized onboarding experience for you
                        </Alert>
                        <Box sx={{ px: 5, py: 4 }}>
                            {/* <Box sx={{ flex: '1 1 auto', }} /> */}
                            <Button onClick={handleReset} variant="contained" fullWidth>Go to dashboard</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <>
                        <Alert icon={false} severity="success" sx={{ mt: 2 }}>
                            Hi {userName},  for a more tailored onboarding experience <br></br>Please answer the following questions and we'll do the rest
                        </Alert>
                        <Paper sx={{ px: 2 }} elevation={0}>
                            {activeStep === 0 && (
                                <div>
                                    <Divider orientation="horizontal" flexItem sx={{ my: 4 }}>
                                        Which of the following best describes you?
                                    </Divider>
                                    <Grid container
                                        rowSpacing={2}
                                        columnSpacing={{ xs: 2, sm: 3, md: 5 }}
                                    >
                                        <Grid item xs={12} >
                                            <TextField
                                                id="outlined-select-currency"
                                                select
                                                name="role"
                                                label="Select your Role"
                                                fullWidth
                                                error={formErrors.role && formErrors.role}
                                                onChange={handleChange}
                                                helperText={formErrors.role && formErrors.role}
                                            >
                                                <MenuItem value="individual">Individual</MenuItem>
                                                <MenuItem value="business">Business</MenuItem>
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                </div>

                            )}
                            {activeStep === 1 && (
                                <>
                                    <Divider orientation="horizontal" flexItem sx={{ my: 4 }}>
                                        Please fill in your personal details
                                    </Divider>
                                    <Grid container
                                        rowSpacing={2}
                                        columnSpacing={{ xs: 2, sm: 3, md: 5 }}
                                    >
                                        <Grid item xs={12} >
                                            <TextField
                                                fullWidth
                                                placeholder='Type add image'
                                                label="Profile Image"
                                                name="image"
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <TextField
                                                fullWidth
                                                placeholder='Type your phone number'
                                                label="Phone number"
                                                name="phone"
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <TextField
                                                fullWidth
                                                multiline
                                                rows={2}
                                                placeholder='Tell us about yourself'
                                                label="Bio"
                                                name="bio"
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </>
                            )}
                            {activeStep === 2 && (
                                <>
                                    <Divider orientation="horizontal" flexItem sx={{ my: 4 }}>
                                        Please verify your account
                                    </Divider>
                                    <Grid container
                                        rowSpacing={2}
                                        columnSpacing={{ xs: 2, sm: 3, md: 5 }}
                                    >
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                type='email'
                                                placeholder='Enter OTP'
                                                label="Enter OTP"
                                                name='otp'
                                                helperText='A message was sent to your phone'
                                            />
                                        </Grid>


                                    </Grid>
                                </>
                            )}
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent: "center" }}>
                                <Button onClick={handleNext} variant="contained" fullWidth>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
                                </Button>
                            </Box>
                        </Paper>
                    </>
                )}
            </Box>
        </React.Fragment >
    );
}