import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"
import { API_URL } from '../../utility'

export const fetchTimelinePost = createAsyncThunk('/feed/timelinePost', async(userId) => {
    // console.log(userId)
    const response = await axios.get(`${API_URL}/posts/timeline/${userId}`)
    // console.log(response)
    return response.data
})

export const fetchUserPost = createAsyncThunk('feed/userPost', async (name) => {
    const response = await axios.get(`${API_URL}/posts/profile/${name}`)
    // console.log(response)
    return response.data
})

export const fetchUserFriends = createAsyncThunk('feed/userFriends', async(userId) => {
    const response = await axios.get(`${API_URL}/user/friends/${userId}`)
    console.log(response)
    return response.data
}) 

export const addNewPost = createAsyncThunk('feed/newPost', async(post) => {
    const response = await axios.post(`${API_URL}/posts`, post['post'])
    // console.log(response)
    return response.data
})

export const likesUpdate = createAsyncThunk('feed/likes', async(post) => {
    // console.log(post.post.user)
    const response = await axios.post(`${API_URL}/posts/${post.post.postId}/like`,
    {
        user : post.post.user
    })
    return response.data
})

export const fetchUserFeed = createAsyncThunk('user/fetchUser', 
    async (_, { getState }) => {
        const response = await axios.get(`${API_URL}/user`)
        console.log(response)
        return response.data
    })

export const feedSlice = createSlice({
    name: 'post',
    initialState: { 
        friends : [],
        posts : [], 
        user : [],
        status : 'idle',
        error : null 
      },
    reducers: {
  
    },
  
    extraReducers: {
       [fetchUserPost.pending]: (state) => {
           state.status = 'loading'
       },
       [fetchUserPost.fulfilled]: (state, action) => {   
        //    console.log(action.payload)  
           state.status = 'succeeded';       
           state.posts = action.payload;
          
       },
       [fetchUserPost.rejected]: (state, action) => {            
            state.status = 'error';
            state.error = action.error.message;
       },
      
       [fetchTimelinePost.pending]: (state) => {
            state.status = 'loading'
        },

       [fetchTimelinePost.fulfilled]: (state, action) => {   
            // console.log(action.payload) 
            state.status = 'succeeded';        
            state.posts = action.payload;
        
        },
       [fetchTimelinePost.rejected]: (state, action) => {            
            state.status = 'error';
            state.error = action.error.message;
        },
       [fetchUserFeed.pending]: (state, action) => {
            state.status = 'loading';
        },
       [fetchUserFeed.fulfilled]: (state, action) => { 
            state.status = 'succeeded';
            // console.log(action.payload)            
            state.user = action.payload.userLoggedIn;
        },
       [fetchUserFeed.rejected]: (state, action) => {
            // console.log("rejected", state, action);
            state.status = 'error';
            state.error = action.error.message;
        }, 

       [addNewPost.pending] : (state,action) => {
            state.status = "loading"
        },

       [addNewPost.fulfilled] : (state,action) => {
            // console.log(action.payload)
            state.status = "succeeded"
            state.posts.unshift(action.payload)
    },

       [addNewPost.rejected] : (state,action) => {
            state.status = "failed"
            state.error = action.payload.message
        },

        [likesUpdate.pending] : (state) => {
            state.status = "loading"
        },

        [likesUpdate.fulfilled] : (state, action) => {
            state.status = "succeeded";
            // console.log(action.payload.updatedPost, " payload")
            const { _id, likes, user } = action.payload.updatedPost
            console.log("lineNumber 123",_id, likes, user)

            const isPostLiked = likes.includes(user)
            console.log(isPostLiked)

            const posts = state.posts.find(post => post._id === _id)
            
            if(isPostLiked){
                posts.likes.push(user)
            }
            else{
                const like = posts.likes.indexOf(user)
                posts.likes.splice(like,1)
            }
            
        },

        [likesUpdate.rejected] : (state, action) =>{
            state.status = "error";
            state.error = action.error.message
        },

        [fetchUserFriends.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchUserFriends.fulfilled]: (state, action) => { 
            state.status = 'succeeded';            
            state.friends = action.payload.friendList;
        },
        [fetchUserFriends.rejected]: (state, action) => {
            console.log("rejected", state, action);
            state.status = 'error';
            state.error = action.error.message;
        },       
    },
  })
  
  export default feedSlice.reducer
  
