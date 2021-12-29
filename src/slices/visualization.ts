//standalone runtime for Regenerator-compiled generator and async functions (DO NOT DELETE)
import regeneratorRuntime from "regenerator-runtime";
//createAsyncThunk returns a standard Redux thunk action creator
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../utils/hooks";
//create async thunks
import type { RootState } from "../utils/store";
import axios from "axios";

export interface visualizationState {
  storedArrays: number[][];
}

const initialState: visualizationState = {
  storedArrays: [],
};

const visualizationSlice = createSlice({
  name: "visualization",
  initialState,
  reducers: {
    // if needed add here
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
    const {username, storedArrays} = user;
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

export default visualizationSlice.reducer;