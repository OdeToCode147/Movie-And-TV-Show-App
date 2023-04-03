import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const TVShowSeason = () => {
  const [currentTvShow, setCurrentTvShow] = useState();
  const [currentSeason, setCurrentSeason] = useState();
  const [videos, setVideos] = useState();
  const [seasonBackdrops, setSeasonBackdrops] = useState();
  const { id, season } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  console.log(videos);

  //Current Season Main Details
  useEffect(() => {
    if (id && season) {
      fetch(
        `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=87c98f2492b42f48b506b2d48f51461e&append_to_response=videos,images`
      )
        .then((res) => res.json())
        .then((data) => setCurrentSeason(data));
    }
    window.scrollTo(0, 0);
  }, [id, season]);

  //Current TV Show Details and Backdrops
  useEffect(() => {
    if (id && season) {
      fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=87c98f2492b42f48b506b2d48f51461e&append_to_response=videos,images`
      )
        .then((res) => res.json())
        .then((data) => {
          setCurrentTvShow(data);
          setVideos(
            data.videos.results
              .filter((video) => video.site === "YouTube")
              .sort(() => 0.5 - Math.random())
              .slice(0, 3)
          );
        });
    }
  }, [id, season]);

  //Current Season Backdrops
  useEffect(() => {
    if (currentSeason) {
      setSeasonBackdrops(
        currentSeason?.episodes?.map((episode) =>
          episode.still_path ? episode.still_path : ""
        )
      );
    }
  }, [currentSeason]);

  //Skeleton Loading

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div>
      {isLoading ? (
        <>
          <div className="moviebackdropContainer">
            <SkeletonTheme color="#202020" highlightColor="#444">
              <Skeleton height={"200px"} duration={1} />
            </SkeletonTheme>
          </div>
        </>
      ) : (
        <>
          <div className="moviebackdropContainer">
            <div>
              {seasonBackdrops && season != 0 ? (
                <img
                  src={`https://image.tmdb.org/t/p/original${
                    seasonBackdrops && seasonBackdrops.length > 0
                      ? seasonBackdrops[
                          Math.floor(Math.random() * seasonBackdrops.length)
                        ]
                      : ""
                  }`}
                  alt=""
                  className="backdrop"
                />
              ) : currentTvShow && currentTvShow.images.backdrops ? (
                <img
                  src={`https://image.tmdb.org/t/p/original${
                    currentTvShow && currentTvShow.images.backdrops.length > 0
                      ? currentTvShow.images.backdrops.filter(
                          (image) => image.width > 1800
                        )[
                          Math.floor(
                            Math.random() *
                              currentTvShow.images.backdrops.length
                          )
                        ]?.file_path
                      : ""
                  }`}
                  alt=""
                  className="backdrop"
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="d-flex flex-column">
            <div className="movieDetailContainer img-fluid">
              <div className="leftContainer">
                <div className="posterContainer">
                  {currentSeason && currentSeason.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/original${
                        currentSeason && currentSeason.poster_path
                          ? currentSeason.poster_path
                          : ""
                      }`}
                      alt=""
                      className="poster"
                    />
                  ) : currentTvShow && currentTvShow.images.posters ? (
                    <img
                      src={`https://image.tmdb.org/t/p/original${
                        currentTvShow && currentTvShow.images.posters.length > 0
                          ? currentTvShow.images.posters[
                              Math.floor(
                                Math.random() *
                                  currentTvShow.images.posters.length
                              )
                            ].file_path
                          : ""
                      }`}
                      alt=""
                      className="poster"
                    />
                  ) : (
                    <img
                      src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                      alt=""
                      className="noPoster"
                    />
                  )}
                </div>
                <div className="innerPageLinkHolder">
                  {id ? (
                    <Link to={`/tv/${id}`}>
                      <div className="innerPageLink btn btn-warning">
                        Main Page
                      </div>
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="rightContainer">
                {currentTvShow && currentTvShow.name ? (
                  <h1 className="movieTitle">
                    {currentTvShow ? currentTvShow.name : ""}
                  </h1>
                ) : (
                  ""
                )}
                {currentSeason && currentSeason.name ? (
                  <h1>{currentSeason ? currentSeason.name : ""}</h1>
                ) : (
                  ""
                )}

                <div className="yearRuntimeRatingContainer ">
                  {currentSeason && currentSeason.air_date ? (
                    <>
                      <div className="status status1 btn-outline-danger">
                        {currentSeason.air_date.slice(0, 4)}
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  {currentSeason &&
                  currentSeason.episodes &&
                  currentSeason.episodes.length > 0 ? (
                    <>
                      <div className="status status2 btn-outline-warning">
                        {currentSeason.episodes.length} Episodes
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {currentSeason &&
                  currentTvShow &&
                  currentTvShow.number_of_seasons &&
                  season &&
                  id &&
                  season > 1 ? (
                    <>
                      <Link
                        to={`/tv/${id}/season/${Number(season) - 1}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="episodeNav status3 btn-outline-success">
                          Previous Season
                        </div>
                      </Link>
                    </>
                  ) : (
                    ""
                  )}
                  {currentSeason &&
                  currentTvShow &&
                  currentTvShow.number_of_seasons &&
                  season &&
                  id &&
                  season < currentTvShow.number_of_seasons ? (
                    <>
                      <Link
                        to={`/tv/${id}/season/${Number(season) + 1}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="episodeNav status4 btn-outline-primary">
                          Next Season
                        </div>
                      </Link>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                {currentSeason && currentSeason.overview ? (
                  <div className="tvOverview">
                    {currentSeason ? currentSeason.overview : ""}
                  </div>
                ) : currentTvShow && currentTvShow.overview ? (
                  <div className="tvOverview">
                    {currentTvShow ? currentTvShow.overview : ""}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="movieMiddleDetailContainer">
              <div className="leftMiddleContainer">
                {currentSeason && currentTvShow && currentSeason.episodes
                  ? currentSeason.episodes.map((episode) => (
                      <>
                        <div className="seasonEpisodeContainer">
                          <Link
                            to={`/tv/${id}/season/${season}/episode/${
                              episode.episode_number
                                ? episode.episode_number
                                : ""
                            }`}
                            style={{ textDecoration: "none" }}
                          >
                            <h3 className="seasonEpisodeTitle">
                              {episode.name || episode.episode_number ? (
                                <>
                                  {episode.episode_number ? (
                                    <span>
                                      Episode {episode.episode_number} :
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                  {episode.name ? (
                                    <span> ‎ {episode.name}</span>
                                  ) : (
                                    ""
                                  )}
                                </>
                              ) : (
                                ""
                              )}
                            </h3>
                            <div className="d-flex flex-row mb-5">
                              {episode.still_path ? (
                                <div className="seasonEpisodeListBackdropHolder">
                                  <img
                                    src={`https://image.tmdb.org/t/p/original${episode.still_path}`}
                                    alt=""
                                    className="seasonEpisodeBackdrop"
                                  />
                                </div>
                              ) : currentTvShow &&
                                currentTvShow.images &&
                                currentTvShow.images.backdrops &&
                                currentTvShow.images.backdrops.length > 0 ? (
                                <div className="seasonEpisodeListBackdropHolder">
                                  <img
                                    src={`https://image.tmdb.org/t/p/original${
                                      currentTvShow &&
                                      currentTvShow.images.backdrops.length > 0
                                        ? currentTvShow.images.backdrops[
                                            Math.floor(
                                              Math.random() *
                                                currentTvShow.images.backdrops
                                                  .length
                                            )
                                          ].file_path
                                        : ""
                                    }`}
                                    alt=""
                                    className="seasonEpisodeBackdrop"
                                  />
                                </div>
                              ) : (
                                <div className="seasonEpisodeListBackdropHolder">
                                  <img
                                    src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                                    alt=""
                                    className="episodeBackdrop"
                                  />
                                </div>
                              )}
                              <div className="d-flex flex-column ml-2 mt-2 seasonEpisodeMainDetails">
                                <div className="seasonEpisodeOverview">
                                  {episode.overview
                                    ? episode.overview.length > 400
                                      ? episode.overview.slice(0, 400) + "..."
                                      : episode.overview
                                    : ""}
                                </div>
                                <div className="d-flex flex-row ">
                                  {episode.runtime ? (
                                    <div className="seasonEpisodeDetails">
                                      {episode.runtime} Mins
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  {episode.air_date ? (
                                    <div className="seasonEpisodeDetails">
                                      {episode.air_date
                                        .split("-")
                                        .reverse()
                                        .join("-")}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  {episode.vote_average ? (
                                    <div className="seasonEpisodeDetails">
                                      {episode.vote_average.toFixed(1)} / 10
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </>
                    ))
                  : ""}

                {videos && videos.length > 0 ? (
                  <div className="">
                    <h1 className="sectionHeading">TRAILERS & MORE...</h1>
                    <div className="d-flex">
                    {videos.map((video) => (
                      <div className="embed-responsive embed-responsive-16by9 w-75 m-4">
                        <iframe
                          title="myFrame"
                          className="embed-responsive-item"
                          src={`https://www.youtube.com/embed/${video.key}`}
                        ></iframe>
                      </div>
                    ))}
                  </div></div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TVShowSeason;
