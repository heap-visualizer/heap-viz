// import path from 'path/posix';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { logout, selectUser, User, storeArray } from '../slices/authentication';

const OptionsPanel = () => {
    const user = useAppSelector((state) => state.auth.user);
    const { minHeap } = useAppSelector((state) => state.visualization);
    const { maxHeap } = useAppSelector((state) => state.visualization);
    const dispatch = useAppDispatch();

    const handleSave = () => {
        // disable login button by set loading to true
        const { username } = user;
        // setLoading(true);
        dispatch(storeArray({ username, heaps: [minHeap.heap, maxHeap.heap] }))
    };
    const handleLogout = () => {
        dispatch(logout())
    };


    return (
        <div id="optionsButtons" className="optionsButtons">
            <button type="submit" onClick={() => handleSave()}>
                Save
            </button>
            <button type="submit" onClick={() => handleLogout()}>
                Logout
            </button>
        </div>
    );
};

export default OptionsPanel;
