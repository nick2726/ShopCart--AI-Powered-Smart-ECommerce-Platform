import React from 'react'
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <div className='bg-slate-100 min-h-[calc(100vh-120px)] flex justify-center items-center p-4'>
        <div className='bg-white w-full max-w-md m-auto flex justify-center items-center flex-col p-8 rounded shadow-lg'>
            <div className='text-green-600 text-6xl mb-4'>
                <i className="fa-solid fa-circle-check"></i> 
            </div>
            <h2 className='text-2xl font-bold text-slate-800'>Payment Successful!</h2>
            <p className='text-slate-500 text-center mt-2'>Your order has been placed successfully. We will send you a confirmation email shortly.</p>
            <Link to={"/order"} className='p-2 px-6 mt-10 border-2 border-green-600 rounded-full text-green-600 font-bold hover:bg-green-600 hover:text-white transition-all'>View Order</Link>
        </div>
    </div>
  )
}

export default Success