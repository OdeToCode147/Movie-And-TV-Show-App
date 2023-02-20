import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ImgCard from "../Components/ImgCard";
import MyPagination from "../Components/MyPagination";

const TVShowsThemeList = () => {
  const [themeList, setThemeList] = useState("");
  const { theme } = useParams();
  const [themeID, setThemeID] = useState("");
  const [themeName, setThemeName] = useState("");
  const [themeName1, setThemeName1] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [page1, setPage1] = useState(1);
  console.log(page1);

  useEffect(() => {
    if (theme) {
      setThemeID(theme.split("&")[0]);
      setThemeName(theme.split("&")[1]);
      setThemeName1(theme.split("&")[2]);
    }
  }, [theme]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=87c98f2492b42f48b506b2d48f51461e&page=${page1}&with_keywords=${themeID}`
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
            {themeName && themeName1 ? (
              <h1 className="sectionHeading">
                {themeName.toUpperCase().replace(/_/g, " ") +
                  "&" +
                  themeName1.toUpperCase().replace(/_/g, " ") +
                  " " +
                  "SHOWS"}
              </h1>
            ) : (
              <h1 className="sectionHeading">
                {themeName.toUpperCase().replace(/_/g, " ") +
                  " " +
                  "THEMED SHOWS"}
              </h1>
            )}

            <div className="d-flex justify-content-around flex-wrap">
              {themeList &&
                themeList.map((tv) => {
                  return (
                    <div>
                      <Link to={`/tv/${tv.id}`}>
                        <ImgCard
                          key={tv.id}
                          image={`https://image.tmdb.org/t/p/original${tv.poster_path}`}
                          title={tv.name}
                          year={tv.first_air_date}
                          overview={tv.overview}
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

export default TVShowsThemeList;
