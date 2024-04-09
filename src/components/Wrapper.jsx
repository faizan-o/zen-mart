"use client"

import NextNProgress from 'nextjs-progressbar';
import Navbar from './Navbar';
import Footer from './Footer';


const Wrapper = ({children}) => {
  return (
    <>
        <NextNProgress color="red" startPosition={0} stopDelayMs={0} height={3} showOnShallow={true}/>
        <Navbar />
            {children}
        <Footer />
    </>
  )
}

export default Wrapper