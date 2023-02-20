import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ImgCard from "../Components/ImgCard";
import MyPagination from "../Components/MyPagination";

const MovieYearList = () => {
  const [yearList, setYearList] = useState("");
  const { year } = useParams();
  const [totalPages, setTotalPages] = useState("");
  const [page1, setPage1] = useState(1);
  console.log(page1);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=87c98f2492b42f48b506b2d48f51461e&page=${page1}&primary_release_year=${year}`
    )
      .then((res) => res.json())
      .then((data) => {
        setYearList(data.results);
        setTotalPages(data.total_pages);
        window.scrollTo(0, 0);
      });
  }, [year, page1]);

  return (
    <>
      <div>
        {year ? (
          <>
            <h1 className="sectionHeading">{year + " " + "MOVIES"}</h1>
            <div className="d-flex justify-content-around flex-wrap">
              {yearList &&
                yearList.map((movie) => {
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
      {year && totalPages ? (
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

export default MovieYearList;
