import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./MovieList.scss";
import { MovieContext } from "../Context/MovieContext";
import MovieListItem from "../MovieListItem/MovieListItem";
import Searchbar from "../Searchbar/Searchbar";
import NavBar from "../NavBar/NavBar";
const MovieList = () => {
  const { allMovies, innerWidth, setGenreValue } = useContext(MovieContext);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/movies") {
      setGenreValue(""); // Setzen Sie genreValue zurück
    }
  }, [location, setGenreValue]);

  return (
    <>
      <Searchbar />
      <section className="section-movies ">
        <ul
          className={`main-container ${
            innerWidth <= 992 ? "movies-list" : "movies-list-desktop"
          }`}
        >
          {allMovies?.map((movie, index) => (
            <MovieListItem key={index} movieId={movie.id} />
          ))}
        </ul>
      </section>
      <NavBar />
    </>
  );
};

export default MovieList;
