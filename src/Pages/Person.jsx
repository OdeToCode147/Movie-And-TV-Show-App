import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Person = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [personDetails, setPersonDetails] = useState();
  const [personExternalLinks, setPersonExternalLinks] = useState();
  const [backdrops, setBackdrops] = useState();
  const [allGenres, setAllGenres] = useState([]);

  const [personMoviesCast, setPersonMoviesCast] = useState();
  const [personMoviesCrew, setPersonMoviesCrew] = useState();
  const [personTVCast, setPersonTVCast] = useState();
  const [personTVCrew, setPersonTVCrew] = useState();

  const [personPopularCast, setPersonPopularCast] = useState();
  const [personTopRatedCast, setPersonTopRatedCast] = useState();
  const [personPopularCrew, setPersonPopularCrew] = useState();
  const [personTopRatedCrew, setPersonTopRatedCrew] = useState();

  console.log(allGenres);

  //Person Main Details
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=87c98f2492b42f48b506b2d48f51461e&language=en-US&append_to_response=videos%2Cimages`
    )
      .then((res) => res.json())
      .then((data) => setPersonDetails(data));
  }, [id]);

  //Person Movie Credits By Release Date
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=87c98f2492b42f48b506b2d48f51461e&language=en-US&append_to_response=videos%2Cimages`
    )
      .then((res) => res.json())
      .then((data) => {
        const movieCrewCreditsData = data.crew;
        const mergedMovieCrewCredits = [];
        const movieCrewTitles = new Set();
        movieCrewCreditsData.forEach((movie) => {
          const movieCrewTitle = movie.title;
          if (!movieCrewTitles.has(movieCrewTitle)) {
            movieCrewTitles.add(movieCrewTitle);
            movie.job = [movie.job];
            mergedMovieCrewCredits.push(movie);
          } else {
            mergedMovieCrewCredits.forEach((mergedMovie) => {
              if (mergedMovie.title === movieCrewTitle) {
                mergedMovie.job = Array.isArray(mergedMovie.job)
                  ? mergedMovie.job
                  : [mergedMovie.job];
                mergedMovie.job.push(movie.job);
              }
            });
          }
        });

        setPersonMoviesCast(
          data.cast.sort((a, b) => {
            return new Date(b.release_date) - new Date(a.release_date);
          })
        );
        setPersonMoviesCrew(
          mergedMovieCrewCredits.sort((a, b) => {
            return new Date(b.release_date) - new Date(a.release_date);
          })
        );
      });
  }, [id]);

  //Person TV Credits By Release Date
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=87c98f2492b42f48b506b2d48f51461e&language=en-US&append_to_response=videos%2Cimages`
    )
      .then((res) => res.json())
      .then((data) => {
        const tvCrewCreditsData = data.crew;
        const mergedTVCrewCredits = [];
        const tvCrewTitles = new Set();
        tvCrewCreditsData.forEach((tv) => {
          const tvCrewTitle = tv.name;
          if (!tvCrewTitles.has(tvCrewTitle)) {
            tvCrewTitles.add(tvCrewTitle);
            tv.job = [tv.job];
            mergedTVCrewCredits.push(tv);
          } else {
            mergedTVCrewCredits.forEach((mergedTV) => {
              if (mergedTV.name === tvCrewTitle) {
                mergedTV.job = Array.isArray(mergedTV.job)
                  ? mergedTV.job
                  : [mergedTV.job];
                mergedTV.job.push(tv.job);
              }
            });
          }
        });

        setPersonTVCast(
          data.cast.sort((a, b) => {
            return new Date(b.first_air_date) - new Date(a.first_air_date);
          })
        );
        setPersonTVCrew(
          mergedTVCrewCredits.sort((a, b) => {
            return new Date(b.first_air_date) - new Date(a.first_air_date);
          })
        );
      });
  }, [id]);

  //Person Popular and Top Rated Credits
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=87c98f2492b42f48b506b2d48f51461e&language=en-US&append_to_response=videos%2Cimages`
    )
      .then((res) => res.json())
      .then((data) => {
        const movieCrewCreditsData = data.crew;
        const mergedMovieCrewCredits = [];
        const movieCrewTitles = new Set();
        movieCrewCreditsData.forEach((movie) => {
          const movieCrewTitle = movie.title ? movie.title : movie.name;
          if (!movieCrewTitles.has(movieCrewTitle)) {
            movieCrewTitles.add(movieCrewTitle);
            movie.job = [movie.job];
            mergedMovieCrewCredits.push(movie);
          } else {
            mergedMovieCrewCredits.forEach((mergedMovie) => {
              if (
                (mergedMovie.title ? mergedMovie.title : mergedMovie.name) ===
                movieCrewTitle
              ) {
                mergedMovie.job = Array.isArray(mergedMovie.job)
                  ? mergedMovie.job
                  : [mergedMovie.job];
                mergedMovie.job.push(movie.job);
              }
            });
          }
        });

        setPersonPopularCast(
          data.cast.sort((a, b) => b.popularity - a.popularity)
        );
        setPersonTopRatedCast(
          data.cast
            .filter((rating) => rating.vote_count > 5)
            .sort((a, b) => b.vote_average - a.vote_average)
        );
        setPersonPopularCrew(
          mergedMovieCrewCredits.sort((a, b) => b.popularity - a.popularity)
        );
        setPersonTopRatedCrew(
          mergedMovieCrewCredits
            .filter((rating) => rating.vote_count > 5)
            .sort((a, b) => b.vote_average - a.vote_average)
        );
      });
  }, [id]);

  //Backdrops
  useEffect(() => {
    if (personDetails && personDetails.known_for_department) {
      fetch(
        `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=87c98f2492b42f48b506b2d48f51461e&language=en-US&append_to_response=videos%2Cimages`
      )
        .then((res) => res.json())
        .then((data) => {
          const backdrop = [];
          if (personDetails.known_for_department === "Acting") {
            data.cast.map((image) =>
              image.backdrop_path ? backdrop.push(image.backdrop_path) : ""
            );
          } else if (personDetails.known_for_department !== ("Acting" || "")) {
            data.crew.map((image) =>
              image.backdrop_path ? backdrop.push(image.backdrop_path) : ""
            );
          }
          setBackdrops(backdrop);
        });
    }
  }, [id, personDetails, personPopularCast, personPopularCrew]);

  //Person Social Media Links
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/person/${id}/external_ids?api_key=87c98f2492b42f48b506b2d48f51461e&language=en-US&append_to_response=videos%2Cimages`
    )
      .then((res) => res.json())
      .then((data) => setPersonExternalLinks(data));
  }, [id]);

  //Movie Genres
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=87c98f2492b42f48b506b2d48f51461e`
    )
      .then((res) => res.json())
      .then((data) => {
        setAllGenres(data.genres);
      });
  }, []);

  //TV Genres
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=87c98f2492b42f48b506b2d48f51461e`
    )
      .then((res) => res.json())
      .then((data) => {
        setAllGenres((prevGenres) => prevGenres.concat(data.genres));
      });
  }, []);

  //Skeletop Loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <>
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
              {backdrops && backdrops.length > 0 ? (
                <img
                  src={`https://image.tmdb.org/t/p/original${
                    backdrops
                      ? backdrops[Math.floor(Math.random() * backdrops.length)]
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
                  {personDetails &&
                  personDetails.images &&
                  personDetails.images.profiles &&
                  personDetails.images.profiles.length > 0 ? (
                    <img
                      src={`https://image.tmdb.org/t/p/original${
                        personDetails.images.profiles[
                          Math.floor(
                            Math.random() * personDetails.images.profiles.length
                          )
                        ]?.file_path
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
                  <div className="innerPageLinkHolder">
                    {personExternalLinks || personDetails ? (
                      <>
                        {personExternalLinks.facebook_id ? (
                          <>
                            <Link
                              to={`https://www.facebook.com/${personExternalLinks.facebook_id}`}
                              target="_blank"
                              className="innerPageLink"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="currentColor"
                                className="bi bi-facebook"
                                viewBox="0 0 16 16"
                              >
                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                              </svg>
                            </Link>
                          </>
                        ) : (
                          ""
                        )}
                        {personExternalLinks.twitter_id ? (
                          <>
                            <Link
                              to={`https://twitter.com/${personExternalLinks.twitter_id}`}
                              target="_blank"
                              className="innerPageLink"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="currentColor"
                                className="bi bi-twitter"
                                viewBox="0 0 16 16"
                              >
                                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                              </svg>
                            </Link>
                          </>
                        ) : (
                          ""
                        )}
                        {personExternalLinks.instagram_id ? (
                          <>
                            <Link
                              to={`https://instagram.com/${personExternalLinks.instagram_id}`}
                              target="_blank"
                              className="innerPageLink"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="currentColor"
                                className="bi bi-instagram"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                              </svg>
                            </Link>
                          </>
                        ) : (
                          ""
                        )}
                        {personExternalLinks.youtube_id ? (
                          <>
                            <Link
                              to={`https://youtube.com/c/${personExternalLinks.youtube_id}`}
                              target="_blank"
                              className="innerPageLink"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="currentColor"
                                className="bi bi-youtube"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
                              </svg>
                            </Link>
                          </>
                        ) : (
                          ""
                        )}
                        {personDetails.homepage ? (
                          <>
                            <Link
                              to={personDetails.homepage}
                              target="_blank"
                              className="innerPageLink"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="currentColor"
                                className="bi bi-link-45deg"
                                viewBox="0 0 16 16"
                              >
                                <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                                <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
                              </svg>
                            </Link>
                          </>
                        ) : personDetails.imdb_id ? (
                          <>
                            <Link
                              to={`https://www.imdb.com/name/${personDetails.imdb_id}`}
                              target="_blank"
                              className="innerPageLink"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="currentColor"
                                className="bi bi-link-45deg"
                                viewBox="0 0 16 16"
                              >
                                <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                                <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
                              </svg>
                            </Link>
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="rightContainer">
                {personDetails && personDetails.name ? (
                  <h1 className="movieTitle">
                    {personDetails && personDetails.name
                      ? personDetails.name
                      : ""}
                  </h1>
                ) : (
                  ""
                )}
                {personDetails && personDetails.known_for_department ? (
                  <h1 className="tagline">
                    {personDetails.known_for_department
                      ? personDetails.known_for_department
                      : ""}
                  </h1>
                ) : (
                  ""
                )}
                <div className="yearRuntimeRatingContainer">
                  {personDetails && personDetails.birthday ? (
                    <>
                      <div className="status status3 btn-outline-success">
                        {personDetails.birthday.split("-").reverse().join("-")}
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {personDetails && personDetails.deathday ? (
                    <>
                      <div className="status status1 btn-outline-danger">
                        {personDetails.birthday.split("-").reverse().join("-")}
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {personDetails && personDetails.gender ? (
                    <>
                      {personDetails.gender === 1 ? (
                        <div className="status status4 btn-outline-primary">
                          She/Her
                        </div>
                      ) : personDetails.gender === 2 ? (
                        <div className="status status2 btn-outline-warning">
                          He/Him
                        </div>
                      ) : (
                        "aa"
                      )}
                    </>
                  ) : (
                    ""
                  )}
                  {personDetails && personDetails.biography ? (
                    <div className="overview">
                      {personDetails ? personDetails.biography : ""}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="movieMiddleDetailContainer">
              <div className="leftMiddleContainer">
                {personDetails &&
                personDetails.known_for_department &&
                personDetails.known_for_department === "Acting" &&
                personPopularCast ? (
                  <>
                    <h2 className="sectionHeading">Popular Movies/Shows</h2>
                    <div>
                      {personPopularCast.map(
                        (movie, index) =>
                          index < 6 && (
                            <>
                              <div className="personPopularContainer">
                                <Link
                                  to={
                                    movie.title
                                      ? `/movie/${movie.id}`
                                      : `/tv/${movie.id}`
                                  }
                                  style={{ textDecoration: "none" }}
                                >
                                  <div className="d-flex flex-row mb-5">
                                    {movie.backdrop_path ? (
                                      <div className="PersonPopularBackdropHolder">
                                        <img
                                          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                          alt=""
                                          className="personPopularBackdrop"
                                        />
                                      </div>
                                    ) : (
                                      <div className="PersonPopularBackdropHolder">
                                        <img
                                          src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                                          alt=""
                                          className="personPopularNoBackdrop"
                                        />
                                      </div>
                                    )}
                                    <div className="d-flex flex-column ml-2 mt-2 seasonEpisodeMainDetails">
                                      <h1 className="personPopularTitle">
                                        {movie.title ? movie.title : movie.name}
                                      </h1>

                                      <div className="d-flex flex-row flex-wrap">
                                        {movie.character ? (
                                          <div className="role status1 btn-outline-danger">
                                            {movie.character}
                                          </div>
                                        ) : (
                                          ""
                                        )}

                                        {movie.media_type ? (
                                          <div>
                                            {movie.media_type === "movie" ? (
                                              <div className="role status2 btn-outline-warning">
                                                Movie
                                              </div>
                                            ) : (
                                              <div className="role status4 btn-outline-primary">
                                                TV Show
                                              </div>
                                            )}
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </div>

                                      <div className="d-flex flex-row flex-wrap">
                                        {movie.genre_ids
                                          ? movie.genre_ids.map((id, index) => {
                                              const genre = allGenres.find(
                                                (gen) => gen.id === id
                                              );
                                              return genre ? (
                                                <div
                                                  className={
                                                    index % 4 === 0
                                                      ? "role status3 btn-outline-success"
                                                      : index % 4 === 1
                                                      ? "role status4 btn-outline-primary"
                                                      : index % 4 === 2
                                                      ? "role status1 btn-outline-danger"
                                                      : "role status2 btn-outline-warning"
                                                  }
                                                >
                                                  {genre.name}
                                                </div>
                                              ) : (
                                                ""
                                              );
                                            })
                                          : ""}
                                        {movie.release_date ||
                                        movie.first_air_date ? (
                                          <div className="role status1 btn-outline-danger">
                                            {movie.release_date
                                              ? movie.release_date.slice(0, 4)
                                              : movie.first_air_date.slice(
                                                  0,
                                                  4
                                                )}
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                        {movie.vote_average ? (
                                          <div className="role status2 btn-outline-warning">
                                            {movie.vote_average.toFixed(1)} / 10
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                      <div className="personPopularOverview">
                                        {movie.overview
                                          ? movie.overview.length > 400
                                            ? movie.overview.slice(0, 400) +
                                              "..."
                                            : movie.overview
                                          : ""}
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            </>
                          )
                      )}
                    </div>
                  </>
                ) : personDetails &&
                  personDetails.known_for_department &&
                  personDetails.known_for_department !== ("Acting" || "") &&
                  personPopularCrew ? (
                  <>
                    <h2 className="sectionHeading">Popular Movies/Shows</h2>
                    <div>
                      {personPopularCrew.map(
                        (movie, index) =>
                          index < 6 && (
                            <>
                              <div className="personPopularContainer">
                                <Link
                                  to={
                                    movie.title
                                      ? `/movie/${movie.id}`
                                      : `/tv/${movie.id}`
                                  }
                                  style={{ textDecoration: "none" }}
                                >
                                  <div className="d-flex flex-row mb-5">
                                    {movie.backdrop_path ? (
                                      <div className="PersonPopularBackdropHolder">
                                        <img
                                          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                          alt=""
                                          className="personPopularBackdrop"
                                        />
                                      </div>
                                    ) : (
                                      <div className="PersonPopularBackdropHolder">
                                        <img
                                          src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                                          alt=""
                                          className="personPopularNoBackdrop"
                                        />
                                      </div>
                                    )}
                                    <div className="d-flex flex-column ml-2 mt-2 seasonEpisodeMainDetails">
                                      <h1 className="personPopularTitle">
                                        {movie.title ? movie.title : movie.name}
                                      </h1>

                                      <div className="d-flex flex-row flex-wrap">
                                        {movie.job
                                          ? movie.job.map((role, index) => (
                                              <div
                                                className={
                                                  index % 4 === 0
                                                    ? "role status1 btn-outline-danger"
                                                    : index % 4 === 1
                                                    ? "role status2 btn-outline-warning"
                                                    : index % 4 === 2
                                                    ? "role status3 btn-outline-success"
                                                    : "role status4 btn-outline-primary"
                                                }
                                              >
                                                {role}
                                              </div>
                                            ))
                                          : ""}

                                        {movie.media_type ? (
                                          <div>
                                            {movie.media_type === "movie" ? (
                                              <div className="role status2 btn-outline-warning">
                                                Movie
                                              </div>
                                            ) : (
                                              <div className="role status4 btn-outline-primary">
                                                TV Show
                                              </div>
                                            )}
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </div>

                                      <div className="d-flex flex-row flex-wrap">
                                        {movie.genre_ids
                                          ? movie.genre_ids.map((id, index) => {
                                              const genre = allGenres.find(
                                                (gen) => gen.id === id
                                              );
                                              return genre ? (
                                                <div
                                                  className={
                                                    index % 4 === 0
                                                      ? "role status1 btn-outline-danger"
                                                      : index % 4 === 1
                                                      ? "role status2 btn-outline-warning"
                                                      : index % 4 === 2
                                                      ? "role status3 btn-outline-success"
                                                      : "role status4 btn-outline-primary"
                                                  }
                                                >
                                                  {genre.name}
                                                </div>
                                              ) : (
                                                ""
                                              );
                                            })
                                          : ""}
                                        {movie.release_date ||
                                        movie.first_air_date ? (
                                          <div className="role status1 btn-outline-danger">
                                            {movie.release_date
                                              ? movie.release_date.slice(0, 4)
                                              : movie.first_air_date.slice(
                                                  0,
                                                  4
                                                )}
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                        {movie.vote_average ? (
                                          <div className="role status2 btn-outline-warning">
                                            {movie.vote_average.toFixed(1)} / 10
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                      <div className="personPopularOverview">
                                        {movie.overview
                                          ? movie.overview.length > 400
                                            ? movie.overview.slice(0, 400) +
                                              "..."
                                            : movie.overview
                                          : ""}
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            </>
                          )
                      )}
                    </div>
                  </>
                ) : (
                  ""
                )}

                {personDetails &&
                personDetails.known_for_department &&
                personDetails.known_for_department === "Acting" &&
                personTopRatedCast ? (
                  <>
                    <h2 className="sectionHeading">Top Rated Movies/Shows</h2>
                    <div>
                      {personTopRatedCast.map(
                        (movie, index) =>
                          index < 6 && (
                            <>
                              <div className="personPopularContainer">
                                <Link
                                  to={
                                    movie.title
                                      ? `/movie/${movie.id}`
                                      : `/tv/${movie.id}`
                                  }
                                  style={{ textDecoration: "none" }}
                                >
                                  <div className="d-flex flex-row mb-5">
                                    {movie.backdrop_path ? (
                                      <div className="PersonPopularBackdropHolder">
                                        <img
                                          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                          alt=""
                                          className="personPopularBackdrop"
                                        />
                                      </div>
                                    ) : (
                                      <div className="PersonPopularBackdropHolder">
                                        <img
                                          src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                                          alt=""
                                          className="personPopularNoBackdrop"
                                        />
                                      </div>
                                    )}
                                    <div className="d-flex flex-column ml-2 mt-2 seasonEpisodeMainDetails">
                                      <h1 className="personPopularTitle">
                                        {movie.title ? movie.title : movie.name}
                                      </h1>

                                      <div className="d-flex flex-row flex-wrap">
                                        {movie.character ? (
                                          <div className="role status1 btn-outline-danger">
                                            {movie.character}
                                          </div>
                                        ) : (
                                          ""
                                        )}

                                        {movie.media_type ? (
                                          <div>
                                            {movie.media_type === "movie" ? (
                                              <div className="role status2 btn-outline-warning">
                                                Movie
                                              </div>
                                            ) : (
                                              <div className="role status4 btn-outline-primary">
                                                TV Show
                                              </div>
                                            )}
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </div>

                                      <div className="d-flex flex-row flex-wrap">
                                        {movie.genre_ids
                                          ? movie.genre_ids.map((id, index) => {
                                              const genre = allGenres.find(
                                                (gen) => gen.id === id
                                              );
                                              return genre ? (
                                                <div
                                                  className={
                                                    index % 4 === 0
                                                      ? "role status3 btn-outline-success"
                                                      : index % 4 === 1
                                                      ? "role status4 btn-outline-primary"
                                                      : index % 4 === 2
                                                      ? "role status1 btn-outline-danger"
                                                      : "role status2 btn-outline-warning"
                                                  }
                                                >
                                                  {genre.name}
                                                </div>
                                              ) : (
                                                ""
                                              );
                                            })
                                          : ""}
                                        {movie.release_date ||
                                        movie.first_air_date ? (
                                          <div className="role status1 btn-outline-danger">
                                            {movie.release_date
                                              ? movie.release_date.slice(0, 4)
                                              : movie.first_air_date.slice(
                                                  0,
                                                  4
                                                )}
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                        {movie.vote_average ? (
                                          <div className="role status2 btn-outline-warning">
                                            {movie.vote_average.toFixed(1)} / 10
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                      <div className="personPopularOverview">
                                        {movie.overview
                                          ? movie.overview.length > 400
                                            ? movie.overview.slice(0, 400) +
                                              "..."
                                            : movie.overview
                                          : ""}
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            </>
                          )
                      )}
                    </div>
                  </>
                ) : personDetails &&
                  personDetails.known_for_department &&
                  personDetails.known_for_department !== ("Acting" || "") &&
                  personTopRatedCrew ? (
                  <>
                    <h2 className="sectionHeading">Top Rated Movies/Shows</h2>
                    <div>
                      {personTopRatedCrew.map(
                        (movie, index) =>
                          index < 6 && (
                            <>
                              <div className="personPopularContainer">
                                <Link
                                  to={
                                    movie.title
                                      ? `/movie/${movie.id}`
                                      : `/tv/${movie.id}`
                                  }
                                  style={{ textDecoration: "none" }}
                                >
                                  <div className="d-flex flex-row mb-5">
                                    {movie.backdrop_path ? (
                                      <div className="PersonPopularBackdropHolder">
                                        <img
                                          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                          alt=""
                                          className="personPopularBackdrop"
                                        />
                                      </div>
                                    ) : (
                                      <div className="PersonPopularBackdropHolder">
                                        <img
                                          src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                                          alt=""
                                          className="personPopularNoBackdrop"
                                        />
                                      </div>
                                    )}
                                    <div className="d-flex flex-column ml-2 mt-2 seasonEpisodeMainDetails">
                                      <h1 className="personPopularTitle">
                                        {movie.title ? movie.title : movie.name}
                                      </h1>

                                      <div className="d-flex flex-row flex-wrap">
                                        {movie.job
                                          ? movie.job.map((role, index) => (
                                              <div
                                                className={
                                                  index % 4 === 0
                                                    ? "role status1 btn-outline-danger"
                                                    : index % 4 === 1
                                                    ? "role status2 btn-outline-warning"
                                                    : index % 4 === 2
                                                    ? "role status3 btn-outline-success"
                                                    : "role status4 btn-outline-primary"
                                                }
                                              >
                                                {role}
                                              </div>
                                            ))
                                          : ""}

                                        {movie.media_type ? (
                                          <div>
                                            {movie.media_type === "movie" ? (
                                              <div className="role status2 btn-outline-warning">
                                                Movie
                                              </div>
                                            ) : (
                                              <div className="role status4 btn-outline-primary">
                                                TV Show
                                              </div>
                                            )}
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </div>

                                      <div className="d-flex flex-row flex-wrap">
                                        {movie.genre_ids
                                          ? movie.genre_ids.map((id, index) => {
                                              const genre = allGenres.find(
                                                (gen) => gen.id === id
                                              );
                                              return genre ? (
                                                <div
                                                  className={
                                                    index % 4 === 0
                                                      ? "role status1 btn-outline-danger"
                                                      : index % 4 === 1
                                                      ? "role status2 btn-outline-warning"
                                                      : index % 4 === 2
                                                      ? "role status3 btn-outline-success"
                                                      : "role status4 btn-outline-primary"
                                                  }
                                                >
                                                  {genre.name}
                                                </div>
                                              ) : (
                                                ""
                                              );
                                            })
                                          : ""}
                                        {movie.release_date ||
                                        movie.first_air_date ? (
                                          <div className="role status1 btn-outline-danger">
                                            {movie.release_date
                                              ? movie.release_date.slice(0, 4)
                                              : movie.first_air_date.slice(
                                                  0,
                                                  4
                                                )}
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                        {movie.vote_average ? (
                                          <div className="role status2 btn-outline-warning">
                                            {movie.vote_average.toFixed(1)} / 10
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                      <div className="personPopularOverview">
                                        {movie.overview
                                          ? movie.overview.length > 400
                                            ? movie.overview.slice(0, 400) +
                                              "..."
                                            : movie.overview
                                          : ""}
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            </>
                          )
                      )}
                    </div>
                  </>
                ) : (
                  ""
                )}

                {personMoviesCast &&
                personMoviesCast.length > 0 &&
                personDetails &&
                personDetails.known_for_department &&
                personDetails.known_for_department === "Acting" ? (
                  <>
                    <h2 className="sectionHeading">Movies (Acting)</h2>
                    <div className="moviesOuterContainer">
                      {personMoviesCast.map((movie) => (
                        <>
                          <div className="movieContainer">
                            <Link
                              to={`/movie/${movie.id ? movie.id : ""}`}
                              style={{ textDecoration: "none" }}
                            >
                              {movie && movie.poster_path ? (
                                <img
                                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                  alt=""
                                  className="moviePosterHolder"
                                />
                              ) : (
                                <img
                                  src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                                  alt=""
                                  className="movieBlankPosterHolder"
                                />
                              )}
                              {movie.character ? (
                                <div className="movieCharacter">
                                  {movie.character}
                                </div>
                              ) : (
                                ""
                              )}
                              {movie.title ? (
                                <div className="movieName">{movie.title}</div>
                              ) : (
                                ""
                              )}
                              {movie.release_date ? (
                                <div className="movieYear">
                                  {movie.release_date.slice(0, 4)}
                                </div>
                              ) : (
                                ""
                              )}
                            </Link>
                          </div>
                        </>
                      ))}
                    </div>
                  </>
                ) : personMoviesCrew &&
                  personMoviesCrew.length > 0 &&
                  personDetails &&
                  personDetails.known_for_department &&
                  personDetails.known_for_department !== ("Acting" || "") ? (
                  <>
                    <h2 className="sectionHeading">Movies (Production)</h2>
                    <div className="moviesOuterContainer">
                      {personMoviesCrew.map((movie) => (
                        <>
                          <div className="movieContainer">
                            <Link
                              to={`/movie/${movie.id ? movie.id : ""}`}
                              style={{ textDecoration: "none" }}
                            >
                              {movie && movie.poster_path ? (
                                <img
                                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                  alt=""
                                  className="moviePosterHolder"
                                />
                              ) : (
                                <img
                                  src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                                  alt=""
                                  className="movieBlankPosterHolder"
                                />
                              )}

                              {movie.title ? (
                                <div className="movieName">{movie.title}</div>
                              ) : (
                                ""
                              )}
                              {movie.release_date ? (
                                <div className="movieYear">
                                  {movie.release_date.slice(0, 4)}
                                </div>
                              ) : (
                                ""
                              )}
                              {movie.job ? (
                                <>
                                  <div className="movieJobContainer">
                                    {movie.job
                                      .sort((a, b) => b.length - a.length)
                                      .map((role) => (
                                        <div className="movieJob">{role}</div>
                                      ))}
                                  </div>
                                </>
                              ) : (
                                ""
                              )}
                            </Link>
                          </div>
                        </>
                      ))}
                    </div>
                  </>
                ) : (
                  ""
                )}

                {personTVCast &&
                personTVCast.length > 0 &&
                personDetails &&
                personDetails.known_for_department &&
                personDetails.known_for_department === "Acting" ? (
                  <>
                    <h2 className="sectionHeading">TV Shows (Acting)</h2>
                    <div className="moviesOuterContainer">
                      {personTVCast.map((movie) => (
                        <>
                          <div className="movieContainer">
                            <Link
                              to={`/tv/${movie.id ? movie.id : ""}`}
                              style={{ textDecoration: "none" }}
                            >
                              {movie && movie.poster_path ? (
                                <img
                                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                  alt=""
                                  className="moviePosterHolder"
                                />
                              ) : (
                                <img
                                  src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                                  alt=""
                                  className="movieBlankPosterHolder"
                                />
                              )}
                              {movie.character ? (
                                <div className="movieCharacter">
                                  {movie.character}
                                </div>
                              ) : (
                                ""
                              )}
                              {movie.name ? (
                                <div className="movieName">{movie.name}</div>
                              ) : (
                                ""
                              )}
                              {movie.first_air_date ? (
                                <div className="movieYear">
                                  {movie.first_air_date.slice(0, 4)}
                                </div>
                              ) : (
                                ""
                              )}
                            </Link>
                          </div>
                        </>
                      ))}
                    </div>
                  </>
                ) : personTVCrew &&
                  personTVCrew.length > 0 &&
                  personDetails &&
                  personDetails.known_for_department &&
                  personDetails.known_for_department !== ("Acting" || "") ? (
                  <>
                    <h2 className="sectionHeading">TV Shows (Production)</h2>
                    <div className="moviesOuterContainer">
                      {personTVCrew.map((movie) => (
                        <>
                          <div className="movieContainer">
                            <Link
                              to={`/tv/${movie.id ? movie.id : ""}`}
                              style={{ textDecoration: "none" }}
                            >
                              {movie && movie.poster_path ? (
                                <img
                                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                  alt=""
                                  className="moviePosterHolder"
                                />
                              ) : (
                                <img
                                  src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                                  alt=""
                                  className="movieBlankPosterHolder"
                                />
                              )}

                              {movie.name ? (
                                <div className="movieName">{movie.name}</div>
                              ) : (
                                ""
                              )}
                              {movie.first_air_date ? (
                                <div className="movieYear">
                                  {movie.first_air_date.slice(0, 4)}
                                </div>
                              ) : (
                                ""
                              )}
                              {movie.job ? (
                                <>
                                  <div className="movieJobContainer">
                                    {movie.job
                                      .sort((a, b) => b.length - a.length)
                                      .map((role) => (
                                        <div className="movieJob">{role}</div>
                                      ))}
                                  </div>
                                </>
                              ) : (
                                ""
                              )}
                            </Link>
                          </div>
                        </>
                      ))}
                    </div>
                  </>
                ) : (
                  ""
                )}

                {personMoviesCast &&
                personMoviesCast.length > 0 &&
                personDetails &&
                personDetails.known_for_department &&
                personDetails.known_for_department !== "Acting" ? (
                  <>
                    <h2 className="sectionHeading">Movies (Acting)</h2>
                    <div className="moviesOuterContainer">
                      {personMoviesCast.map((movie) => (
                        <>
                          <div className="movieContainer">
                            <Link
                              to={`/movie/${movie.id ? movie.id : ""}`}
                              style={{ textDecoration: "none" }}
                            >
                              {movie && movie.poster_path ? (
                                <img
                                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                  alt=""
                                  className="moviePosterHolder"
                                />
                              ) : (
                                <img
                                  src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                                  alt=""
                                  className="movieBlankPosterHolder"
                                />
                              )}
                              {movie.character ? (
                                <div className="movieCharacter">
                                  {movie.character}
                                </div>
                              ) : (
                                ""
                              )}
                              {movie.title ? (
                                <div className="movieName">{movie.title}</div>
                              ) : (
                                ""
                              )}
                              {movie.release_date ? (
                                <div className="movieYear">
                                  {movie.release_date.slice(0, 4)}
                                </div>
                              ) : (
                                ""
                              )}
                            </Link>
                          </div>
                        </>
                      ))}
                    </div>
                  </>
                ) : personMoviesCrew &&
                  personMoviesCrew.length > 0 &&
                  personDetails &&
                  personDetails.known_for_department &&
                  personDetails.known_for_department === ("Acting" || "") ? (
                  <>
                    <h2 className="sectionHeading">Movies (Production)</h2>
                    <div className="moviesOuterContainer">
                      {personMoviesCrew.map((movie) => (
                        <>
                          <div className="movieContainer">
                            <Link
                              to={`/movie/${movie.id ? movie.id : ""}`}
                              style={{ textDecoration: "none" }}
                            >
                              {movie && movie.poster_path ? (
                                <img
                                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                  alt=""
                                  className="moviePosterHolder"
                                />
                              ) : (
                                <img
                                  src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                                  alt=""
                                  className="movieBlankPosterHolder"
                                />
                              )}

                              {movie.title ? (
                                <div className="movieName">{movie.title}</div>
                              ) : (
                                ""
                              )}
                              {movie.release_date ? (
                                <div className="movieYear">
                                  {movie.release_date.slice(0, 4)}
                                </div>
                              ) : (
                                ""
                              )}
                              {movie.job ? (
                                <>
                                  <div className="movieJobContainer">
                                    {movie.job
                                      .sort((a, b) => b.length - a.length)
                                      .map((role) => (
                                        <div className="movieJob">{role}</div>
                                      ))}
                                  </div>
                                </>
                              ) : (
                                ""
                              )}
                            </Link>
                          </div>
                        </>
                      ))}
                    </div>
                  </>
                ) : (
                  ""
                )}

                {personTVCast &&
                personTVCast.length > 0 &&
                personDetails &&
                personDetails.known_for_department &&
                personDetails.known_for_department !== "Acting" ? (
                  <>
                    <h2 className="sectionHeading">TV Shows (Acting)</h2>
                    <div className="moviesOuterContainer">
                      {personTVCast.map((movie) => (
                        <>
                          <div className="movieContainer">
                            <Link
                              to={`/tv/${movie.id ? movie.id : ""}`}
                              style={{ textDecoration: "none" }}
                            >
                              {movie && movie.poster_path ? (
                                <img
                                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                  alt=""
                                  className="moviePosterHolder"
                                />
                              ) : (
                                <img
                                  src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                                  alt=""
                                  className="movieBlankPosterHolder"
                                />
                              )}
                              {movie.character ? (
                                <div className="movieCharacter">
                                  {movie.character}
                                </div>
                              ) : (
                                ""
                              )}
                              {movie.name ? (
                                <div className="movieName">{movie.name}</div>
                              ) : (
                                ""
                              )}
                              {movie.first_air_date ? (
                                <div className="movieYear">
                                  {movie.first_air_date.slice(0, 4)}
                                </div>
                              ) : (
                                ""
                              )}
                            </Link>
                          </div>
                        </>
                      ))}
                    </div>
                  </>
                ) : personTVCrew &&
                  personTVCrew.length > 0 &&
                  personDetails &&
                  personDetails.known_for_department &&
                  personDetails.known_for_department === ("Acting" || "") ? (
                  <>
                    <h2 className="sectionHeading">TV Shows (Production)</h2>
                    <div className="moviesOuterContainer">
                      {personTVCrew.map((movie) => (
                        <>
                          <div className="movieContainer">
                            <Link
                              to={`/tv/${movie.id ? movie.id : ""}`}
                              style={{ textDecoration: "none" }}
                            >
                              {movie && movie.poster_path ? (
                                <img
                                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                  alt=""
                                  className="moviePosterHolder"
                                />
                              ) : (
                                <img
                                  src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                                  alt=""
                                  className="movieBlankPosterHolder"
                                />
                              )}

                              {movie.name ? (
                                <div className="movieName">{movie.name}</div>
                              ) : (
                                ""
                              )}
                              {movie.first_air_date ? (
                                <div className="movieYear">
                                  {movie.first_air_date.slice(0, 4)}
                                </div>
                              ) : (
                                ""
                              )}
                              {movie.job ? (
                                <>
                                  <div className="movieJobContainer">
                                    {movie.job
                                      .sort((a, b) => b.length - a.length)
                                      .map((role) => (
                                        <div className="movieJob">{role}</div>
                                      ))}
                                  </div>
                                </>
                              ) : (
                                ""
                              )}
                            </Link>
                          </div>
                        </>
                      ))}
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Person;
