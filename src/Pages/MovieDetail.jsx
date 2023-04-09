import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ImgCard from "../Components/ImgCard";
import ImgCardSmall from "../Components/ImgCardSmall";

const MovieDetail = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [currentMovieDetails, setCurrentMovieDetails] = useState();
  const [currentBackdrop, setCurrentBackdrop] = useState();
  // const languages = [];
  const [moviethemes, SetMovieThemes] = useState();
  const [movieCastCrew, SetMovieCastCrew] = useState();
  const [similarMovies, setSimilarMovies] = useState();
  const [userLocaction, setUserLocaction] = useState();
  const [streaming, setStreaming] = useState();
  const [providers, setProviders] = useState();
  const [videos, setVideos] = useState();

  const listType = ["popular", "top_rated", "upcoming", "now_playing"];
  const [displayListType, setDisplayListType] = useState();
  const [randomListType, setRandomListType] = useState();
  const [page, setPage] = useState();
  const [randomGenre, setRandomGenre] = useState();
  const [randomGenreList, setRandomGenreList] = useState();

  //Random genre, Movie Type and Page
  useEffect(() => {
    setRandomListType(listType[Math.floor(Math.random() * listType.length)]);
    setPage(Math.floor(Math.random() * 10 + 1));
  }, [id]);

  //Shuffling the List results
  useEffect(() => {
    if (randomListType && page) {
      fetch(
        `https://api.themoviedb.org/3/movie/${randomListType}?api_key=87c98f2492b42f48b506b2d48f51461e&page=${page}`
      )
        .then((res) => res.json())
        .then((data) => {
          setDisplayListType([...data.results].sort(() => Math.random() - 0.5));
        });
    }
  }, [id, randomListType, page]);

  //All Available Genres Shuffled

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=87c98f2492b42f48b506b2d48f51461e`
    )
      .then((res) => res.json())
      .then((data) => {
        setRandomGenre([...data.genres].sort(() => Math.random() - 0.5)[0]);
      });
  }, [id]);

  // Random Data from the Genres Lists

  useEffect(() => {
    if (randomGenre && page) {
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=87c98f2492b42f48b506b2d48f51461e&page=${page}&with_genres=${randomGenre.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          setRandomGenreList([...data.results].sort(() => Math.random() - 0.5));
        });
    }
  }, [id, randomGenre, page]);

  //Main Movie Details
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=87c98f2492b42f48b506b2d48f51461e&append_to_response=videos,images`
    )
      .then((res) => res.json())
      .then((json) => {
        setCurrentMovieDetails(json);
        setVideos(
          json.videos.results
            .filter((video) => video.site === "YouTube")
            .sort(() => 0.5 - Math.random())
            .slice(0, 2)
        );
        window.scrollTo(0, 0);
      });
  }, [id]);

  // Backdrop, Poster and videos
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=87c98f2492b42f48b506b2d48f51461e&append_to_response=videos,images&include_image_language=null`
    )
      .then((res) => res.json())
      .then((json) => {
        setCurrentBackdrop(json);
        window.scrollTo(0, 0);
      });
  }, [id]);

  //currentBackdrop.videos.results.filter((i) => i.site === "YouTube")
  //
  //Themes
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/keywords?api_key=87c98f2492b42f48b506b2d48f51461e`
    )
      .then((res) => res.json())
      .then((json) => {
        SetMovieThemes(json);
        window.scrollTo(0, 0);
      });
  }, [id]);

  // Getting Language Name and Code
  // useEffect(() => {
  //   if (currentMovieDetails && currentMovieDetails.spoken_languages)
  //     fetch(
  //       "https://api.themoviedb.org/3/configuration/languages?api_key=87c98f2492b42f48b506b2d48f51461e"
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         data
  //           .filter(
  //             (lan) => lan.iso_639_1 === currentMovieDetails.spoken_languages
  //           )
  //           .map((lang) =>
  //             languages.push({ name: lang.name, id: lang.iso_639_1 })
  //           );
  //       });
  // }, [id, languages]);
  // console.log(languages);
  //
  // Cast and Crew
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=87c98f2492b42f48b506b2d48f51461e`
    )
      .then((res) => res.json())
      .then((json) => {
        SetMovieCastCrew(json);
        window.scrollTo(0, 0);
      });
  }, [id]);

  //Similar Movies
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=87c98f2492b42f48b506b2d48f51461e`
    )
      .then((res) => res.json())
      .then((json) => {
        setSimilarMovies(json.results.sort(() => Math.random() - 0.5));
        window.scrollTo(0, 0);
      });
  }, [id]);

  // Get User Location
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        setUserLocaction(data.country_code);
      });
  }, [id]);

  //Streaming
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=87c98f2492b42f48b506b2d48f51461e`
    )
      .then((res) => res.json())
      .then((json) => {
        setStreaming(json.results);
        window.scrollTo(0, 0);
      });
  }, [id]);

  //Providers
  useEffect(() => {
    for (var prop in streaming) {
      if (streaming.hasOwnProperty(prop)) {
        if (prop === userLocaction) {
          setProviders(streaming[prop]);
        }
      }
    }
  }, [userLocaction, streaming]);

  //Skeleton Loading

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1100);
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
              <img
                src={`https://image.tmdb.org/t/p/original${
                  currentBackdrop && currentBackdrop.images.backdrops.length > 0
                    ? currentBackdrop.images.backdrops.filter(
                        (image) => image.width > 1800
                      )[
                        Math.floor(
                          Math.random() *
                            currentBackdrop.images.backdrops.length
                        )
                      ]?.file_path
                    : ""
                }`}
                alt=""
                className="backdrop"
              />
            </div>
          </div>
          <div className="d-flex flex-column">
            <div className="movieDetailContainer">
              <div className="leftContainer">
                <div className="posterContainer">
                  {currentMovieDetails &&
                  currentMovieDetails.images.posters.length > 0 ? (
                    <img
                      src={`https://image.tmdb.org/t/p/original${
                        currentMovieDetails &&
                        currentMovieDetails.images.posters.length > 0
                          ? currentMovieDetails.images.posters[
                              Math.floor(
                                Math.random() *
                                  currentMovieDetails.images.posters.length
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
                <div className="linkHolder">
                  {currentMovieDetails && currentMovieDetails.imdb_id ? (
                    <Link
                      to={`https://www.imdb.com/title/${
                        currentMovieDetails && currentMovieDetails.imdb_id
                          ? currentMovieDetails.imdb_id
                          : ""
                      }`}
                      target="_blank"
                    >
                      <div className="link btn btn-warning">IMDB</div>
                    </Link>
                  ) : (
                    ""
                  )}
                  {currentMovieDetails && currentMovieDetails.homepage ? (
                    <Link
                      to={`${
                        currentMovieDetails ? currentMovieDetails.homepage : ""
                      }`}
                      target="_blank"
                    >
                      <div className="link btn btn-danger">WebSite</div>
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="rightContainer">
                {currentMovieDetails && currentMovieDetails.title ? (
                  <h1 className="movieTitle">
                    {currentMovieDetails ? currentMovieDetails.title : ""}
                  </h1>
                ) : (
                  ""
                )}
                {currentMovieDetails && currentMovieDetails.tagline ? (
                  <div className="tagline">
                    {currentMovieDetails ? currentMovieDetails.tagline : ""}
                  </div>
                ) : (
                  ""
                )}
                <div className="yearRuntimeRatingContainer">
                  {currentMovieDetails && currentMovieDetails.release_date ? (
                    <>
                      <Link
                        to={`/movie/year/${currentMovieDetails.release_date.slice(
                          0,
                          4
                        )}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="year">
                          {currentMovieDetails &&
                          currentMovieDetails.release_date
                            ? currentMovieDetails.release_date.slice(0, 4)
                            : ""}
                        </div>
                      </Link>
                    </>
                  ) : (
                    ""
                  )}
                  {currentMovieDetails && currentMovieDetails.runtime > 0 ? (
                    <div className="runtime">
                      {currentMovieDetails
                        ? currentMovieDetails.runtime + " " + "Mins"
                        : ""}
                    </div>
                  ) : (
                    ""
                  )}
                  {currentMovieDetails && currentMovieDetails.spoken_languages
                    ? currentMovieDetails.spoken_languages.map((language) => (
                        <>
                          <Link
                            to={`/movie/language/${language.iso_639_1}&${language.english_name}`}
                            style={{ textDecoration: "none" }}
                          >
                            <div className="language" id={language.iso_639_1}>
                              {language.english_name}
                            </div>
                          </Link>
                        </>
                      ))
                    : ""}
                  {currentMovieDetails &&
                  currentMovieDetails.vote_average > 0 ? (
                    <div className="rating">
                      {currentMovieDetails
                        ? currentMovieDetails.vote_average.toFixed(1) +
                          " " +
                          "/ 10"
                        : ""}
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                {currentMovieDetails && currentMovieDetails.genres ? (
                  <div className="genreContainer">
                    {currentMovieDetails && currentMovieDetails.genres
                      ? currentMovieDetails.genres.map((genre) => (
                          <>
                            <Link
                              to={`/movie/genre/${genre.id}&${genre.name}`}
                              style={{ textDecoration: "none" }}
                            >
                              <div className="genreContainer">
                                <div className="genre" id={genre.id}>
                                  {genre.name}
                                </div>
                              </div>
                            </Link>
                          </>
                        ))
                      : ""}
                  </div>
                ) : (
                  ""
                )}
                {currentMovieDetails && currentMovieDetails.overview ? (
                  <div className="overview">
                    {currentMovieDetails ? currentMovieDetails.overview : ""}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="movieMiddleDetailContainer">
              <div className="leftMiddleContainer">
                {movieCastCrew && movieCastCrew.crew.length > 0 ? (
                  <h1 className="sectionHeading">CREW</h1>
                ) : (
                  ""
                )}
                {movieCastCrew && movieCastCrew.crew ? (
                  <div className="crewContainer">
                    {movieCastCrew.crew
                      .filter((director) => director.job === "Director")
                      .map((director) => (
                        <>
                          <Link
                            to={`/person/${director.id ? director.id : ""}`}
                          >
                            <div className="directorContainer">
                              {director.profile_path ? (
                                <img
                                  src={`https://image.tmdb.org/t/p/original${director.profile_path}`}
                                  alt=""
                                  className="ccCardHolder"
                                />
                              ) : (
                                <img
                                  className="ccBlankCardHolder"
                                  src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
                                  alt=""
                                />
                              )}
                              <div className="ccName">
                                {director.name ? director.name : ""}
                              </div>
                              <div className="ccTitle">
                                {director ? "Director" : ""}
                              </div>
                            </div>
                          </Link>
                        </>
                      ))}

                    {movieCastCrew &&
                    movieCastCrew.crew &&
                    movieCastCrew.crew.find(
                      (composer) => composer.job === "Original Music Composer"
                    ) &&
                    movieCastCrew.crew.find(
                      (composer) => composer.job === "Original Music Composer"
                    ).id ? (
                      <Link
                        to={`/person/${
                          movieCastCrew && movieCastCrew.crew
                            ? movieCastCrew.crew.find(
                                (composer) =>
                                  composer.job === "Original Music Composer"
                              ).id
                            : ""
                        }`}
                      >
                        <div className="composerContainer">
                          {movieCastCrew &&
                          movieCastCrew.crew &&
                          movieCastCrew.crew.find(
                            (composer) =>
                              composer.job === "Original Music Composer"
                          ).profile_path ? (
                            <img
                              className="ccCardHolder"
                              src={`https://image.tmdb.org/t/p/original${
                                movieCastCrew && movieCastCrew.crew
                                  ? movieCastCrew.crew.find(
                                      (composer) =>
                                        composer.job ===
                                        "Original Music Composer"
                                    ).profile_path
                                  : ""
                              }`}
                              alt=""
                            />
                          ) : (
                            <img
                              className="ccBlankCardHolder"
                              src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
                              alt=""
                            />
                          )}
                          <div className="ccName">
                            {movieCastCrew && movieCastCrew.crew
                              ? movieCastCrew.crew.find(
                                  (composer) =>
                                    composer.job === "Original Music Composer"
                                ).name
                              : ""}
                          </div>
                          <div className="ccTitle">
                            {movieCastCrew && movieCastCrew.crew
                              ? "Composer"
                              : ""}
                          </div>
                        </div>
                      </Link>
                    ) : (
                      ""
                    )}
                    {movieCastCrew &&
                    movieCastCrew.crew &&
                    movieCastCrew.crew.find(
                      (dop) => dop.job === "Director of Photography"
                    ) &&
                    movieCastCrew.crew.find(
                      (dop) => dop.job === "Director of Photography"
                    ).id ? (
                      <Link
                        to={`/person/${
                          movieCastCrew && movieCastCrew.crew
                            ? movieCastCrew.crew.find(
                                (dop) => dop.job === "Director of Photography"
                              ).id
                            : ""
                        }`}
                      >
                        <div className="dopContainer">
                          {movieCastCrew &&
                          movieCastCrew.crew &&
                          movieCastCrew.crew.find(
                            (dop) => dop.job === "Director of Photography"
                          ).profile_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/original${
                                movieCastCrew && movieCastCrew.crew
                                  ? movieCastCrew.crew.find(
                                      (dop) =>
                                        dop.job === "Director of Photography"
                                    ).profile_path
                                  : ""
                              }`}
                              alt=""
                              className="ccCardHolder"
                            />
                          ) : (
                            <img
                              className="ccBlankCardHolder"
                              src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
                              alt=""
                            />
                          )}
                          <div className="ccName">
                            {movieCastCrew && movieCastCrew.crew
                              ? movieCastCrew.crew.find(
                                  (dop) => dop.job === "Director of Photography"
                                ).name
                              : ""}
                          </div>
                          <div className="ccTitle">
                            {movieCastCrew && movieCastCrew.crew ? "D.O.P" : ""}
                          </div>
                        </div>
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}
                {movieCastCrew && movieCastCrew.cast.length > 0 ? (
                  <h1 className="sectionHeading">CAST</h1>
                ) : (
                  ""
                )}
                <div className="castContainer">
                  {movieCastCrew && movieCastCrew.cast
                    ? movieCastCrew.cast.slice(0, 6).map((cast) => (
                        <>
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
                              <div className="ccName">{cast.name}</div>
                              <div className="ccTitle">{cast.character}</div>
                            </div>
                          </Link>
                        </>
                      ))
                    : ""}
                </div>
                <div className="streamingVideoContainer">
                  <div>
                    <h1 className="sectionHeading">STREAMING</h1>

                    <div className="streamingContainer">
                      <Link
                        style={{ textDecoration: "none" }}
                        to={
                          streaming &&
                          userLocaction &&
                          providers &&
                          providers.link
                            ? providers.link
                            : ""
                        }
                        target="_blank"
                      >
                        <div className="streamingHeader">Where To Watch</div>
                        {streaming &&
                        providers &&
                        providers.flatrate &&
                        userLocaction ? (
                          providers.flatrate.slice(0, 3).map((streaming) => (
                            <div>
                              <div className="streamingContent">
                                <img
                                  className="streamingLogo"
                                  src={`https://www.themoviedb.org/t/p/original${streaming.logo_path}`}
                                  alt=""
                                />
                                <div className="streamingName">
                                  {streaming.provider_name}
                                </div>
                              </div>
                              <div className="streamingSplitter" />
                            </div>
                          ))
                        ) : (
                          <>
                            <div className="streamingContent">
                              <div className="streamingNoName">
                                Not available to stream.
                              </div>
                            </div>
                          </>
                        )}
                        <div className="streamingFooter">
                          Data Powered by TMDB
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div>
                    {videos && videos.length > 0 ? (
                      <>
                        <h1 className="sectionHeading">TRAILERS & MORE...</h1>
                        {videos && videos.length === 2
                          ? videos.map((video) => (
                              <div className="embed-responsive embed-responsive-16by9 w-75 m-4">
                                <iframe
                                  title="myFrame"
                                  className="embed-responsive-item"
                                  src={`https://www.youtube.com/embed/${video.key}`}
                                ></iframe>
                              </div>
                            ))
                          : videos.map((video) => (
                              <div className="embed-responsive embed-responsive-16by9 ml-4 mt-4">
                                <iframe
                                  title="myFrame"
                                  className="embed-responsive-item"
                                  src={`https://www.youtube.com/embed/${video.key}`}
                                ></iframe>
                              </div>
                            ))}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {moviethemes && moviethemes.keywords.length > 0 ? (
                  <h1 className="sectionHeading">THEMES</h1>
                ) : (
                  ""
                )}
                <div className="themesContainer">
                  {moviethemes && moviethemes.keywords
                    ? moviethemes.keywords.map(
                        (theme, index) =>
                          index < 20 && (
                            <>
                              <Link
                                to={`/movie/theme/${theme.id}&${theme.name}`}
                                style={{ textDecoration: "none" }}
                              >
                                <div className="themesContainer">
                                  <div className="theme" id={theme.id}>
                                    {theme.name}
                                  </div>
                                </div>
                              </Link>
                            </>
                          )
                      )
                    : ""}
                </div>
              </div>
              <div className="rightMiddleContainer">
                <div className="rightMiddleBox">
                  {randomGenre &&
                  randomGenre.name &&
                  randomGenreList &&
                  randomGenreList.length > 0 ? (
                    <h1 className="sectionHeading rightMiddleHeading">
                      {randomGenre.name.toUpperCase().replace(/_/g, " ") +
                        " " +
                        "MOVIES"}
                    </h1>
                  ) : (
                    ""
                  )}
                  <div className="d-flex flex-column align-items-center flex-wrap">
                    {randomGenre && randomGenreList && randomGenreList
                      ? randomGenreList.map(
                          (movie, index) =>
                            index < 2 && (
                              <>
                                <div>
                                  <Link
                                    style={{ textDecoration: "none" }}
                                    to={`/movie/${movie.id}`}
                                  >
                                    <ImgCardSmall
                                      key={movie.id ? movie.id : ""}
                                      image={
                                        movie.poster_path
                                          ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                                          : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                                      }
                                      title={movie.title ? movie.title : ""}
                                      year={
                                        movie.release_date
                                          ? movie.release_date
                                          : ""
                                      }
                                      overview={
                                        movie.overview ? movie.overview : ""
                                      }
                                      genreID={
                                        movie.genre_ids
                                          ? movie.genre_ids.map(
                                              (genre) => genre
                                            )
                                          : ""
                                      }
                                    />
                                  </Link>
                                </div>
                              </>
                            )
                        )
                      : ""}
                    <Link
                      to={`/movie/genre/${randomGenre.id}&${randomGenre.name}`}
                    >
                      <div className="btn btn-primary px-5 mb-2">SHOW MORE</div>
                    </Link>
                  </div>
                </div>
                <div className="rightMiddleBox">
                  {displayListType &&
                  randomListType &&
                  displayListType.length > 0 ? (
                    <h1 className="sectionHeading rightMiddleHeading">
                      {randomListType.toUpperCase().replace(/_/g, " ") +
                        " " +
                        "MOVIES"}
                    </h1>
                  ) : (
                    ""
                  )}
                  <div className="d-flex flex-column align-items-center flex-wrap">
                    {displayListType
                      ? displayListType.map(
                          (movie, index) =>
                            index < 2 && (
                              <>
                                <div>
                                  <Link
                                    style={{ textDecoration: "none" }}
                                    to={`/movie/${movie.id}`}
                                  >
                                    <ImgCardSmall
                                      key={movie.id ? movie.id : ""}
                                      image={
                                        movie.poster_path
                                          ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                                          : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                                      }
                                      title={movie.title ? movie.title : ""}
                                      year={
                                        movie.release_date
                                          ? movie.release_date
                                          : ""
                                      }
                                      overview={
                                        movie.overview ? movie.overview : ""
                                      }
                                      genreID={
                                        movie.genre_ids
                                          ? movie.genre_ids.map(
                                              (genre) => genre
                                            )
                                          : ""
                                      }
                                    />
                                  </Link>
                                </div>
                              </>
                            )
                        )
                      : ""}
                    <Link to={`/${randomListType}`}>
                      <div className="btn btn-success px-5 mb-2">SHOW MORE</div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="movieBottomDetailContainer">
              {similarMovies && similarMovies.length > 0 ? (
                <h1 className="sectionHeading">SIMILAR FILMS</h1>
              ) : (
                ""
              )}
              <div className="d-flex justify-content-around flex-wrap">
                {similarMovies
                  ? similarMovies.map(
                      (movie, index) =>
                        index < 20 && (
                          <>
                            <div>
                              <Link to={`/movie/${movie.id}`}>
                                <ImgCard
                                  key={movie.id ? movie.id : ""}
                                  image={
                                    movie.poster_path
                                      ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                                      : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                                  }
                                  title={movie.title ? movie.title : ""}
                                  year={
                                    movie.release_date ? movie.release_date : ""
                                  }
                                  overview={
                                    movie.overview ? movie.overview : ""
                                  }
                                />
                              </Link>
                            </div>
                          </>
                        )
                    )
                  : ""}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
