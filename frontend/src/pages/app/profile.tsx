import React, { useState, useEffect } from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { Grid, Box, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Paper, Switch, Tab, Tabs, Typography, Container, Avatar, Badge, Card, IconButton, Skeleton, Stack, Tooltip } from '@mui/material';
// import toast from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";

// import Profile from "../components/accountCard";
import InviteList from "../../components/inviteList";
import useRedirectLoggedOutUser from '../../utility/useRedirectLoggedOutUser';
import { getUser } from '../../services/authService';
import { SET_NAME, SET_USER, selectUser } from '../../redux/features/auth/authSlice';
import * as Yup from 'yup';
import { MainButton } from "../../components/Buttons";
import { InputField } from "../../components/TextFields";
import { updateUser } from "../../services/authService";
import { Formik, Form } from 'formik';
import EditIcon from '@mui/icons-material/AddAPhoto';

const validationSchema = Yup.object({
    name: Yup.string().required('User name is required'),
    email: Yup.string().email('Please enter a valid email').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    bio: Yup.string().required('required'),
    photo: Yup.string()
});

interface userDataValues {
    name: string,
    email: string,
    photo: string,
    phone: string,
    bio: string
}

interface RootState {
    darkMode: boolean;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function About() {
    const userData = useSelector(selectUser)
    const dispatch = useDispatch();
    const [value, setValue] = useState(0)
    const isDarkMode = useSelector((state: RootState) => state.darkMode);
    useRedirectLoggedOutUser("auth/login")

    const [profile, setProfile] = useState<userDataValues>(userData)
    // const [isLoading, setIsLoading] = useState(false)
    console.log('PROF', profile,userData)

    useEffect(() => {
        // setIsLoading(true)
        async function getUserData() {
            const data = await getUser()
            setProfile(data)
            // setIsLoading(false)
            await dispatch(SET_USER(data))
            await dispatch(SET_NAME(data.name))
        }
        getUserData()
    }, [dispatch])

    const handleDarkModeToggle = () => {
        // dispatch(toggleColorMode());
    };

    const handleProfileUpdate = async (values: userDataValues, { setSubmitting }: { setSubmitting: any }) => {
        try {
            const data = await updateUser(values);
            await dispatch(SET_NAME(data?.name))
            setProfile(data)
            setSubmitting(false)
        } catch (error: any) {
            setSubmitting(false)
            console.log(error.message)
        }
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Container maxWidth="md" component="main" sx={{ p: 2 }} >
            {/* <PageTitle title="Profile" /> */}
            <Grid container spacing={2}>
                {/* <Grid item xs={12} md={4}>
                    <Image
                    src="data:image/png;base64,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"
                    alt="sortly"
                    height={100}
                    width="100%"
                    />
                </Grid> */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ px: 2, py: 4, borderRadius: "0.7rem", mt: 2 }} elevation={0}>
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={1}>
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <Tooltip title="Select Image">
                                        <IconButton aria-label="upload picture" component="label" >
                                            <input hidden accept="image/*" type="file"
                                            // onChange={uploadAvatar}
                                            // disabled={uploading} 
                                            />
                                            <EditIcon color="secondary" />
                                        </IconButton>
                                    </Tooltip>
                                }
                            >
                                {profile ? (<Avatar alt="user" sx={{ width: "6.5rem", height: "6.5rem", m: 1 }} src={profile.photo} />) : (
                                    <Skeleton animation="wave" variant="circular" sx={{ width: "7rem", height: "7rem", m: 1 }} />
                                )}
                            </Badge>
                            {profile ? <Typography component="div" variant="h6">
                                {profile?.name}
                            </Typography>
                                : <Skeleton width="60%" />}
                            {profile ? <Typography variant="subtitle2" color="text.secondary" component="div">
                                {userData?.role}
                            </Typography>
                                : <Skeleton />}
                        </Stack>
                    </Card>
                </Grid>
                <Grid item xs={12} md={8} sx={{ mb: 60 }}>

