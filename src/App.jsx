import './App.css'
import Header from './components/Header'
import Footer from './Components/Footer'
import { Outlet } from 'react-router-dom'
import MobileNavigation from './components/MobileNavigation'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setBannerData , setImageUrl } from './store/movieSlice'

function App() {
  const dispatch = useDispatch();

  const fetchTrendingData = async () => {
    try {
      const response = await axios.get('/trending/all/week');

      dispatch(setBannerData(response.data.results));
      // console.log("Trending Data:", response.data.results);
    } catch (error) {
      console.error('Error fetching trending data:', error);
    }
  };

  const fetchConfiguration = async () => {
    try {
      const response = await axios.get('/configuration');

      dispatch(setImageUrl(response.data.images.secure_base_url + "original"));
      // console.log("Configuration Data:", response.data.images.secure_base_url + "original");
    } catch (error) {
      console.error('Error fetching configuration data:', error);
    }
  };

  useEffect(() => {
    fetchTrendingData();
    fetchConfiguration();
  }, []);
  
  return (
    <div>
      <Header />
      
      <div className="">
        <Outlet />
      </div>
      
      <Footer />
      <MobileNavigation/>
    </div>
  )
}

export default App
