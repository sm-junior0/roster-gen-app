import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './profile.css';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/login", { email, password });
            localStorage.setItem("token", response.data.token);
            onLogin(response.data.token); 
            navigate("/page1", { replace: true });
        } catch (error) {
            console.error("Login error:", error);
            setError("Invalid email or password");
        }
    };

    return (
        <div className='formContainer'>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                {error && <p className="error-message">{error}</p>} {/* Display error message if error state is set */}
                <div className='profile-field'>
                    <label htmlFor="email">Email</label>
                    <input className='profile-field-input' type="email" name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                </div>
                <div className='profile-field'>
                    <label htmlFor="password">Password</label>
                    <input className='profile-field-input' type="password" name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </div>
                <button type="submit" className='btn-update'>Signin</button>
                <Link className='text-link' to="/register">or Register now</Link>
            </form>
        </div>
    );
};

export default Login;
