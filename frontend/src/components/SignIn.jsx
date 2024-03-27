import React, { useState, } from 'react';
import axios from 'axios';

function SignIn({ setIsAuthenticated }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            //Send backend request
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email: email,
                password: password
            });
            const token = response.data.token;
            localStorage.setItem('token', token); //Store token locally

            setIsAuthenticated(true);
            window.location.href = '/';

        } catch (error) {
            if (error.message.includes('ERR_CONNECTION_REFUSED') || error.message.includes('Network Error')) {
                alert('Connection to server failed');
            } else if (error.response) {
                console.error("Log-In Failure: ", error.response.data);
                alert("Log-In Failure: " + error.response.data);
            }
            else {
                console.error("Log-In Failure: ", error.message);
                alert("Log-In Failure: ", error.message);
            }
        };
    }

    return (
        <div className='h-screen flex items-center'>
            <form onSubmit={handleSubmit} className='w-full flex justify-center mb-12'>
                {/* <div className='w-full flex justify-center'> */}
                <div class="w-4/6 max-w-2xl ">
                    <div>
                        <h2 class="text-base font-semibold leading-7 text-base-content">Login</h2>
                    </div>

                    <div className='flex flex-col md:flex-row items-center justify-between'>
                        <div class="m-3">
                        </div>
                    </div>

                    <div class="m-3">
                        <label class="block text-sm font-medium leading-6 text-base-content">Email:</label>
                        <div class="mt-2 ">
                            <input
                                type="email"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div class="m-3">
                        <label class="block text-sm font-medium leading-6 text-base-content">Password:</label>
                        <div class="mt-2 ">
                            <input
                                type="password"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className='divider mt-10 mb-3 pr-3 pl-3'></div>
                    
                    <div class="mt- mr-3 flex items-center justify-end gap-x-6">
                        <a href='/' type="button" class="text-sm font-semibold leading-6 text-base-content">Cancel</a>
                        <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
                    </div>
                </div>
            </form>

        </div>
    );
};

export default SignIn;