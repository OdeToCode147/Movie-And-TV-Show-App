import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import CarouselCard from "../../Components/CarouselCard";
import { Link } from "react-router-dom";

const PopularMoviesCarousel = () => {
  const [popularMovies, setPopularMovies] = useState("");

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=87c98f2492b42f48b506b2d48f51461e&language=en-US&page=1"
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json.results);
        setPopularMovies(json.results);
      });
  }, []);
  return (
    <div>
      <div className="carouselMain">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={false}
          stopOnHover={true}
        >
          {popularMovies &&
            popularMovies.map((movie) => {
              return (
                <div>
                  <Link to={`/movie/${movie.id}`}>
                    <CarouselCard
                      key={movie.id}
                      image={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                      title={movie.title}
                      year={movie.release_date}
                      overview={movie.overview}
                    />
                  </Link>
                </div>
              );
            })}
        </Carousel>
      </div>
    </div>
  );
};

export default PopularMoviesCarousel;
