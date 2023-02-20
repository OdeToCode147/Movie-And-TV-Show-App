import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import MovieDetail from "./Pages/MovieDetail";
import MovieGenre from "./Pages/MovieGenre";
import MovieLanguage from "./Pages/MovieLanguage";
import MovieList from "./Pages/MovieList";
import Movies from "./Pages/Movies";
import MovieThemesList from "./Pages/MovieThemesList";
import MovieYearList from "./Pages/MovieYearList";
import NoPage from "./Pages/NoPage";
import TvShow from "./Pages/TvShow";
import TVShowsDetail from "./Pages/TVShowsDetail";
import TVShowsGenre from "./Pages/TVShowsGenre";
import TVShowsList from "./Pages/TVShowsList";
import TVShowsThemeList from "./Pages/TVShowsThemesList";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/movies" element={<Movies />} />

          <Route path="/:type" element={<MovieList />} />
          {/* <Route path="/genre:type" element={<MovieGenre />} /> */}
          <Route path="movie/:id" element={<MovieDetail />} />
          <Route path="movie/genre/:genre" element={<MovieGenre />} />
          <Route path="movie/language/:language" element={<MovieLanguage />} />
          <Route path="movie/year/:year" element={<MovieYearList />} />
          <Route path="movie/theme/:theme" element={<MovieThemesList />} />
          <Route path="/TVShows" element={<TvShow />} />
          <Route path="TV/:id" element={<TVShowsDetail />} />
          <Route path="TV/type/:type" element={<TVShowsList />} />
          <Route path="tv/genre/:genre" element={<TVShowsGenre />} />
          <Route path="tv/theme/:theme" element={<TVShowsThemeList />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
