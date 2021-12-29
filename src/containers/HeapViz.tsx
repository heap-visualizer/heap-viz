// import path from 'path/posix';
import React from 'react';
import { Navigate } from 'react-router-dom';
import SavedProjects from '../components/SavedProjects';
import { useAppSelector } from '../utils/hooks';
import OptionsPanel from './OptionsPanel';
import VizSpace from './VizSpace';

const HeapViz = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    return (

        <div id="heapViz" className="heapViz">
            <div className="heapVizNav">
                <SavedProjects />
                <OptionsPanel />
            </div>
            <div className="vizContainer">
            <VizSpace />
            <VizSpace />
            </div>
            {/* {!isLoggedIn && <Navigate to='/'/>} */}
        </div>
    )
}


export default HeapViz;
