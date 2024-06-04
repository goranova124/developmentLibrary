import CodeIcon from '@mui/icons-material/Code';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DataArrayIcon from '@mui/icons-material/DataArray';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Snackbar from '@mui/material/Snackbar';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import CodeMirror from "@uiw/react-codemirror";
import beautify from 'js-beautify';
import React, { useEffect, useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import "rsuite/dist/rsuite.css";
import { ayuLight } from 'thememirror';
import DropdownMenu from './DropdownMenu';
import { VehicleAPI } from "./apis/vehiclesApi";

const CodeTable = (api) => {
    const [valueAPI, setValueAPI] = React.useState(0);
    const [vehicles, setVehicles] = React.useState([]);
    const [errorCode, setErrorCode] = React.useState([]);
    const [openDrawer, setOpenDrawer] = React.useState([]);
    const [authorization, setAuthorization] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [nameError, setNameError] = useState(false);
    useEffect(() => {
        console.log(api);
    }, []);
    const apiChange = (event, newValue) => {
        setValueAPI(newValue);
    };

    const [parametersList, setParametersList] = useState(api.api.requestParametersList);
    const handleParameterChange = (value, index) => {
        const updatedParametersList = [...parametersList];
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

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const callApi = async (event) => {
        event.preventDefault();
        if (authorization?.trim().length > 0) {
            const accept = `${parametersList.find(param => param.parameterName === 'Accept')?.parameterExample || ''}`;
            const contentType = `${parametersList.find(param => param.parameterName === 'Content-Type')?.parameterExample || ''}`;

            try {
                const data = await VehicleAPI.getVehiclePositionBylatestOnly(authorization, `${accept}`, contentType);
                const json = await data.json();
                setVehicles(json);
                console.log(parametersList);
                setValueAPI("5");
                setErrorCode(data.status);
                setAuthorization(null);
                setNameError(false);
            } catch (error) {
                setVehicles(null);
                setAuthorization('');
                setValueAPI("5");
                console.log(parametersList);

                console.log(error);

                setErrorCode(error.message);
            }
        } else {
            setAuthorization('');
            console.log(parametersList);
            setNameError(true);
        }
    };

    const accordionClicked = (index) => {
        if (openDrawer.includes(index))
            setOpenDrawer(openDrawer.filter((number) => number !== index));
        else setOpenDrawer([...openDrawer, index]);
    };

    return (
        <form>
            <TabContext value={valueAPI}>
                <Box sx={{ borderColor: 'divider', width: '100%', maxHeight: 440 }}>
                    <TabList onChange={apiChange} aria-label="basic tabs example">
                        <Tab icon={<DataArrayIcon />} label="Request Code" value="4" />
                        <Tab icon={<CodeIcon />} id="responseCode" label="Response Code" value="5" disabled />
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

                                <Box mb={1}>
                                    <div style={{ display: "flex", flexDirection: "column", }}>

                                        <Typography variant="subtitle2">Authorization</Typography>
                                        <Typography variant="overline">required</Typography>
                                    </div>
                                    <TextField required type="text" helperText={nameError ? "Please enter your authorization" : ""} error={nameError} value={authorization} onChange={handleChangeAuthorization} variant="outlined" size="small" />
                                </Box>
                                {parametersList.map((parameter, index) => (
                                    <Box mb={1} key={index}>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <Typography variant="subtitle2">{parameter.parameterName}</Typography>
                                            <Typography variant="overline">{parameter.required}</Typography>
                                        </div>
                                        <TextField
                                            required
                                            type="text"
                                            value={parameter.parameterExample}
                                            variant="outlined"
                                            size="small"
                                            onChange={(e) => handleParameterChange(e.target.value, index)}
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
                    <CodeMirror
                        value={beautify(JSON.stringify(vehicles), {
                            indent_size: 2,
                        })}
                        theme={ayuLight}
                        options={{
                            autoFormat: true
                        }}
                    />

                </TabPanel>
            </TabContext>
        </form>
    );
};

export default CodeTable;
