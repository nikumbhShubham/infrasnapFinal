import { auth,googleProvider } from "../config/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    

} from "firebase/auth";
import { useState } from "react";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { NavLink, useNavigate } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();
    const signUp = async () => {

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/signin')
        } catch (err) {
            console.error(err);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
        }
    };

    

    return (
        <section className=' font-montserrat'>
            <div className='flex flex-col lg:flex-row items-center justify-center p-4 min-h-screen bg-blue-50' >
                <div className='mt-8 lg:mt-0 lg:mr-16 text-center lg:text-left '>
                    <img src="assets/signin.jpg"
                        className='w-[400px] h-full object-cover rounded-xl shadow-md'
                    />
                </div>
                <div
                    className='w-full max-w-md lg:max-w-lg bg-white rounded-lg shadow-lg p-8'
                >
                    <h2 className="text-2xl font-semibold text-gray-800 ">
                        Welcome back 👋
                    </h2>
                    <p className="text-gray-500 mt-2">Log in to your account</p>
                    <form className="mt-12">
                        {/* Email Input */}
                        <div className="relative mt-4">
                            <AiOutlineMail className="absolute top-3 left-3 text-gray-400" />
                            <input
                                type="email"
                                name='email'
                                placeholder="What is your e-mail?"
                                className="w-full px-10 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative mt-6">
                            <AiOutlineLock className="absolute top-3 left-3 text-gray-400" />
                            <input
                                type="password"
                                name='password'
                                placeholder="Enter your password"
                                className="w-full px-10 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Remember Me */}


                        {/* Submit Button */}
                        <button
                            type="button"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg mt-6 hover:bg-blue-600 transition"
                            onClick={signUp}
                        >
                            Sign Up
                        </button>
                    </form>

                    <button className="flex mx-auto my-4 justify-center items-center gap-2 p-2 border rounded-full font-semibold"
                         onClick={signInWithGoogle}
                    >
                        <FaGoogle /> 
                        <span>Continue with google</span>
                       
                    </button>



                    <p className="text-center text-sm text-gray-600 mt-16">
                        New user?{" "}
                        <NavLink to='/signin'>
                            <span className='text-blue-700'>Login here</span>
                        </NavLink>
                    </p>

                </div>

            </div>
        </section>
    )
};