// import path from 'path/posix';
import React, { useEffect, useState } from 'react';
import HeapArray from '../components/HeapArray';
import HeapTree from '../components/HeapTree';
import { Heap, MinHeap } from '../heap_classes/Heap';
import { insertRandom } from '../slices/visualization';
import { useAppDispatch, useAppSelector } from '../utils/hooks';

const MinHeapComponent = () => {

    const { currentArray } = useAppSelector((state) => state.visualization);
    const { minHeap } = useAppSelector((state) => state.visualization);
    const [heap, setHeap] = useState(minHeap);

    // dispatch method to dispatch an action and trigger a state change
    const dispatch = useAppDispatch();

    const handleInsertRandom = () => {
        const add = Math.floor(Math.random() * minHeap.heap.length + 1);
        dispatch(insertRandom({ number: add }));
        console.log('MINHEAP', minHeap)
    }

    useEffect(() => { setHeap(minHeap) }, [minHeap]);

    return (
        <div id="minHeapButtons" className="minHeapButtons">
            <button id="insertRandomButton" onClick={() => handleInsertRandom()}>Insert Random</button>
            <button id="deleteMinButton" onClick={() => { }}>Delete Min</button>
            <button id="deleteHeapButton" onClick={() => { }}>Delete Heap</button>
            {HeapArray(minHeap)}
            {HeapTree(heap)}
        </div>

    )
}


export default MinHeapComponent;
