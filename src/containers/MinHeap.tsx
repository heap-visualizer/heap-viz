// import path from 'path/posix';
import React, { useEffect, useState } from 'react';
import HeapArray, { HeapArrayProps } from '../components/HeapArray';
import HeapTree from '../components/HeapTree';
import { Heap, MinHeap } from '../heap_classes/Heap';
import { insertRandom } from '../slices/visualization';
import { useAppDispatch, useAppSelector } from '../utils/hooks';

const MinHeapComponent = () => {

    const { currentArray } = useAppSelector((state) => state.visualization);
    const { minHeap } = useAppSelector((state) => state.visualization);
    const [heap, setHeap] = useState(minHeap);
    const [key, setKey] = useState(heap.heap.length.toString()); // think about the ways to do this.


    // dispatch method to dispatch an action and trigger a state change
    const dispatch = useAppDispatch();

    const handleInsertRandom = () => {
        const add = Math.floor(Math.random() * minHeap.heap.length + 1);
        dispatch(insertRandom({ number: add }));
        setHeap(minHeap)
        setKey(minHeap.heap.length.toString());
        console.log('from container', heap);
        // console.log('MINHEAP', minHeap)
    }

    useEffect(() => { 
        setHeap(minHeap) 
    }, [minHeap]);

    const heapProps: HeapArrayProps = {
        inputHeap: heap,
        length: key,
    }
    console.log('props', heapProps);

    return (
        <div id="minHeapButtons" className="minHeapButtons">
            <button id="insertRandomButton" onClick={() => handleInsertRandom()}>Insert Random</button>
            <button id="deleteMinButton" onClick={() => { }}>Delete Min</button>
            <button id="deleteHeapButton" onClick={() => { }}>Delete Heap</button>
            <HeapArray {...heapProps}/>
            {HeapTree(heap)}
        </div>

    )
}


export default MinHeapComponent;
