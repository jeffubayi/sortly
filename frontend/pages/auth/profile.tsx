import Head from 'next/head';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { CssBaseline, Grid, Box, TextField, Divider, StepLabel, Step, Paper, Stepper, Typography, Avatar, Button, Checkbox, FormControlLabel, Link, Stack, Dialog } from '@mui/material';
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import router from 'next/router';
import toast from 'react-hot-toast';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
// import { TextField } from "formik-mui";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


const steps = ['Select Role', 'Personal Details', 'Verify Account'];

export default function Login() {
    const supabase = useSupabaseClient()
    const [activeStep, setActiveStep] = React.useState(0);
    const [formData, setFormData] = React.useState<any>({});
    console.log(`data`, formData)


    const handleNext = () => {
        if (activeStep === 2) {

        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    const handleReset = () => {
        // setActiveStep(0);
        handleSignUp()
    };

    const handleChange = (event: any) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required'),
    });

    const initialValues: any = {
        email: "",
        password: "",
    }

    const handleOtpLogin = async () => {
        const { data, error } = await supabase.auth.signInWithOtp({
            phone: '+254707748115',
        })
        console.log(`data`, data)
    };

    const handleSignUp = async () => {

        console.log(`data b4`, formData)
        const { phoneNumber,
            lastName,
            firstName,
            role,
            location } = formData
        //create profile
        const { error } = await supabase.from('accounts').insert([{
            email: "jeffubayi@gmail.com",
            phoneNumber,
            lastName,
            firstName,
            role,
            location,
            created_at: new Date(),
            isVerified: true
        }]);

        // console.log(`data af`, data)

        if (error) {
            // handle the error however you like
            toast.error(` ${error} `)
            return;
        } else {

            toast.success(`Successful registration with ${formData?.email}`)
            router.push('/dashboard');

        }
    };


    return (
        <Dialog
            maxWidth="xl"
            open={true}
            fullScreen
        >
            <Head>
                <title>Profile Setup | Maids of Honour </title>
            </Head>
            <Grid container component="main" sx={{ height: '100vh' }} >
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} component={Paper} square>
                    <Box
                        sx={{
                            my: 3,
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
                            Setup your account
                        </Typography>
                    </Box>
                    <Box sx={{ px: 4 }}>
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
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: "center" }} variant="subtitle2">
                                    Your Account is complete, please click to login
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleReset} variant="contained" fullWidth>Go to dashboard</Button>
                                </Box>
                            </React.Fragment>
                        ) : (
                            <Paper sx={{ px: 2, py: 2 }}>
                                {activeStep === 0 && (
                                    <div>
                                        <Divider orientation="horizontal" flexItem sx={{ my: 4 }}>
                                            Please select your role
                                        </Divider>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="female"
                                            name="role"
                                            onChange={handleChange}
                                            row
                                        >
                                            <FormControlLabel value="client" control={<Radio />} label="Client" />
                                            <FormControlLabel value="service Provider" control={<Radio />} label="Service Provider" />
                                        </RadioGroup>
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
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    type='text'
                                                    placeholder='Type your name'
                                                    label="First Name"
                                                    name="firstName"
                                                    onChange={handleChange}

                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    type='text'
                                                    placeholder='Type your name'
                                                    label="Last Name"
                                                    name="lastName"
                                                    onChange={handleChange}
                                                />
                                            </Grid>
                                            <Grid item xs={12} >
                                                <TextField
                                                    fullWidth
                                                    placeholder='Type your phone number'
                                                    label="Phone number"
                                                    name="phoneNumber"
                                                    onChange={handleChange}
                                                />
                                            </Grid>
                                            <Grid item xs={12} >
                                                <TextField
                                                    fullWidth
                                                    type='email'
                                                    placeholder='Type your location'
                                                    label="Location"
                                                    name="location"
                                                    onChange={handleChange}
                                                />
                                            </Grid>

                                            <Grid item xs={12} >
                                                <FormControl>
                                                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        defaultValue="female"
                                                        name="gender"
                                                        row
                                                    >
                                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                                    </RadioGroup>
                                                </FormControl>
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
                        )}
                    </Box>

                </Grid>
                {/* <Grid item xs={false} sm={4} md={7}
                    sx={{
                        backgroundImage: 'url(https://maidsofhonour.africa/static/media/chef3.6d4c44dc59093b00b3f8.jpg)',
                        backgroundRepeat: 'repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                /> */}

            </Grid >
        </Dialog >
    );
}


