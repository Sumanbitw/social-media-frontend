import React, { useState } from 'react'
import axios from "axios"
import "./login.css"
import { useAuth } from '../../context/context'
import { useLocation, useNavigate } from 'react-router'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const {auth, setAuth} = useAuth()
    const navigate = useNavigate()
    const { state } = useLocation

    async function handleLogin(){
        try{
            const response = await axios.post("https://sociana-backend.herokuapp.com/user/login", {
                email : email,
                password : password
            })
            console.log(response)
            if(!response.data.token){
                setError(response.data)
            }else{
                console.log("Login succesfully done")
            setAuth(response.data)
            setAuth(prev => {
                localStorage.setItem("auth", JSON.stringify(prev))
                return prev
            })
            navigate(state?.from ? state?.from : "/feed")
            }
        }catch(error){
            console.log(error)
        }
    }
   
    return (
        <div className="login">
            <div className="login__container">
                <div className="login__left">
                </div>
                <div className="login__right">
                    <div className="login__wrapper">
                        
                        <input
                        className="login__input login__email" 
                        placeholder="Enter your email" 
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        
                        <input
                        className="login__input login__password" 
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        />
                        
                        <button
                        className="login__btn primary"
                        onClick={handleLogin}
                        >
                            Login
                        </button>
                        
                        <span
                        className="login__forgot"
                        >
                            Forgot Password
                        </span>
                        
                        <button 
                        className="login__btn secondary"
                        >
                            Create New Account
                        </button>

                    </div>
                </div>
                {error && <p>{error}</p>}
            </div>    
        </div>
    )
}

export default Login
