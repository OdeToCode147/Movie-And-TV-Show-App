import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const ImgCard = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // const Details = {
  //   image:
  //     "https://www.themoviedb.org/t/p/original/dz4xJ2SiIK85EEcgArvXyo7HCvP.jpg",
  //   title: "Dune",
  //   year: 2021,
  //   overview:
  //     "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence-a commodity capable of unlocking humanity's greatest potential-only those who can conquer their fear will survive.",
  // };

  return (
    <>
      {isLoading ? (
        <div>
          <div className="cardImgHolder">
            <SkeletonTheme color="#202020" highlightColor="#444">
              <Skeleton height={"200px"} duration={1} />
            </SkeletonTheme>
          </div>
        </div>
      ) : (
        <div class="cardImgHolder">
          <img src={props.image ? props.image : ""} alt="" class="cardImg" />
          <div class="cardImageOverlay">
            <div className="cardTitle">{props.title ? props.title : ""}</div>
            <div className="cardYear">
              {props.year ? props.year.slice(0, 4) : ""}
            </div>
            <div className="cardOverview">
              {props.overview && props.overview.length > 120
                ? props.overview.slice(0, 120) + "..."
                : props.overview}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImgCard;
