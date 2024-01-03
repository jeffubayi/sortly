import * as React from 'react';
import {  Badge, Divider, ListItemIcon, List, Menu, MenuItem, IconButton, Button, Avatar, Box, Toolbar, Tooltip, Typography, ListItem, ListItemAvatar, ListItemText, Card, CardHeader } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Settings from '@mui/icons-material/ManageAccounts';
import { useSelector, useDispatch } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import DashboardIcon from '@mui/icons-material/Dashboard';

import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import LogoutIcon from '@mui/icons-material/Logout';

import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import { useNavigate, useLocation } from "react-router-dom";
import NotificationsList from "./notifications"
import { SET_NAME, SET_USER } from '../redux/features/auth/authSlice'
import { logoutUser, getUser, getLoginStatus } from '../services/authService';
import { SET_LOGIN, selectUser, selectName } from '../redux/features/auth/authSlice';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const drawerWidth = 180;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        borderRight: "none ",
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


export default function Navbar() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const userData = useSelector(selectUser)
    const userName = useSelector(selectName)
    // const [isLoading, setIsLoading] = React.useState(false)
    const isSmallScreen = useMediaQuery("(max-width: 600px)");
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openIt = Boolean(anchorEl);
    const [notificationEl, setNotificationAnchorEl] = React.useState<null | HTMLElement>(null);
    const openNotifications = Boolean(notificationEl);
    const currentRoute: string = location.pathname;
    const [state, setState] = React.useState({
        right: false,
    });
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

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
        (anchor: Anchor, openIt: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: openIt });
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
                position="fixed" open={!isSmallScreen && open}
                color="inherit"
                elevation={0}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box onClick={() => navigate('/')} sx={{ display: "flex", gap: 1, flexGrow: 1 }}>
                        <Avatar
                            variant="square"
                            sx={{ height: "2.4rem", width: "6.6rem", cursor: "pointer" }}
                            src="https://dka575ofm4ao0.cloudfront.net/pages-transactional_logos/retina/231061/Sortly_Logo.png"
                        />
                    </Box >
                    {/* {!isSmallScreen && (
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
                    )} */}
                    <div>
                        {/* <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                            onClick={toggleDrawer("right", true)}
                        >
                            <Badge badgeContent={1} color="error">
                                <NotificationsIcon fontSize="small" />
                            </Badge>
                        </IconButton> */}

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
                            open={openIt}
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
                                    <NotificationsIcon  fontSize="small" color="secondary" />
                                </ListItemIcon>
                                Notifications
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
                {/* <Menu
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
                    <Stack direction="row" spacing={1} p={1} justifyContent="space-between">
                        <div>
                            <Typography sx={{ fontWeight: "bold" }}>Notifications</Typography>
                        </div>
                        <div onClick={handleClose}>
                            <Typography>mark as read</Typography>
                        </div>
                    </Stack>

                    <Divider />
                    <NotificationsList />
                </Menu> */}
            </AppBar>
            <Toolbar />
            {/* <Drawer
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
            </Drawer> */}
            {!isSmallScreen && (
                <Drawer PaperProps={{style: {border: 'none'}}} variant="permanent" open={open} >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Box sx={{ display: "flex", gap: 1, flexGrow: 1 }} >
                    <List >
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                onClick={() => navigate("/dashboard")}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    < DashboardIcon fontSize="small" sx={{ color: currentRoute === "/dashboard" ? "text.secondary" : "text.primary" }} />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                onClick={() => navigate("/items")}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <ShoppingCartIcon fontSize="small" sx={{ color: currentRoute === "/items" ? "text.secondary" : "text.primary" }} />
                                </ListItemIcon>
                                <ListItemText primary="Products" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                onClick={() => navigate("/search")}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <SearchIcon fontSize="small" sx={{ color: currentRoute === "/search" ? "text.secondary" : "text.primary" }} />
                                </ListItemIcon>
                                <ListItemText primary="Search" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                onClick={() => navigate("/tags")}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <LocalOfferIcon fontSize="small" sx={{ color: currentRoute === "/tags" ? "text.secondary" : "text.primary" }} />
                                </ListItemIcon>
                                <ListItemText primary="Tags" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                onClick={() => navigate("/reports")}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <AssessmentRoundedIcon fontSize="small" sx={{ color: currentRoute === "/reports" ? "text.secondary" : "text.primary" }} />
                                </ListItemIcon>
                                <ListItemText primary="Reports" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>

                    </List>
                    </Box>
                    <List >
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                onClick={() => navigate("/notifications")}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Badge badgeContent={1} color="error">
                                        <NotificationsIcon fontSize="small" sx={{ color: currentRoute === "/notifications" ? "text.secondary" : "text.primary" }} />
                                    </Badge>

                                </ListItemIcon>
                                <ListItemText primary="Notification" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                onClick={() => navigate("/profile")}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >

                                    <SettingsIcon fontSize="small" sx={{ color: currentRoute === "/profile" ? "text.secondary" : "text.primary" }} />
                                </ListItemIcon>
                                <ListItemText primary="Profile" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                onClick={() => navigate("/help")}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <ContactSupportIcon fontSize="small" sx={{ color: currentRoute === "/help" ? "text.secondary" : "text.primary" }} />
                                </ListItemIcon>
                                <ListItemText primary="Help" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                onClick={handleLogout}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >

                                    <LogoutIcon fontSize="small" sx={{ color: currentRoute === "/auth/login" ? "text.secondary" : "text.primary" }} />
                                </ListItemIcon>
                                <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>
            )}
        </React.Fragment>
    );
}