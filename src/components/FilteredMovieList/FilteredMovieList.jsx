import React, { useState, useEffect, useContext } from "react";
import NavBar from "../NavBar/NavBar";
import Searchbar from "../Searchbar/Searchbar";
import MovieListItem from "../MovieListItem/MovieListItem";

const FilteredMovieList = ({ fetchUrl }) => {
  const [slideData, setSlideData] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzUwMzc4ZDNjYTc2YjBjMWU4YWEyODRlZmYzNzg3MCIsInN1YiI6IjY1NmY2YzRlOTQ2MzE4MDExZDhhMDQyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SDK0CwPNgeSykWhKcCVsJj-ZZk7fQWBt3pQBFB57XVI",
    },
  };

  useEffect(() => {
    const fetchData = () => {
      fetch(fetchUrl, options)
        .then((response) => response.json())
        .then((data) => {
          setSlideData(data.results);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    fetchData();
  }, [fetchUrl, options]);

  return (
    <>
      <Searchbar />
      <section className="section-movies ">
        <ul
          className={`main-container ${
            innerWidth <= 992 ? "movies-list" : "movies-list-desktop"
          }`}
        >
          {slideData.map((movie, index) => (
            <MovieListItem key={index} movieId={movie.id} />
          ))}
        </ul>
      </section>
      <NavBar />
    </>
  );
};

export default FilteredMovieList;
