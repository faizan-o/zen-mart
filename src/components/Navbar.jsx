"use client"

import React, { useEffect } from 'react';
import Link from 'next/link';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { FaAlignJustify } from 'react-icons/fa';
import { useState } from 'react';
import { FaHome, FaInfoCircle, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';
import { getSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

const Navbar = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    const toggleMenu = () => {
        setMenuIsOpen((prevMenuState) => !prevMenuState);
    };

    useEffect(
        () => {
            const getLoginState = async () => {
                const session = await getSession();
                if (session){
                    if (session.user) {
                        setIsLoggedIn(true);
                        return;
                    }
                    else setIsLoggedIn(false);
                }
            }
            getLoginState();
        }, []
    )

    const handleLogout = async (e) => {
        await signOut({callbackUrl: 'zen-mart.netlify.app'}); 
        setIsLoggedIn(false);
    };

    const Menu = ({ isOpen }) => {
        return (
            <div>
                {isOpen && (
                    <div className='absolute right-0 bg-white shadow-lg border-2'>
                        <div>
                            <div>
                                <ul className='text-2xl text-white space-y-5 py-2 px-10 flex flex-col text-center'>
                                    <Link href='/'>
                                        <div className='mt-10 px-3 flex items-center space-x-4'>
                                            <div className='text-black text-[12px]'><FaHome /></div>
                                            <h1 className='poppins-semibold text-[14px] text-black'>Home</h1>
                                        </div>
                                    </Link>
                                    <Link href='/about'>
                                        <div className='px-3 flex items-center space-x-4'>
                                            <div className='text-black text-[12px]'><FaInfoCircle /></div>
                                            <h1 className='poppins-semibold text-[14px] text-black'>About</h1>
                                        </div>
                                    </Link>
                                    <Link href='/contact'>
                                        <div className='px-3 flex items-center space-x-4'>
                                            <div className='text-black text-[12px]'><FaEnvelope /></div>
                                            <h1 className='poppins-semibold text-[14px] text-black'>Contact</h1>
                                        </div>
                                    </Link>
                                    <div className='px-3 flex items-center space-x-4' onClick={handleLogout}>
                                        <div className='text-black text-[12px]'><FaSignOutAlt /></div>
                                        <h1 className='poppins-semibold text-[14px] text-black'>Log Out</h1>
                                    </div>
                                    <div className='absolute top-2 right-2' onClick={toggleMenu}>
                                        <div className='bg-black h-[2px] w-3 rotate-45 relative -top-[12px] ' />
                                        <div className='bg-black h-[2px] w-3 -rotate-45 relative -top-[13.6px] ' />
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <header className='shadow-md'>
            <div className='bg-black poppins-regular text-gray-300 text-[9px] text-center py-1 px-4'>
                <h1>Exclusive Winter Sale - 50% OFF - <span className='text-white'>Shop Now</span></h1>
            </div>
            <div className='flex py-5 items-center justify-around'>
                <div>
                    <h1 className='text-black poppins-bold text-2xl sm:text-4xl py-2'>ZenMart</h1>
                </div>
                <div className='hidden sm:block'>
                    <div className='flex poppins-semibold space-x-3 items-center'>
                        <Link href='/'>
                            <h1 className='text-black hover:underline decoration-gray-400 underline-offset-4 decoration-2'>
                                Home
                            </h1>
                        </Link>
                        <Link href='/about'>
                            <h1 className='text-black hover:underline decoration-gray-400 underline-offset-4 decoration-2'>
                                About
                            </h1>
                        </Link>
                        <Link href='/contact'>
                            <h1 className='text-black hover:underline decoration-gray-400 underline-offset-4 decoration-2'>
                                Contact
                            </h1>
                        </Link>
                    </div>
                </div>
                    {isLoggedIn ? (<div className='hidden sm:block'>
                        <div className='flex font-semibold space-x-5 items-center justify-center'>
                            <Link href='/wishlist'>
                                <h1 className='text-black text-2xl font-bold hover:text-gray-500  transition-[font-size] duration-[40ms]'>
                                    <FiHeart />
                                </h1>
                            </Link>
                            <Link href='/cart'>
                                <h1 className='text-black hover:text-gray-500 text-2xl font-bold transition-[font-size] duration-[40ms]'>        
                                        <FiShoppingCart />
                                </h1>
                            </Link>
                            <div className='flex justify-between items-center space-x-1 cursor-pointer' onClick={handleLogout}>
                                <div>
                                    <FaSignOutAlt />
                                </div>
                                <h1 className='poppins-semibold'>Log Out</h1>
                            </div>
                        </div>
                    </div>) : <Link href='/register'><button className='bg-[#DB4444] text-white px-2 py-1 poppins-semibold rounded-md hidden sm:block'>Register</button></Link>}

                <div className='sm:hidden flex items-center'>
                    {isLoggedIn ? (<div className='flex space-x-5 items-center justify-center'>
                        <div className='sm:hidden flex text-2xl space-x-3'>
                            <Link href='/wishlist'><FiHeart /></Link>
                            <Link href='/cart'><FiShoppingCart /></Link>
                            <div onClick={toggleMenu}>
                                <FaAlignJustify />
                            </div>
                        </div>
                    </div>) : <Link href='/register'><button className='bg-[#DB4444] text-white poppins-semibold py-1 px-4 rounded-md'>Register</button></Link>}
                </div>
            </div>
            <Menu isOpen={menuIsOpen} onClose={toggleMenu} />
        </header>
    );
};

export default Navbar;
