
import React, { useState, useRef } from 'react';
import { Grid, Card, Box, CardHeader, Radio, Stack, Typography, Chip, TextField, Alert, Divider, StepLabel, Step, Paper, Stepper, Button, MenuItem, Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import toast from 'react-hot-toast';
import { MuiFileInput } from 'mui-file-input'
import { MuiOtpInput } from 'mui-one-time-password-input'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import axios from 'axios';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import { Formik, Field, Form } from 'formik';
// import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { selectName, selectOtp } from '../../redux/features/auth/authSlice';
import { updateUser, sendOTP } from "../../services/authService";
import { SET_USER } from "../../redux/features/auth/authSlice"
import Person from "../../images/person.png"


const steps = ['Select Role', 'Personal Details', 'Verify Account'];

export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const userName = useSelector(selectName)
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState<any>({});
    const [formErrors] = useState<any>({});
    const [file, setFile] = useState(null);
    const [otp, setOtp] = useState('');
    const [expiryCounter, setExpiryCounter] = useState(300);
    const [isUpdateLoading, setIsUpdateLoading] = useState(false);
    const [checkOtp, setCheckOtp] = useState(true);
    const [resendLoading, setResendLoading] = useState(false);
    const [otpError, setOtpError] = useState("");
    const [selectedValue, setSelectedValue] = React.useState('business');
    const phone = localStorage.getItem('user_phone')
    const OTP_Code = useSelector(selectOtp)

    const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };
    // const [uploading, setUploading] = useState(false);
    // const [avatar, setAvatar] = useState("");


    const handleChangeOTP = (newValue: string) => {
        setOtp(newValue)
        if (OTP_Code === newValue) {
            setCheckOtp(false)
        }
    }


    function fancyTimeFormat(duration: number) {
        // Hours, minutes and seconds
        var hrs = ~~(duration / 3600);
        var mins = ~~((duration % 3600) / 60);
        var secs = ~~duration % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }

    const handleVerify = async () => {
        if (!otp) {
            setOtpError("Enter otp");
        } else {
            setOtpError("");
            setIsUpdateLoading(true);
            toast.success("Phone number verified!");
            navigate("/dashboard");
            try {
                const updateResponse = await axios({
                    method: "post",
                    // url: backendUrl + `auth/otp/sms/verify`,
                    data: {
                        guess: otp,
                    },
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("otpToken"),
                    },
                });
                // setIsUpdateLoading(false);
                console.log("updateResponse");
                console.log(updateResponse);

                if (updateResponse.data.success) {
                    const refetchUserData = await axios({
                        method: "get",
                        // url: `users/${user._id}`,
                        data: "",
                    });

                    // dispatch(updateUserDetails(refetchUserData.data.data));
                    if (refetchUserData.data.success) {
                        toast.success("Phone number verified!");
                        navigate("/dashboard");
                    }
                }
            } catch (error) {
                setIsUpdateLoading(false);
                // console.log(error.response.data.message);
                // toast.error(error.response.data.message);
            }
        }
    };


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

    const handleResend = async () => {
        setResendLoading(true)
        const responseCode = await sendOTP(phone);
        setExpiryCounter(200)
        if (responseCode === otp) {
            setCheckOtp(false)
        }

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
            console.log(`USER`, formData)
            localStorage.setItem('user_image', formData.photo)
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

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleNext = async (event: any) => {
        console.log('STEPS', activeStep)
        if (activeStep === steps.length - 1) {
            toast.success("post db")
            handleSignUp()
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);

        //send OTP
        // if (activeStep === 1) {
        //     const responseCode = await sendOTP(phone);
        //     setCode(responseCode)

        // const response = await axios.post(
        //     `http://localhost:4000/api/sms`,
        //     {
        //       message: `Your Verification Code is 7777`,
        //       recipients: [phone]
        //     }
        //   )
        //   toast.success(response.data.message);
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
                                <StepLabel {...labelProps}></StepLabel>
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
                            Hi  {userName}, Help us personalize your experience by sharing a few details about your needs
                        </Alert>
                        <Box sx={{ px: 2 }}>
                            {activeStep === 0 && (
                                <div>
                                    <Divider orientation="horizontal" flexItem sx={{ my: 4 }}>
                                        What will you use sortly for?
                                    </Divider>
                                    <Grid container
                                        rowSpacing={2}
                                        columnSpacing={{ xs: 2, sm: 3, md: 5 }}
                                    >
                                        <Grid item xs={12} >
                                            <Card elevation={selectedValue === 'business' ? 3 : 0}>
                                                <CardHeader
                                                    avatar={
                                                        <Avatar src="https://previews.123rf.com/images/asmati/asmati1610/asmati161000225/63831570-store-sign-illustration-white-icon-on-red-circle.jpg" />
                                                    }
                                                    action={
                                                        <Radio
                                                            checked={selectedValue === 'business'}
                                                            onChange={handleRoleChange}
                                                            value="business"
                                                        />
                                                    }
                                                    title={<Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>Business</Typography>}
                                                    subheader={<Typography variant="caption" color={selectedValue === 'business' ? "primary" : "text.primary"}>I want to track inventory at my workplace</Typography>}
                                                />
                                            </Card>
                                        </Grid>
                                        <Grid item xs={12} >
                                            <Card elevation={selectedValue === 'personal' ? 3 : 0}>
                                                <CardHeader
                                                    avatar={
                                                        <Avatar src={Person} />
                                                    }
                                                    action={
                                                        <Radio
                                                            checked={selectedValue === 'personal'}
                                                            onChange={handleRoleChange}
                                                            value="personal"
                                                        />
                                                    }
                                                    title={<Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>Personal</Typography>}
                                                    subheader={<Typography variant="caption" color={selectedValue === 'personal' ? "primary" : "text.primary"}>I want to organize stuff in my house</Typography>}
                                                />
                                            </Card>
                                        </Grid>

                                    </Grid>
                                </div>

                            )}
                            {activeStep === 1 && (
                                <>
                                    <Divider orientation="horizontal" flexItem sx={{ my: 4 }}>
                                        A bit about your business
                                    </Divider>
                                    <Grid container
                                        rowSpacing={2}
                                        columnSpacing={{ xs: 2, sm: 3, md: 5 }}
                                    >
                                        <Grid item xs={12} >
                                            <TextField
                                                fullWidth
                                                placeholder='Type company name'
                                                label="Company Name"
                                                name="bio"
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <TextField
                                                fullWidth
                                                label="Industry"
                                                name="bio"
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <TextField
                                                fullWidth
                                                select
                                                label="What products are you using Sortly to track"
                                                name="industry"
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="consumer">Consumer Products</MenuItem>
                                                <MenuItem value="industrial">Industrial Products</MenuItem>
                                                <MenuItem value="service"> Service Products</MenuItem>
                                            </TextField>
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
                                            <Stack
                                                direction="column"
                                                justifyContent="center"
                                                alignItems="center"
                                                p={2}
                                                spacing={1}>

                                                <Box px={6}>
                                                    <MuiOtpInput length={4} TextFieldsProps={{ size: 'small' }} value={otp} onChange={handleChangeOTP} />
                                                </Box>
                                                <Typography variant="caption" sx={{ color: "grey", mt: 2, fontSize: "0.65rem" }}>We have sent a One Time Password to your phone and email <strong>{formData?.phone}</strong></Typography>
                                                {expiryCounter < 0 ? (
                                                    <Typography variant="caption" sx={{ color: "grey", mt: 2, fontSize: "0.8rem" }}> You can resend after <b> {fancyTimeFormat(expiryCounter)}</b></Typography>) : (
                                                    <Button onClick={handleResend} disabled={!checkOtp} variant="text">{resendLoading ? "Verifying..." : "Resend OTP"}</Button>
                                                )}

                                                <Button onClick={handleVerify} fullWidth variant="contained" disabled={checkOtp}>
                                                    {checkOtp ? (
                                                        "Verifying OTP..."
                                                    ) : ("View Dashboard")}
                                                </Button>
                                            </Stack>
                                        </Grid>


                                    </Grid>
                                </>
                            )}
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent: "center" }}>
                                {activeStep < 2 && (
                                    <>
                                        <Button
                                            variant="outlined"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            fullWidth
                                            sx={{ mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                        <Button onClick={handleNext} variant="contained" fullWidth endIcon={<ArrowForwardIcon />}>
                                            Next
                                        </Button>
                                    </>
                                )}
                            </Box>
                        </Box>
                    </>
                )}
            </Box>
        </React.Fragment >
    );
}