                    <Paper sx={{ width: '100%', px: 2, py: 4, borderRadius: "0.7rem", mt: 2 }} elevation={0} >

                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab iconPosition="start" label="Personal details" {...a11yProps(0)} sx={{ textTransform: 'capitalize' }} />
                                <Tab iconPosition="start" label="Appearance" {...a11yProps(2)} sx={{ textTransform: 'capitalize' }} />
                                <Tab iconPosition="start" label="Invites" {...a11yProps(1)} sx={{ textTransform: 'capitalize' }} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <Paper sx={{ width: '100%', py: 2, px: 1, borderRadius: "1rem" }} elevation={0}>
                                <Formik
                                    initialValues={profile}
                                    onSubmit={handleProfileUpdate}
                                    validationSchema={validationSchema}>
                                    {({
                                        isSubmitting,
                                    }) => (
                                        <Form>
                                            {/* <Box sx={{ mx: 2 }}> */}
                                            <Grid container
                                                rowSpacing={2}
                                                columnSpacing={{ xs: 2, sm: 3, md: 2 }}
                                            >
                                                <Grid item xs={12}>
                                                    <InputField
                                                        name="name"
                                                        placeholder='Type your name'
                                                        label="User Name"
                                                        type='text'
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <InputField
                                                        type='email'
                                                        name="email"
                                                        disabled={true}
                                                        placeholder='Type your email address'
                                                        label="Email"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <InputField
                                                        name="phone"
                                                        label="Phone Number"
                                                        placeholder='Type your phonr number'
                                                    />
                                                </Grid>
                                                <Grid item xs={12} >
                                                    <InputField
                                                        name="bio"
                                                        label="Bio"
                                                        type="text"
                                                    />
                                                </Grid>

                                                <Grid item xs={12} >
                                                    <MainButton
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        variant="contained"
                                                        label="Edit Profile"
                                                    />
                                                </Grid>

                                            </Grid>
                                            {/* </Box> */}
                                        </Form>
                                    )}
                                </Formik>
                                {/* {profile ? (
                                    <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 3, md: 5 }}>

                                        <Grid item xs={12} md={12}>
                                            <TextField
                                                fullWidth
                                                label="User Name"
                                                type="text"
                                                value={profile?.name}
                                                onChange={(e) => setUsername(e.target.value)}
                                                InputProps={{
                                                    style: {
                                                        borderRadius: "10px",
                                                    }
                                                }}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} >
                                            <TextField InputProps={{
                                                style: {
                                                    borderRadius: "10px",
                                                }
                                            }}
                                                fullWidth label="Email" type="text" value={profile?.email} disabled />
                                        </Grid>
                                        <Grid item xs={12} md={6} >
                                            <TextField InputProps={{
                                                style: {
                                                    borderRadius: "10px",
                                                }
                                            }}
                                                fullWidth label="Phone Number" type="text" value={profile?.phone} />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <TextField
                                                fullWidth
                                                label="Bio"
                                                multiline
                                                rows={2}
                                                type="text"
                                                value={profile.bio}
                                                onChange={(e) => setWebsite(e.target.value)}
                                                InputProps={{
                                                    style: {
                                                        borderRadius: "10px",
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <Button
                                                fullWidth
                                                sx={{ color: `contrastText` }}
                                                variant="contained"
                                                onClick={() => updateProfile({ username, website, avatar_url, company })}
                                                disabled={loading}
                                            >
                                                {'Save Changes'}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                ) : (<Skeleton />)} */}
                            </Paper>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <List
                                sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper', borderRadius: "1rem" }}
                                subheader={<ListSubheader>Theme preferences</ListSubheader>}
                            >
                                <ListItem>
                                    <ListItemIcon>
                                        <Brightness4Icon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText id="switch-list-label-bluetooth" primary="Dark theme" />
                                    <Switch
                                        edge="end"
                                        checked={isDarkMode} onChange={handleDarkModeToggle}
                                        inputProps={{
                                            'aria-labelledby': 'switch-list-label-bluetooth',
                                        }}
                                    />
                                </ListItem>
                            </List>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <InviteList />
                        </TabPanel>
                    </Paper>
                </Grid>
            </Grid >
        </Container >
    );
}