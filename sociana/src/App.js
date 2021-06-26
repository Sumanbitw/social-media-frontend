import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Routes, Route, useNavigate} from "react-router-dom"
import Home from './features/Feed/Home';
import Signin from './features/user/Signin';
import Signup from './features/user/Signup';
import { fetchUser } from './features/user/userSlice';

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

useEffect(() => {
  (async function(){
    const result = JSON.parse(localStorage.getItem('user'))
    if(result){
      await(dispatch(fetchUser()))
    }
    else{
      navigate("/login")
    }
  })()
},[dispatch, navigate])

  return (
    <div className="App">
      <Routes>
      <Route path="/" element = {<Home/>} />
        <Route path="/login" element = {<Signin/>} />
        <Route path="/signup" element = {<Signup/>} />
        {/* <Route path="/feed" element = {auth ? <Feed/> : <Navigate to="/"/> } /> */}
      </Routes>
    </div>
  );
}

export default App;
