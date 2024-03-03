import React, { useState } from 'react';

function SignUp(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [accountType, setAccountType] = useState('basic');

    const handleSubmit = (event) => {
        event.preventDefault();
    //handle form submission backend communication
    console.log(email, password, accountType);
    // POST request to backend using fetch/axios
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