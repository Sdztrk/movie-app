import React, { createContext, useEffect, useState,useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { toastWarnNotify } from "../helpers/ToastNotify";



//creating context
export const MovieContext = createContext();

//Keys that we will need 
const API_KEY = process.env.REACT_APP_TMDB_KEY;
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;


const MovieContextProvider = ({ children }) => {
  //creating navigate
const navigate = useNavigate()

  //context for currentuser
  const {currentUser} = useContext(AuthContext)

  //all satates
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("")

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  const getMovies = (API=FEATURED_API) => {
    setLoading(true);
    axios
      .get(API)
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const handleSubmit = (e)=>{
    e.preventDefault()
    // only authenticated users can search
    // can only search if a user also actually types a search term
    if (currentUser && search) {
      //if the user in the detail page this will navigate him/her to landingpage
      navigate("/")
      getMovies(`${SEARCH_API}${search}`)

    }
    // if there's no user logged in, we need to tell them to log in or register
    else if (!currentUser) {
      toastWarnNotify("Log in to search movies.");
    }
    // if there's no search term, we need to tell the user to enter a search term
    else{
      toastWarnNotify("Please enter a valid movie title.");
    }
  }

  useEffect(()=>{
    if(search===""){
      // console.log('Search is empty!')
      getMovies()
    }
  }, [search])
  
  return (
    <MovieContext.Provider value={{ movies, getMovies, loading,search,setSearch,handleSubmit }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
