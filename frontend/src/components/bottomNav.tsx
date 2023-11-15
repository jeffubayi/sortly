import * as React from 'react';
import { BottomNavigation, Paper, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import {  useNavigate } from "react-router-dom";
import { useLocalStorage } from 'react-use';

export default function BottomNavbar() {
    const [value, setValue] = useLocalStorage("dashboard");
    const navigate = useNavigate();
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        navigate(`/${newValue}`)
    };

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, mt: 3 }} elevation={3}>
            <BottomNavigation showLabels={false} value={value} onChange={handleChange}>
                <BottomNavigationAction
                    label="Dashboard"
                    value="dashboard"
                    icon={<HomeIcon />}
                />
                <BottomNavigationAction
                    label="Items"
                    value="items"
                    icon={<ShoppingCartIcon />}
                />
                <BottomNavigationAction
                    label="Tags"
                    value="tags"
                    icon={<LocalOfferIcon />}
                />
                <BottomNavigationAction
                    label="Reports"
                    value="reports"
                    icon={<AssessmentRoundedIcon />}
                />
            </BottomNavigation>
        </Paper>
    );
}