// import path from 'path/posix';
import React from "react";
import { render } from "react-dom";
import { Button, IconButton } from "@material-ui/core";
import SaveIcon from "@mui/icons-material/Save";
import SaveAlt from "@mui/icons-material/SaveAlt";
import Logout from "@mui/icons-material/Logout";
import axios from "axios";
import { authService } from "../services/auth_service";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { selectUser, User } from '../slices/authentication'
import visualization, { storeArray } from "../slices/visualization";

const OptionsPanel = () => {

  const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();


  const handleSave = (user: User) => {
    // disable login button by set loading to true
    const {username, storedArrays} = user;
    // setLoading(true);
    dispatch(storeArray({username, storedArrays}))
      .unwrap()
      .then((data) => {
        if (data.username) {
        } else throw new Error("login failed");
      })
      .catch(() => {
        // if login fails, enable login button again
        // setLoading(false);
      });
  };

  return (
    <div id="optionsButtons" className="optionsButtons">
      <button type="submit" onClick={() => handleSave(user)}>
        Save
      </button>
      {/* <button type="submit" onClick={() => {authService.logout()}}>Logout </button> */}
      {/* <IconButton aria-label="saveIcon" onClick = {save(localStorage.user.storedArrays)}><SaveIcon/></IconButton> */}
      {/* <IconButton aria-label="logout" onClick = {authService.logout}><Logout/></IconButton> */}
      {/* <Button id = "newMinHeap" onClick = {() => {}} variant = "cointained">New Min Heap</Button> */}
      {/* <Button id = "newMaxHeap" onClick = {() => {}} variant = "cointained">New Max Heap</Button> */}
    </div>
  );
};

export default OptionsPanel;
