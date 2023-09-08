import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const IMG_API = "https://image.tmdb.org/t/p/w1280";
const defaultImage =
  "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

const MovieCard = ({ poster_path, title, overview, vote_average, id }) => {
  const { currentUser } = useContext(AuthContext);

  const getVoteClass = (vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 6) {
      return "orange";
    } else {
      return "red";
    }
  };

  return (
    <Link
      className="movie-card w-[300px] h-[500px] bg-black mb-12 inline-block m-2 rounded-md shadow shadow-black cursor-pointer"
      id="container"
      to={"/details/" + id}
    >
      <div className="imageDiv relative max-w-[100%]">
        <img
          className="movieImg w-[100%] h-[450px] inline-block border-b-2 rounded-t-md"
          loading="lazy"
          src={poster_path ? IMG_API + poster_path : defaultImage}
          alt="movie-card"
        />
        <div className="text-center p-2 text-white">
          <h5 className="text-lg font-light">{title}</h5>
          {currentUser && (
            <span className={`tag ${getVoteClass(vote_average)} absolute right-0 top-0 mt-1 mr-1 rounded-full flex justify-center items-center`}>
              {vote_average.toFixed(1)}
            </span>
          )}

        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
