import { LogError } from "concurrently";
import React, { useState, useEffect } from "react";
import "./App.css";

const MovieInfo = ({ title, tagline, vote_average, id }) => {
  return (
    <div className="movie-info" key={id}>
      <h2 className="title">{title}</h2>
      <p className="tagline">{tagline || "No tagline available"}</p>
      <p className="vote-average">Vote Average: {vote_average} / 10</p>
    </div>
  );
};

function App() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("/api/movies");
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        const payload = await response.json();
        setMovies(payload.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movies</h1>
      </header>

      {console.log(movies)}

      {movies.map((movie) => (
        <MovieInfo
          title={movie.title}
          tagline={movie.tagline}
          vote_average={movie.vote_average}
          id={movie.id}
        />
      ))}
    </div>
  );
}

export default App;
