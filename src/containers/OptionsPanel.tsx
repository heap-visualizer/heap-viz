// import path from 'path/posix';
import React from 'react';
import { render } from 'react-dom';
import {Button, IconButton } from '@material-ui/core';
import SaveIcon from '@mui/icons-material/Save';
import SaveAlt from '@mui/icons-material/SaveAlt';
import Logout from '@mui/icons-material/Logout';
import axios from 'axios';
import {authService} from '../services/auth_service';
import {useAppSelector } from "../utils/hooks";

const OptionsPanel = () => {
    const save = (storedArrays: Array<number>) => {
        const username = useAppSelector((state: any) => state.user.username)

        return axios
            .post(`/saveArrays/:${username}`, {arrays: storedArrays})
            .then((response: any) => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
              })
            .catch((error: any) => {
                return error.message;
            });
    }


    return (
        <div id = "optionsButtons" className = "optionsButtons">
            <IconButton aria-label="save" onClick = {save}><SaveIcon/></IconButton>
            <IconButton aria-label="saveAs"><SaveAlt/></IconButton>
            <IconButton aria-label="logout" onClick = {authService.logout}><Logout/></IconButton>
            {/* <Button id = "newMinHeap" onClick = {() => {}} variant = "cointained">New Min Heap</Button> */}
            {/* <Button id = "newMaxHeap" onClick = {() => {}} variant = "cointained">New Max Heap</Button> */}
        </div>

    )
}


export default OptionsPanel;
