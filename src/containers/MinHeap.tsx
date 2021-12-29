// import path from 'path/posix';
import React, { useEffect, useState } from 'react';
import HeapArray, { HeapComponentProps } from '../components/HeapArray';
import HeapTree from '../components/HeapTree';
import { Heap, MinHeap } from '../heap_classes/Heap';
import { deleteHeap, insertRandom, remove } from '../slices/visualization';
import { useAppDispatch, useAppSelector } from '../utils/hooks';

const MinHeapComponent = () => {

    const { minHeap } = useAppSelector((state) => state.visualization);
    const [heap, setHeap] = useState(minHeap);
    const [key, setKey] = useState(heap.heap.length.toString()); // think about the ways to do this.


    // dispatch method to dispatch an action and trigger a state change
    const dispatch = useAppDispatch();

    const handleInsertRandom = () => {
        const add = Math.floor(Math.random() * 100);
        dispatch(insertRandom({ number: add, heapType: 'MIN' }));
        setHeap(minHeap) // update state on our container to the new global state
        setKey(minHeap.heap.length.toString()); // update the key prop that we're passing down
    }

    const handleRemove = () => {
        dispatch(remove({ heapType: 'MIN' }));
        setHeap(minHeap);
        setKey(minHeap.heap.length.toString());
    }

    const handleDeleteHeap = () => {
        dispatch(deleteHeap({ heapType: 'MIN' }));
        setHeap(minHeap);
        setKey(minHeap.heap.length.toString());
    }

    const heapProps: HeapComponentProps = {
        inputHeap: heap,
        length: key,
    }

    return (
        <div className="heapContainer">
            <h1>Min Heap</h1>
            <HeapArray {...heapProps} />
            <div id="minHeapButtons" className="minHeapButtons">
                <button id="insertRandomButton" onClick={() => handleInsertRandom()}>Insert Random</button>
                <button id="deleteMinButton" onClick={() => handleRemove()}>Delete Min</button>
                <button id="deleteHeapButton" onClick={() => handleDeleteHeap()}>Delete Heap</button>
            </div>
            <HeapTree {...heapProps} />
        </div>

    )
}


export default MinHeapComponent;
