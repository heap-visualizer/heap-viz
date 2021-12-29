// import path from 'path/posix';
import React, { useState } from 'react';
import HeapArray from '../components/HeapArray';
import HeapTree from '../components/HeapTree';
import { MaxHeap, MinHeap } from '../heap_classes/Heap';
import { useAppDispatch, useAppSelector } from '../utils/hooks';

const MaxHeapComponent = () => {

    const { currentArray } = useAppSelector((state) => state.visualization);
    const [heap, setHeap] = useState(new MaxHeap(currentArray.slice()));

    // dispatch method to dispatch an action and trigger a state change
    const dispatch = useAppDispatch();

    const insertRandom = () => {
        const add = Math.floor(Math.random() * heap.heap.length + 1);
        heap.insert(add);
    }
    return (
        <div id = "maxHeapButtons" className = "maxHeapButtons">
            {/* <Button variant = "cointained">Insert:</Button> */}
            {/* <Button id = "insertRandomButton" onClick = {() => {}} variant = "cointained">Insert Random</Button>
            <Button id = "deleteMinButton" onClick = {() => {}} variant = "cointained">Delete Min</Button>
            <Button id = "deleteHeapButton" onClick = {() => {}} variant = "cointained">Delete Heap</Button> */}
            {HeapArray(heap)}
            {HeapTree(heap)}
        </div>

    )
}


export default MaxHeapComponent;
