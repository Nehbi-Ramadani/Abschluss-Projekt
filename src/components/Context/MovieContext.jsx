import { createContext, useState } from "react";

const MovieContext = createContext([]);

const MovieContextProvider = ({ children }) => {
  const [allMovies, setAllMovies] = useState([]);
  const [config, setConfig] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genreValue, setGenreValue] = useState("");
  const [movieDetails, setMovieDetails] = useState([]);
  const [innerWidth, setInnerWidth] = useState(window.outerWidth);
  const [showSplash, setShowSplash] = useState(false);
  const [displaySplash, setDisplaySplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const [toSignIn, setToSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [users, setUsers] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [hasAnimationPlayed, setHasAnimationPlayed] = useState(false);
  const [isNavigatingFromIntro, setIsNavigatingFromIntro] = useState(false);
  const [onLocation, setOnLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <MovieContext.Provider
      value={{
        allMovies,
        setAllMovies,
        config,
        setConfig,
        genres,
        setGenres,
        searchTerm,
        setSearchTerm,
        genreValue,
        setGenreValue,
        movieDetails,
        setMovieDetails,
        innerWidth,
        setInnerWidth,
        showSplash,
        setShowSplash,
        displaySplash,
        setDisplaySplash,
        isLoggedIn,
        setIsLoggedIn,
        email,
        setEmail,
        password,
        setPassword,
        users,
        setUsers,
        toSignIn,
        setToSignIn,
        isActive,
        setIsActive,
        loggedInUser,
        setLoggedInUser,
        firstname,
        setFirstname,
        lastname,
        setLastname,
        street,
        setStreet,
        houseNumber,
        setHouseNumber,
        postalCode,
        setPostalCode,
        country,
        setCountry,
        birthdate,
        setBirthdate,
        hasAnimationPlayed,
        setHasAnimationPlayed,
        isNavigatingFromIntro,
        setIsNavigatingFromIntro,
        onLocation,
        setOnLocation,
        isSubmitting,
        setIsSubmitting,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export { MovieContext, MovieContextProvider };
