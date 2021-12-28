// import path from 'path/posix';
import React from 'react';
import { render } from 'react-dom';
import Button from '@material-ui/core';
import HeapArray from './HeapArray';
import HeapTree from './HeapTree';

const MinHeap = () => {

    return (
        <div id = "minHeapButtons" className = "minHeapButtons">
            {/* <Button variant = "cointained">Insert:</Button> */}
            {/* <Button id = "insertRandomButton" onClick = {() => {}} variant = "cointained">Insert Random</Button>
            <Button id = "deleteMinButton" onClick = {() => {}} variant = "cointained">Delete Min</Button>
            <Button id = "deleteHeapButton"onClick = {() => {}} variant = "cointained">Delete Heap</Button> */}
            <HeapArray/>
            <HeapTree/>
        </div>

    )
}


export default MinHeap;
