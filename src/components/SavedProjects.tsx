// import path from 'path/posix';
import React, { useState } from 'react';
import { render } from 'react-dom';
import { updateMaxHeap, updateMinHeap } from '../slices/visualization';
import { useAppDispatch, useAppSelector } from '../utils/hooks';


const SavedProjects = () => {
    const { storedArrays } = useAppSelector((state) => state.auth.user);

    const buttons: JSX.Element[] = storedArrays ? storedArrays.reduce((acc: JSX.Element[], arr: number[], idx: number) => {
        acc.push(ArrayButton(arr, idx));
        return acc;
    }, []) : [];

    return (
        <>
            <h4>Saved Heaps:</h4>
            {buttons}
        </>
    )
}

export const ArrayButton = (array: number[], idx: number) => {

    const dispatch = useAppDispatch();

    const handleSelect = (val: EventTarget) => {
        // const array = JSON.parse(val);
        const string = (val as any).value;
        const arr = string.slice(1, string.length - 1).split(',');
        const intArr = arr.map((el: string) => parseInt(el));
        dispatch(updateMinHeap({arr: intArr}));
        dispatch(updateMaxHeap({arr: intArr}));
    }

    return (
        <div key={idx.toString()}>
            <input type="radio" id={idx.toString()} name="drone" value={JSON.stringify(array)}
                onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => handleSelect(e.target)} onChange={() => ''} />
            <label htmlFor={idx.toString()}>{JSON.stringify(array)}</label>
        </div>
    )
}

export default SavedProjects;