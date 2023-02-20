//{type} can takes the values => popular , top_rated, upcoming, now_playing

import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import CarouselCard from "../Components/CarouselCard";

const MovieCarousel = (props) => {
  const [carouselType, setCarouselType] = useState("");
  const { type } = useParams();
  const type1 = props.type1;
  const page = props.page;
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        type ? type : type1
      }?api_key=87c98f2492b42f48b506b2d48f51461e&page=${page}&append_to_response=videos,images&include_image_language=null`
    )
      .then((res) => res.json())
      .then((json) => {
        setCarouselType(json.results);
      });
  }, [type, type1]);
  console.log(carouselType);
  return (
    <div>
      <div className="carouselMain">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={1}
          infiniteLoop={true}
          showStatus={false}
          stopOnHover={true}
        >
          {carouselType &&
            carouselType.map((movie) => {
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

export default MovieCarousel;
