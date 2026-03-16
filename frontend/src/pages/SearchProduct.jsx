import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import VerticalCard from '../components/VerticalCard';

const SearchProduct = () => {
    // query.search contains the string "?q=yoursearch"
    const query = useLocation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchProduct = async () => {
        setLoading(true);
        try {
            // Forward the exact query string to your Node.js server (Port 8080)
            const response = await fetch(`http://localhost:8080/api/search${query.search}`);
            const dataResponse = await response.json();

            if (dataResponse.success) {
                setData(dataResponse.data);
            } else {
                setData([]);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    // Re-run the fetch whenever the URL query changes
    useEffect(() => {
        if (query.search) {
            fetchProduct();
        }
    }, [query]);

    return (
        <div className='container mx-auto p-4'>
            {loading && (
                <div className='flex flex-col items-center justify-center my-10'>
                    <div className='w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin'></div>
                    <p className='text-lg mt-4 text-gray-600'>Searching our inventory...</p>
                </div>
            )}

            {!loading && (
                <>
                    <p className='text-lg font-semibold my-3 text-gray-800'>
                        Search Results : {data.length}
                    </p>

                    {data.length === 0 ? (
                        <div className='bg-white shadow-sm rounded-md text-lg text-center p-10 border border-dashed border-gray-300'>
                            <p className='text-gray-500'>No products found matching your search.</p>
                        </div>
                    ) : (
                        // VerticalCard handles the product grid display
                        <VerticalCard loading={loading} data={data} />
                    )}
                </>
            )}
        </div>
    );
};

export default SearchProduct;