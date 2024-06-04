import DashboardIcon from '@mui/icons-material/Dashboard';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { Link } from "react-router-dom";

const DocumenantionNavBar = () => {

    return (
        <List style={{ padding: "20px" }}>
            <ListItemButton component={Link} to="/">
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItemButton>
        </List>
    );
};

export default DocumenantionNavBar;
