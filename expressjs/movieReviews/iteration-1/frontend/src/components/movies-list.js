import React, { useState, useEffect } from "react";
import MovieDataservice from "../services/movies";
import { Link } from "react-router-dom";

const MovieList = (props) => {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("");
  const [ratings, setRatings] = useState(["All Ratings"]);
};

function MoviesList() {
  return <div className="App">MovieList</div>;
}

export default MoviesList;
