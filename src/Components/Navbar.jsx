import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";

const Navbar = () => {
  const [movieGenre, setMovieGenre] = useState("");
  const [tvGenre, setTvGenre] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=87c98f2492b42f48b506b2d48f51461e`
    ).then((res) =>
      res.json().then((data) => {
        setMovieGenre(data.genres);
      })
    );
  }, []);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=87c98f2492b42f48b506b2d48f51461e`
    ).then((res) =>
      res.json().then((data) => {
        setTvGenre(data.genres);
      })
    );
  }, []);

  const [show, setShow] = useState(false);
  return (
    <div>
      <nav
        style={{ zIndex: "1" }}
        className="navbar navbar-expand-xl navbar-dark"
      >
        <Link className="navbar-brand" to="/">
          <span className="logoMain logo">Screen</span>
          <span className="logo">Savor</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => {
            setShow(!show);
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={show ? "show navbar-collapse" : "collapse navbar-collapse"}
          id="navbarSupportedContent"
        >
          {/* nav elements position */}
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/popular">
                Popular
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/top_rated">
                Top Rated
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/now_playing">
                Now Playing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/upcoming">
                Upcoming
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Movies
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {movieGenre &&
                  movieGenre.map((genre) => (
                    <Link
                      key={genre.id}
                      className="dropdown-item"
                      to={`/movie/genre/${genre.id}&${genre.name}`}
                    >
                      {genre.name}
                    </Link>
                  ))}
              </div>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                TV Shows
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/tv/type/popular">
                  Popular
                </Link>
                <Link className="dropdown-item" to="/tv/type/top_rated">
                  Top Rated
                </Link>
                <Link className="dropdown-item" to="/tv/type/airing_today">
                  Airing Today
                </Link>
                <Link className="dropdown-item" to="/tv/type/on_the_air">
                  On The Air
                </Link>
                {tvGenre &&
                  tvGenre.map((genre) => (
                    <Link
                      key={genre.id}
                      className="dropdown-item"
                      to={`/tv/genre/${genre.id}&${genre.name}`}
                    >
                      {genre.name}
                    </Link>
                  ))}
              </div>
            </li>
          </ul>
          {/* <div className="dropdown-divider"></div> */}
          <form className="form-inline ms-auto">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-info m-2 my-sm-0"
              type="submit"
              onClick={``}
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
