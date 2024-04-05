const Notification = ({heading, message, crosssIcon}) => {

  return (
    <div className={`bg-red-400 relative w-full flex py-2 px-2 space-x-2 items-center`}>
        <h1 className='poppins-semibold'>{heading}</h1>
        <p className='poppins-regular text-[14px]'>{message}</p>
    </div>
  )
}

export default Notification