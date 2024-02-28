import React, { useState, useEffect } from "react";

const YourComponent = () => {
  // Zustand, um die Daten und den Link für die nächste Abfrage zu speichern
  const [allMovies, setAllMovies] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzUwMzc4ZDNjYTc2YjBjMWU4MWEyODRlZmYzNzg3MCIsInN1YiI6IjY1NmY2YzRlOTQ2MzE4MDExZDhhMDQyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SDK0CwPNgeSykWhKcCVsJj-ZZk7fQWBt3pQBFB57XVI",
    },
  };

  useEffect(() => {
    const fetchDataFromApi = (pageIndex) => {
      fetch(
        `https://api.themoviedb.org/3/discover/movie?page=${pageIndex}&language=en`,
        options
      )
        .then((response) => response.json())
        .then((data) => {
          setAllMovies((prevData) => [...prevData, ...data.results]);
          if (data.page !== data.total_pages) {
            setPageIndex(pageIndex + 1);
          } else {
            setPageIndex(null);
          }
        });
    };

    fetchDataFromApi(pageIndex);
  }, [pageIndex]);

  return <></>;
};

export default YourComponent;
