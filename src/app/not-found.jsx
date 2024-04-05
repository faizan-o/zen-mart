"use client"

import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="h-[62vh] flex flex-col justify-center items-center">
      <h1 className="poppins-bold text-[400%] text-center mt-5">404 NOT FOUND</h1>
      <p className="poppins-regular text-gray-600 text-[12px]">The Page You Requested Was Not Found. You May Go To Home.</p>
      <Link href={'/'}>
        <h2 className='bg-[#DB4444] poppins-semibold px-2 py-1 text-white rounded-md mt-3'>Back To Home Page</h2>
      </Link>
    </div>
  )
}

export default NotFound