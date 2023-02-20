import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ImgCard from "../Components/ImgCard";
import MyPagination from "../Components/MyPagination";

const MovieLanguage = () => {
  const [languageList, setLanguageList] = useState("");
  const { language } = useParams();
  const [languageID, setLanguageID] = useState("");
  const [languageName, setLanguageName] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [page1, setPage1] = useState(1);
  console.log(page1);

  useEffect(() => {
    if (language) {
      setLanguageID(language.split("&")[0]);
      setLanguageName(language.split("&")[1]);
    }
  }, [language]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=87c98f2492b42f48b506b2d48f51461e&page=${page1}&with_original_language=${languageID}`
    )
      .then((res) => res.json())
      .then((data) => {
        setLanguageList(data.results);
        setTotalPages(data.total_pages);
        window.scrollTo(0, 0);
      });
  }, [languageID, page1]);

  return (
    <>
      <div>
        {languageName ? (
          <>
            <h1 className="sectionHeading">
              {languageName.toUpperCase().replace(/_/g, " ") + " " + "MOVIES"}
            </h1>
            <div className="d-flex justify-content-around flex-wrap">
              {languageList &&
                languageList.map((movie) => {
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
      {language && totalPages ? (
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

export default MovieLanguage;
