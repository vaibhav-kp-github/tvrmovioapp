import React , { useEffect, useState } from 'react'
import { HelmetProvider } from "react-helmet-async";
import BannerHomw from '../components/BannerHomw'
import { useSelector } from 'react-redux'
import HorizontalCardScroll from '../components/HorizontalCardScroll'
import useFetch from '../hooks/useFetch'


const Home = () => {
  const trendingData = useSelector((state) => state.movieData.bannerdata);
  // console.log(trendingData);
  
  const { data : nowPlayingData} = useFetch("/movie/now_playing");
  const { data: topRateShowsData } = useFetch("/tv/top_rated");
  const { data : popularMoviesData} = useFetch("/movie/popular");
  const { data : popularShowsData} = useFetch("/tv/popular");
  return (
    <>
      <HelmetProvider>
        <title>Home | Movie App</title>
        <meta name="description" content="Discover trending movies, now playing, top rated shows, and more on Movie App." />
      </HelmetProvider>
      <div>
      <BannerHomw />

      <HorizontalCardScroll data={trendingData} heading={"Trending "} trending={true}/>
      <HorizontalCardScroll data={nowPlayingData} heading={"Now Playing "} media_type={"movie"} />
      <HorizontalCardScroll data={topRateShowsData} heading={"Top Rated Shows "} media_type={"tv"} />
      <HorizontalCardScroll data={popularMoviesData} heading={"Popular Movies"} media_type={"movie"} />
      <HorizontalCardScroll data={popularShowsData} heading={"Popular Shows "} media_type={"tv"} />
    </div>
    </>
  );
}

export default Home
