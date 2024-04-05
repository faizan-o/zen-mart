"use client"

import { useState } from 'react'
import { FaEnvelope, FaPersonBooth } from 'react-icons/fa'

const ContactPage = () => {
  
  const [contactData, setContactData] = useState({
    email: '',
    name: '',
    message: '',
  })

  const handleChange = (e) => {
    setContactData(prevData => ({
      ...prevData,
      [e.target.name] : e.target.value
    }
    ))
  }

  return (
    <div className='w-[95%] mx-auto'>
      <h1 className='text-[#DB4444] poppins-bold text-4xl mt-10'>Contact US</h1>
      <div className='flex mt-10 flex-col-reverse lg:flex-row'>
        <div className='w-full flex flex-col mb-20 lg:mb-0 lg:justify-around space-y-20 lg:w-[50%]'>
          <div>
            <div className='flex items-center space-x-5'>
              <div className='bg-[#DB4444] text-white w-fit px-3 py-3 rounded-full'>
                <FaEnvelope />
              </div>
              <h1 className='poppins-bold text-3xl'>Contact On Email</h1>
            </div>
            <h2 className='poppins-semibold text-gray-400 text-[12px] ml-5 mt-2'>We Are Available 24/7 On Email.</h2>
            <h3 className='poppins-semibold text-gray-400 text-[12px] ml-5 mt-2'>Email Us On: roocking.prince@gmail.com</h3>
          </div>
          <div >
            <div className='flex items-center space-x-5'>
              <div className='bg-[#DB4444] text-white w-fit px-3 py-3 rounded-full'>
                <FaPersonBooth />
              </div>
              <h1 className='poppins-bold text-3xl'>Contact On Phone</h1>
            </div>
            <h2 className='poppins-semibold text-gray-400 text-[12px] ml-5 mt-2'>We Are Available 24/7 On Phone.</h2>
            <h3 className='poppins-semibold text-gray-400 text-[12px] ml-5 mt-2'>Call Us On: +555-123-4567</h3>
          </div>
        </div>
        <div className='lg:w-[50%]'>
          <div className='flex justify-between'>
          <input type="text" name='name' value={contactData.name} onChange={handleChange} placeholder="Your Name" className='w-[40%] bg-gray-200 outline-none px-2 py-1 poppins-semibold'/>
          <input type="email" placeholder="Your Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" name='email' value={contactData.email} onChange={handleChange}  className='w-[40%] bg-gray-200 outline-none px-2 py-1 poppins-semibold'/>
          </div>
          <textarea placeholder="Your Message" name='message' value={contactData.message} onChange={handleChange} className='w-full resize-none mt-5 h-[200px] bg-gray-200 outline-none px-2 py-2 poppins-semibold'/>
          <button className='poppins-semibold text-white bg-[#DB4444] px-2 py-1 mb-10 rounded-md'>Send Message</button>
        </div>
      </div>
    </div>
  )
}

export default ContactPage