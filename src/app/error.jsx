"use client"

import Link from "next/link" 

const ErrorBoundary = ({error}) => {
  return (
    <div className="flex flex-col justify-center items-center">
        <h1 className="poppins-bold text-4xl mt-40 text-center">Following Error Occured</h1>
        <p className="poppins-semibold text-[13px] mt-2">{error.message}</p>
        <Link href={'/'}>
            <p className="rounded-md bg-[#DB4444] poppins-semibold text-white px-2 py-1 mb-28 mt-6">Go To Home Page</p>
        </Link>
    </div>
  )
}

export default ErrorBoundary