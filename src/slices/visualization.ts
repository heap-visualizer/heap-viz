//standalone runtime for Regenerator-compiled generator and async functions (DO NOT DELETE)
import regeneratorRuntime from 'regenerator-runtime';
//createAsyncThunk returns a standard Redux thunk action creator
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
//create async thunks
import { Heap, MaxHeap, MinHeap } from '../heap_classes/Heap';

export interface visualizationState {
  minHeap: MinHeap;
  maxHeap: MaxHeap;
}

const initialState: visualizationState = {
  minHeap: new MinHeap([10, 20, 30, 40, 50]),
  maxHeap: new MaxHeap([10, 20, 30, 40, 50])
};

const visualizationSlice = createSlice({
  name: 'visualization',
  initialState,
  reducers: {
    // if needed add here
    insertRandom: (state, action) => {
      const { heapType } = action.payload;
      heapType === 'MIN' ?
        state.minHeap.insert(action.payload.number) :
        state.maxHeap.insert(action.payload.number);
    },
    remove: (state, action) => {
      const { heapType } = action.payload;
      heapType === 'MIN' ?
        state.minHeap.remove() :
        state.maxHeap.remove();
    },
    deleteHeap: (state, action) => {
      const { heapType } = action.payload;
      heapType === 'MIN' ?
        state.minHeap.heap = [] :
        state.maxHeap.heap = [];
    },
    updateMinHeap: (state, action) => {
      const { arr } = action.payload;
      state.minHeap = new MinHeap(arr);
    },
    updateMaxHeap: (state, action) => {
      const { arr } = action.payload;
      state.maxHeap = new MaxHeap(arr);
    }

  },
});

export const { insertRandom, remove, deleteHeap, updateMinHeap, updateMaxHeap } =
  visualizationSlice.actions;
export default visualizationSlice.reducer;
