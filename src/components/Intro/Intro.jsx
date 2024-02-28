import "./Intro.scss";
import img1 from "../../assets/images/intro-img1.png";
import img2 from "../../assets/images/intro-img2.png";
import { useContext, useEffect } from "react";
import { MovieContext } from "../Context/MovieContext";
import { Link } from "react-router-dom";
const Intro = () => {
  const {
    toSignIn,
    setToSignIn,
    setHasAnimationPlayed,
    setIsNavigatingFromIntro,
    setIsActive,
    isActive,
  } = useContext(MovieContext);

  const handleGetStartedClick = (e) => {
    setHasAnimationPlayed(true);
    setIsNavigatingFromIntro(true);
    setToSignIn(!isActive);
    setIsActive(false);

    localStorage.setItem("isActive", false);
  };

  useEffect(() => {}, [toSignIn, setIsActive]);

  return (
    <>
      <section className="section-intro">
        {/* {toSignIn ? <LoginSignUp /> : null} */}
        <article className="intro-imgs-wrapper">
          <img className="intro-img1" src={img1} alt="" />
          <img className="intro-img2" src={img2} alt="" />
        </article>
        <article className="intro-content">
          <h2 className="intro-content-headline">
            Enjoy Your Movie Watch Everywhere
          </h2>
          <p className="intro-content-text">
            Stream unlimited movies and TV shows on your phone,tablet, laptop,
            and TV.
          </p>
          <Link
            to="/login"
            className="login-button "
            onClick={handleGetStartedClick}
          >
            Get Started
          </Link>
        </article>
      </section>
    </>
  );
};

export default Intro;
