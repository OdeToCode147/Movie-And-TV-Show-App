import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const ImgCard = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

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
