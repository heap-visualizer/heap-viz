//standalone runtime for Regenerator-compiled generator and async functions (DO NOT DELETE)
import regeneratorRuntime from 'regenerator-runtime';
//createAsyncThunk returns a standard Redux thunk action creator
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
//use authService to make async requests - authService.register, login, logout
import { authService } from '../services/auth_service';
// setMessage dispatched if authentication is successful or fails
import { setMessage } from './messages';
//create async thunks
import type { RootState } from '../utils/store';
import axios from 'axios';

// technically not *supposed* to do this in general but for our purposes it's fixing the error
// "as string" essentially says that localStorage.getItem will be passed a string
const user: User = JSON.parse(localStorage.getItem('user') as string);
// { username: 'yogi', password: null, storedArrays: [[1, 2, 3, 4], [4, 5, 6, 7], [5, 6, 7, 8]] }  //JSON.parse(localStorage.getItem('user') as string);

export interface User {
  _id?: string;
  username: string;
  password: string | null;
  storedArrays?: number[][];
}

export interface LoggedInState {
  user: User;
  isLoggedIn: boolean;
  // loading: 'idle' | 'pending' | 'suceeded' | 'failed';
}

//set initial state here
const initialState: LoggedInState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload.user
    }
  },
  extraReducers: (builder) => {
    //extraReducers allows createSlice to respond to other action types besides the types it has generated
    builder.addCase(register.fulfilled, (state, _action) => {
      state.isLoggedIn = false;
    });
    builder.addCase(register.rejected, (state, _action) => {
      state.isLoggedIn = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, _action) => {
      state.isLoggedIn = false;
      state.user = { username: '', password: null };
    });
    builder.addCase(logout.fulfilled, (state, _action) => {
      state.isLoggedIn = false;
      state.user = { username: '', password: null };
    });
    builder.addCase(storeArray.fulfilled, (state, action) => {
      state.user.storedArrays = action.payload.storedArrays;
    });
  },
});

export const register = createAsyncThunk(
  'auth/register', //action type
  async (
    //payloadCreator callback that returns a promise
    user: User,
    thunkAPI //object that contains all parameters normally passed to a Redux thunk function
  ) => {
    try {
      const { username, password } = user;
      const response = await authService.register(username, password as string);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data; //contains our response from server
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (user: User, thunkAPI) => {
    try {
      const { username, password } = user;
      const data = await authService.login(username, password as string);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export interface HandleSavePayload {
  username: string;
  heaps: number[][];
}

export const storeArray = createAsyncThunk(
  'visualization/storeArray', //action type
  async (payload: HandleSavePayload, thunkAPI) => {
    const { username, heaps } = payload;
    return axios
      .patch(`/saveArray/${username}`, { arrays: heaps })
      .then((response: any) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error: any) => {
        return error.message;
      });
  }
);


export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

export const selectUser = (state: RootState) => state.auth.user;
export default authSlice.reducer;
