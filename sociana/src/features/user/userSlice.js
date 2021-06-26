import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"
import { API_URL } from '../../utility'


export const login = createAsyncThunk('user/login',
  async (user, thunkAPI) => {
    const response = await axios.post(`${API_URL}/auth/login`,user)
    console.log(response)
    if(response.data){
      localStorage.setItem('user', JSON.stringify(response.data.token))
    }
    return response.data
  }
)

export const fetchUser = createAsyncThunk('user/fetchUser', 
    async () => {
        const response = await axios.get(`${API_URL}/auth/login`)
        console.log(response)
        return response.data
    })

export const usersSlice = createSlice({
  name: 'user',
  initialState: { 
      userLoggedIn : null, 
      status : 'idle',
      error : null 
    },
  reducers: {

  },

  extraReducers: {
    [login.pending]: (state) => {
        state.status = 'loading';
    },
    [login.fulfilled]: (state, action) => {            
        state.userLoggedIn = action.payload.user;
        state.status = 'idle';
    },
    [login.rejected]: (state, action) => {            
        state.status = 'error';
        state.error = action.error.message;
    },

    [fetchUser.pending]: (state, action) => {
        state.status = 'loading';
    },
    [fetchUser.fulfilled]: (state, action) => {            
        state.userLoggedIn = action.payload.user;
        state.status = 'idle';
    },
    [fetchUser.rejected]: (state, action) => {
        console.log("rejected", state, action);
        state.status = 'error';
        state.error = action.error.message;
    },    
    
  },
})

export default usersSlice.reducer

