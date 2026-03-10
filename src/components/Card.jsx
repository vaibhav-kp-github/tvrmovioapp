import moment from 'moment/moment';
import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Card = ({ data, trending, index, media_type }) => {
  const imageUrl = useSelector((state) => state.movieData.imageUrl);

  const mediaType = data.media_type || media_type

  return (
    <Link
      to={"/" + mediaType + "/" + data.id}
      className="w-full max-w-70  min-h-96 h-full overflow-hidden relative rounded transition-transform duration-200 hover:scale-107"
    >
      {data?.poster_path ? (
        <img src={imageUrl + data.poster_path} alt={data.title || data.name} />
      ) : data?.profile_path ? (
        <img src={imageUrl + data.profile_path} alt={data.title || data.name} />
      ) : (
        <div className="bg-linear-65 from-purple-500 to-pink-500 w-full h-full text-xl font-bold flex items-center justify-center">
          No image Found
        </div>
      )}
      <div className="">
        {trending && (
          <div className="absolute top-2 left-0 rounded-r-2xl bg-black/60 backdrop-blur-3xl  text-white px-2 py-1 text-sm font-bold">
            # {index} trending
          </div>
        )}
      </div>

      <div className="absolute w-full h-16 bottom-0 left-0 p-2 backdrop-blur-3xl bg-black/50 ">
        <h2 className="text-ellipsis line-clamp-1 text-lg font-semibold">
          {data.title || data.name}
        </h2>
        <div className="text-sm font-neutral-300 flex justify-between items-center">
          <p>
            {moment(data.release_date).format("MMMM DD YYYY")}
          </p>
          <p className="bg-black px-1 text-white rounded-full text-xs">
            {!data.vote_average
              ? "✨"
              : `Rating: ${Number(data.vote_average).toFixed(1)}`}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card
