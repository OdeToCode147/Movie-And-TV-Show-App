import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ImgCard from "../Components/ImgCard";
import MyPagination from "../Components/MyPagination";

const MovieThemesList = () => {
  const [themeList, setThemeList] = useState("");
  const { theme } = useParams();
  const [themeID, setThemeID] = useState("");
  const [themeName, setThemeName] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [page1, setPage1] = useState(1);
  console.log(page1);

  useEffect(() => {
    if (theme) {
      setThemeID(theme.split("&")[0]);
      setThemeName(theme.split("&")[1]);
    }
  }, [theme]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=87c98f2492b42f48b506b2d48f51461e&page=${page1}&with_keywords=${themeID}`
    )
      .then((res) => res.json())
      .then((data) => {
        setThemeList(data.results);
        setTotalPages(data.total_pages);
        window.scrollTo(0, 0);
      });
  }, [themeID, page1]);

  return (
    <>
      <div>
        {themeName ? (
          <>
            <h1 className="sectionHeading">
              {themeName.toUpperCase().replace(/_/g, " ") +
                " " +
                "THEMED MOVIES"}
            </h1>
            <div className="d-flex justify-content-around flex-wrap">
              {themeList &&
                themeList.map((movie) => {
                  return (
                    <div>
                      <Link to={`/movie/${movie.id}`}>
                        <ImgCard
                          key={movie.id}
                          image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                          title={movie.title}
                          year={movie.release_date}
                          overview={movie.overview}
                        />
                      </Link>
                    </div>
                  );
                })}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      {theme && totalPages ? (
        <>
          <MyPagination
            setPage1={setPage1}
            totalPages={totalPages ? totalPages : ""}
          />
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default MovieThemesList;
