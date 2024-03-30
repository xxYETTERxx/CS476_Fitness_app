import React, { useState, } from 'react';
import axios from 'axios';
import LoadingScreen from './LoadingScreen';

function SignIn({ setIsAuthenticated }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {

            //Send backend request
            const response = await axios.post('https://gymgenius-api.onrender.com/api/auth/login', {
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
            
        } finally {
                setIsLoading(false);
        }
    }; 

    return (

        <div className='h-screen flex items-center'>
            {isLoading ? <LoadingScreen /> : (
                <form onSubmit={handleSubmit} className='w-full flex justify-center mb-12'>

                    {/* <div className='w-full flex justify-center'> */}


                    <div className="w-4/6 max-w-2xl ">
                        <div>
                            <h2 className="text-base font-semibold leading-7 text-base-content">Login</h2>
                        </div>
                        <div className='flex flex-col md:flex-row items-center justify-between'>
                            <div className="m-3">
                            
                            </div>

                        
                        </div>
                        <div className="m-3">
                            <label className="block text-sm font-medium leading-6 text-base-content">Email:</label>
                            <div className="mt-2 ">
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
                        <div className="m-3">
                            <label className="block text-sm font-medium leading-6 text-base-content">Password:</label>
                            <div className="mt-2 ">
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
                        <div className="mt- mr-3 flex items-center justify-end gap-x-6">
                            <a href='/' type="button" className="text-sm font-semibold leading-6 text-base-content">Cancel</a>
                            <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
                        </div>


                    </div>
                </form>
            )}
        </div>



        

    );
}


export default SignIn;