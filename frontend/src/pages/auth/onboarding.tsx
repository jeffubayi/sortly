
import * as React from 'react';
import { Grid, Box, Stack, Typography, Chip, TextField, Alert, Divider, StepLabel, Step, Paper, Stepper, Button, MenuItem, Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import toast from 'react-hot-toast';
// import { Formik, Field, Form } from 'formik';
// import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
// import '../static/css/otp.css'
import OTPInput from 'otp-input-react';

import { selectName } from '../../redux/features/auth/authSlice';
import { updateUser } from "../../services/authService";
import { SET_USER } from "../../redux/features/auth/authSlice"

const steps = ['Select Role', 'Personal Details', 'Verify Account'];

export default function Login() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [formData, setFormData] = React.useState<any>({});
    const [formErrors] = React.useState<any>({});
    const [otp, setOtp] = React.useState('');
    const userName = useSelector(selectName)
    const email = localStorage.getItem('user_email')
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
            console.log(`USER`,formData)
            localStorage.setItem('user_image',formData.photo)
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
                        <ListItem alignItems="flex-start"
                            secondaryAction={<Chip size="small" label={formData.role} />
                            } >
                            <ListItemAvatar>
                                <Avatar alt="user" src={formData.photo} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography color="text.primary">
                                         {formData.phone}
                                    </Typography>
                                }
                                secondary={
                                    <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="caption"
                                    color="text.primary"
                                >
                                    {formData.bio}
                                </Typography>
                                }
                            />
                        </ListItem>
                       
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
                                                placeholder='Paste image url'
                                                label="Profile Photo"
                                                name="photo"
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
                                        Please enter the OTP to verify your account
                                    </Divider>
                                    <Grid container
                                        rowSpacing={2}
                                        columnSpacing={{ xs: 2, sm: 3, md: 5 }}
                                    >
                                        <Grid item xs={12}>
                                            {/* <TextField
                                                fullWidth
                                                type='email'
                                                placeholder='Enter OTP'
                                                label="Enter OTP"
                                                name='otp'
                                                helperText='A message was sent to your phone'
                                            /> */}
                                            {/* <OtpInput
                                                value={otp}
                                                onChange={setOtp}
                                                numInputs={4}
                                                placeholder='A message was sent to your phone,please type in the digits'
                                                renderSeparator={<span>-</span>}
                                                renderInput={(props) => <input {...props} />}
                                            /> */}
                                            <Stack justifyContent="center" alignItems="center" spacing="2" direction="column" mb={1} >

                                                <OTPInput
                                                    value={otp}
                                                    onChange={setOtp}
                                                    autoFocus
                                                    OTPLength={4}
                                                    otpType="number"
                                                    disabled={false}
                                                    inputStyles={{
                                                        "marginInline": "5px",
                                                        width: "45px",
                                                        height: "45px",
                                                        // borderRadius:"10px"
                                                    }}
                                                    inputClassName="appearance-none border rounded-lg leading-tight focus:outline-none focus:border-2 focus:border-red-900"
                                                />
                                                <Typography variant="caption" sx={{ color: "grey", mt: 2, fontSize: "0.65rem" }}>A code has been sent to {email || formData?.phone}</Typography>
                                                <Button variant="text">Resend OTP</Button>
                                                {/* <ResendOTP onResendClick={() => console.log("Resend clicked")} /> */}
                                            </Stack>
                                        </Grid>


                                    </Grid>
                                </>
                            )}
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent: "center" }}>
                                <Button onClick={handleNext} variant="contained" fullWidth>
                                    {activeStep === steps.length - 1 ? 'Verify' : 'Continue'}
                                </Button>
                            </Box>
                        </Paper>
                    </>
                )}
            </Box>
        </React.Fragment >
    );
}