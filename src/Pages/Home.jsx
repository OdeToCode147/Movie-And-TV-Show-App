import React, { useState, useEffect } from "react";
import MovieList from "./MovieList";
import MovieCarousel from "./MovieCarousel";

const Home = () => {
  const MovieListType1 = ["popular", "top_rated"];
  const MovieListType2 = ["upcoming", "now_playing"];
  const [randomListType1, setRandomListType1] = useState();
  const [randomListType2, setRandomListType2] = useState();
  const [page1, setPage1] = useState();
  const [page2, setPage2] = useState();
  // const [page3, setPage3] = useState();

  useEffect(() => {
    setRandomListType1(
      MovieListType1[Math.floor(Math.random() * MovieListType1.length)]
    );
    setRandomListType2(
      MovieListType2[Math.floor(Math.random() * MovieListType2.length)]
    );
    setPage1(Math.floor(Math.random() * 20 + 1));
    setPage2(Math.floor(Math.random() * 10 + 1));
  }, []);
  console.log(randomListType1);
  console.log(randomListType2);
  console.log(page1);
  console.log(page2);

  return (
    <div>
      {randomListType1 && randomListType2 && page1 && page2 ? (
        <>
          <MovieCarousel page={page1} type1={randomListType1} />
          <MovieList page={page2} type1={randomListType2} />
          <MovieList page={page1} type1={randomListType1} />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
