import React, { useEffect, useState } from "react";
import { DropdownButton } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ImgCard from "../Components/ImgCard";
import MyPagination from "../Components/MyPagination";

const TVShowsYear = () => {
  const [yearList, setYearList] = useState("");
  const { year } = useParams();
  const [totalPages, setTotalPages] = useState("");
  const [page1, setPage1] = useState(1);
  const [sort, setSort] = useState("popularity.desc");
  const [sortName, setSortName] = useState(null);
  const [randomNumber, setRandomNumber] = useState();
  const [randomNumber2, setRandomNumber2] = useState();
  const [status, setStatus] = useState(null);
  const [statusName, setStatusName] = useState(null);
  const [currentYear, setCurrentYear] = useState();
  const sortOptions = [
    { name: "Most Popular", code: "popularity.desc" },
    { name: "Least Popular", code: "popularity.asc" },
    { name: "Newest Release", code: "first_air_date.desc" },
    { name: "Earliest Release", code: "first_air_date.asc" },
    { name: "Highest Rated", code: "vote_average.desc" },
    { name: "Lowest Rated", code: "vote_average.asc" },
  ];
  const statusOptions = [
    { name: "Returning Series", code: 0 },
    { name: "Planned Series", code: 1 },
    { name: "In Production", code: 2 },
    { name: "Ended Series", code: 3 },
    { name: "Cancelled Series", code: 4 },
    { name: "Pilot Series", code: 5 },
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
  const handleStatusClick = (option, name) => {
    setStatus(option);
    setStatusName(name);
  };

  useEffect(() => {
    if (!status) {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      setCurrentYear(`${year}-${month}-${day}`);
    } else setCurrentYear(null);
  }, [status]);
  useEffect(() => {
    setSort("popularity.desc");
    setSortName(null);
    setPage1(1);
    setRandomNumber(Math.floor(Math.random() * 6));
  }, [year]);
  useEffect(() => {
    if (randomNumber === 5) {
      setRandomNumber2(0);
    }
    setRandomNumber2(randomNumber + 1);
  }, [randomNumber]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=87c98f2492b42f48b506b2d48f51461e&page=${page1}&first_air_date_year=${year}&sort_by=${sort}&with_status=${status}&vote_count.gte=5`
    )
      .then((res) => res.json())
      .then((data) => {
        setYearList(data.results);
        setTotalPages(data.total_pages);
        window.scrollTo(0, 0);
      });
  }, [year, page1, sort, status]);

  return (
    <>
      <div>
        {year ? (
          <>
            <div className="listHeader">
              <h1 className="sectionHeading">{year + " " + "SHOWS"}</h1>
              <div></div>

              <div className="d-flex">
                <div className="mr-3">
                  <DropdownButton
                    id="dropdown-basic-button"
                    title={statusName || "Status"}
                    variant={buttonVariants[randomNumber]}
                  >
                    {statusOptions.map((option) => (
                      <DropdownItem
                        key={option.name}
                        onClick={() =>
                          handleStatusClick(option.code, option.name)
                        }
                      >
                        {option.name}
                      </DropdownItem>
                    ))}
                  </DropdownButton>
                </div>

                <div>
                  <DropdownButton
                    id="dropdown-basic-button"
                    title={sortName || "Sort By"}
                    variant={buttonVariants[randomNumber2]}
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
            </div>
            <div className="d-flex justify-content-around flex-wrap">
              {yearList &&
                yearList.map((tv) => {
                  return (
                    <div>
                      <Link to={`/tv/${tv.id}`}>
                        <ImgCard
                          key={tv.id}
                          image={
                            tv.poster_path
                              ? `https://image.tmdb.org/t/p/original${tv.poster_path}`
                              : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                          }
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

export default TVShowsYear;
