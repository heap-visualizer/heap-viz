// import path from 'path/posix';
import React from 'react';
import { render } from 'react-dom';
import Button from '@material-ui/core';
import MaxHeapComponent from './MaxHeap';
import MinHeapComponent from './MinHeap';

const VizSpace = () => {

    return (
        <div id = "vizSpace" className = "vizSpace">
            <MinHeapComponent/>
            <MaxHeapComponent/>
        </div>

    )
}

export default VizSpace;
