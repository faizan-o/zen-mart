import React from 'react'
import { FaHeart, FaTrash } from 'react-icons/fa'
import Link from 'next/link'

const LoadingProducts = () => {
    const PRODUCT = () => {
        return (
            <div className={`flex flex-col justify-between mt-10 h-80 relative overflow-hidden`}>
              <div className='w-36 md:w-48 h-80 bg-blue-400 rounded-md animate-pulse' />
              <h1 className='animate-pulse w-20 mt-[10px]bg-blue-400 rounded-md h-4' />
              <h2 className='animate-pulse w-20 mt-[10px] bg-blue-400 rounded-md h-4' />
              <button className='animate-pulse w-28 h-10 bg-blue-400 rounded-md mt-2' />
            </div>
        )
    }
    
    return (
        <div >
          <div className='ml-5'>
            <div className='animate-pulse w-40 h-10 bg-blue-400 rounded-md' />
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