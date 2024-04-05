import Link from 'next/link';
import React from 'react'
import { FiSend, FiFacebook, FiInstagram, FiTwitter, FiTwitch } from 'react-icons/fi';

const Footer = () => (
    <footer className='bottom-0 bg-gradient-to-b from-gray-950 to-black flex space-y-5 sm:space-y-0 sm:flex-row sm:justify-around flex-col text-white py-5 '>
        <div className='flex flex-col items-center sm:items-start space-y-3'>
            <h1 className='poppins-bold'>Zenmart</h1>
            <h2 className='poppins-regular text-gray-400 text-[12px]'>Subscribe</h2>
            <p className='poppins-regular text-gray-400 text-[12px]'>Get 10% Off On first Order</p>
            <div className='relative'>
                <input type="text" placeholder='Enter Your Email' className='rounded-lg px-[16px] py-1 text-[12px]' />
                <div className='text-black absolute right-1 top-[6px] cursor-pointer z-0'><FiSend /></div>
            </div>
        </div>
        <div className='flex flex-col items-center sm:items-start space-y-3'>
            <h1 className='poppins-bold'>Contacts</h1>
            <h2 className='poppins-regular text-gray-400 text-[12px]'>roocking.prince@gmail.com</h2>
            <h2 className='poppins-regular text-gray-400 text-[12px]'>+8888-9999-00000</h2>
        </div>
        <div className='flex flex-col items-center sm:items-start space-y-3'>
            <h1 className='poppins-bold'>My Account</h1>
            <h2 className='poppins-regular text-gray-400 text-[12px]'><Link href='/my-cart'>Cart</Link></h2>
            <h2 className='poppins-regular text-gray-400 text-[12px]'><Link href='/wishlist'>Wishlist</Link></h2>
            <h2 className='poppins-regular text-gray-400 text-[12px]'><Link href='/my-cart'>Orders</Link></h2>
        </div>
        <div className='flex flex-col items-center sm:items-start space-y-3'>
            <h1 className='poppins-bold'>Quick Links</h1>
            <h2 className='poppins-regular text-gray-400 text-[12px]'>Terms Of Use</h2>
            <h2 className='poppins-regular text-gray-400 text-[12px]'>Privacy Policy</h2>
            <h2 className='poppins-regular text-gray-400 text-[12px]'><Link href='/contact'>Contact Us</Link></h2>
        </div>
        <div className='flex flex-col items-center sm:items-start'>
            <h1 className='poppins-bold '>Follows Us On</h1>
            <div className='flex space-x-2 mt-1 text-[20px]'>
                <h2><FiFacebook /></h2>
                <h2><FiInstagram /></h2>
                <h2><FiTwitch /></h2>
                <h2><FiTwitter /></h2>
            </div>
        </div>
    </footer>
)

export default Footer