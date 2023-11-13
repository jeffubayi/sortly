import React, { useState, useEffect } from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { TextField, MenuItem, Grid, Button, Box, List, ListItem, Skeleton, ListItemIcon, ListItemText, ListSubheader, Paper, Switch, Tab, Tabs, Typography, Container } from '@mui/material';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { GetServerSidePropsContext } from 'next'

import Profile from "../../components/accountCard";
import InviteList from "../../components/inviteList";
import { toggleColorMode } from '../../redux/features/themeSlice';
// import { setUserProfile } from '../../redux/userProfileSlice'
import useRedirectLoggedOutUser from '../../utility/useRedirectLoggedOutUser';
import { getUser } from '../../services/authService';
import { SET_NAME, SET_USER, selectUser } from '../../redux/features/auth/authSlice';
import * as Yup from 'yup';
import { LogoButton, MainButton } from "../../components/Buttons";
import { InputField, SelectField } from "../../components/TextFields";
import { updateUser } from "../../services/authService";
import { Formik, Form } from 'formik';
import PageTitle from '../../components/pageTitle';

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
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState("")
    const [company, setCompany] = useState("")
    const [website, setWebsite] = useState("")
    const [data, setData] = useState<any>({})
    const [avatar_url, setAvatarUrl] = useState("")
    const isDarkMode = useSelector((state: RootState) => state.darkMode);

    const handleDarkModeToggle = () => {
        dispatch(toggleColorMode());
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    // useEffect(() => {
    //     async function getProfile() {
    //         try {
    //             setLoading(true)
    //             if (!user) throw new Error('No user')

    //             let { data, error, status } = await supabase
    //                 .from('accounts')
    //                 .select(`*`)
    //                 .eq('id', user.id)
    //                 .single()

    //             if (error && status !== 406) {
    //                 throw error
    //             }
    //             console.log(`dataaaa`, data, user.id)
    //             if (data) {
    //                 setUsername(data.username)
    //                 setWebsite(data.website)
    //                 setAvatarUrl(data.avatar_url)
    //                 setCompany(data.firstName)
    //                 setData(data)
    //                 // dispatch(setUserProfile(data))
    //             }
    //         } catch (error) {
    //             toast.error('Error loading user data!');
    //             console.log(error)
    //         } finally {
    //             setLoading(false)
    //         }
    //     }
    //     getProfile()
    // }, [user, dispatch])




    // async function updateProfile({
    //     username,
    //     website,
    //     avatar_url,
    //     company,
    // }: {
    //     username: string,
    //     website: string,
    //     avatar_url?: string,
    //     company: string
    // }) {
    //     try {
    //         setLoading(true)
    //         if (!user) throw new Error('No user')

    //         const updates = {
    //             id: user.id,
    //             username,
    //             website,
    //             avatar_url,
    //             company,
    //             updated_at: new Date().toISOString(),
    //         }
    //         let { data, error } = await supabase.from('profiles').upsert(updates).select()
    //         console.log(`  data`, data)
    //         if (error) throw error
    //         // dispatch(setUserProfile(updates))
    //         toast.success('Profile updated successfully!');

    //     } catch (error) {
    //         toast.error('Error updating the data!');
    //         console.log(error)
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    return (
        <Container maxWidth="md" component="main" sx={{ p: 2 }} >
            <Grid container spacing={2}>

                <Grid item xs={12} md={4}>
                    <Profile
                        onUpload={(event: React.SyntheticEvent, url: string) => {
                            setAvatarUrl(url)
                            // updateProfile({ username, website, avatar_url: url, company })
                        }}
                        url={avatar_url}
                        username={data.firstName + "" + data.lastName}
                        website={website}
                    />
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
                                    initialValues={userData}
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
                                                    <Grid item xs={12}md={6}>
                                                        <InputField
                                                            type='email'
                                                            name="email"
                                                            placeholder='Type your email address'
                                                            label="Email"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <InputField
                                                            name="phone"
                                                            label="Phone Number"
                                                            placeholder='Type your phonr number'
                                                            type="text"
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

// export const getServerSideProps = async (ctx: any) => {
//     const {
//         data: { session },
//     } = await supabase.auth.getSession()


//     if (!session)
//         return {
//             redirect: {
//                 destination: '/login',
//                 permanent: false,
//             },
//         }

//     return {
//         props: {
//             initialSession: session,
//             user: session.user,
//         },
//     }
// }