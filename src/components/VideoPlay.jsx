import React from 'react'
import { IoMdClose } from "react-icons/io";
import useFetchDetail from '../hooks/useFetchDetail';


const VideoPlay = ({data , closeVideo , media_type}) => {
  const {data : videoData} = useFetchDetail(`/${media_type}/${data?.id}/videos`);
  const videoKey = videoData?.results?.[0]?.key;
  // console.log("videodata" , videoData);
  

  return (
    <section className="fixed top-0 bg-neutral-700/60 z-40 h-full w-full flex items-center justify-center">
      <div className="w-full max-w-5xl aspect-video max-h-[80vh] bg-black rounded relative">
        <button
          onClick={closeVideo}
          className="absolute hover:scale-105 cursor-pointer -top-6 right-2 text-white text-2xl z-50"
        >
          <IoMdClose />
        </button>
        <iframe src={`https://www.youtube.com/embed/${videoKey}`} className='w-full h-full' frameborder="0"/>
      </div>
    </section>
  );
}

export default VideoPlay

