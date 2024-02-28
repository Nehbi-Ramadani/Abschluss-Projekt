import { useContext, useEffect } from "react";
import "./Splash.scss";
import { MovieContext } from "../Context/MovieContext";
import logowhite from "./../../assets/logos/logowhite.svg";

const Splash = () => {
  const { showSplash } = useContext(MovieContext);

  useEffect(() => {}, [showSplash]);

  return (
    <section
      className={`spash-screen ${
        showSplash ? "puff-in-center" : "puff-out-center"
      }`}
    >
      <img src={logowhite} alt="" />
    </section>
  );
};

export default Splash;
