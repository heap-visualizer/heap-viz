// import path from 'path/posix';
import React, { useState } from 'react';
import HeapArray from '../components/HeapArray';
import HeapTree from '../components/HeapTree';
import { Heap } from '../heap_classes/Heap';

const MinHeap = (inputHeap: Heap) => {

    const [heap, addToHeap] = useState(inputHeap);

    return (
        <div id = "minHeapButtons" className = "minHeapButtons">
            <button id = "insertRandomButton" onClick = {() => {}}>Insert Random</button>
            <button id = "deleteMinButton" onClick = {() => {}}>Delete Min</button>
            <button id = "deleteHeapButton"onClick = {() => {}}>Delete Heap</button>
            {HeapArray(heap)} 
            {HeapTree(heap)}
        </div>

    )
}


export default MinHeap;
