import React, { useState, useEffect, useContext } from "react";
import { MovieContext } from "../Context/MovieContext";
import "./SliderComponent.scss";
import rating from "./../../assets/icons/rating.svg";
import { Link } from "react-router-dom";

const SliderComponent = ({ fetchUrl }) => {
  const [slideData, setSlideData] = useState([]);
  const { config } = useContext(MovieContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzUwMzc4ZDNjYTc2YjBjMWU4MWEyODRlZmYzNzg3MCIsInN1YiI6IjY1NmY2YzRlOTQ2MzE4MDExZDhhMDQyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SDK0CwPNgeSykWhKcCVsJj-ZZk7fQWBt3pQBFB57XVI",
    },
  };

  useEffect(() => {
    const fetchData = () => {
      fetch(fetchUrl, options)
        .then((response) => response.json())
        .then((data) => {
          setSlideData(data.results.slice(0, 5));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    fetchData();

    const intervalId = setInterval(() => {
      goToNext();
    }, 2000);

    return () => clearInterval(intervalId);
  }, [fetchUrl, currentIndex]);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
    setScrolled(false);
  };

  const handleTouchMove = (e) => {
    const touchEnd = e.touches[0].clientX;
    const touchDiff = touchStart - touchEnd;
    const scrollThreshold = 30;

    if (touchDiff > scrollThreshold && !scrolled) {
      goToNext();
      setScrolled(true);
    } else if (touchDiff < -scrollThreshold && !scrolled) {
      goToPrevious();
      setScrolled(true);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(0);
  };

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slideData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slideData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <>
      <div
        className="slider-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="slider">
          <div className="arrows left-arrow" onClick={goToPrevious}>
            ❰
          </div>
          {slideData.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentIndex ? "active" : ""}`}
            >
              <Link
                onClick={() => window.scrollTo(0, 0)}
                className={`sliderlink ${
                  index === currentIndex ? "active-link" : ""
                }`}
                key={slide.id}
                to={`/detail/${slide.id}`}
              >
                <img
                  src={`${config.images.secure_base_url}${config.images.backdrop_sizes[2]}${slide.backdrop_path}`}
                  alt={`Slide ${index + 1}`}
                />
                <div className="content">
                  <h2>{slide.title}</h2>
                  <p className="rating_star">
                    <img src={rating} alt="" /> {slide.vote_average.toFixed(1)}{" "}
                    / 10.0
                  </p>
                </div>
              </Link>
            </div>
          ))}
          <div className="arrows right-arrow" onClick={goToNext}>
            ❱
          </div>
        </div>
        <div className="slider-dots">
          {slideData.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SliderComponent;
