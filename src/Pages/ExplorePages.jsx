import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { HelmetProvider } from "react-helmet-async";
import { useParams } from 'react-router-dom'
import Card from '../components/Card';

const ExplorePages = () => {
  const params = useParams();
  const [pageNumber , setPageNumber] = useState(1);
  const [data , setData] = useState([]);
  const [totalPageNumber , setTotalPageNumber] = useState(0);

  console.log("params", params.explore);

  const fetchData =async () => {
    try {
      const response = await axios.get(`/discover/${params.explore}`,{
        params : {
          page : pageNumber
        }
      })
      setData((preve) => {
        return [
          ...preve,
          ...response.data.results
        ];
      });
      setTotalPageNumber(response.data.total_pages);
      console.log("responce" , response.data.results);
    
    } catch (error) {
      console.log( "error" , error );
      
    }
  
  }

  const handlescroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      setPageNumber(preve => preve + 1);
  }}

  useEffect(() => {
    fetchData();
  }, [pageNumber]);

  useEffect(() => {
    setPageNumber(1);
    setData([]);
    fetchData();
    <>
      <HelmetProvider>
        <title>Explore {params.explore ? params.explore.charAt(0).toUpperCase() + params.explore.slice(1) : ''} | Movie App</title>
        <meta name="description" content={`Explore ${params.explore || ''} movies and shows on Movie App.`} />
      </HelmetProvider>
    </>
  }, [params.explore]);

  useEffect(() => {
     window.addEventListener("scroll" , handlescroll);
  },[]);


  return (
    <div className='pt-16'>
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl font-semibold my-3" >Popular {params.explore}</h3> 

        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-6">
          {
            data.map((exploreData , index) => {
              return (
                <Card key={exploreData.id + params.explore + index} data={exploreData} media_type={params.explore} />
                )
              }
            )
          }
        </div>

      </div>
    </div>
  )
}

export default ExplorePages
