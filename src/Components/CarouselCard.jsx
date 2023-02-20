import React from "react";

const CarouselCard = (props) => {
  // const Details = {
  //   image:
  //     "https://www.themoviedb.org/t/p/original/jYEW5xZkZk2WTrdbMGAPFuBqbDc.jpg",
  //   title: "Dune",
  //   runtime: 168,
  //   year: 2021,
  //   overview:
  //     "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence-a commodity capable of unlocking humanity's greatest potential-only those who can conquer their fear will survive.",
  // };
  return (
    <div>
      <div className="carouselImgHolder">
        <img className="carouselImg" src={props.image ? props.image : ""} alt="" />
        <div className="carouselOverlay">
          <div className="carouselTitle">{props.title ? props.title : ""}</div>
          <div className="carousleDate">{props.year ? props.year.slice(0, 4) : ""}</div>
          <div className="carousleOverview">
            {props.overview && props.overview.length > 420
              ? props.overview.slice(0, 385) + "..."
              : props.overview}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;
