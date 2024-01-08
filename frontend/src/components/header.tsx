import * as React from 'react';
import { Badge, Divider, ListItemIcon, List, Menu, MenuItem, IconButton, Button, Avatar, Box, Toolbar, Tooltip, Typography, ListItem, ListItemAvatar, ListItemText, Card, CardHeader } from '@mui/material';
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
    const currentRoute: string = location.pathname;
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

    const appPages = [
        { url: "dashboard", page: "Dashboard", icon: < DashboardIcon fontSize="small" sx={{ color: currentRoute === "/dashboard" ? "text.secondary" : "text.primary" }} /> },
        { url: "items", page: "Products", icon: < ShoppingCartIcon fontSize="small" sx={{ color: currentRoute === "/items" ? "text.secondary" : "text.primary" }} /> },
        { url: "search", page: "Search", icon: < SearchIcon fontSize="small" sx={{ color: currentRoute === "/search" ? "text.secondary" : "text.primary" }} /> },
        { url: "tags", page: "Category", icon: < LocalOfferIcon fontSize="small" sx={{ color: currentRoute === "/tags" ? "text.secondary" : "text.primary" }} /> },
        { url: "reports", page: "Reports", icon: < AssessmentRoundedIcon fontSize="small" sx={{ color: currentRoute === "/reports" ? "text.secondary" : "text.primary" }} /> }
    ]

    const settingsPages = [
        {
            url: "notifications", page: "Notifications", icon: <Badge badgeContent={1} color="error">
                <NotificationsIcon fontSize="small" sx={{ color: currentRoute === "/notifications" ? "text.secondary" : "text.primary" }} />
            </Badge>
        },
        { url: "profile", page: "Profile", icon: < SettingsIcon fontSize="small" sx={{ color: currentRoute === "/profile" ? "text.secondary" : "text.primary" }} /> },
        { url: "help", page: "Help", icon: < ContactSupportIcon fontSize="small" sx={{ color: currentRoute === "/help" ? "text.secondary" : "text.primary" }} /> },
    ]


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
                        <Avatar
                            // variant="square"
                            sx={{ cursor: "pointer" }}
                            src="https://play-lh.googleusercontent.com/80VbneEtlj_6cfGajIbCBzMlBl-8J1f6nC7KmC5vjnCMUavL_mUGVGu9N_Bp0z4bWVE"
                        />
                    </IconButton>
                    <Box sx={{ display: "flex", gap: 1, flexGrow: 1 }} />

                    <div>
                        <Tooltip title="Profile" >
                            <IconButton

                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit"
                                onClick={handleClick}
                            >
                                <Avatar src={userData.photo || "avatarr.png"} alt={userName} />
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
                                    <NotificationsIcon fontSize="small" color="secondary" />
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
            </AppBar>
            <Toolbar />
            {!isSmallScreen && (
                <Drawer PaperProps={{ style: { border: 'none' } }} variant="permanent" open={open} >
                    <DrawerHeader>
                        {open && (
                            <Box onClick={() => navigate('/')} >
                                <Avatar
                                    variant="square"
                                    sx={{ height: "2.4rem", width: "6.6rem", cursor: "pointer" }}
                                    src="https://dka575ofm4ao0.cloudfront.net/pages-transactional_logos/retina/231061/Sortly_Logo.png"
                                />
                            </Box >
                        )}
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Box sx={{ display: "flex", gap: 1, flexGrow: 1 }} >
                        <List >
                            {appPages.map((route) => (
                                <ListItem disablePadding sx={{ display: 'block', color: currentRoute === `/${route.url}` ? "text.secondary" : "text.primary" }}>
                                    <ListItemButton
                                        onClick={() => navigate(`/${route.url}`)}
                                        sx={{
                                            minHeight: 48,
                                            bgColor: currentRoute === `/${route.url}` ? "text.secondary" : "text.primary",
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
                                            <Tooltip placement="right-start" title={route.url} >{route.icon}</Tooltip>
                                        </ListItemIcon>
                                        <ListItemText primary={route.page} sx={{ opacity: open ? 1 : 0, color: currentRoute === `/${route.url}` ? "text.secondary" : "text.primary" }} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                    <List >
                        {settingsPages.map((route) => (
                            <ListItem disablePadding sx={{ display: 'block' }}>

                                <ListItemButton
                                    onClick={() => navigate(`/${route.url}`)}
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
                                        <Tooltip   placement="right-start" title={route.url} >{route.icon}</Tooltip>
                                    </ListItemIcon>
                                    <ListItemText primary={route.page} sx={{ opacity: open ? 1 : 0, color: currentRoute === `/${route.url}` ? "text.secondary" : "text.primary" }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
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
            )
            }
        </React.Fragment >
    );
}