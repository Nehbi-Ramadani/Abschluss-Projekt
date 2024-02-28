import { useContext, useEffect, useState } from "react";
import "./MovieListItem.scss";
import { MovieContext } from "../Context/MovieContext";
import { downloadDaten } from "../Downloads/DownloadsDaten";
import rating from "./../../assets/icons/rating.svg";
import loader from "./../../assets/gif/lodading-spinner.gif";
import { favoritenDaten } from "../Favoriten/FavoritenDaten";
import { Link } from "react-router-dom";
import ButtonIconOnly from "../Button/ButtonIconOnly";
import save from "./../../assets/icons/save.svg";
import savewhite from "./../../assets/icons/savewhite.svg";
import download from "./../../assets/icons/download.svg";
import downloadwhite from "./../../assets/icons/downloadwhite.svg";

const MovieListItem = ({ movieId }) => {
  // useState for clicked button
  const [buttonOneClicked, setButtonOneClicked] = useState(false);
  const [buttonTwoClicked, setButtonTwoClicked] = useState(false);

  // Accessing context values
  const {
    config,
    movieDetails,
    setMovieDetails,
    genreValue,
    searchTerm,
    innerWidth,
    setInnerWidth,
  } = useContext(MovieContext);

  // Fetching environment variable for bearer token
  const bearerToken = import.meta.env
    .VITE_AUTHENTICATION_BEARER_TOKEN_THE_MOVIE_DB;

  // State to track if the movie is already in favorites
  const [isInFavorites, setIsInFavorites] = useState(
    favoritenDaten.some((favMovie) => favMovie.id === movieId)
  );
  const [isInDownloads, setIsInDownloads] = useState(
    downloadDaten.some((dowmMovie) => dowmMovie.id === movieId)
  );

  // Fetch movie details and add to context
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    async function fetchDetails() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          options
        );
        if (response.ok) {
          const movieDetailsObj = await response.json();
          const movieExists = await movieDetails.some(
            (detail) => detail.id === movieId
          );
          if (!movieExists) {
            setMovieDetails((prevDetails) => [...prevDetails, movieDetailsObj]);
          }
          return movieDetailsObj;
        }
        throw new Error("Something went wrong");
      } catch (error) {
        console.log(error);
      }
    }

    fetchDetails();

    // Funktion, die bei einer Größenänderung des Fensters aufgerufen wird
    const handleResize = () => {
      setInnerWidth(window.outerWidth);
    };

    // Event-Listener hinzufügen
    window.addEventListener("resize", handleResize);

    // Cleanup-Funktion
    return () => window.removeEventListener("resize", handleResize);
  }, [movieId, setMovieDetails, movieDetails]);

  // Return null if image configuration is not available
  if (!config?.images) {
    return null;
  }

  let movie = movieDetails.find((detail) => detail?.id === movieId);
  if (!movie) {
    // Display loading message if movie is not found
    return <img src={loader} />;
  }

  // Checking if movie matches search term and selected genre
  const titleMatchesSearchTerm = searchTerm
    ? movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    : true;
  const genreMatches = genreValue
    ? movie.genres.some((genre) => genre.name === genreValue)
    : true;

  // Do not render if movie does not match the filter criteria
  if (!titleMatchesSearchTerm || !genreMatches) {
    return null;
  }

  // Destructuring movie properties
  const {
    title,
    poster_path,
    backdrop_path,
    release_date,
    runtime,
    vote_average,
  } = movie;

  const releaseYear = release_date
    ? new Date(release_date).getFullYear()
    : "Unknown";

  const { secure_base_url, poster_sizes, backdrop_sizes } = config.images;
  const imageURLPoster = `${secure_base_url}${poster_sizes[6]}${poster_path}`;
  const imageURLBackdrop = `${secure_base_url}${backdrop_sizes[3]}${backdrop_path}`;

  const handleAddToFavorites = () => {
    if (isInFavorites) {
      alert("Dieser Film befindet sich bereits in Ihren Favoriten.");
    } else {
      favoritenDaten.push(movie);
      setIsInFavorites(true);
      setButtonOneClicked(true);
      console.log("Film zu Favoriten hinzugefügt:", movie);
    }
  };

  const handleAddToDownloads = () => {
    if (isInDownloads) {
      alert("Dieser Film befindet sich bereits in Ihren Downloads.");
    } else {
      downloadDaten.push(movie); // Fügen Sie den Film zu den Downloads hinzu
      setIsInDownloads(true);
      setButtonTwoClicked(true);
      console.log("Film zu Downloads hinzugefügt:", movie);
    }
  };

  return (
    <li key={movieId} className="movie-card">
      <Link
        to={`/detail/${movie.id}`}
        className="link"
        onClick={() => window.scrollTo(0, 0)}
      >
        <div className="image-wrapper">
          <img
            className={
              innerWidth <= 992 ? "movie-card-img" : "movie-card-desktop-img"
            }
            src={innerWidth <= 992 ? imageURLPoster : imageURLBackdrop}
            alt={`Bild des Films ${title}`}
          />
        </div>
      </Link>

      <div className="movie-card-content-wrapper">
        <Link
          to={`/detail/${movie.id}`}
          className="link"
          onClick={() => window.scrollTo(0, 0)}
        >
          <div className="movie-card-content">
            <h2 className="movie-card-headline">{title}</h2>
            <div className="movie-card-infos">
              <p className="movie-card-rating">
                <img src={rating} alt="" className="rating-icon" />
                {vote_average.toFixed(1)}
              </p>
              <p className="dot">⏺</p>
              <p className="movie-card-release_date">{releaseYear}</p>
              <p className="dot">⏺</p>

              <p className="movie-card-runtime">
                {Math.floor(runtime / 60)}h {runtime % 60}m
              </p>
            </div>

            {genreValue && (
              <>
                <p className="movie-card-genre">{genreValue}</p>
                {/* <p className="dot">⏺</p> */}
              </>
            )}
          </div>
        </Link>
        <div className="movie-card-functions">
          <button
            className={
              buttonOneClicked
                ? "secondary-btn-icon-only-clicked"
                : "secondary-btn-icon-only"
            }
            onClick={handleAddToFavorites}
          >
            <img src={buttonOneClicked ? savewhite : save} alt="" />
          </button>
          <button
            className={
              buttonTwoClicked
                ? "secondary-btn-icon-only-clicked"
                : "secondary-btn-icon-only"
            }
            onClick={handleAddToDownloads}
          >
            <img src={buttonTwoClicked ? downloadwhite : download} alt="" />
          </button>
        </div>
      </div>

      {/* <img
          onClick={handleAddToFavorites} // Fügen Sie den onClick-Handler hinzu
          className="favorites"
          src="src\components\SVG\Vector.svg"
          alt=""
        />
        <img
          onClick={handleAddToDownloads}
          className="download-icon"
          src="src\components\SVG\Download.svg"
          alt=""
        /> */}
    </li>
  );
};

export default MovieListItem;
