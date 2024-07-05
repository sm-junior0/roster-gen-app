import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './profile.css';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            console.error("All fields are required");
            return;
        }
        try {
            const response = await axios.post("http://localhost:5000/register", { name, email, password });
            console.log(response);
            navigate("/", { replace: true });
        } catch (error) {
            console.error("Registration error:", error);
        }
    };
    

    return (
        <div className='formContainer'>
            <form onSubmit={handleSubmit}>
                <h1>Signup</h1>
                <div className='profile-field'>
                    <label htmlFor="name">Name</label>
                    <input className='profile-field-input' type="text" name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required />
                </div>
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
                <button type="submit" className='btn-update'>Signup</button>
                <Link className='text-link float-right mt-5' to="/">Signin</Link>
            </form>
        </div>
    );
};

export default Register;
