import React, { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { Link } from "react-router-dom";
import AssignmentIcon from '@mui/icons-material/Assignment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import logo from '../components/images/lg-PACCAR-Connect-WHITE.png'
import { useCookies } from 'react-cookie';



const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
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
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const defaultTheme = createTheme();

const App = (apisList) => {
    const [apis, setApis] = useState([]);
    const [email, setEmail] = React.useState('');
    const [cookies] = useCookies(['email']);
    useEffect(() => {
        if (cookies.email) {
            setEmail(cookies.email)
        }
        if (sessionStorage.getItem("apis")) {
            setApis(JSON.parse(sessionStorage.getItem("apis")))
        }
    }, [apisList,cookies])
    const [open, setOpen] = React.useState(true);
    const [openSubItems, setOpenSubItems] = React.useState(false);

    const toggleDrawer = () => {
      if(openSubItems){
          setOpenSubItems(!openSubItems);
      }
        setOpen(!open);
    };

    const handleClick = () => {
        if(!open){
            setOpen(!open);
        }
        setOpenSubItems(!openSubItems);
    };

    return (
        <ThemeProvider theme={defaultTheme} >
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar  open={open} style={{ backgroundColor: "#00529c" }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            DEVELOPER LIBRARY                        </Typography>
                        <p>Simplifying your life</p>
                        <img src={logo} style={{ maxWidth: "200px" }} />
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1], width:"100%"
                        }}
                    >
                        <p style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"100%"}}>{email}</p>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />

                        </IconButton>
                    </Toolbar>
                    <Divider />

                    <List component="nav" >
                        <ListItemButton component={Link} to="/">
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                        <ListItemButton component={Link} to="/firstSteps">
                            <ListItemIcon>
                                <BarChartIcon />
                            </ListItemIcon>
                            <ListItemText primary="First Steps" />
                        </ListItemButton>
                        <ListItemButton onClick={handleClick}>
                            <ListItemIcon>
                                <ShoppingCartIcon />
                            </ListItemIcon>
                            <ListItemText primary="Use Cases" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={openSubItems} timeout="auto" unmountOnExit >
                            <List component="div" disablePadding>
                                {apis.map((api) => (
                                    <div
                                        key={api.apiFunction}
                                        style={{ whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: '300px', fontSize: "10px" }} disableTypography
                                    >


                                        <ListItemButton component={Link} to={`/apis/${api.apiFunction}`} state={{ api: api }}>

                                            <LocalShippingOutlinedIcon />
                                            <ListItemText
                                                primary={`${api.apiFunction}`}
                                                style={{ fontSize: "14px" }}
                                                disableTypography
                                            />
                                        </ListItemButton>
                                    </div>
                                ))}
                            </List>


                        </Collapse>
                        <ListItemButton component={Link} to="/documentation">
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Documentation" />
                        </ListItemButton>

                        <Divider sx={{ my: 1 }} />
                      
                        <ListItemButton component={Link} to="https://www.daf.co.uk/en-gb/daf-services/connected-services/support">
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Support" />
                        </ListItemButton>
                      
                    </List>
                </Drawer>


            </Box>
        </ThemeProvider>
    );
};

export default App;
