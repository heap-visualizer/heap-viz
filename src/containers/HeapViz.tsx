// import path from 'path/posix';
import React from 'react';
import { render } from 'react-dom';
import SavedProjects from '../components/SavedProjects';
import OptionsPanel from './OptionsPanel';
import VizSpace from './VizSpace';

const HeapViz = () => {

    return (
        <div id = "heapViz" className = "heapViz">
            <SavedProjects/>
            <VizSpace/>
            <OptionsPanel/>
        </div>

    )
}


export default HeapViz;
