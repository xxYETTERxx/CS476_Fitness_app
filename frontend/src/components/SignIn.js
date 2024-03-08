import React, { useState } from 'react';
import axios from 'axios';

function SignIn(){
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
         
            //Send backend request
            const userToken = await axios.post('http://localhost:5000/api/auth/login',{
                email: email,
                password: password
            });

            const { token, email: userEmail } = userToken.data;

            alert("Welcome " + userEmail);

            } catch (error) {
                if (error.message.includes('ERR_CONNECTION_REFUSED') || error.message.includes('Network Error')) {
                    alert('Connection to server failed');
                }else if (error.response){
                    console.error("Log-In Failure: ", error.response.data);
                    alert("Log-In Failure: " + error.response.data);
                }
                else{
                    console.error("Log-In Failure: ", error.message);
                    alert("Log-In Failure: ", error.message);
                }
    };
}

    return(
        <div>
            <h2><b>Log-In</b></h2>
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
                <button type = "sumbit">Log-In</button>
            </form>
        </div>
    
    );
}

export default SignIn;