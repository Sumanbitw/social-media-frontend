import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { API_URL } from "../../utility"

export const getUser = createAsyncThunk('profile/getUser', async(userId) => {
    const response = await axios.get(`${API_URL}/user/${userId}`)
    return response.data 
})

export const searchUser = createAsyncThunk('profile/searchUser', async(name) => {
    const response = await axios.get(`${API_URL}/search/${name}`)
    // console.log(response)
    return response.data
})

export const followUser = createAsyncThunk('profile/followUser', async(user) => {
    console.log(user.user.userId, user.user.profileId)
    const response  = await axios.post(`${API_URL}/user/${user.user.profileId}/follow`, 
    {
        user : user.user.userId
    })
    console.log(response)
    return response.data
})

export const unFollowUser = createAsyncThunk('profile/unFollowUser', async(user) => {
    console.log(user.user.userId, user.user.profileId)
    const response  = await axios.post(`${API_URL}/user/${user.user.profileId}/unfollow`, 
    {
        user : user.user.userId
    })
    console.log(response)
    return response.data
})

export const updateUser = createAsyncThunk('profile/updateUser', async(values) => {
    console.log(values)
    const response = await axios.put(`${API_URL}/user/${values.user}`, 
    {
        user : values.user,
        name : values.name,
        bio : values.bio
    })
    // console.log(response)
    return response.data
})
export const profileSlice = createSlice({
    name : 'profile',
    initialState : {
        user : [],
        friend : [],
        profile : [],
        error : null,
        status : "idle"
    },
    reducers : {},

    extraReducers : {
        [getUser.pending] : (state) => {
            state.status = "loading"
        },

        [getUser.fulfilled] : (state,action) => {
            state.status = "succeeded";
            console.log(state, action)
            state.user = action.payload.other

        },

        [getUser.rejected] : (state) => {
            state.status = "failed"
        },

        [searchUser.pending] : (state) => {
            state.status = "loading"
        },

        [searchUser.fulfilled] : (state,action) => {
            state.status = "succeeded";
            console.log(state, action)
            state.friend = action.payload

        },

        [searchUser.rejected] : (state) => {
            state.status = "failed"
        },

        [followUser.pending] : (state, action) => {
            state.status = "loading"
        },

        [followUser.fulfilled] : (state,action) => {
            state.status = "succeeded";
            console.log(state, action)
            state.profile = action.payload.newUser.followers
            // state.friend[0].followers =  [...state?.friend[0]?.followers, _id]

        },

        [followUser.rejected] : (state) => {
            state.status = "failed"
        },

        [unFollowUser.pending] : (state) => {
            state.status = "loading"
        },

        [unFollowUser.fulfilled] : (state,action) => {
            state.status = "succeeded";
            console.log(state, action)
            state.profile = action.payload.newUser.followers
            // state.friend[0].followers =  [...state?.friend[0]?.followers, action.meta.arg.userId]

        },

        [unFollowUser.rejected] : (state) => {
            state.status = "failed"
        }
    }
})

export default profileSlice.reducer