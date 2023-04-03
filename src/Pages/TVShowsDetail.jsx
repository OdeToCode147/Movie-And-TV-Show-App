import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ImgCard from "../Components/ImgCard";
import ImgCardSmall from "../Components/ImgCardSmall";

const TVShowsDetail = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [currentTvDetails, setCurrentTvDetails] = useState();
  const [currentBackdrop, setCurrentBackdrop] = useState();
  const [mainCastCrew, setMainCastCrew] = useState();
  const [allCastCrew, setAllCastCrew] = useState();
  const [userLocaction, setUserLocaction] = useState();
  const [streaming, setStreaming] = useState();
  const [providers, setProviders] = useState();
  const [tvthemes, SetTvThemes] = useState();
  const [similarTv, setSimilarTv] = useState();
  const [videos, setVideos] = useState();

  const [tvPage, setTvPage] = useState();
  const [moviePage, setMoviePage] = useState();
  const movieListType = ["popular", "top_rated", "upcoming", "now_playing"];
  const [randomMovieListType, setRandomMovieListType] = useState();
  const tvListType = ["popular", "top_rated", "airing_today", "on_the_air"];

  const [randomTvListType, setRandomTvListType] = useState();
  const [displayMovieListType, setDisplayMovieListType] = useState();
  const [displayTvListType, setDisplayTvListType] = useState();

  const [randomMovieGenres, setRandomMovieGenres] = useState();
  const [randomMovieGenreList, setRandomMovieGenreList] = useState([]);
  const [finalMovieGenreList, setFinalMovieGenreList] = useState();

  const [randomTvGenres, setRandomTvGenres] = useState([]);
  const [randomTvGenreList, setRandomTvGenreList] = useState([]);
  const [finalTvGenreList, setFinalTvGenreList] = useState();

  //Random genre, Movie,TV list Type and Page

  useEffect(() => {
    setRandomTvGenres(
      [
        {
          id: 10759,
          name: "Action & Adventure",
        },
        {
          id: 16,
          name: "Animation",
        },
        {
          id: 35,
          name: "Comedy",
        },
        {
          id: 80,
          name: "Crime",
        },
        {
          id: 99,
          name: "Documentary",
        },
        {
          id: 18,
          name: "Drama",
        },
        {
          id: 10751,
          name: "Family",
        },
        {
          id: 10762,
          name: "Kids",
        },
        {
          id: 9648,
          name: "Mystery",
        },
        {
          id: 10763,
          name: "News",
        },
        {
          id: 10764,
          name: "Reality",
        },
        {
          id: 10765,
          name: "Sci-Fi & Fantasy",
        },
        {
          id: 10766,
          name: "Soap",
        },
        {
          id: 10767,
          name: "Talk",
        },
        {
          id: 10768,
          name: "War & Politics",
        },
        {
          id: 37,
          name: "Western",
        },
      ].sort(() => Math.random() - 0.5)
    );
    setRandomMovieGenres(
      [
        {
          id: 28,
          name: "Action",
        },
        {
          id: 12,
          name: "Adventure",
        },
        {
          id: 16,
          name: "Animation",
        },
        {
          id: 35,
          name: "Comedy",
        },
        {
          id: 80,
          name: "Crime",
        },
        {
          id: 99,
          name: "Documentary",
        },
        {
          id: 18,
          name: "Drama",
        },
        {
          id: 10751,
          name: "Family",
        },
        {
          id: 14,
          name: "Fantasy",
        },
        {
          id: 36,
          name: "History",
        },
        {
          id: 27,
          name: "Horror",
        },
        {
          id: 10402,
          name: "Music",
        },
        {
          id: 9648,
          name: "Mystery",
        },
        {
          id: 10749,
          name: "Romance",
        },
        {
          id: 878,
          name: "Science Fiction",
        },
        {
          id: 10770,
          name: "TV Movie",
        },
        {
          id: 53,
          name: "Thriller",
        },
        {
          id: 10752,
          name: "War",
        },
        {
          id: 37,
          name: "Western",
        },
      ].sort(() => Math.random() - 0.5)
    );
  }, [id]);

  useEffect(() => {
    setRandomTvListType(
      tvListType[Math.floor(Math.random() * tvListType.length)]
    );

    setRandomMovieListType(
      movieListType[Math.floor(Math.random() * movieListType.length)]
    );

    setTvPage(Math.floor(Math.random() * 7 + 1));
    setMoviePage(Math.floor(Math.random() * 10 + 1));
  }, [id]);

  //Shuffling the List results Movie and TV

  useEffect(() => {
    if (randomTvListType && tvPage) {
      fetch(
        `https://api.themoviedb.org/3/tv/${randomTvListType}?api_key=87c98f2492b42f48b506b2d48f51461e&page=${tvPage}`
      )
        .then((res) => res.json())
        .then((data) => {
          setDisplayTvListType(
            [...data.results].sort(() => Math.random() - 0.5)
          );
        });
    }
  }, [id, randomTvListType]);

  useEffect(() => {
    if (randomMovieListType && moviePage) {
      fetch(
        `https://api.themoviedb.org/3/movie/${randomMovieListType}?api_key=87c98f2492b42f48b506b2d48f51461e&page=${moviePage}`
      )
        .then((res) => res.json())
        .then((data) => {
          setDisplayMovieListType(
            [...data.results].sort(() => Math.random() - 0.5)
          );
        });
    }
  }, [id, randomMovieListType]);

  //All Available Genres Shuffled

  // useEffect(() => {
  //   fetch(
  //     `https://api.themoviedb.org/3/genre/movie/list?api_key=87c98f2492b42f48b506b2d48f51461e`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setRandomMovieGenres([...data.genres].sort(() => Math.random() - 0.5));
  //     });

  //   fetch(
  //     `https://api.themoviedb.org/3/genre/tv/list?api_key=87c98f2492b42f48b506b2d48f51461e`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setRandomTvGenres([...data.genres].sort(() => Math.random() - 0.5));
  //     });
  // }, [id]);

  // Random Data from the Genres Lists

  useEffect(() => {
    if (currentTvDetails && currentTvDetails.number_of_seasons) {
      if (currentTvDetails.number_of_seasons > 16) {
        let limit = 8;
        for (let index = 0; index < limit; index++) {
          if (
            tvPage &&
            randomTvGenres &&
            randomTvGenres[index] &&
            randomTvGenres[index].id
          ) {
            fetch(
              `https://api.themoviedb.org/3/discover/tv?api_key=87c98f2492b42f48b506b2d48f51461e&page=${tvPage}&with_genres=${randomTvGenres[index].id}`
            )
              .then((res) => res.json())
              .then((data) => {
                setRandomTvGenreList((prevData) => [
                  ...prevData,
                  {
                    genreName: randomTvGenres[index].name,
                    genreID: randomTvGenres[index].id,
                    results: data.results,
                  },
                ]);
              });
          }
        }
      } else if (currentTvDetails.number_of_seasons === 1) {
        for (let index = 0; index < 2; index++) {
          if (
            tvPage &&
            randomTvGenres &&
            randomTvGenres[index] &&
            randomTvGenres[index].id
          ) {
            fetch(
              `https://api.themoviedb.org/3/discover/tv?api_key=87c98f2492b42f48b506b2d48f51461e&page=${tvPage}&with_genres=${randomTvGenres[index].id}`
            )
              .then((res) => res.json())
              .then((data) => {
                setRandomTvGenreList((prevData) => [
                  ...prevData,
                  {
                    genreName: randomTvGenres[index].name,
                    genreID: randomTvGenres[index].id,
                    results: data.results,
                  },
                ]);
              });
          }
        }
      } else {
        for (
          let index = 0;
          index < Math.ceil(currentTvDetails.number_of_seasons / 2);
          index++
        ) {
          if (
            tvPage &&
            randomTvGenres &&
            randomTvGenres[index] &&
            randomTvGenres[index].id
          ) {
            fetch(
              `https://api.themoviedb.org/3/discover/tv?api_key=87c98f2492b42f48b506b2d48f51461e&page=${tvPage}&with_genres=${randomTvGenres[index].id}`
            )
              .then((res) => res.json())
              .then((data) => {
                setRandomTvGenreList((prevData) => [
                  ...prevData,
                  {
                    genreName: randomTvGenres[index].name,
                    genreID: randomTvGenres[index].id,
                    results: data.results,
                  },
                ]);
              });
          }
        }
      }
    }
    (function cleanUp() {
      setRandomTvGenreList([]);
    })();
  }, [currentTvDetails]);

  useEffect(() => {
    if (currentTvDetails && currentTvDetails.number_of_seasons) {
      if (currentTvDetails.number_of_seasons > 19) {
        let limit = 9;
        for (let index = 0; index < limit; index++) {
          if (
            moviePage &&
            randomMovieGenres &&
            randomMovieGenres[index] &&
            randomMovieGenres[index].id
          ) {
            fetch(
              `https://api.themoviedb.org/3/discover/movie?api_key=87c98f2492b42f48b506b2d48f51461e&page=${moviePage}&with_genres=${randomMovieGenres[index].id}`
            )
              .then((res) => res.json())
              .then((data) => {
                setRandomMovieGenreList((prevData) => [
                  ...prevData,
                  {
                    genreName: randomMovieGenres[index].name,
                    genreID: randomMovieGenres[index].id,
                    results: data.results,
                  },
                ]);
              });
          }
        }
      } else if (currentTvDetails.number_of_seasons === 1) {
        for (let index = 0; index < 1; index++) {
          if (
            moviePage &&
            randomMovieGenres &&
            randomMovieGenres[index] &&
            randomMovieGenres[index].id
          ) {
            fetch(
              `https://api.themoviedb.org/3/discover/movie?api_key=87c98f2492b42f48b506b2d48f51461e&page=${moviePage}&with_genres=${randomMovieGenres[index].id}`
            )
              .then((res) => res.json())
              .then((data) => {
                setRandomMovieGenreList((prevData) => [
                  ...prevData,
                  {
                    genreName: randomMovieGenres[index].name,
                    genreID: randomMovieGenres[index].id,
                    results: data.results,
                  },
                ]);
              });
          }
        }
      } else {
        for (
          let index = 0;
          index < Math.ceil(currentTvDetails.number_of_seasons / 2) - 1;
          index++
        ) {
          if (
            moviePage &&
            randomMovieGenres &&
            randomMovieGenres[index] &&
            randomMovieGenres[index].id
          ) {
            fetch(
              `https://api.themoviedb.org/3/discover/movie?api_key=87c98f2492b42f48b506b2d48f51461e&page=${moviePage}&with_genres=${randomMovieGenres[index].id}`
            )
              .then((res) => res.json())
              .then((data) => {
                setRandomMovieGenreList((prevData) => [
                  ...prevData,
                  {
                    genreName: randomMovieGenres[index].name,
                    genreID: randomMovieGenres[index].id,
                    results: data.results,
                  },
                ]);
              });
          }
        }
      }
    }
    (function cleanUp() {
      setRandomMovieGenreList([]);
    })();
  }, [currentTvDetails]);

  //Set Data for Genre Lists to Display

  useEffect(() => {
    if (randomMovieGenreList) {
      const finalList = randomMovieGenreList.map((genre) => {
        return {
          genreName: genre.genreName,
          genreID: genre.genreID,
          details: genre.results.map((movie) => ({
            id: movie.id,
            title: movie.name,
            overview: movie.overview,
            genre_ids: movie.genre_ids,
            release_date: movie.release_date,
            poster_path: movie.poster_path,
          })),
        };
      });
      setFinalMovieGenreList(finalList);
    }
  }, [randomMovieGenreList, id]);

  useEffect(() => {
    if (randomTvGenreList) {
      const finalList = randomTvGenreList.map((genre) => {
        return {
          genreName: genre.genreName,
          genreID: genre.genreID,
          details: genre.results.map((tvShow) => ({
            id: tvShow.id,
            title: tvShow.name,
            overview: tvShow.overview,
            genre_ids: tvShow.genre_ids,
            release_date: tvShow.first_air_date,
            poster_path: tvShow.poster_path,
          })),
        };
      });
      setFinalTvGenreList(finalList);
    }
  }, [randomTvGenreList, id]);

  //Main TV Details with Posters, Backdrops and Videos
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=87c98f2492b42f48b506b2d48f51461e&append_to_response=videos,images`
    )
      .then((res) => res.json())
      .then((data) => {
        setCurrentTvDetails(data);
        setVideos(
          data.videos.results
            .filter((video) => video.site === "YouTube")
            .sort(() => 0.5 - Math.random())
            .slice(0, 2)
        );
        window.scrollTo(0, 0);
      });
  }, [id]);

  //Backdrops
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=87c98f2492b42f48b506b2d48f51461e&append_to_response=videos,images&include_image_language=null`
    )
      .then((res) => res.json())
      .then((data) => {
        setCurrentBackdrop(data);
        window.scrollTo(0, 0);
      });
  }, [id]);

  //Cast and Crew without Episode Count

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}/credits?api_key=87c98f2492b42f48b506b2d48f51461e&append_to_response=videos,images`
    )
      .then((res) => res.json())
      .then((data) => {
        setMainCastCrew(data);
        window.scrollTo(0, 0);
      });
  }, [id]);

  //Cast and Crew with Episode Count
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}/aggregate_credits?api_key=87c98f2492b42f48b506b2d48f51461e&append_to_response=videos,images`
    )
      .then((res) => res.json())
      .then((data) => {
        setAllCastCrew(data);
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
      `https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=87c98f2492b42f48b506b2d48f51461e`
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

  //Themes

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}/keywords?api_key=87c98f2492b42f48b506b2d48f51461e`
    )
      .then((res) => res.json())
      .then((json) => {
        SetTvThemes(json);
        window.scrollTo(0, 0);
      });
  }, [id]);

  //Similar Movies
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=87c98f2492b42f48b506b2d48f51461e`
    )
      .then((res) => res.json())
      .then((json) => {
        setSimilarTv(json.results.sort(() => Math.random() - 0.5));
        window.scrollTo(0, 0);
      });
  }, [id]);

  //Skeleton Loading

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
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
            <div className="movieDetailContainer img-fluid">
              <div className="leftContainer">
                <div className="posterContainer">
                  {currentTvDetails &&
                  currentTvDetails.images.posters.length > 0 ? (
                    <img
                      src={`https://image.tmdb.org/t/p/original${
                        currentTvDetails &&
                        currentTvDetails.images.posters.length > 0
                          ? currentTvDetails.images.posters[
                              Math.floor(
                                Math.random() *
                                  currentTvDetails.images.posters.length
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
                  {id ? (
                    <Link
                      to={`https://www.themoviedb.org/tv/${id}`}
                      target="_blank"
                    >
                      <div className="link btn btn-danger">TMDB</div>
                    </Link>
                  ) : (
                    ""
                  )}
                  {currentTvDetails && currentTvDetails.homepage ? (
                    <Link
                      to={`${
                        currentTvDetails ? currentTvDetails.homepage : ""
                      }`}
                      target="_blank"
                    >
                      <div className="link btn btn-warning">WebSite</div>
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="rightContainer">
                {currentTvDetails && currentTvDetails.name ? (
                  <h1 className="movieTitle">
                    {currentTvDetails ? currentTvDetails.name : ""}
                  </h1>
                ) : (
                  ""
                )}
                {currentTvDetails && currentTvDetails.tagline ? (
                  <div className="tagline">
                    {currentTvDetails ? currentTvDetails.tagline : ""}
                  </div>
                ) : (
                  ""
                )}

                <div className="yearRuntimeRatingContainer">
                  {currentTvDetails &&
                  currentTvDetails.first_air_date &&
                  currentTvDetails.last_air_date ? (
                    <>
                      <Link
                        to={`/tv/year/${currentTvDetails.first_air_date.slice(
                          0,
                          4
                        )}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="year">
                          {currentTvDetails.first_air_date.slice(0, 4)}
                        </div>
                      </Link>
                      <Link
                        to={`/tv/year/${currentTvDetails.last_air_date.slice(
                          0,
                          4
                        )}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="year">
                          {currentTvDetails.last_air_date.slice(0, 4)}
                        </div>
                      </Link>
                    </>
                  ) : (
                    ""
                  )}
                  {currentTvDetails && currentTvDetails.status ? (
                    <div className="status status1 btn-outline-danger">
                      {currentTvDetails.status}
                    </div>
                  ) : (
                    ""
                  )}
                  {currentTvDetails && currentTvDetails.number_of_seasons ? (
                    <div className="status status2 btn-outline-warning">
                      {currentTvDetails.number_of_seasons}{" "}
                      {currentTvDetails.number_of_seasons > 1
                        ? "Seasons"
                        : "Season"}
                    </div>
                  ) : (
                    ""
                  )}
                  {currentTvDetails && currentTvDetails.number_of_episodes ? (
                    <div className="status status3 btn-outline-success">
                      {currentTvDetails.number_of_episodes}{" "}
                      {currentTvDetails.number_of_episodes > 1
                        ? "Episodes"
                        : "Episode"}{" "}
                    </div>
                  ) : (
                    ""
                  )}
                  {currentTvDetails && currentTvDetails.episode_run_time > 0 ? (
                    <div className="status status4 btn-outline-primary">
                      {currentTvDetails
                        ? currentTvDetails.episode_run_time + " " + "Mins"
                        : ""}
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                {currentTvDetails && currentTvDetails.genres ? (
                  <div className="genreContainer">
                    {currentTvDetails && currentTvDetails.genres
                      ? currentTvDetails.genres.map((genre) => (
                          <>
                            <Link
                              to={`/tv/genre/${genre.id}&${genre.name}`}
                              style={{ textDecoration: "none" }}
                            >
                              <div className="genreContainer">
                                <div className="tvGenre" id={genre.id}>
                                  {genre.name}
                                </div>
                              </div>
                            </Link>
                          </>
                        ))
                      : ""}
                    {currentTvDetails && currentTvDetails.spoken_languages
                      ? currentTvDetails.spoken_languages.map((language) => (
                          <>
                            <Link
                              to={`/tv/language/${language.iso_639_1}&${language.english_name}`}
                              style={{ textDecoration: "none" }}
                            >
                              <div className="genreContainer">
                                <div
                                  className="tvGenre"
                                  id={language.iso_639_1}
                                >
                                  {language.english_name}
                                </div>
                              </div>
                            </Link>
                          </>
                        ))
                      : ""}
                    {currentTvDetails && currentTvDetails.vote_average > 0 ? (
                      <div className="genreContainer">
                        <div className="tvGenre">
                          {currentTvDetails
                            ? currentTvDetails.vote_average.toFixed(1) +
                              " " +
                              "/ 10"
                            : ""}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}

                {currentTvDetails && currentTvDetails.overview ? (
                  <div className="tvOverview">
                    {currentTvDetails ? currentTvDetails.overview : ""}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="movieMiddleDetailContainer">
              <div className="leftMiddleContainer">
                {(currentTvDetails && currentTvDetails.created_by) ||
                (mainCastCrew && mainCastCrew.crew) ? (
                  <>
                    <h1 className="sectionHeading">CREATORS</h1>
                    <div className="crewContainer">
                      {currentTvDetails && currentTvDetails.created_by
                        ? currentTvDetails.created_by.map((creator) => (
                            <>
                              <Link
                                to={`https://www.themoviedb.org/person/${
                                  creator.id ? creator.id : ""
                                }`}
                                target="_blank"
                              >
                                <div className="directorContainer">
                                  {creator.profile_path ? (
                                    <img
                                      src={`https://image.tmdb.org/t/p/original${creator.profile_path}`}
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
                                    {creator.name ? creator.name : ""}
                                  </div>
                                  <div className="ccTitle">
                                    {creator ? "Creator" : ""}
                                  </div>
                                </div>
                              </Link>
                            </>
                          ))
                        : ""}
                      {mainCastCrew.crew
                        ? mainCastCrew.crew
                            .filter((writer) => writer.department === "Writing")
                            .map((writer) => (
                              <>
                                <Link
                                  to={`https://www.themoviedb.org/person/${
                                    writer.id ? writer.id : ""
                                  }`}
                                  target="_blank"
                                >
                                  <div className="directorContainer">
                                    {writer.profile_path ? (
                                      <img
                                        src={`https://image.tmdb.org/t/p/original${writer.profile_path}`}
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
                                      {writer.name ? writer.name : ""}
                                    </div>
                                    <div className="ccTitle">
                                      {writer ? "Writer" : ""}
                                    </div>
                                  </div>
                                </Link>
                              </>
                            ))
                        : ""}
                    </div>
                  </>
                ) : (
                  ""
                )}
                {allCastCrew &&
                allCastCrew.cast &&
                allCastCrew.cast.length > 0 ? (
                  <>
                    <h1 className="sectionHeading">CAST</h1>
                    <div className="castContainer">
                      {allCastCrew.cast
                        .sort((a, b) => a.order - b.order)
                        .map(
                          (cast, index) =>
                            index < 24 && (
                              <div>
                                <Link
                                  to={`https://www.themoviedb.org/person/${
                                    cast ? cast.id : ""
                                  }`}
                                  target="_blank"
                                >
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
                                      {cast.roles[0].character}
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            )
                        )}
                    </div>
                  </>
                ) : (
                  ""
                )}
                <div>
                  {currentTvDetails &&
                  currentTvDetails.id &&
                  currentTvDetails.seasons ? (
                    <>
                      <h1 className="sectionHeading">SEASONS</h1>
                      {currentTvDetails.seasons.map((season) => (
                        <Link
                          to={`/tv/${currentTvDetails.id}/season/${
                            season.id ? season.season_number : ""
                          }`}
                          style={{ textDecoration: "none" }}
                        >
                          <div className="d-flex flex-row mb-5 ml-4 seasonsContainer">
                            {season.poster_path ? (
                              <div className="seasonsListPosterHolder">
                                <img
                                  src={`https://image.tmdb.org/t/p/original${season.poster_path}`}
                                  alt=""
                                  className="seasonsListPoster"
                                />
                              </div>
                            ) : currentTvDetails &&
                              currentTvDetails.images &&
                              currentTvDetails.images.posters &&
                              currentTvDetails.images.posters.length > 0 ? (
                              <div className="seasonsListPosterHolder">
                                <img
                                  src={`https://image.tmdb.org/t/p/original${
                                    currentTvDetails &&
                                    currentTvDetails.images.posters.length > 0
                                      ? currentTvDetails.images.posters[
                                          Math.floor(
                                            Math.random() *
                                              currentTvDetails.images.posters
                                                .length
                                          )
                                        ].file_path
                                      : ""
                                  }`}
                                  alt=""
                                  className="seasonsListPoster"
                                />
                              </div>
                            ) : (
                              <div className="seasonsListPosterHolder">
                                <img
                                  src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                                  alt=""
                                  className="seasonsListPoster"
                                />
                              </div>
                            )}
                            <div className="d-flex flex-column mt-2 ml-2 seasonsListDetails">
                              <h2 className="mt-4">
                                {season.name ? season.name : "TBA"}
                              </h2>
                              <div className="episodeOverview">
                                {season.overview ? (
                                  season.overview.length > 330 ? (
                                    season.overview.slice(0, 330) + "..."
                                  ) : (
                                    season.overview
                                  )
                                ) : currentTvDetails &&
                                  currentTvDetails.overview ? (
                                  <div className="episodeOverview">
                                    {currentTvDetails &&
                                    currentTvDetails.overview &&
                                    currentTvDetails.overview.length > 400
                                      ? currentTvDetails.overview.slice(
                                          0,
                                          400
                                        ) + "..."
                                      : currentTvDetails.overview}
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                              <div className="d-flex flex-row ">
                                {season.episode_count ? (
                                  <div className="episodeDetails">
                                    {season.episode_count} Episodes
                                  </div>
                                ) : (
                                  ""
                                )}
                                {season.air_date ? (
                                  <div className="episodeDetails">
                                    {season.air_date
                                      ? season.air_date.slice(0, 4)
                                      : ""}
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  {currentTvDetails && currentTvDetails.last_episode_to_air ? (
                    <>
                      <h1 className="sectionHeading">LAST EPISODE TO AIR</h1>
                      <Link
                        to={`/tv/${currentTvDetails.id}/season/${
                          currentTvDetails.last_episode_to_air.season_number
                            ? currentTvDetails.last_episode_to_air.season_number
                            : ""
                        }/episode/${
                          currentTvDetails.last_episode_to_air.episode_number
                            ? currentTvDetails.last_episode_to_air
                                .episode_number
                            : ""
                        }`}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="d-flex flex-row my-4 episodeContainer">
                          {currentTvDetails.last_episode_to_air.still_path ? (
                            <div className="episodeListBackdropHolder">
                              <img
                                src={`https://image.tmdb.org/t/p/original${currentTvDetails.last_episode_to_air.still_path}`}
                                alt=""
                                className="episodeBackdrop"
                              />
                            </div>
                          ) : currentTvDetails &&
                            currentTvDetails.images &&
                            currentTvDetails.images.backdrops &&
                            currentTvDetails.images.backdrops.length > 0 ? (
                            <div className="episodeListBackdropHolder">
                              <img
                                src={`https://image.tmdb.org/t/p/original${
                                  currentTvDetails &&
                                  currentTvDetails.images.backdrops.length > 0
                                    ? currentTvDetails.images.backdrops[
                                        Math.floor(
                                          Math.random() *
                                            currentTvDetails.images.backdrops
                                              .length
                                        )
                                      ].file_path
                                    : ""
                                }`}
                                alt=""
                                className="episodeBackdrop"
                              />
                            </div>
                          ) : (
                            <div className="episodeListBackdropHolder">
                              <img
                                src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                                alt=""
                                className="episodeBackdrop"
                              />
                            </div>
                          )}
                          <div className="d-flex flex-column ml-2 episodeMainDetails">
                            <h3 className="episodeTitle">
                              {currentTvDetails.last_episode_to_air.name
                                ? currentTvDetails.last_episode_to_air.name
                                : "TBA"}
                            </h3>
                            <div className="episodeOverview">
                              {currentTvDetails.last_episode_to_air.overview
                                ? currentTvDetails.last_episode_to_air.overview
                                    .length > 150
                                  ? currentTvDetails.last_episode_to_air.overview.slice(
                                      0,
                                      150
                                    ) + "..."
                                  : currentTvDetails.last_episode_to_air
                                      .overview
                                : ""}
                            </div>
                            <div className="d-flex flex-row ">
                              {currentTvDetails.last_episode_to_air
                                .season_number ? (
                                <div className="episodeDetails">
                                  Season{" "}
                                  {
                                    currentTvDetails.last_episode_to_air
                                      .season_number
                                  }
                                </div>
                              ) : (
                                ""
                              )}
                              {currentTvDetails.last_episode_to_air
                                .episode_number ? (
                                <div className="episodeDetails">
                                  Episode{" "}
                                  {
                                    currentTvDetails.last_episode_to_air
                                      .episode_number
                                  }
                                </div>
                              ) : (
                                ""
                              )}
                              {currentTvDetails.last_episode_to_air.runtime ? (
                                <div className="episodeDetails">
                                  {currentTvDetails.last_episode_to_air.runtime}{" "}
                                  Mins
                                </div>
                              ) : (
                                ""
                              )}
                              {currentTvDetails.last_episode_to_air.air_date ? (
                                <div className="episodeDetails">
                                  {currentTvDetails.last_episode_to_air.air_date
                                    ? currentTvDetails.last_episode_to_air.air_date
                                        .slice(2, 10)
                                        .split("-")
                                        .reverse()
                                        .join("-")
                                    : ""}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  {currentTvDetails && currentTvDetails.next_episode_to_air ? (
                    <>
                      <h1 className="sectionHeading">NEXT EPISODE TO AIR</h1>
                      <Link
                        to={`/tv/${currentTvDetails.id}/season/${
                          currentTvDetails.next_episode_to_air.season_number
                            ? currentTvDetails.next_episode_to_air.season_number
                            : ""
                        }/episode/${
                          currentTvDetails.next_episode_to_air.episode_number
                            ? currentTvDetails.next_episode_to_air
                                .episode_number
                            : ""
                        }`}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="d-flex flex-row my-4 episodeContainer">
                          {currentTvDetails.next_episode_to_air.still_path ? (
                            <div className="episodeListBackdropHolder">
                              <img
                                src={`https://image.tmdb.org/t/p/original${currentTvDetails.next_episode_to_air.still_path}`}
                                alt=""
                                className="episodeBackdrop"
                              />
                            </div>
                          ) : currentTvDetails &&
                            currentTvDetails.images &&
                            currentTvDetails.images.backdrops &&
                            currentTvDetails.images.backdrops.length > 0 ? (
                            <div className="episodeListBackdropHolder">
                              <img
                                src={`https://image.tmdb.org/t/p/original${
                                  currentTvDetails &&
                                  currentTvDetails.images.backdrops.length > 0
                                    ? currentTvDetails.images.backdrops[
                                        Math.floor(
                                          Math.random() *
                                            currentTvDetails.images.backdrops
                                              .length
                                        )
                                      ].file_path
                                    : ""
                                }`}
                                alt=""
                                className="episodeBackdrop"
                              />
                            </div>
                          ) : (
                            <div className="episodeListBackdropHolder">
                              <img
                                src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                                alt=""
                                className="episodeBackdrop"
                              />
                            </div>
                          )}
                          <div className="d-flex flex-column ml-2 episodeMainDetails">
                            <h3 className="episodeTitle">
                              {currentTvDetails.next_episode_to_air.name
                                ? currentTvDetails.next_episode_to_air.name
                                : "TBA"}
                            </h3>
                            <div className="episodeOverview">
                              {currentTvDetails.next_episode_to_air.overview
                                ? currentTvDetails.next_episode_to_air.overview
                                    .length > 150
                                  ? currentTvDetails.next_episode_to_air.overview.slice(
                                      0,
                                      150
                                    ) + "..."
                                  : currentTvDetails.next_episode_to_air
                                      .overview
                                : ""}
                            </div>
                            <div className="d-flex flex-row ">
                              {currentTvDetails.next_episode_to_air
                                .season_number ? (
                                <div className="episodeDetails">
                                  Season{" "}
                                  {
                                    currentTvDetails.next_episode_to_air
                                      .season_number
                                  }
                                </div>
                              ) : (
                                ""
                              )}
                              {currentTvDetails.next_episode_to_air
                                .episode_number ? (
                                <div className="episodeDetails">
                                  Episode{" "}
                                  {
                                    currentTvDetails.next_episode_to_air
                                      .episode_number
                                  }
                                </div>
                              ) : (
                                ""
                              )}
                              {currentTvDetails.next_episode_to_air.runtime ? (
                                <div className="episodeDetails">
                                  {currentTvDetails.next_episode_to_air.runtime}{" "}
                                  Mins
                                </div>
                              ) : (
                                ""
                              )}
                              {currentTvDetails.next_episode_to_air.air_date ? (
                                <div className="episodeDetails">
                                  {currentTvDetails.next_episode_to_air.air_date
                                    ? currentTvDetails.next_episode_to_air.air_date
                                        .slice(2, 10)
                                        .split("-")
                                        .reverse()
                                        .join("-")
                                    : ""}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </>
                  ) : (
                    ""
                  )}
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
                {tvthemes && tvthemes.results.length > 0 ? (
                  <>
                    <h1 className="sectionHeading">THEMES</h1>

                    <div className="themesContainer ml-4">
                      {tvthemes && tvthemes.results
                        ? tvthemes.results.map(
                            (theme, index) =>
                              index < 20 && (
                                <>
                                  <Link
                                    to={`/tv/theme/${theme.id}&${theme.name}`}
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
                  </>
                ) : (
                  ""
                )}
              </div>

              <div className="rightMiddleContainer">
                <div className="rightMiddleBox">
                  {displayTvListType &&
                  randomTvListType &&
                  displayTvListType.length > 0 ? (
                    <h1 className="sectionHeading rightMiddleHeading">
                      {randomTvListType.toUpperCase().replace(/_/g, " ") +
                        " " +
                        "SHOWS"}
                    </h1>
                  ) : (
                    ""
                  )}
                  <div className="d-flex flex-column align-items-center flex-wrap">
                    {displayTvListType
                      ? displayTvListType.map(
                          (tv, index) =>
                            index < 2 && (
                              <>
                                <div>
                                  <Link
                                    style={{ textDecoration: "none" }}
                                    to={`/tv/${tv.id}`}
                                  >
                                    <ImgCardSmall
                                      key={tv.id ? tv.id : ""}
                                      image={
                                        tv.poster_path
                                          ? `https://image.tmdb.org/t/p/original${tv.poster_path}`
                                          : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                                      }
                                      title={tv.name ? tv.name : ""}
                                      year={
                                        tv.first_air_date
                                          ? tv.first_air_date
                                          : ""
                                      }
                                      overview={tv.overview ? tv.overview : ""}
                                      genreID={
                                        tv.genre_ids
                                          ? tv.genre_ids.map((genre) => genre)
                                          : ""
                                      }
                                    />
                                  </Link>
                                </div>
                              </>
                            )
                        )
                      : ""}
                    <Link to={`/${randomTvListType}`}>
                      <div className="btn btn-success px-5 mb-2">SHOW MORE</div>
                    </Link>
                  </div>
                </div>

                {finalTvGenreList
                  ? finalTvGenreList.map((tv) => (
                      <div className="rightMiddleBox">
                        {tv.genreName ? (
                          <h1 className="sectionHeading rightMiddleHeading">
                            {tv.genreName.toUpperCase().replace(/_/g, " ") +
                              " " +
                              "SHOWS"}
                          </h1>
                        ) : (
                          ""
                        )}
                        <div className="d-flex flex-column align-items-center flex-wrap">
                          {tv?.details?.map(
                            (detail, index) =>
                              index < 2 && (
                                <>
                                  <div>
                                    <Link
                                      style={{ textDecoration: "none" }}
                                      to={`/tv/${detail.id}`}
                                    >
                                      <ImgCardSmall
                                        key={detail.id ? detail.id : ""}
                                        image={
                                          detail.poster_path
                                            ? `https://image.tmdb.org/t/p/original${detail.poster_path}`
                                            : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                                        }
                                        title={detail.title ? detail.title : ""}
                                        year={
                                          detail.release_date
                                            ? detail.release_date
                                            : ""
                                        }
                                        overview={
                                          detail.overview ? detail.overview : ""
                                        }
                                        genreID={
                                          detail.genre_ids
                                            ? detail.genre_ids.map(
                                                (genre) => genre
                                              )
                                            : ""
                                        }
                                      />
                                    </Link>
                                  </div>
                                </>
                              )
                          )}
                          {tv.genreID && tv.genreName ? (
                            <Link
                              to={`/tv/genre/${tv.genreID}&${tv.genreName}`}
                            >
                              <div className="btn btn-success px-5 mb-2">
                                SHOW MORE
                              </div>
                            </Link>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    ))
                  : ""}

                {finalMovieGenreList
                  ? finalMovieGenreList.map((movie) => (
                      <div className="rightMiddleBox">
                        {movie.genreName ? (
                          <h1 className="sectionHeading rightMiddleHeading">
                            {movie.genreName.toUpperCase().replace(/_/g, " ") +
                              " " +
                              "MOVIES"}
                          </h1>
                        ) : (
                          ""
                        )}
                        <div className="d-flex flex-column align-items-center flex-wrap">
                          {movie?.details?.map(
                            (detail, index) =>
                              index < 2 && (
                                <>
                                  <div>
                                    <Link
                                      style={{ textDecoration: "none" }}
                                      to={`/movie/${detail.id}`}
                                    >
                                      <ImgCardSmall
                                        key={detail.id ? detail.id : ""}
                                        image={
                                          detail.poster_path
                                            ? `https://image.tmdb.org/t/p/original${detail.poster_path}`
                                            : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                                        }
                                        title={detail.title ? detail.title : ""}
                                        year={
                                          detail.release_date
                                            ? detail.release_date
                                            : ""
                                        }
                                        overview={
                                          detail.overview ? detail.overview : ""
                                        }
                                        genreID={
                                          detail.genre_ids
                                            ? detail.genre_ids.map(
                                                (genre) => genre
                                              )
                                            : ""
                                        }
                                      />
                                    </Link>
                                  </div>
                                </>
                              )
                          )}
                          {movie.genreName && movie.genreID ? (
                            <Link
                              to={`/movie/genre/${movie.genreID}&${movie.genreName}`}
                            >
                              <div className="btn btn-success px-5 mb-2">
                                SHOW MORE
                              </div>
                            </Link>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    ))
                  : ""}

                <div className="rightMiddleBox">
                  {displayMovieListType &&
                  randomMovieListType &&
                  displayMovieListType.length > 0 ? (
                    <h1 className="sectionHeading rightMiddleHeading">
                      {randomMovieListType.toUpperCase().replace(/_/g, " ") +
                        " " +
                        "MOVIES"}
                    </h1>
                  ) : (
                    ""
                  )}
                  <div className="d-flex flex-column align-items-center flex-wrap">
                    {displayMovieListType
                      ? displayMovieListType.map(
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
                    <Link to={`/${randomMovieListType}`}>
                      <div className="btn btn-success px-5 mb-2">SHOW MORE</div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="movieBottomDetailContainer">
              {similarTv && similarTv.length > 0 ? (
                <h1 className="sectionHeading">SIMILAR TV SHOWS</h1>
              ) : (
                ""
              )}
              <div className="d-flex justify-content-around flex-wrap">
                {similarTv
                  ? similarTv.map(
                      (tv, index) =>
                        index < 20 && (
                          <>
                            <div>
                              <Link to={`/tv/${tv.id}`}>
                                <ImgCard
                                  key={tv.id ? tv.id : ""}
                                  image={
                                    tv.poster_path
                                      ? `https://image.tmdb.org/t/p/original${tv.poster_path}`
                                      : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                                  }
                                  title={tv.name ? tv.name : ""}
                                  year={
                                    tv.first_air_date ? tv.first_air_date : ""
                                  }
                                  overview={tv.overview ? tv.overview : ""}
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

export default TVShowsDetail;
