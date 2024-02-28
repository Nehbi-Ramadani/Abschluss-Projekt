import { Link, useNavigate, useParams } from "react-router-dom";
import "./Details.scss";
import { useContext, useState, useEffect } from "react";
import { MovieContext } from "../Context/MovieContext";
import Button from "../Button/Button";
import play from "./../../assets/icons/play.svg";
import rating from "./../../assets/icons/rating.svg";
import ButtonIconOnly from "../Button/ButtonIconOnly";
import back from "./../../assets/icons/back.svg";
import save from "./../../assets/icons/save.svg";
import download from "./../../assets/icons/download.svg";
import ButtonBack from "../Button/ButtonBack";
import { favoritenDaten } from "../Favoriten/FavoritenDaten";
import { downloadDaten } from "../Downloads/DownloadsDaten";
import SliderNetflixStyle from "../Slider/SliderNetflixStyle";

const Details = () => {
  const currentTheme = localStorage.getItem("theme");

  //useContext from fetch
  const { allMovies, movieDetails, setMovieDetails } = useContext(MovieContext);

  const { config } = useContext(MovieContext);

  const { genres } = useContext(MovieContext);

  //Video
  const [video, setVideo] = useState();
  const [englishName, setEnglishName] = useState(true);

  // open and close paragraph (read more/less)
  const [openParagraph, setOpenParagraph] = useState(false);

  const [isInFavorites, setIsInFavorites] = useState(
    favoritenDaten.some((favMovie) => favMovie.id === selectedMovieID)
  );
  const [isInDownloads, setIsInDownloads] = useState(
    downloadDaten.some((dowmMovie) => dowmMovie.id === selectedMovieID)
  );

  //useParams and path for selected movie-data !old!
  const selectedMoviePath = useParams();

  const selectedMovieID = selectedMoviePath.id;

  const similarAPI = `https://api.themoviedb.org/3/movie/${selectedMovieID}/similar?language=en-US&page=1`;

  const selectedMovieInfos = allMovies.filter((movie) => {
    return movie.id.toString() === selectedMovieID.toString();
  });

  // Fetching environment variable for bearer token
  const bearerToken = import.meta.env
    .VITE_AUTHENTICATION_BEARER_TOKEN_THE_MOVIE_DB;

  // Defining fetch options with authentication headers
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${selectedMovieID}?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((movieDetailsObj) => {
        // Updating movie details in context
        setMovieDetails((prevDetails) => [...prevDetails, movieDetailsObj]);
      })
      .catch((error) => console.log(error));
    // return () => {
    //   setMovieDetails([]);
    // };
  }, [selectedMovieID, setMovieDetails]);

  //Array mit spoken languages
  const languages = movieDetails[0]?.spoken_languages;

  //Array mit genres aus film
  const thisMovieGenres = movieDetails[0]?.genres;

  let movie = movieDetails?.find(
    (detail) => detail?.id.toString() === selectedMovieID
  );

  if (!movie) {
    // Display loading message if movie is not found
    return <div>Lade Film...</div>;
  }

  // Destructuring movie properties
  const {
    id,
    title,
    poster_path,
    overview,
    backdrop_path,
    release_date,
    runtime,
    vote_average,
  } = movie;

  console.log(movie);

  const handleAddToFavorites = () => {
    if (isInFavorites) {
      alert("Dieser Film befindet sich bereits in Ihren Favoriten.");
    } else {
      favoritenDaten.push(movie);
      setIsInFavorites(true);
      console.log("Film zu Favoriten hinzugefügt:", movie);
    }
  };

  const handleAddToDownloads = () => {
    if (isInDownloads) {
      alert("Dieser Film befindet sich bereits in Ihren Downloads.");
    } else {
      downloadDaten.push(movie); // Fügen Sie den Film zu den Downloads hinzu
      setIsInDownloads(true);
      console.log("Film zu Downloads hinzugefügt:", movie);
    }
  };

  return (
    <>
      <section className={`movie-details`}>
        <article className="movie-details" key={id}>
          <div className="movie-details-top">
            <img
              src={`${config?.images?.base_url}${config?.images?.backdrop_sizes[3]}${backdrop_path}`}
              alt=""
              className="backdrop"
            />
            <p
              className={`movie-details-headline ${
                currentTheme === "dark" ? "dark" : "light"
              }`}
            >
              Movie Details
            </p>
            <h2 className={`${currentTheme === "dark" ? "dark" : "light"}`}>
              {title}
            </h2>
            <div className="features">
              <ButtonBack
                icon={back}
                // onClick={() => window.scrollTo(0, 0)}
              />
              <div className="save-download-wrapper">
                <button
                  className="secondary-btn-icon-only"
                  onClick={handleAddToFavorites}
                >
                  <img src={save} alt="" />
                </button>
                <button
                  className="secondary-btn-icon-only"
                  onClick={handleAddToDownloads}
                >
                  <img src={download} alt="" />
                </button>
              </div>
            </div>
            <div
              className={`key-infos ${
                currentTheme === "dark" ? "dark" : "light"
              }`}
            >
              <ul>
                <p>
                  <img src={rating} alt="" /> {vote_average}
                </p>
                <li>{release_date}</li>

                {/* <li>{genres[0]?.name}</li> */}
                <li>
                  {Math.floor(runtime / 60)} h {runtime % 60} min
                </li>
              </ul>
            </div>
          </div>
          <div
            className={`movie-details-bottom ${
              currentTheme === "dark" ? "dark" : "light"
            }`}
          >
            <h3>Overview</h3>
            <div>
              <p
                className={
                  openParagraph ? "overview-text-open" : "overview-text-closed"
                }
              >
                {overview}
              </p>
              <button
                onClick={() => setOpenParagraph(!openParagraph)}
                className="inline-btn"
              >
                {openParagraph ? "See less" : "See more"}
              </button>
            </div>
            <div className="genres">
              <span>Genres</span>
              <div className="info-table">
                {thisMovieGenres?.map((genre, index) => (
                  <p key={index}>{genre.name}</p>
                ))}
              </div>
            </div>
            <div className="languages">
              <span>Languages</span>
              <div className="info-table">
                {languages?.map((language, index) =>
                  englishName ? (
                    <p key={index}>{language.english_name}</p>
                  ) : (
                    <p key={index}>{language.name}</p>
                  )
                )}
              </div>
            </div>

            <Link to={`/trailer/${movie.id}`} className="linkTo">
              <Button icon={play} content="Watch now"></Button>
            </Link>
          </div>
          <SliderNetflixStyle fetchUrl={similarAPI} />
        </article>
      </section>
    </>
  );
};

export default Details;
