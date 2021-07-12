import React, { useEffect } from 'react'
import axios from "axios"
import { useDispatch } from 'react-redux';
import { Routes, Route, useNavigate} from "react-router-dom"
import { fetchUserPost } from './features/Feed/feedSlice';
import PrivateRoute from './features/user/PrivateRoute';
// import { fetchUserFriends } from './features/Feed/feedSlice';
import Home from './features/Feed/Home';
import Signin from './features/user/Signin';
import Signup from './features/user/Signup';
import { loginWithToken, logout } from './features/user/userSlice';
import Profile from './features/Profile/Profile';
import ProfileEdit from './features/Profile/ProfileEdit';
import FriendsProfile from './features/Profile/FriendsProfile';
import Search from './features/Profile/Search';
import Navbar from './components/navbar/Navbar';

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

useEffect(() => {
  (async function(){
    const {userLoggedIn, localToken } = JSON.parse(localStorage?.getItem('user')) || {}
    userLoggedIn && localToken && dispatch(loginWithToken({ localToken }))
    setupAuthExceptionHandler(dispatch, navigate)
  })()
},[dispatch, navigate])

function setupAuthExceptionHandler(dispatch, navigate) {
  const UNAUTHORIZED = 401;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        dispatch(logout());
        navigate("login");
      }
      return Promise.reject(error);
    }
  );
}

  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <PrivateRoute path="/" element = {<Home/>} />
        <Route path="/login" element = {<Signin/>} />
        <Route path="/signup" element = {<Signup/>} />
        <PrivateRoute path="/profile/:username" element = {<Profile/>} />
        <PrivateRoute path="/profile/friend/:userId" element = {<FriendsProfile/>} />                
        <PrivateRoute path="/profile/:username/edit" element = {<ProfileEdit/>} />
        <PrivateRoute path="/search" element = {<Search/>} />
        {/* <Route path="/feed" element = {auth ? <Feed/> : <Navigate to="/"/> } /> */}
      </Routes>
    </div>
  );
}

export default App;
