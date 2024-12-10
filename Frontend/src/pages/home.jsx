import React from 'react'
import { Link } from 'react-router-dom'

const home = () => {
  return (
    <div>
        <div className='h-screen bg-cover bg-[url(https://images.stockcake.com/public/c/3/8/c38ff517-186f-4b32-877c-b39e3203f4c3_large/busy-urban-traffic-stockcake.jpg)] pt-8  flex justify-end flex-col w-full '>
          <div className='bg-white pb-10 py-4 px-4'>
            <h2 className='text-3xl font-bold'>Get started with HopOn</h2>
            <Link to="/login" className='flex items-center justify-center w-full bg-black text-white py-3 rounded-xl mt-5'>Continue</Link>
          </div>
        </div>


    </div>
  )
}

export default home