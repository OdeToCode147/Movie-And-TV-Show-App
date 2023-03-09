import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SeachImgCard = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [allGenres, setAllGenres] = useState([]);
  const genreName = [];

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=87c98f2492b42f48b506b2d48f51461e`
    )
      .then((res) => res.json())
      .then((data) => {
        setAllGenres(data);
      });
  }, []);

  useEffect(() => {
    if (allGenres && allGenres.genres && props.genreID) {
      for (let i = 0; i < props.genreID.length; i++) {
        allGenres.genres
          .filter((genre) => genre.id === props.genreID[i])
          .map((genre) => genreName.push(genre.name));
      }
    }
  }, [props.genreID, allGenres]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
console.log(props.media_type);
  return (
    <>
      <hr color="white" />
      {isLoading ? (
        <div>
          <div className="searchCardImgHolder ml-3">
            <SkeletonTheme color="#202020" highlightColor="#444">
              <Skeleton height={"100px"} duration={1} />
            </SkeletonTheme>
          </div>
        </div>
      ) : (
        <div className="d-flex mx-5 flex-row">
          <div class="searchCardImgHolder">
            <img
              src={props.image ? props.image : ""}
              alt=""
              class="searchCardImg"
            />
          </div>
          <div className="searchCardDetails d-flex ml-3 flex-column mt-5">
            <h3 className="searchCardTitle">
              {props.title ? props.title : ""}
            </h3>
            <div className="searchCardYear" style={{ fontSize: "18px" }}>
              {props.year ? props.year.slice(0, 4) + " " + props.media_type.toUpperCase() : ""}
            </div>
            <div className="searchCardDepartment" style={{ fontSize: "20px" }}>
              {props.department ? props.department : ""}
            </div>
            <div className="searchGenreContainer">
              {allGenres && allGenres.genres && props.genreID
                ? props.genreID.map((i) =>
                    allGenres.genres
                      ? allGenres.genres
                          .filter((genre) => genre.id === i)
                          .map((name) => (
                            <div className="searchGenre">{name.name}</div>
                          ))
                      : ""
                  )
                : ""}
            </div>
            <div className="searchGenreContainer">
              {props.movies
                ? props.movies.map((title) => (
                    <div className="searchMovieTitle">{title}</div>
                  ))
                : ""}
            </div>
            <div style={{ fontSize: "18px" }} className="searchCardOverview">
              {props.overview && props.overview.length > 320
                ? props.overview.slice(0, 320) + "..."
                : props.overview}
            </div>
          </div>
        </div>
      )}
      
    </>
  );
};

export default SeachImgCard;
