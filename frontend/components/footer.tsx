import * as React from 'react';
import { BottomNavigation, Paper, BottomNavigationAction } from '@mui/material';
import { useRouter } from "next/router";
import HomeIcon from '@mui/icons-material/Home';
import { useSession, useUser } from '@supabase/auth-helpers-react'
import SchoolIcon from '@mui/icons-material/School';
import GavelIcon from '@mui/icons-material/Gavel';
import BadgeIcon from '@mui/icons-material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StorefrontIcon from '@mui/icons-material/Storefront';

export default function BottomNavbar() {
    const [value, setValue] = React.useState('dashboard');
    const router = useRouter();
    const user = useUser();
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        router.push(`/${newValue}`)
    };

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, mt: 3 }} elevation={3}>
            <BottomNavigation showLabels={false} value={value} onChange={handleChange}>
                <BottomNavigationAction
                    label="Dashboard"
                    value="dashboard"
                    icon={<HomeIcon />}
                />
                {user?.user_metadata?.role == "client" ? (
                    <BottomNavigationAction
                        label="My Jobs"
                        value="jobs"
                        icon={<BadgeIcon />}
                    />
                ) : (
                    <BottomNavigationAction
                        label="Products"
                        value="hire"
                        icon={<ShoppingCartIcon />}
                    />
                )}
                <BottomNavigationAction
                    label="Categories"
                    value="contracts"
                    icon={<LocalOfferIcon />}
                />
                <BottomNavigationAction
                    label="Vendors"
                    value="courses"
                    icon={<StorefrontIcon />}
                />
            </BottomNavigation>
        </Paper>
    );
}