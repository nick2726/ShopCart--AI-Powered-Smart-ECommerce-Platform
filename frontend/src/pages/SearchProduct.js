import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalCard from '../components/VerticalCard'

const SearchProduct = () => {
    const query = useLocation()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    console.log("query", query.search)

    const fetchProduct = async () => {
        setLoading(true)
        try {
            const response = await fetch(SummaryApi.searchProduct.url + query.search)
            const dataResponse = await response.json()
            
            // SAFETY FIX 1: If dataResponse.data is undefined, fallback to an empty array []
            setData(dataResponse.data || []) 
        } catch (error) {
            console.error("Error fetching products:", error)
            setData([]) // Ensure data is an array even on network failure
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true)
            try {
                const response = await fetch(SummaryApi.searchProduct.url + query.search)
                const dataResponse = await response.json()
                setData(dataResponse.data || []) 
            } catch (error) {
                console.error("Error fetching products:", error)
                setData([]) 
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [query.search]) // <-- Changed this to query.search for better performance

  return (
    <div className='container mx-auto p-4'>
      {
        loading && (
          <p className='text-lg text-center'>Loading ...</p>
        )
      }

      {/* SAFETY FIX 2: Added optional chaining (?) to data?.length */}
      <p className='text-lg font-semibold my-3'>Search Results : {data?.length || 0}</p>

      {
        data?.length === 0 && !loading && (
           <p className='bg-white text-lg text-center p-4'>No Data Found....</p>
        )
      }

      {/* SAFETY FIX 3: Added optional chaining (?) to data?.length */}
      {
        data?.length !== 0 && !loading && (
          <VerticalCard loading={loading} data={data}/>
        )
      }

    </div>
  )
}

export default SearchProduct