import React , {useRef} from "react";
import Card from "./Card";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const HorizontalCardScroll = ({ data = [], heading , trending, media_type}) => {
    const containerRef = useRef();

    const handleNext = () => {
        containerRef.current.scrollLeft += 254; // Adjust the scroll amount as needed
    };

    const handlePrev = () => {
        containerRef.current.scrollLeft -= 254; // Adjust the scroll amount as needed
    };
  return (
    <div className="container mx-auto px-3 my-10">
      <h1 className="text-xl lg:text-2xl font-bold mb-2 capitalize">{heading}</h1>
      <div className="relative group">
        <div
          ref={containerRef}
          className="overflow-x-auto remove-scrollbar scroll-smooth transition-all"
        >
          <div className="grid grid-flow-col auto-cols-[230px] gap-6 relative z-10 p-4 overflow-visible">
            {data.map((data, index) => (
              <Card
                key={data.id + heading}
                data={data}
                index={index + 1}
                trending={trending}
                media_type={media_type}
              />
            ))}
          </div>
        </div>

        <div className="absolute w-full h-full top-0 hidden group-hover:flex items-center justify-between  ">
          <button
            onClick={handlePrev}
            className="bg-white rounded-full p-1 text-xl -ml-3 z-10 text-black"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={handleNext}
            className="bg-white rounded-full p-1 text-xl -mr-3 z-10 text-black"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCardScroll;
