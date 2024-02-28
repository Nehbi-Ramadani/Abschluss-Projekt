import DarkMode from "../DarkMode/DarkMode";
import NavBar from "../NavBar/NavBar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgprofile from "./../../assets/images/bgprofile.jpeg";

import "./Profile.scss";

const calculateAge = (birthdate) => {
  const birthYear = new Date(birthdate).getFullYear();
  const currentYear = new Date().getFullYear();
  return currentYear - birthYear;
};

const Profile = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedInStatus = localStorage.getItem("loggedIn");

      if (loggedInStatus === "true") {
        const loggedInUserFromLocalStorage =
          localStorage.getItem("loggedInUser");
        const parsedUserObj = JSON.parse(loggedInUserFromLocalStorage);

        if (parsedUserObj) {
          setLoggedInUser(parsedUserObj);
        } else {
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };

    checkLoginStatus();
  }, [navigate]);

  if (!loggedInUser) {
    return <div>Loading...</div>;
  }

  const address =
    loggedInUser.address &&
    `${loggedInUser.address.street} ${loggedInUser.address.houseNumber}, ${loggedInUser.address.postalCode} ${loggedInUser.address.country}`;

  const age = loggedInUser.birthdate && calculateAge(loggedInUser.birthdate);

  return (
    <>
      <section className="profile-wrapper">
        <img src={bgprofile} alt="" className="header-profile" />
        <div className="profile-container">
          <div className="top-bild"></div>
          <div className="profile-content">
            <div className="profile-header">
              <h1 className="profile-headline">Willkommen in deinem Profil.</h1>
            </div>
            <div className="profile-picture">
              <img
                src="src\components\SVG\mac mussterman.jpg"
                alt="Profilbild"
              />
            </div>
            <div className="profile-info">
              <DarkMode className="darkmode-aussehen" />
              <h2 className="profile-name">
                {loggedInUser.firstname} {loggedInUser.lastname}
              </h2>
              <p className="profile-text">Email: {loggedInUser.email}</p>
              {age && <p className="profile-text">Alter: {age}</p>}
              {/* <p>Adresse: {address}</p> */}
              <p className="profile-text">
                Geburtsdatum: {loggedInUser.birthdate}
              </p>
            </div>
          </div>
        </div>
        <NavBar />
      </section>
    </>
  );
};

export default Profile;
