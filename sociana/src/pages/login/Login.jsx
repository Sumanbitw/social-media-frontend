import React from 'react'
import "./login.css"

function Login() {
    return (
        <div className="login">
            <div className="login__container">
                <div className="login__left">

                </div>
                <div className="login__right">
                    <div className="login__wrapper">
                        <input className="login__input login__email" placeholder="Enter your email" />
                        <input className="login__input login__password" placeholder="Enter your password"/>
                        <button className="login__btn primary">Login</button>
                        <span className="login__forgot">Forgot Password</span>
                        <button className="login__btn secondary">Create New Account</button>
                    </div>
                </div>
            </div>    
        </div>
    )
}

export default Login
