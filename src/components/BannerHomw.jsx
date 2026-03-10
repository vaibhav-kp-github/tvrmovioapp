import React, { useState , useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const BannerHomw = () => {

    const bannerData = useSelector((state) => state.movieData.bannerdata);
    const imageUrl = useSelector((state) => state.movieData.imageUrl);
    const [currentimage , setCurrentimage] = useState(0);

    // console.log("banner data", bannerData);

    const handleNext = () => {  
        if (currentimage < bannerData.length - 1) {
          setCurrentimage((preve) => preve + 1);
        }
    };
    
    const handlePrev = () => {
        if (currentimage > 0) {
          setCurrentimage((preve) => preve - 1);
        }
    };

    useEffect(() => {
        if (!bannerData.length) return;

        const interval = setInterval(() => {
          setCurrentimage((preve) => (preve === bannerData.length - 1 ? 0 : preve + 1));
        }, 2000);
        return () => clearInterval(interval);
    }, [bannerData, imageUrl , currentimage]);
    

  return (

    <section className='w-full h-full'>
        <div className='flex min-h-full max-h-[95vh] overflow-hidden'>
            {
                bannerData.map(  (data , index) => {
                    // console.log("data" , data.title);
                    
                    return (
                      <div key={data.id + "bannerhome" + index} className="min-w-full min-h-112.5 lg:min-h-full overflow-hidden relative group transition-all" style={{transform : `translateX(-${currentimage * 100}%)`}} >
                        <div className="w-full h-full">
                          <img
                            src={imageUrl + data.backdrop_path}
                            className="w-full h-full object-cover"
                            alt=""
                            
                          />
                        </div>

                        {/* buttons for next and previous images */}

                        <div className="absolute w-full h-full top-0 px-2 group-hover:flex hidden items-center justify-between ">
                          <button onClick={handlePrev} className="bg-white rounded-full p-1 text-xl z-10 text-black">
                            <FaAngleLeft />
                          </button>
                          <button onClick={handleNext} className="bg-white rounded-full p-1 text-xl z-10 text-black">
                            <FaAngleRight />
                          </button>
                        </div>

                        <div className="absolute top-0 w-full h-full bg-linear-to-t from-neutral-900 to-transparent"></div>

                        <div className=" container mx-auto">
                          <div className="container mx-auto absolute bottom-0 max-w-md px-3">
                            <h2 className="text-white text-2xl md:text-5xl font-bold drop-shadow-2xl">
                              {data.title || data.name}
                            </h2>
                            <p className="text-ellipsis line-clamp-3 my-2">
                              {data.overview}
                            </p>
                            <div className=" flex items-center gap-5">
                              <p>
                                Rating : {Number(data.vote_average).toFixed(1)}{" "}
                                +
                              </p>
                              <span>|</span>
                              <p>View : {Number(data.popularity).toFixed(1)}</p>
                            </div>

                            <button className="bg-white hover:bg-linear-to-r from-red-700 to-orange-500 shadow-md  transition-all hover:scale-105  px-4 py-2 text-black font-bold rounded mt-2">
                              Play Now
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                })
            }
        </div>

    </section>
  )
}

export default BannerHomw
