import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { NavLink,useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
// import { Nav } from 'react-router-dom'

// import { login } from '../store/user/userSlice'; // Import your action
import {login } from '../redux/user/userSlice'
import { auth, googleProvider } from '../config/firebase';
import { FaGoogle } from 'react-icons/fa';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // SignIn with email and password
  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch(login(userCredential.user)); // Save user in Redux store
      navigate('/dashboard/page'); // Navigate to home on success

    } catch (err) {
      console.error(err);
    }
  };

  // SignIn with Google
  const signInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      dispatch(login(userCredential.user)); // Save user in Redux store
      navigate('/dashboard/page'); // Navigate to home on success
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
                            onClick={signIn}
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
                        Returning user?{" "}
                        <NavLink to='/signup'>
                            <span className='text-blue-700'>Register here</span>
                        </NavLink>
                    </p>

                </div>

            </div>
        </section>
    )
};


// import React, { useState } from 'react'
// import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
// import { NavLink, useNavigate } from 'react-router-dom'
// import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice'
// import { useDispatch, useSelector } from 'react-redux';
// const SignIn = () => {
//     const [formData, setFormData] = useState({})

//     const { loading, error } = useSelector((state) => state.user)

//     const navigate = useNavigate()
//     const dispatch = useDispatch()


//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value })
//     }
//     console.log(formData)

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         dispatch(signInStart());

//         try {
//             const res = await fetch('/api/auth/signin', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });

//             const data = await res.json();

//             if (!res.ok || data.success === false) {
//                 // Dispatch failure action
//                 dispatch(signInFailure(data.message || 'Sign-in failed'));
//                 return;
//             }

//             // Dispatch success action
//             dispatch(signInSuccess(data));
//             navigate('/dashboard/page'); // Navigate to home on success
//         } catch (error) {
//             console.error('Sign-in error:', error);
//             dispatch(signInFailure('An unexpected error occurred.'));
//         }
//     };

//     return (
//         <section className=' font-montserrat'>
//             <div className='flex flex-col lg:flex-row items-center justify-center p-4 min-h-screen bg-blue-50' >
//                 <div className='mt-8 lg:mt-0 lg:mr-16 text-center lg:text-left '>
//                     <img src="assets/signin.jpg"
//                         className='w-[400px] h-full object-cover rounded-xl shadow-md'
//                     />
//                 </div>
//                 <div
//                     className='w-full max-w-md lg:max-w-lg bg-white rounded-lg shadow-lg p-8'
//                 >
//                     <h2 className="text-2xl font-semibold text-gray-800 ">
//                         Welcome back 👋
//                     </h2>
//                     <p className="text-gray-500 mt-2">Log in to your account</p>
//                     <form onSubmit={handleSubmit} className="mt-12">
//                         {/* Email Input */}
//                         <div className="relative mt-4">
//                             <AiOutlineMail className="absolute top-3 left-3 text-gray-400" />
//                             <input
//                                 type="email"
//                                 name='email'
//                                 placeholder="What is your e-mail?"
//                                 className="w-full px-10 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//                                 onChange={handleChange}
//                             />
//                         </div>

//                         {/* Password Input */}
//                         <div className="relative mt-6">
//                             <AiOutlineLock className="absolute top-3 left-3 text-gray-400" />
//                             <input
//                                 type="password"
//                                 name='password'
//                                 placeholder="Enter your password"
//                                 className="w-full px-10 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//                                 onChange={handleChange}
//                             />
//                         </div>

//                         {/* Remember Me */}
//                         <div className="flex items-center mt-6">
//                             <input type="checkbox" id="remember" className="mr-2" />
//                             <label htmlFor="remember" className="text-gray-600">
//                                 Remember me
//                             </label>
//                             <a
//                                 href="/forgot-password"
//                                 className="ml-auto text-blue-500 hover:underline text-sm"
//                             >
//                                 Forgot password?
//                             </a>
//                         </div>

//                         {/* Submit Button */}
//                         <button
//                             disabled={loading}
//                             className="w-full bg-blue-500 text-white py-2 rounded-lg mt-6 hover:bg-blue-600 transition"
//                         >
//                             {loading ? 'Loading...' : 'Sign In'}
//                         </button>
//                     </form>



//                     <p className="text-center text-sm text-gray-600 mt-16">
//                         Returning user?{" "}
//                         <NavLink to='/signup'>
//                             <span className='text-blue-700'>Register here</span>
//                         </NavLink>
//                     </p>

//                 </div>

//             </div>
//         </section>
//     )
// }

// export default SignIn
