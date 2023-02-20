import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const ImgCardSmall = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [allGenres, setAllGenres] = useState([]);
  const genreName = [];
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  console.log(genreName);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=87c98f2492b42f48b506b2d48f51461e`
    )
      .then((res) => res.json())
      .then((data) => {
        setAllGenres(data);
        console.log(data.genre);
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

  return (
    <>
      {isLoading ? (
        <div>
          <div className="smallCardImgHolder">
            <SkeletonTheme color="#202020" highlightColor="#444">
              <Skeleton height={"200px"} duration={1} />
            </SkeletonTheme>
          </div>
        </div>
      ) : (
        <div>
          <div class="cardImgHolder">
            <img src={props.image ? props.image : ""} alt="" class="cardImg" />

            <div className="cardImageOverlay">
              <div className="cardTitle">{props.title ? props.title : ""}</div>
              <div className="cardYear">
                {props.year ? props.year.slice(0, 4) : ""}
              </div>
              <div className="cardGenreContainer">
                {allGenres && allGenres.genres && props.genreID
                  ? props.genreID.map((i) =>
                      allGenres.genres
                        ? allGenres.genres
                            .filter((genre) => genre.id === i)
                            .map((name) => (
                              <div className="cardGenre">{name.name}</div>
                            ))
                        : ""
                    )
                  : ""}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImgCardSmall;
