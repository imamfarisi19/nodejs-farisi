import React from "react";
import MovieDataService from "../services/movies";
import { Link } from "reat-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/esm/Button";
import Media from "react-bootstrap/Media";
import moment from "moment";

const Movie = (props) => {
  const [movie, setMovie] = useState({
    id: null,
    title: "",
    rated: "",
    reviews: [],
  });

  const getMovie = (id) => {
    MovieDataService.get(id)
      .then((response) => {
        setMovie(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getMovie(props.match.params.id);
  }, [props.match.paramss.id]);

  const deleteReview = (reviewId, index) => {
    MovieDataService.deleteReview(reviewId, props.user.id)
      .then((response) => {
        setMovie((prevState) => {
          prevState.reviews.splice(index, 1);
          return {
            ...prevState,
          };
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <Container>
        <Row>
          <col>
            <image src={movie.poster + "/100px250"} fluid />
          </col>
          <col>
            <card>
              <Card.Header as="h5">{movie.title}</Card.Header>
              <card.body>
                <card.text>{movie.plot}</card.text>
                {props.user && (
                  <Link to={"/movies/" + props.match.params.id + "/review"}>
                    Add Review
                  </Link>
                )}
              </card.body>
            </card>
            <br></br>
            <h2>Reviews</h2>
            {movie.reviews.map((review, index) => {
              return (
                <Media key={index}>
                  <Media.Body>
                    <h5>
                      {review.name + " reviewed on "}{" "}
                      {moment(review.date).format("Do MMMM YYYY")}
                    </h5>
                    <p>{review.review}</p>
                    {props.user && props.user.id === review.user_id && (
                      <Row>
                        <Col>
                          <Link
                            to={{
                              pathname:
                                "/movies/" + props.match.params.id + "/review",
                              state: { currentReview: review },
                            }}
                          >
                            Edit
                          </Link>
                        </Col>
                        <Col>
                          <Button
                            variant="link"
                            onClick={() => deleteReview(review._id, index)}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    )}
                  </Media.Body>
                </Media>
              );
            })}
          </col>
        </Row>
      </Container>
    </div>
  );
};

export default Movie;
