// import path from 'path/posix';
import React, { useState } from 'react';
import { render } from 'react-dom';
import Button from '@material-ui/core';
import HeapArray from '../components/HeapArray';
import HeapTree from '../components/HeapTree';
import { Heap } from '../heap_classes/Heap';

const MinHeap = (inputHeap: Heap) => {

    const [heap, addToHeap] = useState(inputHeap);

    return (
        <div id = "minHeapButtons" className = "minHeapButtons">
            {/* <Button variant = "cointained">Insert:</Button> */}
            {/* <Button id = "insertRandomButton" onClick = {() => {}} variant = "cointained">Insert Random</Button>
            <Button id = "deleteMinButton" onClick = {() => {}} variant = "cointained">Delete Min</Button>
            <Button id = "deleteHeapButton"onClick = {() => {}} variant = "cointained">Delete Heap</Button> */}
            {HeapArray(heap)} 
            {HeapTree(heap)}
        </div>

    )
}


export default MinHeap;
