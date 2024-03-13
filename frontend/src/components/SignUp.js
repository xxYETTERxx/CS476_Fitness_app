import React, { useState } from 'react';
import axios from 'axios';

function SignUp(){
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('basic');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // construct user data
            const userData = {
                userName,
                email,
                password,
                userType
            };

            //Send backend request
            const response = await axios.post('http://localhost:5000/api/auth/register',userData)
        
            if (response.status === 200 || response.status === 201) {
                alert('User registered successfully!');

                setUserName('');
                setEmail('');
                setPassword('');
            } 
            

            

        } catch (error) {
            if (error.message.includes('ERR_CONNECTION_REFUSED') || error.message.includes('Network Error')) {
                alert('Connection to server failed');
            }else if (error.response){
                console.error("Registration failed:", error.response.data);
                alert("Registration failed: " + error.response.data);
            }
            else{
                console.error("Registration failed:", error.message);
                alert("Registration failed: ", error.message);
            }
        }
    };


    return(
        <div>
            <h2><b>Create Account</b></h2>
            <form onSubmit = {handleSubmit}>
                <div>
                    <label>UserName:</label>
                    <input
                        type="username"
                        value={userName}
                        onChange={(e)=> setUserName(e.target.value)}
                        required
                        />
                </div>
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
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        required
                    > 
                        <option value = 'basic'>Basic</option>
                        <option value = 'pro'>Pro</option>
                    </select>
                </div>
                <button type = "sumbit">Create Account</button>
            </form>
        </div>
    
    );
}

export default SignUp;