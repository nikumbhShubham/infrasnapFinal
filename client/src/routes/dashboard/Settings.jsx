import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAuth, updateEmail, sendEmailVerification, updatePassword, deleteUser, signOut } from 'firebase/auth';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/user/userSlice';

export default function Settings() {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState(user?.profilePicture || '/assets/react.svg');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const auth = getAuth();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        if (file) {
            const storage = getStorage();
            const storageRef = ref(storage, `profilePictures/${user.uid}/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                null,
                (err) => {
                    setError('Image upload failed.');
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    setImageURL(downloadURL);
                    setSuccess('Image uploaded successfully!');
                }
            );
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            if (!auth.currentUser.emailVerified) {
                setError('Please verify your current email address before updating.');
                await sendEmailVerification(auth.currentUser);
                setSuccess('Verification email sent to your current email address. Verify it before making changes.');
                return;
            }

            // Update email
            if (email && email !== user.email) {
                await updateEmail(auth.currentUser, email);
                await sendEmailVerification(auth.currentUser);
                setSuccess('Email updated successfully! Please verify your new email address.');
            }

            // Update password
            if (password) {
                await updatePassword(auth.currentUser, password);
                setSuccess('Password updated successfully!');
            }

            // Update profile picture (logic to store in database if required)
            if (imageURL !== user?.profilePicture) {
                // Add logic to save `imageURL` to the database or Redux state
            }

        } catch (err) {
            setError(err.message || 'Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await deleteUser(auth.currentUser);
            dispatch(logout());
            navigate('/');
        } catch (err) {
            setError(err.message || 'Failed to delete account.');
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            dispatch(logout());
            navigate('/');
        } catch (err) {
            setError('Failed to sign out.');
        }
    };

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Profile Settings</h1>
            <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    hidden
                    id="profilePictureInput"
                />
                <img
                    src={imageURL}
                    alt="Profile"
                    className="h-24 w-24 rounded-full object-cover self-center cursor-pointer"
                    onClick={() => document.getElementById('profilePictureInput').click()}
                />

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="bg-slate-100 rounded-lg p-3"
                />

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New Password"
                    className="bg-slate-100 rounded-lg p-3"
                />

                <button
                    type="submit"
                    className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80"
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update'}
                </button>
            </form>

            <div className="flex justify-between mt-5">
                <span onClick={handleDeleteAccount} className="text-red-700 cursor-pointer">
                    Delete Account
                </span>
                <span onClick={handleLogout} className="text-red-700 cursor-pointer">
                    Sign Out
                </span>
            </div>

            {error && <p className="text-red-700 mt-5">{error}</p>}
            {success && <p className="text-green-700 mt-5">{success}</p>}
        </div>
    );
}



// import React, { useRef, useState, useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
// // import { app } from "../../firebase.js"
// // import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, logout } from '../../redux/user/userSlice.js'
// import { useNavigate } from 'react-router-dom'; 

// export default function Settings() {
//     const fileRef = useRef(null)
//     const [image, setImage] = useState(undefined);
//     const [imagePercent, setImagePercent] = useState(0)
//     const [imageError, setImageError] = useState(false)
//     const [formData, setformData] = useState({})
//     const [updateSuccess, setUpdateSuccess] = useState(false)
//     const navigate = useNavigate();
//     // console.log(formData)

//     const { currentUser, loading, error } = useSelector(state => state.user)
//     const dispatch = useDispatch()
//     // console.log(currentUser.firstname)

//     useEffect(() => {
//         if (image) {
//             handleFileUpload(image)
//         }
//     }, [image])
//     const handleFileUpload = async (image) => {
//         const storage = getStorage(app)
//         const fileName = new Date().getTime() + image.name;
//         const storageRef = ref(storage, fileName)
//         const uploadTask = uploadBytesResumable(storageRef, image)
//         uploadTask.on(
//             'state_changed',
//             (snapshot) => {
//                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                 // console.log('Upload is ' + progress + '% done');
//                 setImagePercent(Math.round(progress))
//             },
//             (error) => {
//                 setImageError(true)
//             },
//             () => {
//                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
//                     setformData({ ...formData, profilePicture: downloadURL })
//                 )
//             }
//         );
//     }

//     const handleChange = (e) => {
//         setformData({ ...formData, [e.target.name]: e.target.value })
//     }
//     console.log(formData)


//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         try {
//             console.log("button clicked")
//             dispatch(updateUserStart())
//             const res = await fetch(`/api/user/update/${currentUser._id}`, {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(formData)
//             })
//             const data = await res.json()
//             if (data.success === false) {
//                 dispatch(updateUserFailure())
//                 return;
//             }
//             dispatch(updateUserSuccess(data))
//             setUpdateSuccess(true)
//             console.log(data)
//         } catch (error) {
//             dispatch(updateUserFailure(error))
//         }
//     }

//     const handleDeleteAccount = async () => {
//         console.log(currentUser)
//         try {
//             dispatch(deleteUserStart())
//             const res = await fetch(`/api/user/delete/${currentUser._id}`, {
//                 method: 'DELETE',
//             })
//             const data = await res.json()
//             if (data.success === false) {
//                 dispatch(deleteUserFailure())
//                 return;
//             }
//             dispatch(deleteUserSuccess(data))
//             navigate('/')
//         } catch (error) {
//             dispatch(deleteUserFailure(error))
//         }

//     }
//     const handlelogout = async () => {
//         try {
//             await fetch('/api/auth/logout');
//             dispatch(logout())
//             navigate('/'); 
//         } catch (error) {
//             console.log(error)
//         }
//     }



//     return (
//         <div className='p-3 max-w-lg mx-auto'>
//             <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
//             <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

//                 <input type="file" ref={fileRef} hidden accept='image/*' onChange={(e) => setImage(e.target.files[0])} />

//                 <img className='h-24 w-24 rounded-full object-cover self-center cursor-pointer mt-2'
//                     src={formData.profilePicture || currentUser.profilePicture} alt="profilePicture" onClick={() => fileRef.current.click()} />

//                 <p className='text-sm self-center'>
//                     {
//                         imageError ? <span className="text-red-600">Error uploading image</span> :
//                             imagePercent > 0 && imagePercent < 100 ? <span className="text-green-600">Uploading {imagePercent}%</span> : <span className="text-green-600">Image Uploaded successfully!!</span>
//                     }
//                 </p>

//                 {/* <input defaultValue={currentUser.firstname} type="text" name="username" id="username" placeholder='Username' className='bg-slate-100 rounded-lg p-3' onChange={handleChange} />

//                 <input defaultValue={currentUser.lastname} type="text" name="lastname" id="lastname" placeholder='lastname' className='bg-slate-100 rounded-lg p-3' onChange={handleChange} /> */}

//                 <input defaultValue={currentUser.email} type="text" name="email" id="email" placeholder='Email' className='bg-slate-100 rounded-lg p-3' onChange={handleChange} />

//                 <input type="text" name="password" id="password" placeholder='Password' className='bg-slate-100 rounded-lg p-3' onChange={handleChange} />

//                 <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80 '>
//                     {loading ? "Loading..." : "Update"}
//                 </button>
//             </form>

//             <div className='flex justify-between mt-5'>
//                 <span onClick={handleDeleteAccount} className='text-red-700 cursor-pointer'>Delete Account</span>
//                 <span onClick={handlelogout} className='text-red-700 cursor-pointer'>Sign out</span>
//             </div>

//             <p className='text-red-700 mt-5'>{error && "Something went wrong!"}</p>
//             <p className='text-green-700 mt-5'>{updateSuccess && "User updated successfully!"}</p>
//         </div>
//     )
// }
