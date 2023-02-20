import React from "react";

const handleAPI = () => {
  const apiConfig = {
    baseUrl: "https://api.themoviedb.org/3/",
    apiKey: "87c98f2492b42f48b506b2d48f51461e",
    originalImage : (imgPath)=>`https://image.tmdb.org/t/p/original/${imgPath}`,
    backgroundImage : (imgPath)=>`https://image.tmdb.org/t/p/w500/${imgPath}`
  };

  return <div>{apiConfig}</div>;
};  

export default handleAPI;
