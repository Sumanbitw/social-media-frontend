import React from 'react'
import './App.css';
import Login from './pages/login/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Feed from './Feed/Feed';
import { useAuth } from './context/context';

function App() {
  const { auth } = useAuth()

  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element = {<Login/>} />
        <Route path="/feed" element = {<Feed/>} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
