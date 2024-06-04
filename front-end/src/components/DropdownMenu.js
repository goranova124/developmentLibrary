import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import CodeMirror from "@uiw/react-codemirror";
import beautify from 'js-beautify';
import React, { useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ButtonToolbar, Dropdown } from 'rsuite';
import { ayuLight } from 'thememirror';

function DropdownMenu({ authorizationValue, api }) {
    const [inputValue, setInputValue] = useState('Language');
    const [open, setOpen] = React.useState(false);

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
    const handleLanguageSelect = (language) => {
        setInputValue(language.language);
        setCodeSnippet(language.example);
    };
    const [codeSnippet, setCodeSnippet] = useState('Select language');

    return (
        <div>
            <ButtonToolbar >
                <Dropdown title={inputValue} >
                    {api.api.languages.map((language) => (
                        <Dropdown.Item onSelect={() => handleLanguageSelect(language)}>{language.language}</Dropdown.Item>
                    ))}
                </Dropdown>
                <CopyToClipboard
                    text={codeSnippet}
                    onCopy={onCopyText}
                >
                    <ContentCopyIcon />
                </CopyToClipboard>
            </ButtonToolbar>
            <Box mt={2} flexGrow={1} marginLeft="30px">
                <Paper style={{ maxHeight: 300, overflowY: 'auto' }}>

                    <Snackbar
                        open={open}
                        autoHideDuration={5000}
                        onClose={handleClose}
                        message="Code has been coppied to your clipboard."
                    />
                    <CodeMirror
                        value={beautify(codeSnippet, {
                            indent_size: 2,
                        })}
                        theme={ayuLight}
                        options={{
                            autoFormat: true
                        }}
                        style={{ maxHeight: 200, overflowY: 'auto' }}
                    />
                </Paper>
            </Box>

        </div>
    )
};

export default DropdownMenu;
