import React, { useState, useEffect } from "react";
import MovieDataservice from "../services/movies";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

const MovieList = (props) => {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("");
  const [ratings, setRatings] = useState(["All Ratings"]);

  useEffect(() => {
    retrieveMovies();
    retrieveRatings();
  }, []);

  const retrieveMovies = () => {
    MovieDataService.getAll()
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.movies);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveRatings = () => {
    MovieDataService.getRatings()
      .then((response) => {
        console.log(response.data);
        // start with 'All ratings' if user doesn't specify any ratings
        setRatings(["All Ratings"].concat(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const onChangeSearchRating = (e) => {
    const searchRating = e.target.value;
    setSearchRating(searchRating);
  };

  return (
    <div className="App">
      <Container>
        <Form>
          <Row>
            <col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search by title"
                  value={searchTitle}
                  onChange={onChangeSearchTitle}
                />
              </Form.Group>
              <Button variant="primary" type="button" onClick={findByTitle}>
                Search
              </Button>
            </col>
            <col>
              <form.Group>
                <form.Control as="select" onChange={onChangeSearchRating}>
                  {ratings.map((rating) => {
                    return <option value={rating}>{rating}</option>;
                  })}
                </form.Control>
              </form.Group>
              <button variant="primary" type="button" onClick={findByRating}>
                Search
              </button>
            </col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

function MoviesList() {
  return <div className="App">MovieList</div>;
}

export default MoviesList;
