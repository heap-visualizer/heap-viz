// import path from 'path/posix';
import React from 'react';
import { render } from 'react-dom';
import Button from '@material-ui/core';
import HeapArray from '../components/HeapArray';
import HeapTree from '../components/HeapTree';

const MinHeap = () => {

    return (
        <div id = "minHeapButtons" className = "minHeapButtons">
            {/* <Button variant = "cointained">Insert:</Button> */}
            {/* <Button id = "insertRandomButton" onClick = {() => {}} variant = "cointained">Insert Random</Button>
            <Button id = "deleteMinButton" onClick = {() => {}} variant = "cointained">Delete Min</Button>
            <Button id = "deleteHeapButton"onClick = {() => {}} variant = "cointained">Delete Heap</Button> */}
            {HeapArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])}
            {HeapTree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])}
        </div>

    )
}


export default MinHeap;
