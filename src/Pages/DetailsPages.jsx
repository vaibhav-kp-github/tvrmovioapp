import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import useFetchDetail from "../hooks/useFetchDetail";
import { useSelector } from "react-redux";
import HorizontalCardScroll from "../components/HorizontalCardScroll";
import moment from "moment";
import Divider from "../components/Divider";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import fallbackImage from "../assets/fallbackImage";

const DetailsPages = () => {
  const param = useParams();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [param]);

  const {
    data: fetchDetail,
    loading: loadingDetail,
    error: errorDetail,
  } = useFetchDetail(`/${param?.explore}/${param?.id}`);
  console.log("fetchDetail", fetchDetail);
  const {
    data: castData,
    loading: loadingCast,
    error: errorCast,
  } = useFetchDetail(`/${param?.explore}/${param?.id}/credits`);
  const {
    data: similarData,
    loading: loadingSimilar,
    error: errorSimilar,
  } = useFetch(`/${param?.explore}/${param?.id}/similar`);
  const {
    data: recommendedData,
    loading: loadingRecommended,
    error: errorRecommended,
  } = useFetch(`/${param?.explore}/${param?.id}/recommendations`);
  const imageUrl = useSelector((state) => state.movieData.imageUrl);
  const cast = castData?.cast || [];
  const duration = `${(fetchDetail?.runtime / 60).toFixed(1).split(".")[0]}h ${fetchDetail?.runtime % 60}m`;
  const directorObj = castData?.crew?.find(
    (el) => el.known_for_department === "Directing",
  );
  const director = directorObj?.name || "N/A";
  const writerObj = castData?.crew?.find(
    (el) => el.known_for_department === "Writing",
  );
  const Writer = writerObj?.name || "N/A";
  console.log("cast data", castData);
  console.log("similar data", similarData);

  // console.log("param", param);

  if (loadingDetail || loadingCast || loadingSimilar || loadingRecommended) {
    return <Loader />;
  }
  if (errorDetail || errorCast || errorSimilar || errorRecommended) {
    return (
      <div className="flex flex-col items-center justify-center min-h-50 text-red-600">
        <h2 className="text-2xl font-bold mb-2">Error loading data</h2>
        <p>{errorDetail || errorCast || errorSimilar || errorRecommended}</p>
      </div>
    );
  }
  return (
    <>
      <Helmet>
        <title>
          {fetchDetail?.title || fetchDetail?.name || "Details"} | Movie App
        </title>
        <meta
          name="description"
          content={fetchDetail?.overview || "Movie details and information."}
        />
        <meta
          property="og:title"
          content={fetchDetail?.title || fetchDetail?.name || "Details"}
        />
        <meta
          property="og:description"
          content={fetchDetail?.overview || "Movie details and information."}
        />
        <meta
          property="og:image"
          content={
            fetchDetail?.poster_path
              ? imageUrl + fetchDetail?.poster_path
              : fallbackImage
          }
        />
      </Helmet>
      <div aria-label="Details Page Content">
        <div
          className="w-full h-72 relative hidden lg:block"
          aria-label="Backdrop Image Section"
        >
          <div className="w-full h-full">
            <img
              src={
                fetchDetail?.backdrop_path
                  ? imageUrl + fetchDetail?.backdrop_path
                  : fallbackImage
              }
              alt={
                fetchDetail?.title
                  ? `${fetchDetail.title} Backdrop`
                  : "No Backdrop Available"
              }
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-0 bg-linear-to-t from-neutral-900 to-transparent w-full h-full"></div>
        </div>

        <div className="container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10">
          <div
            className="lg:-mt-32 relative mx-auto lg:mx-0 w-fit min-w-60"
            aria-label="Poster Image Section"
          >
            <img
              src={
                fetchDetail?.poster_path
                  ? imageUrl + fetchDetail?.poster_path
                  : fallbackImage
              }
              alt={
                fetchDetail?.title
                  ? `${fetchDetail.title} Poster`
                  : "No Poster Available"
              }
              className="h-80 w-60 object-cover rounded"
            />

            <button className="bg-white hover:bg-linear-to-r from-red-700 to-orange-500 shadow-md transition-all hover:scale-105 px-4 py-2 text-black font-bold rounded mt-2 w-full">
              Play Now
            </button>
          </div>

          <div className="">
            <h2 className="text-4xl font-bold">
              {fetchDetail?.title || fetchDetail?.name}
            </h2>
            <p className="text-neutral-400">{fetchDetail?.tagline}</p>

            <Divider />

            <div className="flex items-center gap-3">
              <div>Ratings: {Number(fetchDetail?.vote_average).toFixed(1)}</div>
              <span>|</span>
              <div>Vote: {fetchDetail?.vote_count}</div>
              <span>|</span>

              <div>Duration: {duration} </div>
            </div>

            <Divider />

            <div>
              <h2 className="text-xl font-bold mb-2">Overview :</h2>
              <p>{fetchDetail?.overview}</p>
              <Divider />
              <div className="flex items-center gap-4 text-center my-3">
                <p>Status: {fetchDetail.status}</p>
                <span>|</span>
                <p>
                  Release Date:{" "}
                  {moment(fetchDetail?.release_date).format("MMMM Do YYYY")}
                </p>
                <span>|</span>
                <p>Revenue: 10 / {fetchDetail?.vote_average}</p>
              </div>

              <Divider />
              <div>
                <p className="">
                  <span>Director: </span>
                  {director}
                </p>
                <Divider />

                <p className="">
                  <span>Writer</span>: {Writer}
                </p>
              </div>

              <Divider />

              <div className="">
                <h2 className="text-xl font-bold mb-2">Cast :</h2>
                <div
                  className="grid grid-cols-[repeat(auto-fit,96px)] justify-center gap-6 mt-5"
                  aria-label="Cast Grid"
                >
                  {cast
                    .filter((credit) => credit.profile_path)
                    .map((credit) => (
                      <div key={credit.id + param.explore + param.id}>
                        <img
                          className="w-24 h-24 bg-cover rounded-full"
                          src={
                            credit.profile_path
                              ? imageUrl + credit.profile_path
                              : fallbackImage
                          }
                          alt={
                            credit.name
                              ? `${credit.name} Profile`
                              : "No Profile Available"
                          }
                          tabIndex={0}
                        />
                        <p className="font-bold text-center text-sm text-neutral-400 mt-1">
                          {credit.name}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <HorizontalCardScroll
            data={similarData}
            heading={"Similar " + param.explore}
            media_type={param?.explore}
          />
          <HorizontalCardScroll
            data={recommendedData}
            heading={"Recommended " + param.explore}
            media_type={param?.explore}
          />
        </div>
      </div>
    </>
  );
};

export default DetailsPages;
