import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';



const Register = () => {

    //form states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //context
    const { createUser, signUpProvider, displayName, setDisplayName } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        createUser(email, password, displayName)
    }


    return (
        <>
            <div
                className='absolute top-15 left-0 w-[100%] h-[100vh] flex justify-center items-center backGround'
            >
                <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                    <div className="2xl:w-[25rem] p-6 m-auto bg-black rounded-md shadow-xl mt-10 xl:w-[25rem] lg:w-[25rem] lg:b-4 md:w[25rem] sm:w-[100%] ">
                        <h1 className="text-3xl font-semibold text-center text-white uppercase">
                            Sign up
                        </h1>
                        <form
                            className="mt-6"
                            onSubmit={handleSubmit}
                        >
                            <div className="mb-2">
                                <label
                                    htmlFor="text"
                                    className="block text-sm font-semibold text-white"
                                >
                                    User Name
                                </label>
                                <input
                                    type="text"
                                    className="loginRegisterInput"
                                    placeholder="User Name"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                />
                            </div>
                            <div className="mb-2">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-white"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="loginRegisterInput"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-2">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="loginRegisterInput"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="mt-6">
                                <button
                                    type='submit'
                                    className="loginRegisterButton"
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>
                        <div className="relative flex items-center justify-center w-full mt-6 border border-t">
                            <div className="absolute px-5 bg-black text-white">Or</div>
                        </div>
                        <div className="flex mt-4 gap-x-2">
                            <button
                                type="button"
                                className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 hover:bg-blue-500 text-black bg-white"
                                onClick={() => signUpProvider()}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 32 32"
                                    className="w-5 h-5 fill-current"
                                >
                                    <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                                </svg>
                            </button>
                        </div>
                        <p className="mt-8 text-md font-light text-center text-white">
                            <Link to={'/login'}>
                                <button className=" text-white text-lg hover:underline hover:text-blue-500" >Login</button>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register