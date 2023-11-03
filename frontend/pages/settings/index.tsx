import React, { useState, useEffect } from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useSession, useUser } from '@supabase/auth-helpers-react'
import { TextField, MenuItem, Grid, Button, Box, List, ListItem, Skeleton, ListItemIcon, ListItemText, ListSubheader, Paper, Switch, Tab, Tabs, Typography, Container } from '@mui/material';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { GetServerSidePropsContext } from 'next'

import Profile from "../../components/accountCard";
import InviteList from "../../components/inviteList";
import { toggleColorMode } from '../../redux/features/themeSlice';
import { setUserProfile } from '../../redux/userProfileSlice'
import { supabase } from "../../utility/supabaseClient";

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
    const session = useSession()
    const user = useUser()
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

    useEffect(() => {
        async function getProfile() {
            try {
                setLoading(true)
                if (!user) throw new Error('No user')

                let { data, error, status } = await supabase
                    .from('accounts')
                    .select(`*`)
                    .eq('id', user.id)
                    .single()

                if (error && status !== 406) {
                    throw error
                }
                console.log(`dataaaa`, data, user.id)
                if (data) {
                    setUsername(data.username)
                    setWebsite(data.website)
                    setAvatarUrl(data.avatar_url)
                    setCompany(data.firstName)
                    setData(data)
                    // dispatch(setUserProfile(data))
                }
            } catch (error) {
                toast.error('Error loading user data!');
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        getProfile()
    }, [user, dispatch])




    async function updateProfile({
        username,
        website,
        avatar_url,
        company,
    }: {
        username: string,
        website: string,
        avatar_url?: string,
        company: string
    }) {
        try {
            setLoading(true)
            if (!user) throw new Error('No user')

            const updates = {
                id: user.id,
                username,
                website,
                avatar_url,
                company,
                updated_at: new Date().toISOString(),
            }
            let { data, error } = await supabase.from('profiles').upsert(updates).select()
            console.log(`  data`, data)
            if (error) throw error
            dispatch(setUserProfile(updates))
            toast.success('Profile updated successfully!');

        } catch (error) {
            toast.error('Error updating the data!');
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container maxWidth="md" component="main" sx={{ p: 2 }} >
            <Grid container spacing={2}>

                <Grid item xs={12} md={4}>
                    <Profile
                        onUpload={(event: React.SyntheticEvent, url: string) => {
                            setAvatarUrl(url)
                            updateProfile({ username, website, avatar_url: url, company })
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
                                <Tab iconPosition="start" label="Professional details" {...a11yProps(2)} sx={{ textTransform: 'capitalize' }} />
                                <Tab iconPosition="start" label="Preferences" {...a11yProps(1)} sx={{ textTransform: 'capitalize' }} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <Paper sx={{ width: '100%', py: 2, px: 1, borderRadius: "1rem" }} elevation={0}>
                                {session ? (
                                    <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 3, md: 5 }}>

                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                label="first name"
                                                type="text"
                                                value={data.firstName || user?.user_metadata.name}
                                                onChange={(e) => setUsername(e.target.value)}
                                                InputProps={{
                                                    style: {
                                                        borderRadius: "10px",
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item md={6} xs={12} >
                                            <TextField
                                                fullWidth
                                                size="small"
                                                label="last name"
                                                type="text"
                                                value={data.lastName || user?.user_metadata.name}
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
                                                fullWidth size="small" label="phone number" type="text" value={data.phoneNumber} />
                                        </Grid>
                                        <Grid item xs={12} md={6} >
                                            <TextField InputProps={{
                                                style: {
                                                    borderRadius: "10px",
                                                }
                                            }}
                                                fullWidth size="small" label="email" type="text" value={session?.user?.email} disabled />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <TextField
                                                fullWidth
                                                size="small"
                                                label="Location"
                                                type="url"
                                                value={data.location}
                                                onChange={(e) => setWebsite(e.target.value)}
                                                InputProps={{
                                                    style: {
                                                        borderRadius: "10px",
                                                    }
                                                }}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={4} >
                                            <TextField
                                                InputProps={{
                                                    style: {
                                                        borderRadius: "10px",
                                                    }
                                                }}
                                                select fullWidth size="small" value={company || ''}
                                                onChange={(e) => setCompany(e.target.value)}
                                                type="search"
                                                label="Gender"
                                            >
                                                <MenuItem value="female">
                                                    Male
                                                </MenuItem>
                                                <MenuItem value="female">
                                                    Female
                                                </MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} md={4} >
                                            <TextField
                                                InputProps={{
                                                    style: {
                                                        borderRadius: "10px",
                                                    }
                                                }}
                                                fullWidth size="small" value={company || ''}
                                                onChange={(e) => setCompany(e.target.value)}
                                                type="number"
                                                label="Age"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4}  >
                                            <TextField
                                                InputProps={{
                                                    style: {
                                                        borderRadius: "10px",
                                                    }
                                                }}
                                                select fullWidth size="small" value={company || ''}
                                                onChange={(e) => setCompany(e.target.value)}
                                                type="search"
                                                label="Level of education"
                                            >
                                                <MenuItem value="primary">
                                                    Primary
                                                </MenuItem>
                                                <MenuItem value="secondary">
                                                    Secondary
                                                </MenuItem>
                                                <MenuItem value="university">
                                                    University
                                                </MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} >
                                            <Button
                                                fullWidth
                                                size="small"
                                                sx={{ color: `contrastText` }}
                                                variant="contained"
                                                onClick={() => updateProfile({ username, website, avatar_url, company })}
                                                disabled={loading}
                                            >
                                                {loading ? 'Loading ...' : 'Save Changes'}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                ) : (<Skeleton />)}
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
            </Grid>
        </Container>
    );
}

export const getServerSideProps = async (ctx: any) => {
    // Create authenticated Supabase Client
    // Check if we have a session
    const {
        data: { session },
    } = await supabase.auth.getSession()


    if (!session)
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }

    return {
        props: {
            initialSession: session,
            user: session.user,
        },
    }
}