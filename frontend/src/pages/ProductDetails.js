import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar, FaStarHalf } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayCurrency';
import CategroyWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  })
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage, setActiveImage] = useState("")
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 })
  const [zoomImage, setZoomImage] = useState(false)

  const { fetchUserAddToCart } = useContext(Context)
  const navigate = useNavigate()

  const fetchProductDetails = async () => {
    setLoading(true)
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ productId: params?.id })
    })
    setLoading(false)
    const dataResponse = await response.json()
    setData(dataResponse?.data)
    setActiveImage(dataResponse?.data?.productImage[0])
  }

  useEffect(() => {
    fetchProductDetails()
  }, [params])

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL)
  }

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true)
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height
    setZoomImageCoordinate({ x, y })
  }, [])

  const handleLeaveImageZoom = () => {
    setZoomImage(false)
  }

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id)
    fetchUserAddToCart()
  }

  /** * ENHANCEMENT: Direct Checkout Flow
   * Instead of just going to cart, we trigger the add and then 
   * navigate to a specific checkout page for immediate payment.
   */
  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id)
    fetchUserAddToCart()
    // In the next step, we will create the "/checkout" route and page
    navigate("/checkout") 
  }

  return (
    <div className='container mx-auto p-4'>
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/* Product Image Section */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
            <img 
              src={activeImage} 
              alt={data?.productName}
              className='h-full w-full object-scale-down mix-blend-multiply' 
              onMouseMove={handleZoomImage} 
              onMouseLeave={handleLeaveImageZoom} 
            />
            {zoomImage && (
              <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0 shadow-lg z-10'>
                <div
                  className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
                  style={{
                    background: `url(${activeImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                  }}
                />
              </div>
            )}
          </div>

          <div className='h-full'>
            <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
              {loading ? (
                productImageListLoading.map((_, index) => (
                  <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loading" + index} />
                ))
              ) : (
                data?.productImage?.map((imgURL) => (
                  <div className='h-20 w-20 bg-slate-200 rounded p-1 shadow-sm' key={imgURL}>
                    <img 
                      src={imgURL} 
                      alt="thumbnail"
                      className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer hover:scale-110 transition-all' 
                      onMouseEnter={() => handleMouseEnterProduct(imgURL)} 
                      onClick={() => handleMouseEnterProduct(imgURL)} 
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className='flex flex-col gap-2 w-full'>
          {loading ? (
            <div className='grid gap-2 w-full'>
              <p className='bg-slate-200 animate-pulse h-6 w-24 rounded-full'></p>
              <h2 className='h-10 bg-slate-200 animate-pulse w-full'></h2>
              <p className='bg-slate-200 animate-pulse h-6 w-32'></p>
              <div className='flex gap-3 my-2'>
                <div className='h-10 bg-slate-200 w-32 rounded animate-pulse'></div>
                <div className='h-10 bg-slate-200 w-32 rounded animate-pulse'></div>
              </div>
            </div>
          ) : (
            <>
              <p className='bg-red-100 text-red-600 px-3 py-1 rounded-full inline-block w-fit font-semibold text-sm uppercase tracking-wider'>{data?.brandName}</p>
              <h2 className='text-2xl lg:text-4xl font-bold text-slate-800'>{data?.productName}</h2>
              <p className='capitalize text-slate-500 font-medium'>{data?.category}</p>

              <div className='text-yellow-500 flex items-center gap-1 text-lg'>
                <FaStar/><FaStar/><FaStar/><FaStar/><FaStarHalf/>
                <span className='text-slate-400 text-sm ml-2'>(120+ Reviews)</span>
              </div>

              <div className='flex items-center gap-4 text-2xl lg:text-3xl font-bold my-2'>
                <p className='text-red-600'>{displayINRCurrency(data.sellingPrice)}</p>
                <p className='text-slate-400 line-through text-xl'>{displayINRCurrency(data.price)}</p>
              </div>

              <div className='flex items-center gap-4 my-4'>
                <button 
                  className='border-2 border-red-600 rounded-lg px-6 py-2 min-w-[150px] text-red-600 font-bold hover:bg-red-600 hover:text-white transition-all shadow-md' 
                  onClick={(e) => handleBuyProduct(e, data?._id)}
                >
                  Buy Now
                </button>
                <button 
                  className='border-2 border-red-600 rounded-lg px-6 py-2 min-w-[150px] font-bold text-white bg-red-600 hover:bg-white hover:text-red-600 transition-all shadow-md' 
                  onClick={(e) => handleAddToCart(e, data?._id)}
                >
                  Add To Cart
                </button>
              </div>

              <div className='mt-4 border-t pt-4'>
                <p className='text-slate-800 font-bold text-lg mb-2'>Product Description</p>
                <p className='text-slate-600 leading-relaxed text-justify'>{data?.description}</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* AI ENHANCEMENT: Intelligent Recommendation Section */}
      {data.category && (
        <div className='mt-12'>
          <h3 className='text-2xl font-bold mb-6 text-slate-800 border-l-4 border-red-600 pl-4'>
            Recommended for You (AI Choice)
          </h3>
          <CategroyWiseProductDisplay category={data?.category} heading={""}/>
        </div>
      )}
    </div>
  )
}

export default ProductDetails