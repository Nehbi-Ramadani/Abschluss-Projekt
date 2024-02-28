import { Link } from "react-router-dom";
import "./Registration.scss";
import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../Context/MovieContext";
import { useNavigate } from "react-router-dom";
import logoblack from "./../../assets/logos/logoblack.svg";
import bg from "./../../assets/images/bg.avif";

const Registration = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
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
    users,
    setUsers,
    isLoggedIn,
    setIsLoggedIn,
    isActive,
    setIsActive,
  } = useContext(MovieContext);

  const navigate = useNavigate();

  useEffect(() => {
    const usersFromLocalStorage = localStorage.getItem("users") || "[]";
    const parsedUserObj = JSON.parse(usersFromLocalStorage);
    setUsers(parsedUserObj);

    const isActiveValueFromLocalStorage = localStorage.getItem("isActive");
    const isActiveValue = isActiveValueFromLocalStorage
      ? JSON.parse(isActiveValueFromLocalStorage)
      : false;
    setIsActive(isActiveValue);
  }, [email, password, setIsLoggedIn, isActive, setIsActive, setUsers]);

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();

    let allUsers = users
      ? [
          ...users,
          {
            firstname,
            lastname,
            email,
            password,
            address: {
              street,
              houseNumber,
              postalCode,
              country,
            },
            birthdate,
          },
        ]
      : [
          {
            firstname,
            lastname,
            email,
            password,
            address: {
              street,
              houseNumber,
              postalCode,
              country,
            },
            birthdate,
          },
        ];

    setUsers(allUsers);
    localStorage.setItem("users", JSON.stringify(allUsers));
    setIsActive(false);
    localStorage.setItem("isActive", false);
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setStreet("");
    setHouseNumber("");
    setPostalCode("");
    setCountry("");
    setBirthdate("");
    navigate("/login");
  };

  const saveIsActiveValue = (e) => {
    if (e.target.textContent.toLowerCase() === "sign in") {
      setIsActive(false);
      localStorage.setItem("isActive", !isActive);
    } else if (e.target.textContent.toLowerCase() === "registration") {
      setIsActive(true);
      localStorage.setItem("isActive", !isActive);
    }
  };

  return (
    <section className="reg-section-wrapper">
      <img src={bg} alt="" className="reg-background" />
      <section className="reg-section-registration">
        <img src={logoblack} alt="" className="reg-login-logo" />
        <div className="reg-registration-signin">
          <Link
            to="/login"
            className={`reg-login-headline ${
              isActive ? null : "reg-form-active"
            }`}
            onClick={(e) => saveIsActiveValue(e)}
          >
            Sign In
          </Link>
          <Link
            to="/registration"
            className={`reg-registration-headline ${
              isActive ? "reg-form-active" : null
            }`}
            onClick={(e) => saveIsActiveValue(e)}
          >
            Registration
          </Link>
        </div>
        <form className="reg-registration-form">
          <input
            type="text"
            name="firstname"
            id="firstname"
            className="reg-input"
            placeholder="Firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            type="text"
            name="lastname"
            id="lastname"
            className="reg-input"
            placeholder="Lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          {/* <input
            type="text"
            name="street"
            id="street"
            className="reg-input"
            placeholder="Street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <input
            type="text"
            name="houseNumber"
            id="houseNumber"
            className="reg-input"
            placeholder="House Number"
            value={houseNumber}
            onChange={(e) => setHouseNumber(e.target.value)}
          />
          <input
            type="text"
            name="postalCode"
            id="postalCode"
            className="reg-input"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <input
            type="text"
            name="country"
            id="country"
            className="reg-input"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          /> */}
          <input
            type="date"
            name="birthdate"
            id="birthdate"
            className="reg-input"
            placeholder="Birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
          <input
            type="email"
            name="email"
            id="email"
            className="reg-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            className="reg-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="submit"
            value="Registration"
            className="registration-button"
            onClick={handleRegistrationSubmit}
          />

          <div className="reg-informations">
            <span className="reg-need-help">Need help?</span>
          </div>
        </form>
      </section>
    </section>
  );
};

export default Registration;