// import { useState } from "react";
// import {
//     Container,
//     Grid,
//     Typography,
//     Button,
//     TextField,
//     Stepper,
//     Step,
//     StepLabel,
//     Dialog,
// } from "@mui/material";
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import { Head } from "next/document";

// const steps = ["Step 1", "Step 2", "Step 3"];

// const MultiStepForm = () => {
//     const [activeStep, setActiveStep] = useState(0);
//     const [formData, setFormData] = useState({});
//     console.log(`data`, formData)
//     const handleNext = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     };

//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };

//     const handleChange = (event: any) => {
//         setFormData({
//             ...formData,
//             [event.target.name]: event.target.value,
//         });
//     };

//     return (
//         <Container maxWidth="sm" sx={{ mt: 8 }}>
//             <Dialog
//                 maxWidth="xl"
//                 open={true}
//                 fullScreen
//             >
//                 <Head>
//                     <title>Account Setup | Maids of Honour </title>
//                 </Head>
//                     <Stepper activeStep={activeStep}>
//                         {steps.map((label) => (
//                             <Step key={label}>
//                                 <StepLabel>{label}</StepLabel>
//                             </Step>
//                         ))}
//                     </Stepper>
//                     <Grid container direction="column" alignItems="center" spacing={2}>
//                         <Grid item xs={12}>
//                             {activeStep === 0 && (
//                                 <>
//                                     <Typography variant="h6">Step 1</Typography>
//                                     <TextField
//                                         label="Name"
//                                         name="name"
//                                         onChange={handleChange}
//                                         fullWidth
//                                         margin="normal"
//                                     />
//                                     <FormControl fullWidth>
//                                         <InputLabel id="demo-simple-select-label">Age</InputLabel>
//                                         <Select
//                                             labelId="demo-simple-select-label"
//                                             id="demo-simple-select"
//                                             label="role"
//                                             name="role"
//                                             onChange={handleChange}
//                                         >
//                                             <MenuItem value="client">Ten</MenuItem>
//                                             <MenuItem value="sp">Twenty</MenuItem>
//                                         </Select>
//                                     </FormControl>

//                                 </>
//                             )}
//                             {activeStep === 1 && (
//                                 <>
//                                     <Typography variant="h6">Step 2</Typography>
//                                     <TextField
//                                         label="Email"
//                                         name="email"
//                                         onChange={handleChange}
//                                         fullWidth
//                                         margin="normal"
//                                     />
//                                 </>
//                             )}
//                             {activeStep === 2 && (
//                                 <>
//                                     <Typography variant="h6">Step 3</Typography>
//                                     <TextField
//                                         label="Phone"
//                                         name="phone"
//                                         onChange={handleChange}
//                                         fullWidth
//                                         margin="normal"
//                                     />
//                                 </>
//                             )}
//                         </Grid>
//                         <Grid item xs={12}>
//                             <Button
//                                 variant="contained"
//                                 color="primary"
//                                 onClick={handleNext}
//                                 disabled={activeStep === steps.length - 1}
//                             >
//                                 {activeStep === steps.length - 1 ? "Submit" : "Next"}
//                             </Button>
//                             {activeStep > 0 && (
//                                 <Button
//                                     variant="contained"
//                                     color="secondary"
//                                     onClick={handleBack}
//                                     sx={{ marginLeft: 8 }}
//                                 >
//                                     Back
//                                 </Button>
//                             )}
//                         </Grid>
//                     </Grid>
//                 <Grid item xs={false} sm={4} md={7}
//                     sx={{
//                         backgroundImage: 'url(https://maidsofhonour.africa/static/media/chef3.6d4c44dc59093b00b3f8.jpg)',
//                         backgroundRepeat: 'repeat',
//                         backgroundColor: (t) =>
//                             t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
//                         backgroundSize: 'cover',
//                         backgroundPosition: 'center',
//                     }}
//                 />
//             </Dialog >
//         </Container >
//     );
// };

// export default MultiStepForm;