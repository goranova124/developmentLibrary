import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SyncLoader from "react-spinners/ClipLoader";
import App from "../src/components/listItems";
import Information from './components/Information';
import { ApisDetails } from "./components/apis/getApiDetails";
const Home = (props) => {
    const [apis, setApis] = useState([]);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApis = async () => {
            try {
                const fetchedApis = await ApisDetails.getAll();
                const json = await fetchedApis.json();
                setApis(json.apiEntity);

                sessionStorage.setItem("apis", JSON.stringify(json.apiEntity));
            } catch (error) {
                console.error('Error fetching apis list:', error);
            } finally {
                setLoading(false);
            }
        };
        if (sessionStorage.getItem("apis")) {
            setLoading(false)
            setApis(JSON.parse(sessionStorage.getItem("apis")))
        }
        else {
            fetchApis();
        }

    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: "row" }}>
            <App apisList={apis} />

            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto'
                }}
            >
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} >
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Typography
                                    variant="h1"
                                    sx={{
                                        display: 'flex',
                                        flexDirection: { xs: 'column', md: 'row' },
                                        alignSelf: 'center',
                                        textAlign: 'center',
                                        fontSize: 'clamp(3.5rem, 10vw, 4rem)',
                                    }}
                                >
                                    Explore our&nbsp;

                                    <Typography
                                        component="span"
                                        variant="h1"
                                        sx={{
                                            fontSize: 'clamp(3rem, 10vw, 4rem)',
                                            color: "#00529c",
                                        }}
                                    >
                                        Developer Library
                                    </Typography>
                                </Typography>
                                <p>
                                    An extensive collection of resources carefully chosen to help developers
                                    at every level of their career. Explore a diverse range of APIs, each accompanied by
                                    in-depth descriptions and a wealth of code fragments in a variety of
                                    programming languages. </p>
                            </Paper>
                        </Grid>
                       
                        <Grid item xs={12}>
                                <div>
                                    <Information />
                                </div>
                            </Grid>
                        <Grid item xs={12}>
                            <Paper style={{ alignContent: "center", alignItems: "center", justifyContent: "center", }}>
                                {loading ? (
                                    <div>
                                        <p>Loading..</p>
                                        <SyncLoader
                                            color="hsla(227, 70%, 15%, 0.86)"
                                            size={25}
                                        />                                    </div>
                                ) : (<>
                                    <h3 style={{ margin: "10px" }}> Our APIs</h3>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row', justifyContent: "center", flexWrap: "wrap", margin: '10px', gap: "15px"
                                    }}>
                                        {apis.map(api => (<div key={api.apiFunction} >
                                            <Card sx={{
                                                minWidth: 400, maxWidth: 500, border: '1px solid #333333', borderRadius: 2, transition: 'transform 0.3s', '&:hover':
                                                    { transform: 'translateY(-5px)', boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)' }
                                            }}>
                                                <CardContent >
                                                    <Typography sx={{ fontSize: 20, fontWeight: "bold" }} color="text.secondary">
                                                        {api.apiFunction}
                                                    </Typography>
                                                    <Typography style={{ textTransform: "capitalize" }} color="text.secondary">
                                                        {api.apiType}
                                                    </Typography>
                                                    <Typography variant="body2" style={{ height: 100, overflow: "hidden", textOverflow: "ellipsis" }} >
                                                        {api.apiDescription}
                                                    </Typography>
                                                    <div style={{ display: "flex", flexDirection: "row" }}>

                                                        <Button variant="contained" color="primary" style={{ backgroundColor: "#00529c" }} onClick={() => {
                                                            navigate(`/apis/${api.apiFunction}`, { state: { api: api } });
                                                        }
                                                        }>
                                                            try it out
                                                        </Button><CardActions><Button size="small" onClick={()=>{navigate(`documentation`)}}>Learn More</Button></CardActions>
                                                    </div>
                                                </CardContent></Card></div>
                                        ))}
                                    </div>
                                </>)}
                            </Paper>
                        </Grid>
                        
                    </Grid>
                </Container>
            </Box>
        </div>
    )
};

export default Home;
