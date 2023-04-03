//{type} can takes the values => airing_today , on_the_air , popular , top_rated

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ImgCard from "../Components/ImgCard";
import MyPagination from "../Components/MyPagination";

const TVShowsList = (props) => {
  const [tvList, setTvList] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const { type } = useParams();
  const type1 = props.type1;
  const page = props.page;
  console.log(page);

  const [page1, setPage1] = useState(1);
  console.log(page1);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${
        type ? type : type1
      }?api_key=87c98f2492b42f48b506b2d48f51461e&page=${
        page ? page : page1
      }&append_to_response=videos,images`
    )
      .then((res) => res.json())
      .then((json) => {
        setTvList(json.results);
        setTotalPages(json.total_pages);
        window.scrollTo(0, 0);
      });
  }, [type, type1, page, page1]);

  return (
    <>
      <h1 className="sectionHeading">
        {(type ? type : type1).toUpperCase().replace(/_/g, " ") + " " + "SHOWS"}
      </h1>
      <div className="d-flex justify-content-around flex-wrap">
        {tvList &&
          tvList.map((tv) => {
            return (
              <div>
                <Link to={`/tv/${tv.id}`}>
                  <ImgCard
                    key={tv.id}
                    image={tv.poster_path ? `https://image.tmdb.org/t/p/original${tv.poster_path}`
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
      {type && totalPages ? (
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

export default TVShowsList;
