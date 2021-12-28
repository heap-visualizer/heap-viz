// import path from 'path/posix';
import React from 'react';
import { render } from 'react-dom';
import Button from '@material-ui/core';
import MinHeap from './MinHeap';
import MaxHeap from './MaxHeap';

const VizSpace = () => {

    return (
        <div id = "vizSpace" className = "vizSpace">
            <MinHeap/>
            <MaxHeap/>
        </div>

    )
}


export default MinHeap;
