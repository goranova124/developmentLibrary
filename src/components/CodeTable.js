import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DataArrayIcon from '@mui/icons-material/DataArray';
import CodeIcon from '@mui/icons-material/Code';
import Chip from '@mui/material/Chip';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import CodeMirror from "@uiw/react-codemirror";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Typography, } from "@mui/material";
import Button from '@mui/material/Button';
import "rsuite/dist/rsuite.css";
import DropdownMenu from './DropdownMenu';
import { VehicleAPI } from "./apis/vehiclesApi";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Snackbar from '@mui/material/Snackbar';
import beautify, { js } from 'js-beautify';
import { ayuLight } from 'thememirror';
import { jwtDecode } from 'jwt-decode'
import { useCookies } from 'react-cookie';
import { CookieProvider, CookiesProvider } from "../components/CookieProvider";
import SyncLoader from "react-spinners/ClipLoader";



function CodeTable(api) {
    const [valueAPI, setValueAPI] = React.useState("4");
    const [vehicles, setVehicles] = React.useState([]);
    const [errorCode, setErrorCode] = React.useState([]);
    const [openDrawer, setOpenDrawer] = React.useState([]);
    const [authorization, setAuthorization] = React.useState('');
    const [moreDataAvailableLink, setOpenMoreDataAvailableLink] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [openMoreDataAvailable, setOpenMoreDataAvailable] = React.useState(false);
    const [nameError, setNameError] = useState(false);
    const [parametersList, setParametersList] = React.useState([]);
    const [cookies, setCookie] = useCookies(['apis', 'email']);
    const [loading, setLoading] = useState(true)
    // const [cookies] = useCookies(['email']);

    const cookieProvide = CookieProvider();
    useEffect(() => {
        setVehicles()
        setValueAPI("4");
        setErrorCode()
    }, [api]);

    useEffect(() => {
        setParametersList(api.api.requestParametersList)
        const token = (cookies.token);
        if (token) {
            setAuthorization(token)
        }
        console.log(cookies.token);
    }, [cookies, authorization]);
    const apiChange = (event, newValue) => {
        setValueAPI(newValue);
    };
    const originalList = api.api.requestParametersList

    const handleParameterChange = (value, index) => {
        const updatedParametersList = [...originalList];
        updatedParametersList[index].parameterExample = value;
        setParametersList(updatedParametersList);
    }

    const handleChangeAuthorization = (event) => {
        const value = event.target.value;
        setAuthorization(value);
        setNameError(value.trim().length === 0);
    };

    const onCopyText = () => {
        setOpen(true);
    };
    const getMoreDataAvailable = async (event) => {
        setLoading(true)
        try {

            const accept = `${originalList.find(param => param.parameterName === 'Accept')?.parameterExample || ''}`;
            let data = await VehicleAPI.getMoreData(moreDataAvailableLink, authorization, accept);
            // const json = await data.json();
            setVehicles(data);
            if (data.data.moreDataAvailable) {
                setOpenMoreDataAvailableLink(data.data.moreDataAvailableLink)
                setOpenMoreDataAvailable(true)
            }
            else {
                setOpenMoreDataAvailable(false)

            }
        }
        catch (error) {
            console.error('Error fetching apis list:', error);
        } finally {
            setLoading(false);
        }


    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const handleCloseMoredataAvailable = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenMoreDataAvailable(false);
    };

    const callApi = async (event) => {
        event.preventDefault();
        let data;
        
        const email1 = `${originalList.find(param => param.parameterName === 'Email')?.parameterExample || ''}`;
        const password1 = `${originalList.find(param => param.parameterName === 'Password')?.parameterExample || ''}`;
        const accept = `${originalList.find(param => param.parameterName === 'Accept')?.parameterExample || ''}`;
        const contentType = `${originalList.find(param => param.parameterName === 'Content-Type')?.parameterExample || ''}`;
        const triggerFilter = `${originalList.find(param => param.parameterName === 'triggerFilter')?.parameterExample || ''}`;
        const contentFilter = `${originalList.find(param => param.parameterName === 'contentFilter')?.parameterExample || ''}`;
        const dateType = `${originalList.find(param => param.parameterName === 'dateType')?.parameterExample || ''}`;
        const vin = `${originalList.find(param => param.parameterName === 'vin')?.parameterExample || ''}`;
        const starttime = `${originalList.find(param => param.parameterName === 'starttime')?.parameterExample || ''}`;
        const stoptime = `${originalList.find(param => param.parameterName === 'stoptime')?.parameterExample || ''}`;
      
        if (api.api.apiFunction === "AUTHORIZATION") {
          try {
            data = await VehicleAPI.login(email1, password1);
            // const json = await data.json();
            setCookie("token", data.access_token, { expires: new Date(Date.now() + 30 * 60 * 1000) });
            setCookie("email", (jwtDecode(data.access_token)).email, { expires: new Date(Date.now() + 30 * 60 * 1000) });
            setVehicles(data);
            setValueAPI("5");
            setErrorCode(data.status);
          } catch (error) {
            setVehicles(null);
            setValueAPI("5");
            setErrorCode(error.message);
            console.log(error);
          }
        } else {
          try {
            if (api.api.apiFunction === "GET_VEHICLES") {
              data = await VehicleAPI.getAll(authorization, accept, contentType);
            } else if (api.api.apiFunction === "GET_VEHICLES_POSITIONS with latestOnly") {
              data = await VehicleAPI.getVehiclePositionByLatestOnly(authorization, accept, vin, triggerFilter, dateType);
            } else if (api.api.apiFunction === "GET_VEHICLES_POSITIONS with starttime") {
              data = await VehicleAPI.getVehiclePositionByStartTime(authorization, accept, vin, triggerFilter, dateType, starttime, stoptime);
            } else if (api.api.apiFunction === "GET_VEHICLES_STATUSES with latestOnly") {
              data = await VehicleAPI.getVehiclesStatusesByLatestOnly(authorization, accept, vin, triggerFilter, dateType, contentFilter);
            } else if (api.api.apiFunction === "GET_VEHICLES_STATUSES with starttime") {
              data = await VehicleAPI.getVehiclesStatusesByStartime(authorization, accept, vin, triggerFilter, dateType, contentFilter, starttime, stoptime);
            } else {
              throw new Error("Invalid unique function value");
            }
            
            // const json = await data.json();
            if (data.data.moreDataAvailable) {
              setOpenMoreDataAvailableLink(data.data.moreDataAvailableLink)
              setOpenMoreDataAvailable(true)
            }
            setVehicles(data.data);
            setValueAPI("5");
            setErrorCode(data.status);
            setNameError(false);
          } catch (error) {
            setVehicles(null);
            setValueAPI("5");
            setErrorCode(error.message);
            console.log(error);
          }
        }
        
        setLoading(false);
      };
      

    const accordionClicked = (index) => {
        if (openDrawer.includes(index))
            setOpenDrawer(openDrawer.filter((number) => number !== index));
        else setOpenDrawer([...openDrawer, index]);
    };

    return (
        <div >
            <TabContext value={valueAPI}>
                <Box sx={{ borderColor: 'divider', width: '100%', maxHeight: 440 }}>
                    <TabList onChange={apiChange} aria-label="basic tabs example">
                        <Tab icon={<DataArrayIcon />} label="Request Code" value="4" />
                        <Tab icon={<CodeIcon />} id="responseCode" label="Response Code" value="5" />
                    </TabList>
                </Box>
                <TabPanel value="4" style={{ display: "flex", flexDirection: "row" }}>
                    <Button variant="contained" size="large" onClick={callApi}>
                        Try API
                    </Button>
                    <Accordion key={1} onChange={() => accordionClicked(1)} expanded={openDrawer.includes(1)}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">Header Parameters</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box display="flex" flexDirection="column" width="100%">
                                {api.api.apiFunction !== 'AUTHORIZATION' && (

                                    <Box mb={1}>
                                        <div style={{ display: "flex", flexDirection: "column", }}>

                                            <Typography variant="subtitle2">Authorization *</Typography>
                                        </div>



                                        <TextField required type="text" helperText={nameError ? "Please enter your authorization" : ""} error={nameError} value={authorization} onChange={handleChangeAuthorization} variant="outlined" size="small" />
                                    </Box>
                                )}
                                {originalList.map((parameter, index) => (
                                    <Box mb={1} key={index}>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <Typography variant="subtitle2">{parameter.parameterName} {parameter.required ? "*" : ""}</Typography>
                                            <Typography variant="overline">{parameter.parameterType}</Typography>
                                        </div>
                                        <TextField
                                            required type="text" value={parameter.parameterExample} variant="outlined" size="small" onChange={(e) => handleParameterChange(e.target.value, index)}
                                        />
                                    </Box>
                                ))}
                            </Box>

                        </AccordionDetails>
                    </Accordion>
                    <Box flexGrow={1} marginLeft="30px">
                        <DropdownMenu authorizationValue={authorization} api={api} />
                    </Box>
                </TabPanel>
                <TabPanel value="5">
                    {loading ? (
                        <div>
                            <p>Loading..</p>
                            <SyncLoader
                                color="hsla(227, 70%, 15%, 0.86)"
                                size={25}
                            />                                    </div>
                    ) : (<>
                        Response Code:
                        <Chip label={errorCode} />
                        <CopyToClipboard
                            text={JSON.stringify({ vehicles })}
                            onCopy={onCopyText}
                        >
                            <ContentCopyIcon />
                        </CopyToClipboard>
                        <Snackbar
                            open={open}
                            autoHideDuration={5000}
                            onClose={handleClose}
                            message="Code has been copied to your clipboard."
                        />
                        <Snackbar
                            open={openMoreDataAvailable}
                            autoHideDuration={5000}
                            onClose={handleCloseMoredataAvailable}
                            message="More data is available"
                            action={
                                <React.Fragment>
                                    <Button color="secondary" size="small" onClick={getMoreDataAvailable}>
                                        Get more data
                                    </Button>

                                </React.Fragment>
                            }
                        />
                        <CodeMirror
                            value={beautify(JSON.stringify(vehicles), {
                                indent_size: 2,
                            })}
                            theme={ayuLight}
                            options={{
                                autoFormat: true
                            }}
                        />
                    </>)}
                </TabPanel>
            </TabContext>
        </div>
    );
};

export default CodeTable;
