import axios from 'axios';
import { useEffect, useState } from 'react';
import { HelmetProvider } from "react-helmet-async";
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../components/Card';

const SearchPages = () => {
  const location = useLocation();
  // console.log("location", location.search.slice(3) );

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const navigate  = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get(`/search/multi`, {
        params: {
          query: location?.search.slice(3),
          page: page,
        },
      });
      setData(response.data.results);
      console.log("responce", response.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  
  useEffect(() => {
    
    if (location?.search.slice(3)) {
      setPage(1);
      setData([]); // reset data on new search
      fetchData();
    }
  }, [location?.search]);


  const handlescroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      setPage((preve) => preve + 1);
  }}

  useEffect(() => {
      fetchData();
    }, [page]);


  useEffect(() => {
       window.addEventListener("scroll" , handlescroll);
    },[]);
  return (
    <>
      <HelmetProvider >
        <title>Search Results | Movie App</title>
        <meta name="description" content="Search for movies and shows on Movie App. Find your favorites instantly." />
      </HelmetProvider>
    <div className="py-16">
      <div className=" w-full lg:hidden py-3 text-center px-5 sticky top-16 z-30">
        <input 
          className='border p-3 w-full rounded-full bg-neutral-800 text-white outline-none'
          type="text"
          placeholder="Search......"
          onChange={ (e) => navigate(`/search?q=${e.target.value}`) }
        />
      </div>
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl font-semibold my-3">
          Search Result
        </h3>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] justify-items-center  sm:justify-items-start gap-6">
          {data.map((searchData, index) => {
            return (
              <Card
                key={searchData.id + "searchData" + index}
                data={searchData}
                media_type={searchData.media_type}
              />
            );
          })}
        </div>
      </div>
    </div>
  </>
  );
}

export default SearchPages
