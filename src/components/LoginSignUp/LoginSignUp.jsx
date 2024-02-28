import { Link } from "react-router-dom";
import "./LoginSignUp.scss";
import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../Context/MovieContext";
import { useNavigate } from "react-router-dom";
import logoblack from "./../../assets/logos/logoblack.svg";
import bg from "./../../assets/images/bg.avif";

const LoginSignUp = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    users,
    setUsers,
    isLoggedIn,
    setIsLoggedIn,
    isActive,
    setIsActive,
    hasAnimationPlayed,
    isNavigatingFromIntro,
    setIsNavigatingFromIntro,
  } = useContext(MovieContext);

  const navigate = useNavigate();

  useEffect(() => {
    const usersFromLocalStorage = localStorage.getItem("users");
    const parsedUserObj = JSON.parse(usersFromLocalStorage);
    const isActiveValueFromLocalStorage = localStorage.getItem("isActive");
    const isActiveValue = JSON.parse(isActiveValueFromLocalStorage);
    setUsers(parsedUserObj);
    setIsActive(isActiveValue);

    if (isNavigatingFromIntro) {
      const timer = setTimeout(() => {
        setIsNavigatingFromIntro(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [
    email,
    password,
    setIsLoggedIn,
    isActive,
    isNavigatingFromIntro,
    setIsNavigatingFromIntro,
  ]);

  var loggedInUser = "";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      console.log("Bitte geben Sie E-Mail und Passwort ein.");
      return;
    }

    let isUserValid = false;
    for (const singleUser of users) {
      if (singleUser.email === email && singleUser.password === password) {
        console.log(singleUser);
        isUserValid = true;
        loggedInUser = {
          username: singleUser.username,
          email: singleUser.email,
          address: singleUser.address,
          birthdate: singleUser.birthdate,
          firstname: singleUser.firstname,
          lastname: singleUser.lastname,
          password: singleUser.password,
        };

        break;
      }
    }

    setEmail("");
    setPassword("");

    if (isUserValid) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      setIsLoggedIn(true);
      navigate("/");
    } else {
      console.log("Email or password not correct! Please try again.");
    }
  };

  const saveIsActiveValue = (e) => {
    if (e.target.textContent.toLowerCase() === "sign in") {
      setIsActive(false);
      console.log(isActive);
      localStorage.setItem("isActive", !isActive);
    } else if (e.target.textContent.toLowerCase() === "registration") {
      setIsActive(true);
      console.log(isActive);
      localStorage.setItem("isActive", !isActive);
    }
  };

  console.log(email);
  console.log(password);

  return (
    <section className="log-section-wrapper">
      <img src={bg} alt="" className="log-background" />
      <section
        className={`log-section-login ${
          isNavigatingFromIntro ? "animate" : ""
        }`}
      >
        <img src={logoblack} alt="" className="login-logo" />
        <div className="registration-signin">
          <Link
            to="/login"
            className={`login-headline ${isActive ? null : "form-active"}`}
            onClick={(e) => saveIsActiveValue(e)}
          >
            Sign In
          </Link>
          <Link
            to="/registration"
            className={`registration-headline ${
              isActive ? "form-active" : null
            }`}
            onClick={(e) => saveIsActiveValue(e)}
          >
            Registration
          </Link>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            className="login-email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            className="login-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="Sign In" className="login-button" />

          <div className="informations">
            <label htmlFor="remember-me" className="remember-me">
              <input
                type="checkbox"
                name="remember-me"
                id="remember-me"
                className="remember-me"
              />
              Remember me
            </label>
            <span className="need-help">Need help?</span>
          </div>
        </form>
      </section>
    </section>
  );
};

export default LoginSignUp;
