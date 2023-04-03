import React, { useState, useEffect } from "react";
import MovieList from "./MovieList";
import MovieCarousel from "./MovieCarousel";
import TVShowsList from "./TVShowsList";

const Home = () => {
  const MovieandTVListType1 = ["popular", "top_rated"];
  const MovieListType2 = ["upcoming", "now_playing"];
  const TVListType2 = ["airing_today" , "on_the_air"];
  const [randomListType1, setRandomListType1] = useState();
  const [randomListType2, setRandomListType2] = useState();
  const [randomListType3, setRandomListType3] = useState();
  const [randomListType4, setRandomListType4] = useState();
  const [page1, setPage1] = useState();
  const [page2, setPage2] = useState();
  const [page3, setPage3] = useState();
  const [page4, setPage4] = useState();
  // const [page3, setPage3] = useState();

  useEffect(() => {
    //Movie List

    setRandomListType1(
      MovieandTVListType1[
        Math.floor(Math.random() * MovieandTVListType1.length)
      ]
    );
    setRandomListType2(
      MovieListType2[Math.floor(Math.random() * MovieListType2.length)]
    );

    //TV List

    setRandomListType3(
      MovieandTVListType1[Math.floor(Math.random() * MovieListType2.length)]
    );
    setRandomListType4(
      TVListType2[Math.floor(Math.random() * MovieListType2.length)]
    );
    setPage1(Math.floor(Math.random() * 20 + 1));
    setPage2(Math.floor(Math.random() * 10 + 1));
    setPage3(Math.floor(Math.random() * 20 + 1));
    setPage4(Math.floor(Math.random() * 5 + 1));
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
          <TVShowsList page={page3} type1={randomListType3} />
          <MovieList page={page2} type1={randomListType2} />
          <TVShowsList page={page4} type1={randomListType4} />
          <MovieList page={page1} type1={randomListType1} />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
