import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import MyPagination from "./MyPagination";
import SeachImgCard from "./SearchImgCard";

const Search = () => {
  const { search } = useParams();
  const [searchResults, setSearchResults] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [page1, setPage1] = useState(1);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=87c98f2492b42f48b506b2d48f51461e&query=${search}`
    )
      .then((res) => res.json())
      .then((json) => {
        setSearchResults(json.results);
        setTotalPages(json.total_pages);
        window.scrollTo(0, 0);
      });
  }, [search]);
  return (
    <>
      <h3 className="sectionHeading">{"Results for" + " " + search}</h3>
      <div className="d-flex justify-content-around flex-column flex-wrap">
        {searchResults &&
          searchResults.map((search) => {
            return (
              <div>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/${search.media_type}/${search.id}`}
                >
                  <SeachImgCard
                    key={search.id}
                    image={
                      search.poster_path || search.profile_path
                        ? `https://image.tmdb.org/t/p/original${
                            search.poster_path
                              ? search.poster_path
                              : search.profile_path
                          }`
                        : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
                    }
                    title={search.title ? search.title : search.name}
                    year={search.release_date ? search.release_date : search.first_air_date}
                    department={search.known_for_department}
                    overview={search.overview}
                    genreID={
                      search.genre_ids
                        ? search.genre_ids.map((genre) => genre)
                        : ""
                    }
                    movies={
                      search.known_for
                        ? search.known_for.map((movies) => movies.title ? movies.title : movies.name)
                        : ""
                    }
                    media_type = {search.media_type==="person" ? "" : search.media_type}
                  />
                </Link>
              </div>
            );
          })}
      </div>
      {search && totalPages ? (
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

export default Search;
