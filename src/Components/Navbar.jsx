import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [movieGenre, setMovieGenre] = useState("");
  const [tvGenre, setTvGenre] = useState("");
  const [find, setFind] = useState("");
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setFind(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/find/${find}`);
  };

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
                Popular
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/popular">
                  Movies
                </Link>
                <Link className="dropdown-item" to="/tv/type/popular">
                  TV Shows
                </Link>
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
                Top Rated
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/top_rated">
                  Movies
                </Link>
                <Link className="dropdown-item" to="/tv/type/top_rated">
                  TV Shows
                </Link>
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
                Now Playing
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/now_playing">
                  Movies
                </Link>
                <Link className="dropdown-item" to="/tv/type/on_the_air">
                  TV Shows
                </Link>
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
                Upcoming
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/upcoming">
                  Movies
                </Link>
                <Link className="dropdown-item" to="/tv/type/airing_today">
                  TV Shows
                </Link>
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
          <form className="form-inline ms-auto" onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              name="find"
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-info m-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
