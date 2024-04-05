import React from 'react'
import { FaHeart, FaTrash } from 'react-icons/fa'
import Link from 'next/link'

const LoadingProducts = () => {
    const PRODUCT = () => {
        return (
            <div className={`flex flex-col justify-between mt-10 h-80 relative overflow-hidden`}>
              <div className='w-60 h-80 bg-gray-400 animate-pulse' />
              <h1 className='animate-pulse w-20 mt-[10px]bg-gray-400 h-4' />
              <h2 className='animate-pulse w-20 mt-[10px] bg-gray-400 h-4' />
              <button className='animate-pulse w-28 h-10 bg-gray-400 mt-2' />
              <div className="flex flex-col absolute right-0">
                {<button title="Add To Wishlist" className="text-white hover:text-white hover:bg-black bg-[#DB4444] px-2 py-2 rounded-full">
                  <FaHeart />
                </button>}
                {<button title="Remove From Wishlist" className=" text-white hover:text-white hover:bg-black bg-[#DB4444] px-2 py-2 rounded-full mt-1">
                  <FaTrash />
                </button>}
              </div>
            </div>
        )
    }
    
    return (
        <div >
          <div className='ml-5'>
            <div className='animate-pulse w-40 h-10 bg-gray-400' />
          </div>
          <div className='flex flex-wrap justify-around mb-10'>
            <PRODUCT />
            <PRODUCT />
            <PRODUCT />
            <PRODUCT />
          </div>
        </div>
    )

}

export default LoadingProducts