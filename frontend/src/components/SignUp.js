import React, { useState } from 'react';
import axios from 'axios';

function SignUp(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [accountType, setAccountType] = useState('basic');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // construct user data
            const userData = {
                email,
                password,
                accountType
            };

            //Send backend request
            await axios.post('http://localhost:3000/api/auth/register',userData);

            alert('User registered successfully!');

        } catch (error) {
            console.error("Registration failed:", error.response.data);
            alert("Registration failed");
        }
    };


    return(
        <div>
            <h2>Create Account</h2>
            <form onSubmit = {handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        required
                        />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        required
                        />
                </div>
                <div>
                    <label>Account Type:</label>
                    <select
                        value={accountType}
                        onChange={(e) => setAccountType(e.target.value)}
                        required
                    > 
                        <option value = "basic">Basic</option>
                        <option value = "pro">Pro</option>
                    </select>
                </div>
                <button type = "sumbit">Create Account</button>
            </form>
        </div>
    
    );
}

export default SignUp;