import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useNavigate } from 'react-router-dom';
function StackComponent(api) {
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openVersion = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseVersion = () => {
        setAnchorEl(null);
    };
    const onCopyText = () => {
        console.log("onCopyText");
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    useEffect(() => {
        console.log(api.api.apiURL);
    }, []);
    return (
        <div>
            <br></br>
            <div role="presentation">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <Typography color="inherit">Use cases</Typography>
                    <Typography color="text.primary">{api.api.apiFunction}</Typography>
                </Breadcrumbs>
            </div>
            <div style={{ display: "flex", flexDirection: "row", gap: "60px", padding: "15px" }}>

                <div style={{ display: "flex", flexDirection: "row" }}>

                    <Stack spacing={2} sx={{
                        maxWidth: 600,
                        padding: '15px',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                    >

                        <div >
                            <Button
                                id="demo-customized-button"
                                aria-controls={open ? 'demo-customized-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                variant="contained"
                                disableElevation
                                onClick={handleClick}
                                icon={<EditIcon />}
                                endIcon={<KeyboardArrowDownIcon />}>
                                <EditIcon />
                                Version
                            </Button>
                            <Menu anchorEl={anchorEl} open={openVersion} onClose={handleCloseVersion}>
                                <MenuItem onClick={handleCloseVersion} disableRipple>
                                    3.0
                                </MenuItem>
                            </Menu>
                        </div>
                        <div
                            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }} >
                            <SnackbarContent message={`${api.api.apiType} ${api.api.apiURL}`} />
                            <CopyToClipboard
                                text={api.api.apiURL}
                                onCopy={onCopyText}
                            >
                                <ContentCopyIcon />
                            </CopyToClipboard>
                            <Snackbar
                                open={open}
                                autoHideDuration={5000}
                                onClose={handleClose}
                                message="API has been coppied to your clipboard."
                            />
                        </div>
                    </Stack>
                    <Paper sx={{
                        display: 'flex', flexDirection: 'column', maxWidth: 600,
                        padding: '15px', margin: "20PX"
                    }}>
                        <h4>{api.api.apiHeader}</h4>
                        <p2>
                            {api.api.apiDescription}
                        </p2>

                    </Paper>
                   <CardActions><Button size="small" onClick={()=>{navigate(`/documentation`)}}>Learn More</Button></CardActions>

                </div>

            </div>
        </div>
    );
}

export default StackComponent;










