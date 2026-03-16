import React, { useContext, useEffect, useState } from 'react'
import Context from '../context'
import displayINRCurrency from '../helpers/displayCurrency'
import SummaryApi from '../common' // Ensure you import your API list
import { toast } from 'react-toastify'

const Checkout = () => {
    // We need cartProduct to send to the backend
    const { cartProduct } = useContext(Context)
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQty, setTotalQty] = useState(0)

    useEffect(() => {
        const qty = cartProduct.reduce((prev, curr) => prev + curr.quantity, 0)
        const price = cartProduct.reduce((prev, curr) => prev + (curr.quantity * curr?.productId?.sellingPrice), 0)
        setTotalQty(qty)
        setTotalPrice(price)
    }, [cartProduct])

    // --- UPDATED LOGIC ---
    const handlePayment = async () => {
        try {
            toast.loading("Redirecting to Stripe...")

            const response = await fetch(`${SummaryApi.common.url}/checkout`, {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                // We send the cartProduct array so the backend knows what to charge for
                body: JSON.stringify({
                    cartItems: cartProduct
                })
            });

            const dataResponse = await response.json();

            if (dataResponse.url) {
                // This is the magic line that sends the user to Stripe's website
                window.location.href = dataResponse.url;
            } else {
                toast.error("Failed to create payment session.");
            }
        } catch (error) {
            console.error("Payment Error:", error);
            toast.error("Something went wrong!");
        }
    }

    return (
        <div className='container mx-auto p-4 flex flex-col lg:flex-row gap-10'>
            {/* Left Side: Order Summary */}
            <div className='w-full lg:w-2/3'>
                <h2 className='text-2xl font-bold mb-6 border-b pb-2 text-slate-800'>Order Summary</h2>
                <div className='flex flex-col gap-4'>
                    {
                        cartProduct.length > 0 ? (
                            cartProduct.map((product, index) => (
                                <div key={product?._id + index} className='flex gap-4 bg-white p-3 rounded shadow-sm border hover:shadow-md transition-all'>
                                    <img src={product?.productId?.productImage[0]} className='w-24 h-24 object-scale-down bg-slate-100 rounded' alt="product"/>
                                    <div className='flex flex-col justify-between w-full'>
                                        <div>
                                            <h3 className='font-bold text-lg text-slate-700 line-clamp-1'>{product?.productId?.productName}</h3>
                                            <p className='text-slate-500 text-sm capitalize'>{product?.productId?.category}</p>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <p className='text-slate-600 font-medium'>Qty: <span className='text-slate-900'>{product?.quantity}</span></p>
                                            <p className='font-bold text-red-600 text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='bg-slate-100 p-10 text-center rounded'>
                                <p className='text-slate-500'>Your checkout is empty.</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* Right Side: Payment Details */}
            <div className='w-full lg:w-1/3'>
                <div className='bg-white p-6 rounded-xl shadow-lg border border-slate-100 sticky top-24'>
                    <h2 className='text-xl font-bold mb-4 text-slate-800'>Payment Details</h2>
                    <div className='flex flex-col gap-3 border-b border-dashed pb-4'>
                        <div className='flex justify-between text-slate-600 font-medium'>
                            <span>Total Quantity</span>
                            <span>{totalQty}</span>
                        </div>
                        <div className='flex justify-between text-slate-600 font-medium'>
                            <span>Shipping</span>
                            <span className='text-green-600 font-bold'>FREE</span>
                        </div>
                    </div>
                    <div className='flex justify-between text-2xl font-black my-6 text-slate-900'>
                        <span>Total Amount</span>
                        <span>{displayINRCurrency(totalPrice)}</span>
                    </div>

                    <button 
                        onClick={handlePayment}
                        disabled={cartProduct.length === 0}
                        className='w-full bg-red-600 text-white py-4 rounded-xl font-black text-lg hover:bg-red-700 active:scale-95 transition-all shadow-xl disabled:bg-slate-300 disabled:cursor-not-allowed'
                    >
                        {cartProduct.length === 0 ? "Cart is Empty" : "Proceed to Pay"}
                    </button>

                    <div className='mt-8 flex flex-col items-center gap-3'>
                        <div className='flex items-center gap-2 text-slate-400 text-xs uppercase tracking-widest font-bold'>
                            <span className='w-4 h-[1px] bg-slate-200'></span>
                            Secure Checkout
                            <span className='w-4 h-[1px] bg-slate-200'></span>
                        </div>
                        <p className='text-[10px] text-slate-400 text-center px-4'>
                            By proceeding, you agree to our Terms of Service. Your data is encrypted via SSL.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout