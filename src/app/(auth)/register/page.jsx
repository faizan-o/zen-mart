"use client"

import Image from "next/image"
import { AuthImage } from "../../../../public/export"
import { FcGoogle } from 'react-icons/fc'
import Link from "next/link"
import { useState } from "react"
import { Notification } from '../../../components/export'

const RegisterPage = () => {

  const [loading, setLoading] = useState(false);
  const [accountData, setAccountData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [error, setError] = useState({
    isError: false,
    errorMessage: '',
  });

  const handleChange = (e) => {
    setAccountData(
      prevData => ({
        ...prevData,
        [e.target.name] : e.target.value,
      })
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!accountData.name || !accountData.email || !accountData.password){
      setError({isError: true, errorMessage: 'Please Enter All Required Credentials '});
      setTimeout(() => setError({ isError: false, errorMessage: '' }), 2000);
      return;
    }
    try{
      setLoading(true);
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(accountData),
      })
      if(res.ok){
        setError({isError: false, errorMessage: ''});
        window.location.href = '/login'; // Use window.location.href for redirection
      }
      else {
        const errorData =  await res.json();
        setError({isError: true, errorMessage: errorData.message});
        setTimeout(() => setError({ isError: false, errorMessage: '' }), 2000);
      }
      setLoading(false);
    }catch(error){
      setLoading(false);
      const errorMessage = error.message;
      setError({isError: true, errorMessage: errorMessage})
      setTimeout(() => setError({ isError: false, errorMessage: '' }), 2000);
    }
  }

  return (
    <div className="">
        {
          error.isError ? <Notification heading='OOPS' message={error.errorMessage}/> : ''
        }
        <div className="mt-10 mb-10 w-[95%] mx-auto flex flex-col-reverse md:flex-row justify-around">
          <div className="mt-10 md:mt-0">
            <Image src={AuthImage} className="md:w-[30rem]" alt="AuthImage"/>
          </div>
          <div className="">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <h1 className="poppins-semibold text-3xl ml-2 sm:text-4xl md:ml-0 text-left">Create An Account</h1>
                <h2 className="poppins-semibold text-gray-400 ml-3 md:ml-1 text-[14px]">Enter Your Credentials Below</h2>
              </div>
              <div className="flex flex-col space-y-10">
                <input type="text" name="name" value={accountData.name} onChange={handleChange} placeholder="Your Name" className="py-2 px-1 poppins-semibold outline-none border-b-2 border-black"/>
                <input type="email" name="email" value={accountData.email} onChange={handleChange} placeholder="Your Email" className="py-2 px-1 poppins-semibold outline-none border-b-2 border-black"/>
                <input type="password" name="password" value={accountData.password} onChange={handleChange} placeholder="Your Password" className="py-2 px-1 poppins-semibold outline-none border-b-2 border-black"/>
              </div>
              <button className="bg-[#DB4444] w-full py-2 poppins-semibold text-white" type="submit">Create Account</button>
              {
                loading && <div className="flex items-center justify-around">
                  <h1 className="poppins-semibold">Creating Your Account</h1>
                  <div className="h-5 w-5 border-t-2 border-b-2 border-l-2 border-gray-400 rounded-full animate-spin"/>
                </div>
              }
              {/* <button className="w-full py-2 flex justify-center items-center space-x-2 border-black border-2">
                <FcGoogle className=""/>
                <h1 className="text-black poppins-semibold">Sign Up With Google</h1>
              </button> */}
              <p className="poppins-semibold text-gray-500 text-[14px] text-center">Already have An Account?     <Link href='/login' className="text-blue-900 poppins-bold underline underline-offset-4 decoration-blue-800 decoration-2">Sign Up</Link></p>
            </form>
          </div>
        </div>
    </div>
  )
}

export default RegisterPage

