import * as React from 'react';
import { useRouter } from "next/router";
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Stack, Chip, Badge, Divider, ListItemIcon, ListItemButton, Menu, MenuItem, IconButton, Button, AppBar, Avatar, Box, Toolbar, Tooltip, Typography, ListItem, ListItemAvatar, ListItemText, Card, CardHeader, Drawer, TextField } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useSession, useUser } from '@supabase/auth-helpers-react'
import Settings from '@mui/icons-material/ManageAccounts';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image'
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import WalletIcon from '@mui/icons-material/Wallet';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import PeopleIcon from '@mui/icons-material/People';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/ArrowBackIos';
import FaceIcon from '@mui/icons-material/Face';
import ChatIcon from '@mui/icons-material/Chat';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SchoolIcon from '@mui/icons-material/School';
import GavelIcon from '@mui/icons-material/Gavel';
import Person2Icon from '@mui/icons-material/Person2';
import Fade from '@mui/material/Fade';
import WheelchairPickupIcon from '@mui/icons-material/WheelchairPickup';
import BadgeIcon from '@mui/icons-material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StorefrontIcon from '@mui/icons-material/Storefront';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import NotificationsList from "./notifications"
import { SET_NAME, SET_USER, selectIsLoggedIn } from '../redux/features/auth/authSlice'
import { toggleColorMode } from '../redux/features/themeSlice';
import { supabase } from "../utility/supabaseClient";
import { logoutUser, getUser } from '../services/authService';
import { SET_LOGIN, selectUser, selectName } from '../redux/features/auth/authSlice';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function Navbar() {
    const session = useSession();
    const dispatch = useDispatch();
    const router = useRouter();
    const theme = useTheme();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const userData = useSelector(selectUser)
    const userName = useSelector(selectName)
    const [profile, setProfile] = React.useState<any>(null)
    const [isLoading, setIsLoading] = React.useState(false)

    React.useEffect(() => {
        setIsLoading(true)
        async function getUserData() {
            const data = await getUser()
            console.log(`profile`, data);

            setProfile(data)
            setIsLoading(false)
            // await dispatch(SET_USER(data))
            // await dispatch(SET_NAME(data.name))
        }
        getUserData()
    }, [dispatch])

    console.log(`USER`, userData, userName)
    const user = useUser();
    const isSmallScreen = useMediaQuery("(max-width: 600px)");
    const supabaseClient = useSupabaseClient()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [notificationEl, setNotificationAnchorEl] = React.useState<null | HTMLElement>(null);
    const openNotifications = Boolean(notificationEl);
    const handleNotificationsClick = (event: React.MouseEvent<HTMLElement>) => {
        setNotificationAnchorEl(event.currentTarget);
    };
    const handleNotificationsClose = () => {
        setNotificationAnchorEl(null);
    };
    const currentRoute: string = router.pathname;
    const [account, setAccount] = React.useState<any>();
    const [state, setState] = React.useState({
        right: false,
    });



    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    React.useEffect(() => {
        const fetchOrders = async () => {
            const { data } = await supabase.from('profiles').select(`account`).eq('id', user?.id).single();
            setAccount(data?.account)

        }

        fetchOrders()
    }, [user?.id])


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleLogout = async () => {
        await logoutUser();
        await dispatch(SET_LOGIN(false));
        router.push(`/auth/login`)
    }

    const handleDarkModeToggle = () => {
        dispatch(toggleColorMode());
    };

    const navItems = [
        { url: "/home", title: "Home", icon: <HomeIcon /> },
        { url: "/property", title: "jobs", icon: <LocationCityIcon /> },
        { url: "/contracts", title: "contracts", icon: <WalletIcon /> },
        { url: "/chat", title: "Chat", icon: <MarkChatUnreadIcon /> },
    ]

    return (
        <React.Fragment>
            <AppBar
                position={"fixed"}
                color="inherit"
                elevation={0}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Box sx={{ display: "flex", gap: 1, flexGrow: 1 }}>
                        {/* <ListItem>
                            <ListItemAvatar> */}
                        <Avatar
                            variant="square"
                            sx={{ height: "2.4rem", width: "6.6rem" }}
                            src="https://dka575ofm4ao0.cloudfront.net/pages-transactional_logos/retina/231061/Sortly_Logo.png"
                        />
                        {/* </ListItemAvatar>
                            <ListItemText primary={<Typography
                                variant="subtitle2"
                                color="inherit"
                                noWrap
                            >
                                Sortly
                            </Typography>}
                                secondary={<Typography
                                    variant="caption"
                                    color="inherit"
                                    noWrap
                                >
                                   {isSmallScreen ? "IMS": "Inventory Management System"}                                </Typography>} />
                        </ListItem> */}
                    </Box >
                    {isLoggedIn && !isSmallScreen && (
                        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                            <MenuItem onClick={() => router.push("/dashboard")} sx={{ color: currentRoute === "/dashboard" ? "text.secondary" : "text.primary" }}>
                                <ListItemIcon>
                                    <DashboardRoundedIcon fontSize="small" sx={{ color: currentRoute === "/dashboard" ? "text.secondary" : "text.primary" }} />
                                </ListItemIcon>
                                Dashboard
                            </MenuItem>
                            {user?.user_metadata?.role == "client" ? (

                                <MenuItem onClick={() => router.push("/jobs")} sx={{ color: currentRoute === "/jobs" ? "text.secondary" : "text.primary" }} >
                                    <ListItemIcon>
                                        <BadgeIcon fontSize="small" sx={{ color: currentRoute === "/jobs" ? "text.secondary" : "text.primary" }} />
                                    </ListItemIcon>
                                    My Jobs
                                </MenuItem>
                            ) : (
                                <MenuItem onClick={() => router.push("/hire")} sx={{ color: currentRoute === "/hire" ? "text.secondary" : "text.primary", borderBottom: '1px solid text.secondary' }}>
                                    <ListItemIcon>
                                        <ShoppingCartIcon fontSize="small" sx={{ color: currentRoute === "/hire" ? "text.secondary" : "text.primary" }} />
                                    </ListItemIcon>
                                    Items
                                </MenuItem>
                            )}
                            <MenuItem onClick={() => router.push("/contracts")} sx={{ color: currentRoute === "/contracts" ? "text.secondary" : "text.primary" }}>
                                <ListItemIcon>
                                    <LocalOfferIcon fontSize="small" sx={{ color: currentRoute === "/contracts" ? "text.secondary" : "text.primary" }} />
                                </ListItemIcon>
                                Tags
                            </MenuItem>
                            <MenuItem onClick={() => router.push("/courses")} sx={{ color: currentRoute === "/courses" ? "text.secondary" : "text.primary", borderBottom: '1px solid text.secondary' }}>
                                <ListItemIcon>
                                    <AssessmentRoundedIcon fontSize="small" sx={{ color: currentRoute === "/courses" ? "text.secondary" : "text.primary" }} />
                                </ListItemIcon>
                                Reports
                            </MenuItem>

                        </Box>
                    )}
                    <div>
                        {/* {isLoggedIn && !isSmallScreen && (

                            <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={() => router.push("/messages")}>
                                <Badge badgeContent={4} color="error">
                                    <ChatIcon fontSize="small" />
                                </Badge>
                            </IconButton>
                        )}
                        {isLoggedIn &&
                            <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit"
                                onClick={toggleDrawer("right", true)}
                            >
                                <Badge badgeContent={1} color="error">
                                    <NotificationsIcon fontSize="small" />
                                </Badge>
                            </IconButton>
                        } */}
                        {isLoggedIn ? (
                            <>
                                <IconButton
                                    size="large"
                                    aria-label="show 17 new notifications"
                                    color="inherit"
                                    onClick={toggleDrawer("right", true)}
                                >
                                    <Badge badgeContent={1} color="error">
                                        <NotificationsIcon fontSize="small" />
                                    </Badge>
                                </IconButton>

                                <Tooltip title="Profile" >
                                    <IconButton

                                        size="large"
                                        aria-label="show 17 new notifications"
                                        color="inherit"
                                        onClick={handleClick}
                                    >
                                        <Avatar src={userData.photo} alt={userName} sx={{height:"2.3rem",width:"2.3rem"}}/>
                                    </IconButton>
                                </Tooltip>
                            </>
                        ) : (
                            <>
                                <Button onClick={() => router.push("/auth/login")} variant="text" size="small" sx={{ my: 1, mx: 1.5, borderRadius: "0.5rem", px: 4 }}>
                                    Login
                                </Button>
                                <Button onClick={() => router.push("/auth/register")} variant="contained" size="small" sx={{ my: 1, mx: 1.5, borderRadius: "0.5rem", px: 4 }}>
                                    Start a free trial
                                </Button>
                            </>
                        )}
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    minWidth:200,
                                    '& .MuiAvatar-root': {
                                        width: 50,
                                        height: 50
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <ListItem >
                                <Tooltip title="Profile" >
                                    <ListItemAvatar>
                                        <Avatar src={userData.photo} alt={userName} />
                                    </ListItemAvatar>
                                </Tooltip>
                                <ListItemText primary={userName} secondary="Jan 9, 2014" />

                            </ListItem>
                            <Divider />
                            <MenuItem onClick={() => router.push("/settings")}>
                                <ListItemIcon>
                                    <Settings fontSize="small" color="secondary" />
                                </ListItemIcon>
                                Profile Settings
                            </MenuItem>
                            <MenuItem onClick={() => router.push("/messages")} >
                                <ListItemIcon>
                                    <ChatIcon fontSize="small" color="secondary" />
                                </ListItemIcon>
                                Messages
                            </MenuItem>


                            {/* <MenuItem onClick={handleDarkModeToggle}>
                                <ListItemIcon>
                                    <Brightness4Icon fontSize="small" color="secondary" />
                                </ListItemIcon>
                                Dark mode
                            </MenuItem> */}

                            <MenuItem onClick={handleLogout}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="warning"
                                    onClick={handleLogout}
                                    size="small"
                                    sx={{ borderRadius: "0.4rem" }}
                                >
                                    Logout
                                </Button>
                            </MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
                <Menu
                    id="fade-menu"
                    MenuListProps={{
                        'aria-labelledby': 'fade-button',
                    }}
                    anchorEl={notificationEl}
                    open={openNotifications}
                    onClose={handleNotificationsClose}
                    onClick={handleNotificationsClose}
                    TransitionComponent={Fade}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    {/* <MenuItem onClick={handleClose} > */}
                    <Stack direction="row" spacing={1} p={1} justifyContent="space-between">
                        <div>
                            <Typography sx={{ fontWeight: "bold" }}>Notifications</Typography>
                        </div>
                        <div onClick={handleClose}>
                            <Typography>mark as read</Typography>
                        </div>
                    </Stack>

                    {/* </MenuItem> */}
                    <Divider />
                    <NotificationsList />
                </Menu>
            </AppBar>
            <Toolbar />
            <Drawer
                anchor='right'
                open={state.right}
                onClose={toggleDrawer('right', false)}
            >
                <Box
                    sx={{ width: 380 }}
                    role="presentation"
                >
                    <Card >
                        <CardHeader
                            avatar={
                                <IconButton aria-label="settings" onClick={toggleDrawer("right", false)}>
                                    <CloseIcon />
                                </IconButton>
                            }
                            title={<Typography
                                variant="subtitle1"
                                color="inherit"
                                noWrap
                            >
                                Notifications
                            </Typography>}
                            subheader="You have 1 Unread messages"
                        />
                    </Card>
                    <NotificationsList />
                </Box>
            </Drawer>
        </React.Fragment>
    );
}