import { useContext} from "react";
import { MovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";


const LandingPage = () => {

  //contexts
  const {movies}= useContext(MovieContext)

  return (
    <>
      {/* displaying movies here: */}
      <div className="flex justify-center bg-zinc-900">
        <div className="mt-4 d-flex flex-row-reverse justify-center flex-wrap  w-5/6 md: flex">
          {
            movies.length > 0 ? movies.map((movie)=><MovieCard key={movie.id} {...movie} />) : <h1>No movies found</h1>
          }
        </div>
      </div>
    </>
  )
};

export default LandingPage;
