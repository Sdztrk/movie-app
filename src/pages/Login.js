import React, { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const Login = () => {


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const { signIn } = useContext(AuthContext)

    const handleLogin = (e) => {
        e.preventDefault()
        signIn(email, password)
    }

    return (
        <div>
            <div className='absolute top-15 left-0 w-[100%] h-[100vh] flex justify-center items-center backGround'>
                <div className="relative flex flex-col justify-center min-h-screen overflow-hidden pt-12">
                    <div className="2xl:w-[25rem] p-6 m-auto bg-black rounded-md shadow-xl mt-10 xl:w-[25rem] lg:w-[25rem] lg:b-4 md:w[25rem] sm:w-[100%] ">
                        <h1 className="text-3xl font-semibold text-center text-white uppercase">
                            Sign in
                        </h1>
                        <form onSubmit={handleLogin}>
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
                                    Login
                                </button>
                            </div>
                        </form>

                        <p className="mt-8 text-md font-light text-center text-white">
                            {" "}
                            Don't have an account?{" "}
                            <Link to={'/register'}>
                                <button className=" text-white text-lg hover:underline hover:text-blue-500" >Register</button>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login