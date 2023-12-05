
import React, { useState } from 'react';
import { Grid, Box, Stack, Typography, Chip, TextField, Alert, Divider, StepLabel, Step, Paper, Stepper, Button, MenuItem, Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import toast from 'react-hot-toast';
import { MuiFileInput } from 'mui-file-input'
import { MuiOtpInput } from 'mui-one-time-password-input'
import AttachFileIcon from '@mui/icons-material/AttachFile'
// import { Formik, Field, Form } from 'formik';
// import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { selectName } from '../../redux/features/auth/authSlice';
import { updateUser } from "../../services/authService";
import { SET_USER } from "../../redux/features/auth/authSlice"
import axios from 'axios';


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
    const [resendLoading, setResendLoading] = useState(false);
    const [otpError, setOtpError] = useState("");
    // const [uploading, setUploading] = useState(false);
    // const [avatar, setAvatar] = useState("");


    const handleChangeOTP = (newValue: string) => {
        setOtp(newValue)
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

    const sendOTP = async () => {
        const recipients = {
            recipients: ['+254707748115'],
        };
        if (otp) {
            setResendLoading(true);
            const otpResponse = await axios({
                method: "post",
                url: "auth/otp/sms",
                data: recipients,
            });
            setResendLoading(false);
            console.log("otpResponse from sending otp");
            console.log(otpResponse.data);
            if (otpResponse.data.success) {
                localStorage.setItem("otpToken", otpResponse.data.data.otpToken);
                toast.success("Kindly check your phone for the OTP");
                setExpiryCounter(300);
            } else {
                toast.error("OTP could not be send, try again later");
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

    const handleFileChange = (event: any) => {
        // setUploading(true)
        const files = event.target.files;
        const myFiles = Array.from(files);
        // const filePath = `profile/${myFiles[0]?.name}`
        // const storageRef = ref(storage, filePath);
        // upload image to firebase
        // uploadBytes(storageRef, myFiles[0]).then((snapshot) => {
        // get uploaded image
        // const bucketRef = ref(storage, snapshot.metadata.fullPath);
        // getDownloadURL(bucketRef)
        // .then(async (avatar) => {
        // update user profile
        // setAvatar(avatar);
        // setUploading(false)
        toast.success("Profile photo  successfully updated");

        //     dispatch(updateUser({
        //         ...user,
        //         avatar,
        //     }))
        // })
        // });
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

                                            <MuiFileInput value={file}
                                                onChange={handleFileChange}
                                                label="Profile photo (optional)"
                                                fullWidth
                                                placeholder="Insert profile image"
                                                InputProps={{
                                                    inputProps: {
                                                        accept: '.png, .jpeg'
                                                    },
                                                    startAdornment: <AttachFileIcon />
                                                }}
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
                                            <Stack
                                                direction="column"
                                                justifyContent="center"
                                                alignItems="center"
                                                p={2}
                                                spacing={1}>

                                                <Box px={6}>
                                                    <MuiOtpInput length={4} TextFieldsProps={{ size: 'small' }} value={otp} onChange={handleChangeOTP} />
                                                </Box>
                                                <Typography variant="caption" sx={{ color: "grey", mt: 2, fontSize: "0.65rem" }}>We have sent a One Time Password to your phone <strong>{formData?.phone}</strong></Typography>
                                                {expiryCounter < 0 ? (
                                                    <Typography variant="caption" sx={{ color: "grey", mt: 2, fontSize: "0.8rem" }}> You can resend after <b> {fancyTimeFormat(expiryCounter)}</b></Typography>) : (
                                                    <Button onClick={sendOTP} variant="text">{resendLoading ? "Sending OTP..." : "Resend OTP"}</Button>
                                                )}

                                                <Button onClick={handleVerify}  fullWidth variant="contained">
                                                    {!isUpdateLoading ? (
                                                        "Verify Account"
                                                    ) : ("Verifying..")}
                                                </Button>
                                            </Stack>
                                        </Grid>


                                    </Grid>
                                </>
                            )}
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent: "center" }}>
                                {activeStep < 2 && (
                                    <Button onClick={handleNext} variant="contained" fullWidth>
                                        Continue
                                    </Button>
                                )}
                            </Box>
                        </Paper>
                    </>
                )}
            </Box>
        </React.Fragment >
    );
}