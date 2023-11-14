import * as React from 'react';
import { Stack, Badge, Divider, ListItemIcon, Menu, MenuItem, IconButton, Button, AppBar, Avatar, Box, Toolbar, Tooltip, Typography, ListItem, ListItemAvatar, ListItemText, Card, CardHeader, Drawer } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Settings from '@mui/icons-material/ManageAccounts';
import { useSelector, useDispatch } from 'react-redux';

import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/ArrowBackIos';
import ChatIcon from '@mui/icons-material/Chat';
import Fade from '@mui/material/Fade';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import { useNavigate, useLocation } from "react-router-dom";
import NotificationsList from "./notifications"
import { SET_NAME, SET_USER } from '../redux/features/auth/authSlice'
import { logoutUser, getUser, getLoginStatus } from '../services/authService';
import { SET_LOGIN, selectUser, selectName } from '../redux/features/auth/authSlice';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const userData = useSelector(selectUser)
    const userName = useSelector(selectName)
    // const [isLoading, setIsLoading] = React.useState(false)
    const isSmallScreen = useMediaQuery("(max-width: 600px)");
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [notificationEl, setNotificationAnchorEl] = React.useState<null | HTMLElement>(null);
    const openNotifications = Boolean(notificationEl);
    const currentRoute: string = location.pathname;
    const [state, setState] = React.useState({
        right: false,
    });

    React.useEffect(() => {
        async function loginStatus() {
            const status = await getLoginStatus();
            dispatch(SET_LOGIN(status));
        }
        loginStatus();
    }, [dispatch]);

    // const handleNotificationsClick = (event: React.MouseEvent<HTMLElement>) => {
    //     setNotificationAnchorEl(event.currentTarget);
    // };
    const handleNotificationsClose = () => {
        setNotificationAnchorEl(null);
    };

    React.useEffect(() => {
        // setIsLoading(true)
        async function getUserData() {
            const data = await getUser()
            console.log(`profile`, data);
            await dispatch(SET_NAME(data?.name))
            await dispatch(SET_USER(data))
            // setIsLoading(false)
        }
        getUserData()
    }, [dispatch])




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

    // React.useEffect(() => {
    //     const fetchOrders = async () => {
    //         const { data } = await supabase.from('profiles').select(`account`).eq('id', user?.id).single();
    //         setAccount(data?.account)

    //     }

    //     fetchOrders()
    // }, [user?.id])


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleLogout = async () => {
        await logoutUser();
        await dispatch(SET_LOGIN(false));
        navigate(`/auth/login`)
    }


    return (
        <React.Fragment>
            <AppBar
                position={"fixed"}
                color="inherit"
                elevation={0}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Box onClick={() => navigate('/')} sx={{ display: "flex", gap: 1, flexGrow: 1 }}>
                        <Avatar
                            variant="square"
                            sx={{ height: "2.4rem", width: "6.6rem", cursor: "pointer" }}
                            src="https://dka575ofm4ao0.cloudfront.net/pages-transactional_logos/retina/231061/Sortly_Logo.png"
                        />
                    </Box >
                    {!isSmallScreen && (
                        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                            <MenuItem onClick={() => navigate("/dashboard")} sx={{ color: currentRoute === "/dashboard" ? "text.secondary" : "text.primary" }}>
                                <ListItemIcon>
                                    <DashboardRoundedIcon fontSize="small" sx={{ color: currentRoute === "/dashboard" ? "text.secondary" : "text.primary" }} />
                                </ListItemIcon>
                                Dashboard
                            </MenuItem>
                            <MenuItem onClick={() => navigate("/items")} sx={{ color: currentRoute === "/items" ? "text.secondary" : "text.primary", borderBottom: '1px solid text.secondary' }}>
                                <ListItemIcon>
                                    <ShoppingCartIcon fontSize="small" sx={{ color: currentRoute === "/items" ? "text.secondary" : "text.primary" }} />
                                </ListItemIcon>
                                Items
                            </MenuItem>
                            <MenuItem onClick={() => navigate("/tags")} sx={{ color: currentRoute === "/tags" ? "text.secondary" : "text.primary" }}>
                                <ListItemIcon>
                                    <LocalOfferIcon fontSize="small" sx={{ color: currentRoute === "/tags" ? "text.secondary" : "text.primary" }} />
                                </ListItemIcon>
                                Tags
                            </MenuItem>
                            <MenuItem onClick={() => navigate("/reports")} sx={{ color: currentRoute === "/reports" ? "text.secondary" : "text.primary", borderBottom: '1px solid text.secondary' }}>
                                <ListItemIcon>
                                    <AssessmentRoundedIcon fontSize="small" sx={{ color: currentRoute === "/reports" ? "text.secondary" : "text.primary" }} />
                                </ListItemIcon>
                                Reports
                            </MenuItem>

                        </Box>
                    )}
                    <div>
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
                                    <Avatar src={userData.photo || "avatarr.png"} alt={userName} sx={{ height: "2.3rem", width: "2.3rem" }} />
                                </IconButton>
                            </Tooltip>
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
                                    minWidth: 200,
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
                                <ListItemText primary={userData.name} secondary={userData.email} />

                            </ListItem>
                            <Divider />
                            <MenuItem onClick={() => navigate("/profile")}>
                                <ListItemIcon>
                                    <Settings fontSize="small" color="secondary" />
                                </ListItemIcon>
                                Profile Settings
                            </MenuItem>
                            <MenuItem onClick={() => navigate("/messages")} >
                                <ListItemIcon>
                                    <ChatIcon fontSize="small" color="secondary" />
                                </ListItemIcon>
                                Messages
                            </MenuItem>

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