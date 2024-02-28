import React, { useState, useEffect, useContext, useRef } from "react";
import { MovieContext } from "../Context/MovieContext";
import "./SliderNetflixStyle.scss";
import rating from "./../../assets/icons/rating.svg";
import { Link } from "react-router-dom";

const SliderNetflixStyle = ({ fetchUrl }) => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const slidersRef = useRef(null);
  const ImagePadding = 20;
  const [slideData, setSlideData] = useState([]);
  const { config } = useContext(MovieContext);

  const bearerToken = import.meta.env
    .VITE_AUTHENTICATION_BEARER_TOKEN_THE_MOVIE_DB;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  const sliderScrollLeft = () => {
    const sliders = slidersRef.current;
    const slide = sliders.querySelector(".slide-netflix");
    const scrollPerClick = slide.clientWidth + ImagePadding;
    sliders.scrollTo({
      top: 0,
      left: sliders.scrollLeft - scrollPerClick,
      behavior: "smooth",
    });
  };

  const sliderScrollRight = () => {
    const sliders = slidersRef.current;
    const slide = sliders.querySelector(".slide-netflix");
    const scrollPerClick = slide.clientWidth + ImagePadding;
    sliders.scrollTo({
      top: 0,
      left: sliders.scrollLeft + scrollPerClick,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const fetchData = () => {
      fetch(fetchUrl, options)
        .then((response) => response.json())
        .then((data) => {
          setSlideData(data?.results);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    fetchData();
  }, []);

  const handleResize = () => {
    setInnerWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="carusel">
      <div
        className={`${
          innerWidth <= 992 ? "slider-backdrop" : "slider-poster"
        } carusel-box`}
        ref={slidersRef}
      >
        {slideData?.map((slide, index) => (
          <div
            key={index}
            className={`${
              innerWidth <= 992 ? "slider-backdrop" : "slider-poster"
            } slide-netflix`}
          >
            <Link
              onClick={() => window.scrollTo(0, 0)}
              className={`sliderlink-netflix `}
              key={slide.id}
              to={{ pathname: `/detail/${slide.id}` }}
            >
              <div className="image-zoom-wrapper">
                <img
                  className={`slider-image`}
                  src={
                    innerWidth <= 992
                      ? `${config.images.secure_base_url}${config.images.backdrop_sizes[2]}${slide.backdrop_path}`
                      : `${config.images.secure_base_url}${config.images.poster_sizes[2]}${slide.poster_path}`
                  }
                  alt={`${slide.title}`}
                />
              </div>
              <h2>
                {innerWidth <= 992
                  ? slide.title.substring(0, 30)
                  : slide.title.substring(0, 14)}
              </h2>
              <div className="content-netflix">
                <img className="rating_star" src={rating} alt="" />
                <p>{slide.vote_average.toFixed(1)}/10.0</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <button onClick={sliderScrollLeft} className="slider-button switch-left">
        {"<"}
      </button>
      <button
        onClick={sliderScrollRight}
        className="slider-button switch-right"
      >
        {">"}
      </button>
    </div>
  );
};

export default SliderNetflixStyle;
