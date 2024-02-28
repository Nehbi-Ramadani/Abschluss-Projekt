import "./Button.scss";
import save from "./../../assets/icons/save.svg";
import { favoritenDaten } from "../Favoriten/FavoritenDaten";
import { MovieContext } from "../Context/MovieContext";
import { useContext, useState } from "react";

const ButtonFavorites = ({ movieId }) => {
  const {
    config,
    movieDetails,
    setMovieDetails,
    genreValue,
    searchTerm,
    innerWidth,
    setInnerWidth,
  } = useContext(MovieContext);

  const [isInFavorites, setIsInFavorites] = useState(
    favoritenDaten.some((favMovie) => favMovie?.id === movieId)
  );

  let movie = movieDetails.find((detail) => detail?.id === movieId);

  // const {
  //   title,
  //   poster_path,
  //   backdrop_path,
  //   release_date,
  //   runtime,
  //   vote_average,
  // } = movie;

  const handleAddToFavorites = () => {
    if (isInFavorites) {
      console.log("Dieser Film befindet sich bereits in Ihren Favoriten.");
      alert("Dieser Film befindet sich bereits in Ihren Favoriten.");
    } else {
      favoritenDaten.push(movie);
      setIsInFavorites(true);
      console.log("Film zu Favoriten hinzugefügt:", movie);
    }
  };

  return (
    <button className="secondary-btn-favorites" onClick={handleAddToFavorites}>
      <img src={save} alt="" />
    </button>
  );
};

export default ButtonFavorites;
