import { useParams } from "react-router-dom";
import ButtonBack from "../Button/ButtonBack";
import "./Trailer.scss";
import back from "./../../assets/icons/back.svg";
import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../Context/MovieContext";

const Trailer = () => {
  const { id: selectedMoviePath } = useParams();

  const selectedMovieID = selectedMoviePath.id;
  // console.log(selectedMovieID);

  const { allMovies, movieDetails, setMovieDetails } = useContext(MovieContext);
  // console.log(allMovies);

  const [video, setVideo] = useState([]);

  const bearerToken = import.meta.env
    .VITE_AUTHENTICATION_BEARER_TOKEN_THE_MOVIE_DB;

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${selectedMoviePath}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((movieTrailerObj) => {
        // Updating movie details in context
        return setVideo((prevDetails) => [...prevDetails, movieTrailerObj]);
      })
      .catch((error) => console.log(error));
  }, [selectedMovieID, setVideo]);

  let trailer =
    video[0]?.results?.find(
      (singleVideo) =>
        singleVideo.type.toLowerCase() === "trailer" && singleVideo.official
    ) || video[0]?.results[0];

  if (!trailer) {
    return <div>Lade Trailer...</div>;
  }

  const { key: youtubeTrailerKey } = trailer;

  return (
    <>
      <section className="trailer-wrapper">
        <ButtonBack icon={back} className="back-on-fullscreen" />
        {/* <YouTube className="youtube" /> */}
        <div className="youtube">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeTrailerKey}`}
            allowFullScreen
            frameBorder="0"
          ></iframe>
        </div>
      </section>
    </>
  );
};

export default Trailer;
