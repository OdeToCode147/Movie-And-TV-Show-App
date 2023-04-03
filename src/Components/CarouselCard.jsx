import React from "react";

const CarouselCard = (props) => {
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
