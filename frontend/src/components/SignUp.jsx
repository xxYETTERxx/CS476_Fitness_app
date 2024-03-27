import React, { useState } from 'react';
import axios from 'axios';
import logo from '../images/gg11.png'
import resizeImage from '../functions/resizeImage';


function SignUp() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('basic');
    const [avatar, setAvatar] = useState(null); 
    const [avatarURL, setAvatarURL] = useState(null);

    const handleAvatarChange = (event) => {
        /* const file = event.target.files[0];
    if (file) {
        const maxWidth = 256; 
        const maxHeight = 256; 
        const quality = 0.7; // Between 0-1

        resizeImage(file, maxWidth, maxHeight, quality, (resizedBlob) => {
            const resizedURL = URL.createObjectURL(resizedBlob);

            // Use the resized image for the avatar
            setAvatar(resizedURL);
            setAvatarURL(resizedURL);
        });
    }
}; */

const file = event.target.files[0];
        if (file){
            const reader = new FileReader();
            reader.onload = function(e) {
                setAvatar(e.target.result);
                setAvatarURL(e.target.result);
            };
        reader.readAsDataURL(file);
        }
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();

            // construct user data
            const userData = {
                userName,
                email,
                password,
                userType,
                avatar
            }; 

            try {
            //Send backend request
            const response = await axios.post('https://gymgenius-api.onrender.com/api/auth/register', userData)

            if (response.status === 200 || response.status === 201) {
                alert('User registered successfully!');
                window.location.href = '/';
                
                setUserName('');
                setEmail('');
                setPassword('');
                setUserType('basic');
                setAvatar(null);
            }

        } catch (error) {
            if (error.message.includes('ERR_CONNECTION_REFUSED') || error.message.includes('Network Error')) {
                alert('Connection to server failed');
            } else if (error.response) {
                console.error("Registration failed:", error.response.data);
                alert("Registration failed: " + error.response.data);
            }
            else {
                console.error("Registration failed:", error.message);
                alert("Registration failed: ", error.message);
            }
        }
    };


    return (
        <div className='h-screen flex items-center'>

            <form onSubmit={handleSubmit} className='w-full flex justify-center mb-12'>

            {/* <div className='w-full flex justify-center'> */}
               
                
                <div class="w-5/6 max-w-2xl ">
                <div>
                    <h2 class="text-base font-semibold leading-7 text-base-content">Create Account</h2>
                </div>
                <div className='flex flex-col md:flex-row items-center justify-between'>
                    <div class="m-3">
                        <div class="mt-5 flex justify-center items-center gap-x-3">
                            {
                                avatarURL ?
                                <img src ={avatarURL} alt = "Avatar" className="h-32 w-32 rounded-full" /> :
                                <svg class="h-32 w-32  text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
                                </svg>
                            }
                            <div>
                                <label htmlFor="avatar" className="btn input-bordered bg-base-100">Upload Picture</label>
                                <input id="avatar" type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
                            </div>
                        </div>
                        </div>

                        <div class="sm:col-span-4 m-3 ">
                            <label for="username" class="block text-sm font-medium leading-6 text-base-content mr-5">Account Type:</label>

                            <div class="mt-2 flex justify-center items-center"
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            required>
                                <input type="radio" value='basic' name='accountType' aria-label="Basic" className="btn input-bordered md:btn-lg bg-base-100  w-24 mr-5" />
                                <input type="radio" value='pro' name='accountType' aria-label="Pro" className="btn input-bordered md:btn-lg bg-base-100  w-24" />
                            </div>
                        </div>
                    </div>
                    


                    <div class="m-3">
                        <label class="block text-sm font-medium leading-6 text-base-content">Username:</label>
                        <div class="mt-2 ">
                            <input
                                type="username"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            />
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
                        <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create Account</button>
                    </div>

                
                </div>
            </form>



        </div>


    );
}

export default SignUp;