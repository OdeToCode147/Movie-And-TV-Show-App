import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const TVShowEpisode = () => {
  const { id, season, episode } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [currentTvShow, setCurrentTvShow] = useState();
  const [currentSeason, setCurrentSeason] = useState();
  const [currentEpisode, setCurrentEpisode] = useState();
  const [seasonBackdrops, setSeasonBackdrops] = useState();
  const [episodeCastCrew, setEpisodeCastCrew] = useState();
  const [videos, setVideos] = useState();

  //Current Episode Main Details
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}/season/${season}/episode/${episode}?api_key=87c98f2492b42f48b506b2d48f51461e&append_to_response=videos,images`
    )
      .then((res) => res.json())
      .then((data) => {
        setCurrentEpisode(data);
        setVideos(
          data.videos.results
            .filter((video) => video.site === "YouTube")
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
        );
      });
    window.scrollTo(0, 0);
  }, [id, season, episode]);

  //Current Episode Cast and Crew
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}/season/${season}/episode/${episode}/credits?api_key=87c98f2492b42f48b506b2d48f51461e&append_to_response=videos,images`
    )
      .then((res) => res.json())
      .then((data) => setEpisodeCastCrew(data));
  }, [id, season, episode]);

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
        .then((data) => setCurrentTvShow(data));
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
              {currentEpisode &&
              currentEpisode.images &&
              currentEpisode.images.stills ? (
                <img
                  src={`https://image.tmdb.org/t/p/original${
                    currentEpisode && currentEpisode.images.stills.length > 0
                      ? currentEpisode.images.stills.filter(
                          (image) => image.width > 1080
                        )[
                          Math.floor(
                            Math.random() * currentEpisode.images.stills.length
                          )
                        ]?.file_path
                      : ""
                  }`}
                  alt=""
                  className="backdrop"
                />
              ) : seasonBackdrops && season != 0 ? (
                <img
                  src={`https://image.tmdb.org/t/p/original${
                    seasonBackdrops && seasonBackdrops.length > 0
                      ? seasonBackdrops[
                          Math.floor(Math.random() * seasonBackdrops.length)
                        ].file_path
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
                <div className="EpisodeLinkHolder">
                  {id ? (
                    <>
                      <Link to={`/tv/${id}`}>
                        <div className="episodePageLink btn btn-danger mr-1">
                          Main Page
                        </div>
                      </Link>
                      <Link to={`/tv/${id}/season/${season}`}>
                        <div className="episodePageLink btn btn-warning ml-1">
                          Season Page
                        </div>
                      </Link>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="rightContainer">
                {currentEpisode && currentEpisode.name ? (
                  <h1 className="movieTitle">
                    {currentEpisode && currentEpisode.name
                      ? currentEpisode.name
                      : ""}
                  </h1>
                ) : (
                  ""
                )}

                {(currentTvShow && currentTvShow.name) ||
                (currentSeason && currentSeason.name) ||
                (currentEpisode && currentEpisode.episode_number) ? (
                  <div className="d-flex">
                    <h3 className="episodeNumberDisplay">
                      {currentTvShow ? `${currentTvShow.name} - ‎` : ""}
                    </h3>
                    <h3 className="episodeNumberDisplay">
                      {currentSeason ? currentSeason.name : ""}
                    </h3>
                    <h3 className="episodeNumberDisplay">
                      {currentEpisode && currentEpisode.episode_number
                        ? ` ‎ Episode ${currentEpisode.episode_number}`
                        : ""}
                    </h3>
                  </div>
                ) : (
                  ""
                )}

                <div className="yearRuntimeRatingContainer ">
                  {currentEpisode && currentEpisode.air_date ? (
                    <>
                      <div className="status status1 btn-outline-danger">
                        {currentEpisode.air_date.split("-").reverse().join("-")}
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  {currentEpisode && currentEpisode.runtime ? (
                    <>
                      <div className="status status2 btn-outline-warning">
                        {currentEpisode.runtime} Mins
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {currentEpisode &&
                  currentSeason &&
                  season &&
                  episode &&
                  id &&
                  episode > 1 ? (
                    <>
                      <Link
                        to={`/tv/${id}/season/${season}/episode/${
                          Number(episode) - 1
                        }`}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="episodeNav status3 btn-outline-success">
                          Previous Episode
                        </div>
                      </Link>
                    </>
                  ) : id && season && season > 1 ? (
                    <>
                      <Link
                        to={`/tv/${id}/season/${Number(season) - 1}/episode/1`}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="episodeNav btn-success">
                          Previous Season
                        </div>
                      </Link>
                    </>
                  ) : (
                    ""
                  )}
                  {currentEpisode &&
                  currentSeason &&
                  currentSeason.episodes &&
                  season &&
                  episode &&
                  id &&
                  episode < currentSeason.episodes.length ? (
                    <>
                      <Link
                        to={`/tv/${id}/season/${season}/episode/${
                          Number(episode) + 1
                        }`}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="episodeNav status4 btn-outline-primary">
                          Next Episode
                        </div>
                      </Link>
                    </>
                  ) : id &&
                    season &&
                    currentTvShow &&
                    currentTvShow.number_of_seasons &&
                    season < currentTvShow.number_of_seasons ? (
                    <>
                      <Link
                        to={`/tv/${id}/season/${Number(season) + 1}/episode/1`}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="episodeNav btn-primary">
                          Next Season
                        </div>
                      </Link>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                {currentEpisode && currentEpisode.overview ? (
                  <div className="tvOverview">
                    {currentEpisode ? currentEpisode.overview : ""}
                  </div>
                ) : currentSeason && currentSeason.overview ? (
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
                {(episodeCastCrew &&
                  episodeCastCrew.cast &&
                  episodeCastCrew.cast.length > 0) ||
                (episodeCastCrew &&
                  episodeCastCrew.guest_stars &&
                  episodeCastCrew.guest_stars.length > 0) ? (
                  <>
                    <h1 className="sectionHeading">CAST</h1>
                    <div className="castContainer">
                      {episodeCastCrew && episodeCastCrew.cast
                        ? episodeCastCrew.cast?.map((cast) => (
                            <>
                              <div>
                                <Link to={`/person/${cast ? cast.id : ""}`}>
                                  <div className="castInnerContainer">
                                    {cast && cast.profile_path ? (
                                      <img
                                        src={`https://image.tmdb.org/t/p/original${cast.profile_path}`}
                                        alt=""
                                        className="ccCardHolder"
                                      />
                                    ) : (
                                      <img
                                        src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
                                        alt=""
                                        className="ccBlankCardHolder"
                                      />
                                    )}
                                    <div className="ccName">{cast?.name}</div>
                                    <div className="ccTitle">
                                      {cast.character}
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            </>
                          ))
                        : ""}
                      {episodeCastCrew && episodeCastCrew.guest_stars
                        ? episodeCastCrew.guest_stars?.map((cast) => (
                            <>
                              <div>
                                <Link to={`/person/${cast ? cast.id : ""}`}>
                                  <div className="castInnerContainer">
                                    {cast && cast.profile_path ? (
                                      <img
                                        src={`https://image.tmdb.org/t/p/original${cast.profile_path}`}
                                        alt=""
                                        className="ccCardHolder"
                                      />
                                    ) : (
                                      <img
                                        src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
                                        alt=""
                                        className="ccBlankCardHolder"
                                      />
                                    )}
                                    <div className="ccName">{cast?.name}</div>
                                    <div className="ccTitle">
                                      {cast.character}
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            </>
                          ))
                        : ""}
                    </div>
                  </>
                ) : (
                  ""
                )}

                {episodeCastCrew &&
                episodeCastCrew.crew &&
                episodeCastCrew.crew.length > 0 ? (
                  <>
                    <h1 className="sectionHeading">CREW</h1>
                    <div className="castContainer">
                      {episodeCastCrew && episodeCastCrew.crew
                        ? episodeCastCrew.crew.map((crew) => (
                            <>
                              <div>
                                <Link to={`/person/${crew ? crew.id : ""}`}>
                                  <div className="castInnerContainer">
                                    {crew && crew.profile_path ? (
                                      <img
                                        src={`https://image.tmdb.org/t/p/original${crew.profile_path}`}
                                        alt=""
                                        className="ccCardHolder"
                                      />
                                    ) : (
                                      <img
                                        src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
                                        alt=""
                                        className="ccBlankCardHolder"
                                      />
                                    )}
                                    <div className="ccName">{crew?.name}</div>
                                    <div className="ccTitle">{crew.job}</div>
                                  </div>
                                </Link>
                              </div>
                            </>
                          ))
                        : ""}
                    </div>
                  </>
                ) : (
                  ""
                )}
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
                    </div>
                  </div>
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

export default TVShowEpisode;
