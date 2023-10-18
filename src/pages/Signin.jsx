import React from 'react';
import signinPhoto from '../assets/signin-photo.png';
import logo from '../assets/logo.png';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/setup';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const navigate = useNavigate();

  const googleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      auth.currentUser && navigate('/');
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="grid grid-cols-2 bg-black h-screen">
      <div className="flex flex-col items-center text-center mt-20 gap-4">
        <img src={logo} alt="logo" className='h-20 w-fit'/>
        <h1 className='text-white font-bold text-3xl'>Sign In</h1>
        <button onClick={googleSignIn} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-24 rounded">
          Sign in
        </button>
        <h2 className='text-blue-400 underline'>Sign in Now</h2>
      </div>
      <img src={signinPhoto} alt="signin photo" className='h-screen'/>
    </div>
  )
}

export default Signin