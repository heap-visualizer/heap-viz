// import path from 'path/posix';
import React, { useEffect, useState } from 'react';
import HeapArray, { HeapComponentProps } from '../components/HeapArray';
import HeapTree from '../components/HeapTree';
import { Heap, MinHeap } from '../heap_classes/Heap';
import { deleteHeap, deleteMin, insertRandom } from '../slices/visualization';
import { useAppDispatch, useAppSelector } from '../utils/hooks';

const MinHeapComponent = () => {

    const { currentArray } = useAppSelector((state) => state.visualization);
    const { minHeap } = useAppSelector((state) => state.visualization);
    const [heap, setHeap] = useState(minHeap);
    const [key, setKey] = useState(heap.heap.length.toString()); // think about the ways to do this.


    // dispatch method to dispatch an action and trigger a state change
    const dispatch = useAppDispatch();

    const handleInsertRandom = () => {
        const add = Math.floor(Math.random() * 100);
        dispatch(insertRandom({ number: add }));
        setHeap(minHeap) // update state on our container to the new global state
        setKey(minHeap.heap.length.toString()); // update the key prop that we're passing down
    }
    
    const handleDeleteMin = () => {
        dispatch(deleteMin({}));
        setHeap(minHeap);
        setKey(minHeap.heap.length.toString()); 
    }

    const handleDeleteHeap = () => {
        dispatch(deleteHeap({}));
        setHeap(minHeap);
        setKey(minHeap.heap.length.toString()); 
    }

    const heapProps: HeapComponentProps = {
        inputHeap: heap,
        length: key,
    }

    return (
        <div id="minHeapButtons" className="minHeapButtons">
            <button id="insertRandomButton" onClick={() => handleInsertRandom()}>Insert Random</button>
            <button id="deleteMinButton" onClick={() => handleDeleteMin()}>Delete Min</button>
            <button id="deleteHeapButton" onClick={() => handleDeleteHeap()}>Delete Heap</button>
            <HeapArray {...heapProps}/>
            <HeapTree {...heapProps}/>
        </div>

    )
}


export default MinHeapComponent;
