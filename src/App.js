import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Search from "./Components/Search";
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
import TVShowsLanguage from "./Pages/TVShowsLanguage";
import TVShowsList from "./Pages/TVShowsList";
import TVShowsThemeList from "./Pages/TVShowsThemesList";
import TVShowsYear from "./Pages/TVShowsYear";
import TVShowSeason from "./Pages/TVShowSeason";
import TVShowEpisode from "./Pages/TVShowEpisode";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/:type" element={<MovieList />} />
          <Route path="movie/:id" element={<MovieDetail />} />
          <Route path="movie/genre/:genre" element={<MovieGenre />} />
          <Route path="movie/language/:language" element={<MovieLanguage />} />
          <Route path="movie/year/:year" element={<MovieYearList />} />
          <Route path="movie/theme/:theme" element={<MovieThemesList />} />
          <Route path="/TVShows" element={<TvShow />} />
          <Route path="TV/type/:type" element={<TVShowsList />} />
          <Route path="TV/:id" element={<TVShowsDetail />} />
          <Route path="tv/genre/:genre" element={<TVShowsGenre />} />
          <Route path="tv/language/:language" element={<TVShowsLanguage />} />
          <Route path="tv/year/:year" element={<TVShowsYear />} />
          <Route path="tv/theme/:theme" element={<TVShowsThemeList />} />
          <Route path="tv/:id/season/:season" element={<TVShowSeason />} />
          <Route path="tv/:id/season/:season/episode/:episode" element={<TVShowEpisode />} />
          <Route path="/find/:search" element={<Search />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
