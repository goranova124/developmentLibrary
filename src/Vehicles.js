import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import React from "react";
import { useLocation } from 'react-router-dom';
import App from "../src/components/listItems";
import CodeTable from './components/CodeTable';
import APITabs from './components/apiTable';
import StackComponent from './components/stack';

export default function LabelBottomNavigation() {
    const location = useLocation();
    const { api } = location.state;

   
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <App />
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Toolbar />
                <StackComponent api={api} />

                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Toolbar />
                    <APITabs api={api} />
                </div>

                <Paper sx={{ flexGrow: 1, p: 2, mt: 2 }}>
                    <CodeTable api={api} />
                </Paper>
            </Box>
        </div>
    );
}
