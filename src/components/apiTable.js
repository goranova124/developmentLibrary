import CodeIcon from '@mui/icons-material/Code';
import DataArrayIcon from '@mui/icons-material/DataArray';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SmsFailedIcon from '@mui/icons-material/SmsFailed';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import CodeMirror from "@uiw/react-codemirror";
import beautify from 'js-beautify';
import React, { useEffect } from 'react';
import { ayuLight } from 'thememirror';
import StickyHeadTable from './table';

function APITabs(api) {
    const [openCode, setOpenCode] = React.useState(null);

    const handleCodeClick = (errorCode) => {
        setOpenCode(openCode === errorCode ? null : errorCode);
    };

    const [valuePage, setValuePage] = React.useState("1");

    const handleChangeParameters = (event, newValue) => {
        setValuePage(newValue);
        console.log("handleChangeParameters");
    };


    const errorCodesColumns = [
        { id: 'errorCode', label: 'Error code ', minWidth: 100 },
        { id: 'description', label: 'Description', width: 100 },
        { id: 'possibleReason', label: 'Possible Reason', width: 100 },
    ];
    const requestParametersColumns = [
        { id: 'parameterName', label: 'Parameter Name', minWidth: 100 },
        { id: 'parameterType', label: 'Parameter Type', width: 100 },
        { id: 'parameterDescription', label: 'Parameter Description', width: 100 },
        { id: 'required', label: 'Parameter Required', width: 100 },
        { id: 'parameterExample', label: 'Parameter Example', width: 100 },
    ];
    useEffect(() => {
        console.log(api.api.requestParametersList);
        setValuePage("1")
    }, [api]);

    const errorCodesRows = api.api.errorCodes
    const requestParametersRows = api.api.requestParametersList

    return (
        <Box sx={{ borderColor: 'divider', width: '100%', maxHeight: 440, }}>
            <TabContext value={valuePage}>
                <TabList
                    onChange={handleChangeParameters} aria-label="lab API tabs example" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Tab icon={<DataArrayIcon />} label="Request Parameters" value="1" />
                    <Tab icon={<CodeIcon />} label="Response Parameters" value="2" />
                    <Tab icon={<SmsFailedIcon />} label="Error codes" value="3" />
                </TabList>
                <TabPanel value="1" >
                    <Paper style={{ maxHeight: 300, overflowY: 'auto' }}>
                        <StickyHeadTable columns={requestParametersColumns} rows={requestParametersRows} />
                    </Paper>
                </TabPanel>
                <TabPanel value="2" >
                    <Paper style={{ maxHeight: 300, overflowY: 'auto' }}>
                        <TableContainer component={Paper}>
                            <Table aria-label="error codes table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell>Error Code</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Description</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {api.api.responseParametersList.map((error) => (
                                        <React.Fragment key={error.parameterName}>
                                            <TableRow onClick={() => handleCodeClick(error.parameterName)} style={{ cursor: 'pointer' }}>
                                                <TableCell>
                                                    <IconButton size="small">
                                                        {openCode === error.parameterName ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell>{error.parameterName}</TableCell>
                                                <TableCell>{error.parameterType}</TableCell>
                                                <TableCell>{error.parameterDescription}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                                                    <Collapse in={openCode === error.parameterName} timeout="auto" unmountOnExit>
                                                        <Box sx={{ margin: 1 }} >
                                                            <div style={{ display: "flex", flexDirection: "row" }}>
                                                                <div >

                                                                    <Typography variant="h6" gutterBottom component="div">
                                                                        Additional Information
                                                                    </Typography>
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <TableCell>Feature name</TableCell>
                                                                            <TableCell align="right">Feature type</TableCell>
                                                                            <TableCell align="right">Feature description</TableCell>
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {error.featuresList.map((row) => (
                                                                            <TableRow
                                                                                key={row.featureName}
                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                            >
                                                                                <TableCell component="th" scope="row">
                                                                                    {row.featureName}
                                                                                </TableCell>
                                                                                <TableCell align="right">{row.featureType}</TableCell>
                                                                                <TableCell align="right">{row.featureDescription}</TableCell>
                                                                            </TableRow>
                                                                        ))}
                                                                    </TableBody>
                                                                </div>
                                                                <div >

                                                                    <Typography variant="h6" gutterBottom component="div">
                                                                        Response
                                                                    </Typography>
                                                                    <CodeMirror
                                                                        value={beautify(error.parameterExample, {
                                                                            indent_size: 2,
                                                                        })}
                                                                        theme={ayuLight}
                                                                        options={{
                                                                            autoFormat: true
                                                                        }}
                                                                    />

                                                                </div>
                                                            </div>
                                                        </Box>
                                                    </Collapse>
                                                </TableCell>
                                            </TableRow>
                                        </React.Fragment>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Paper>
                </TabPanel>
                <TabPanel value="3" >
                    <Paper style={{ maxHeight: 300, overflowY: 'auto' }}>
                        <StickyHeadTable columns={errorCodesColumns} rows={errorCodesRows} />
                    </Paper>
                </TabPanel>
            </TabContext>
        </Box>
    );
}

export default APITabs;
