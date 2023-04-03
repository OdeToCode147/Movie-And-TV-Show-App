import React, { useEffect, useState } from "react";
import { DropdownButton } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ImgCard from "../Components/ImgCard";
import MyPagination from "../Components/MyPagination";

const MovieGenre = () => {
  const [genreList, setGenreList] = useState("");
  const { genre } = useParams();
  const [genreID, setGenreID] = useState("");
  const [genreName, setGenreName] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [page1, setPage1] = useState(1);
  const [sort, setSort] = useState("popularity.desc");
  const [sortName, setSortName] = useState(null);
  const [randomNumber, setRandomNumber] = useState()
  const currentYear = new Date().getFullYear();
  const sortOptions = [
    { name: "Film Name", code: "original_title.asc" },
    { name: "Most Popular", code: "popularity.desc" },
    { name: "Least Popular", code: "popularity.asc" },
    { name: "Newest Release", code: "primary_release_date.desc" },
    { name: "Earliest Release", code: "primary_release_date.asc" },
    { name: "Highest Rated", code: "vote_average.desc" },
    { name: "Lowest Rated", code: "vote_average.asc" },
    { name: "Highest Grosser", code: "revenue.desc" },
  ];

  const buttonVariants = [
    "primary",
    "dark",
    "light",
    "success",
    "danger",
    "warning",
  ];

  const handleOptionClick = (option, name) => {
    setSort(option);
    setSortName(name);
  };

  useEffect(() => {
    if (genre) {
      setGenreID(genre.split("&")[0]);
      setGenreName(genre.split("&")[1]);
    }
    setSort("popularity.desc");
    setSortName(null);
    setPage1(1);
    setRandomNumber(Math.floor(Math.random() * 6))
  }, [genre]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=87c98f2492b42f48b506b2d48f51461e&page=${page1}&with_genres=${genreID}&sort_by=${sort}&release_date.lte=${currentYear}&vote_count.gte=100`
    )
      .then((res) => res.json())
      .then((data) => {
        setGenreList(data.results);
        setTotalPages(data.total_pages);
        window.scrollTo(0, 0);
      });
  }, [genreID, page1, sort]);

  return (
    <>
      <div>
        {genreName ? (
          <>
            <div className="listHeader">
              <h1 className="sectionHeading">
                {genreName.toUpperCase().replace(/_/g, " ") + " " + "MOVIES"}
              </h1>
              <div>
                <DropdownButton
                  id="dropdown-basic-button"
                  title={sortName || "Sort By"}
                  variant={buttonVariants[randomNumber]}
                >
                  {sortOptions.map((option) => (
                    <DropdownItem
                      key={option.name}
                      onClick={() =>
                        handleOptionClick(option.code, option.name)
                      }
                    >
                      {option.name}
                    </DropdownItem>
                  ))}
                </DropdownButton>
              </div>
            </div>

            <div className="d-flex justify-content-around flex-wrap">
              {genreList &&
                genreList.map((movie) => {
                  return (
                    <div>
                      <Link to={`/movie/${movie.id}`}>
                        <ImgCard
                          key={movie.id}
                          image={
                            movie.poster_path
                              ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                              : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                          }
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

export default MovieGenre;
