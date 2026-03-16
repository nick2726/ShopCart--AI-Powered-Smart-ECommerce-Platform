import React from 'react'
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
    <div className='bg-slate-100 min-h-[calc(100vh-120px)] flex justify-center items-center p-4'>
        <div className='bg-white w-full max-w-md m-auto flex justify-center items-center flex-col p-8 rounded shadow-lg'>
            <div className='text-red-600 text-6xl mb-4'>
                <i className="fa-solid fa-circle-xmark"></i>
            </div>
            <h2 className='text-2xl font-bold text-slate-800'>Payment Cancelled</h2>
            <p className='text-slate-500 text-center mt-2'>Something went wrong with the transaction. Please try again later.</p>
            <Link to={"/cart"} className='p-2 px-6 mt-10 border-2 border-red-600 rounded-full text-red-600 font-bold hover:bg-red-600 hover:text-white transition-all'>Go to Cart</Link>
        </div>
    </div>
  )
}

export default Cancel