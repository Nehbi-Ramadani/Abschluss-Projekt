import React, { useState, useContext } from "react";
import { downloadDaten } from "../Downloads/DownloadsDaten";
import NavBar from "../NavBar/NavBar";
import { MovieContext } from "../Context/MovieContext";
import "./Downloads.scss";
import binred from "./../../assets/icons/binred.svg";
import { Link } from "react-router-dom";

const Download = () => {
  const { config } = useContext(MovieContext);
  const [downloadedMovies, setDownloadedMovies] = useState(downloadDaten); // Zustand für heruntergeladene Filme

  if (!config?.images) {
    return null;
  }

  const { secure_base_url, poster_sizes } = config.images;
  const imageURL = `${secure_base_url}${poster_sizes[0]}`;

  const removeFromDownloads = (indexToRemove) => {
    const updatedDownloads = downloadedMovies.filter(
      (_, index) => index !== indexToRemove
    );
    setDownloadedMovies(updatedDownloads);
  };

  return (
    <div className="download-container">
      <h2 className="downloads-headline">Meine heruntergeladenen Filme</h2>
      <p className="download-introtext">
        Hier findest du alle Filme, die du heruntergeladen hast.
      </p>
      <div className="downloaded-movies-list">
        {downloadedMovies.map((movie, index) => (
          <div key={index} className="downloaded-movie-item">
            <img
              className="poster"
              src={`${imageURL}${movie.poster_path}`}
              alt={`Bild des Films ${movie.title}`}
            />
            <button
              className="download-secondary-btn-text-only"
              onClick={() => removeFromDownloads(index)} // Aufruf der Funktion zum Entfernen
            >
              <img src={binred} alt="" className="icon-bin" />
            </button>
          </div>

        ))}
      </div>
      <NavBar />
    </div>
  );
};

export default Download;
