import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ImgCard from "../Components/ImgCard";
import MyPagination from "../Components/MyPagination";

const TVShowsGenre = () => {
  const [genreList, setGenreList] = useState("");
  const { genre } = useParams();
  const [genreID, setGenreID] = useState("");
  const [genreName, setGenreName] = useState("");
  const [genreName1, setGenreName1] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [page1, setPage1] = useState(1);
  console.log(page1);

  useEffect(() => {
    if (genre) {
      setGenreID(genre.split("&")[0]);
      setGenreName(genre.split("&")[1]);
      setGenreName1(genre.split("&")[2]);
    }
  }, [genre]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=87c98f2492b42f48b506b2d48f51461e&page=${page1}&with_genres=${genreID}`
    )
      .then((res) => res.json())
      .then((data) => {
        setGenreList(data.results);
        setTotalPages(data.total_pages);
        window.scrollTo(0, 0);
      });
  }, [genreID, page1]);

  return (
    <>
      <div>
        {genreName ? (
          <>
            {genreName && genreName1 ? (
              <h1 className="sectionHeading">
                {genreName.toUpperCase().replace(/_/g, " ") +
                  "&" +
                  genreName1.toUpperCase().replace(/_/g, " ") +
                  " " +
                  "SHOWS"}
              </h1>
            ) : (
              <h1 className="sectionHeading">
                {genreName.toUpperCase().replace(/_/g, " ") + " " + "SHOWS"}
              </h1>
            )}

            <div className="d-flex justify-content-around flex-wrap">
              {genreList &&
                genreList.map((tv) => {
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
      {genre && totalPages ? (
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

export default TVShowsGenre;
