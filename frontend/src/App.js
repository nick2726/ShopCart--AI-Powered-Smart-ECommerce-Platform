import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState, useCallback } from 'react'; // Added useCallback
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

// --- STRIPE IMPORTS ---
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Note: App.css import removed to fix "Module not found" error
const stripePromise = loadStripe("pk_test_51S5spa1LJrvS9bDYck3RA3I07O3vRxH8wXgIBzT01B13z7B0vHpTBwgYnqPBGF7eKBkF8ICOy290O4JB0eM2syHC00NsaAPo62");

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  // Memoizing functions to fix ESLint dependency warnings
  const fetchUserDetails = useCallback(async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include'
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  }, [dispatch]);

  const fetchUserAddToCart = useCallback(async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: 'include'
    });
    const dataApi = await dataResponse.json();
    setCartProductCount(dataApi?.data?.count);
  }, []);

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, [fetchUserDetails, fetchUserAddToCart]);

  return (
    <>
      <Context.Provider value={{
        fetchUserDetails,
        cartProductCount,
        fetchUserAddToCart
      }}>
        <Elements stripe={stripePromise}>
          <ToastContainer position='top-center' />

          <Header />
          {/* Main area where semantic search results will render via Outlet */}
          <main className='min-h-[calc(100vh-120px)] pt-16'>
            <Outlet />
          </main>
          <Footer />
        </Elements>
      </Context.Provider>
    </>
  );
}

export default App;