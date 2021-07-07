import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"
import { API_URL } from '../../utility'


export const login = createAsyncThunk('user/login',
  async (user, { getState }) => {
    try{
      const response = await axios.post(`${API_URL}/auth/login`,user)
      console.log(response)
      return response.data
    }catch(error){
      return getState(error.data.message)
    } 
  }
)

function setupAuthHeaderForServiceCalls(token) {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = token);
  }
  delete axios.defaults.headers.common["Authorization"];
}

export const usersSlice = createSlice({
  name: 'user',
  initialState: { 
      userLoggedIn : null,
      isUserLoggedIn : false,
      user : [],
      status : 'idle',
      token : null,
      error : null 
    },
  reducers: {
    loginWithToken: (state, action) => {
      state.token = action.payload.localtoken;
      state.userLoggedIn = action.payload.user;
      state.isUserLoggedIn = true;
      setupAuthHeaderForServiceCalls(action.payload.localtoken);
    },

    logout: (state) => {
      localStorage?.removeItem("user");
      state.userLoggedIn = null;
      state.isUserLoggedIn = false;
      state.token = null;
      state.user = [];
      state.status = "idle"
      setupAuthHeaderForServiceCalls(null);
    },

    authReset: (state, action) => {
      state.userLoggedIn = null;
      state.isUserLoggedIn = false;
      state.token = null;
      state.status = "idle";
    
    },

  },

  extraReducers: {
    [login.pending]: (state) => {
        state.status = 'loading';
    },

    [login.fulfilled]: (state, action) => {
      console.log(action.payload)   
      state.status = "succeeded"         
      state.userLoggedIn = action.payload.user;
      state.isUserLoggedIn = true; 
      state.user.push(action.payload.user)
      state.token = action.payload.token
      localStorage?.setItem('user', JSON.stringify({
        isUserLoggedIn : true,
        userLoggedIn : action.payload.user,
        localToken : action.payload.token
      }))
    },

    [login.rejected]: (state, action) => {            
        state.status = 'error';
        state.error = action.error.message;
    },    
  },
});
export const { logout, authReset, loginWithToken } = usersSlice.actions;
export default usersSlice.reducer

