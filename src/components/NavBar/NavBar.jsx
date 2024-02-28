import { useContext } from "react";
import Searchbar from "../Searchbar/Searchbar";
import "./NavBar.scss";

import { Link, useLocation } from "react-router-dom";
import { MovieContext } from "../Context/MovieContext";

const NavBar = () => {
  const { setGenreValue } = useContext(MovieContext);

  const location = useLocation();

  return (
    <div className="NavBar ">
      <Link
        to="/"
        className={`navLink ${location.pathname === "/" ? "active" : ""}`}
        onClick={() => <Searchbar /> && setGenreValue("")}
      >
        <div className="imageContainer">
          <img
            src="src/components/SVG/Home.svg"
            alt="Home"
            className={`homeImage navImage ${
              location.pathname === "/home" ? "active" : ""
            }`}
          />
        </div>
      </Link>
      <Link
        to="/Favoriten"
        className={`navLink ${
          location.pathname === "/Favoriten" ? "active" : ""
        }`}
      >
        <img
          src="src/components/SVG/Vector.svg"
          alt="Vector"
          className="navImage"
        />
      </Link>
      <Link
        to="/Downloads"
        className={`navLink ${
          location.pathname === "/Downloads" ? "active" : ""
        }`}
      >
        <img
          src="src/components/SVG/Download.svg"
          alt="Download"
          className="navImage"
        />
      </Link>
      <Link
        to="/profile"
        className={`navLink ${
          location.pathname === "/profile" ? "active" : ""
        }`}
      >
        <img
          src="src/components/SVG/Profile.svg"
          alt="Profile"
          className="navImage"
        />
      </Link>
    </div>
  );
};

export default NavBar;