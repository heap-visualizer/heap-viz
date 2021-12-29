//standalone runtime for Regenerator-compiled generator and async functions (DO NOT DELETE)
import regeneratorRuntime from "regenerator-runtime";
//createAsyncThunk returns a standard Redux thunk action creator
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../utils/hooks";
//create async thunks
import type { RootState } from "../utils/store";
import axios from "axios";
import { User } from "./authentication";
import { Heap, MinHeap } from "../heap_classes/Heap";

export interface visualizationState {
  storedArrays: number[][];
  currentArray: number[];
  minHeap: Heap;
}

const initialState: visualizationState = {
  storedArrays: [],
  currentArray: [1, 2, 3, 4, 5],
  minHeap: new MinHeap([10, 20, 30, 40, 50]),
};

const visualizationSlice = createSlice({
  name: "visualization",
  initialState,
  reducers: {
    // if needed add here
    insertRandom: (state, action) => {
      state.minHeap.insert(action.payload.number);
    },
    deleteMin: (state, _action) => {
      state.minHeap.remove();
    },
    deleteHeap: (state, _action) => {
      state.minHeap.heap = [];
    }
  },
  extraReducers: (builder) => {
    //extraReducers allows createSlice to respond to other action types besides the types it has generated
    builder.addCase(storeArray.fulfilled, (state, action) => {
      state.storedArrays.push(action.payload.storedArrays);
    });
  },
});

export const storeArray = createAsyncThunk(
  "visualization/storeArray", //action type
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

export const { insertRandom, deleteMin, deleteHeap } = visualizationSlice.actions;
export default visualizationSlice.reducer;