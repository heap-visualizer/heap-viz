// import path from 'path/posix';
import React from 'react';
import { render } from 'react-dom';
import {Button, IconButton } from '@material-ui/core';
import SaveIcon from '@mui/icons-material/Save';
import SaveAlt from '@mui/icons-material/SaveAlt';
import Logout from '@mui/icons-material/Logout';


const OptionsPanel = () => {
    return (
        <div id = "optionsButtons" className = "optionsButtons">
            <IconButton aria-label="save"><SaveIcon/></IconButton>
            <IconButton aria-label="saveAs"><SaveAlt/></IconButton>
            <IconButton aria-label="logout"><Logout/></IconButton>
            <Button id = "newMinHeap" onClick = {() => {}} variant = "cointained">New Min Heap</Button>
            {/* <Button id = "newMaxHeap" onClick = {() => {}} variant = "cointained">New Max Heap</Button> */}
        </div>

    )
}


export default OptionsPanel;
