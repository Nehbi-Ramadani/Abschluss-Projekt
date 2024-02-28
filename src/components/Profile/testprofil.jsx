import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profilseite = () => {
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
          // Handle the case where the user information is not found in local storage.
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

  return (
    <div>
      <h2>Profilseite für {loggedInUser.firstname}</h2>
      <p>Email: {loggedInUser.email}</p>
      {/* Weitere Informationen anzeigen ... */}
    </div>
  );
};

export default Profilseite;
