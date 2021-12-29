// import path from 'path/posix';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { logout, selectUser, User } from '../slices/authentication';
import visualization, { storeArray } from '../slices/visualization';

const OptionsPanel = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const handleSave = (user: User) => {
    // disable login button by set loading to true
    const { username, storedArrays } = user;
    // setLoading(true);
    dispatch(storeArray({ username, password: null, storedArrays }))
      .unwrap()
      .then((data) => {
        if (data.username) {
        } else throw new Error('login failed');
      })
      .catch(() => {
        // setLoading(false);
      });
  };
  const handleLogout = () => {
    dispatch(logout())
  };

  
  return (
    <div id="optionsButtons" className="optionsButtons">
      <button type="submit" onClick={() => handleSave(user)}>
        Save
      </button>
      <button type="submit" onClick={() => handleLogout()}>
        Logout
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
