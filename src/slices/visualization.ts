//standalone runtime for Regenerator-compiled generator and async functions (DO NOT DELETE)
import regeneratorRuntime from 'regenerator-runtime';
//createAsyncThunk returns a standard Redux thunk action creator
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '../utils/hooks';
//create async thunks
import type { RootState } from '../utils/store';
import axios from 'axios';
import { User } from './authentication';
import { Heap, MaxHeap, MinHeap } from '../heap_classes/Heap';

export interface visualizationState {
  storedArrays: number[][];
  minHeap: MinHeap;
  maxHeap: MaxHeap;
}

const initialState: visualizationState = {
  storedArrays: [],
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
  },
  extraReducers: (builder) => {
    //extraReducers allows createSlice to respond to other action types besides the types it has generated
    builder.addCase(storeArray.fulfilled, (state, action) => {
      state.storedArrays.push(action.payload.storedArrays);
    });
  },
});

export const storeArray = createAsyncThunk(
  'visualization/storeArray', //action type
  async (user: User, thunkAPI) => {
    const { username, storedArrays } = user;
    return axios
      .post(`/saveArrays/${username}`, { arrays: storedArrays })
      .then((response: any) => {
        return response.data;
      })
      .catch((error: any) => {
        return error.message;
      });
  }
);

export const { insertRandom, remove, deleteHeap } =
  visualizationSlice.actions;
export default visualizationSlice.reducer;
