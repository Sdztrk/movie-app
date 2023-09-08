import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import VideoSection from "../components/VideoSection";

const MovieDetail = () => {

  const { id } = useParams()

  const [movieDetails, setMovieDetails] = useState({})
  const [videoKey, setVideoKey] = useState()

  const {
    title,
    poster_path,
    overview,
    vote_average,
    release_date,
    vote_count,
    runtime,
    original_language,
    status,
    popularity,
  } = movieDetails;


  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const movieDetailBaseUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  const baseImageUrl = "https://image.tmdb.org/t/p/w1280";
  const defaultImage =
    "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";
  const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;

  useEffect(() => {
    axios
      .get(movieDetailBaseUrl)
      .then((res) => setMovieDetails(res.data))
      .catch((err) => console.log(err))
    axios
      .get(videoUrl)
      .then((res) => setVideoKey(res.data.results[0].key))
      .catch((err) => console.log(err))
  }, [movieDetailBaseUrl, videoUrl])

  useEffect(() => {
    // console.log(videoKey)
  }, [videoKey])

  return (
    <div className="bg-zinc-900 pt-12 m-auto md:flex md:flex-col md:justify-center md:items-center">
      <div className="videoContainer md:w-[60vw] m-auto bg-black">
        <div className="">
          <h1 className="text-center text-white text-3xl bg-zinc-900 pb-4">{title}</h1>
          {videoKey && <VideoSection videoKey={videoKey} />}
        </div>
        <div className=" text-white bg-zinc-900 py-8">
          <h5 className="text-xl font-medium mb-2 px-1">
            Overview
          </h5>
          <p className="text-base px-1">{overview}</p>
        </div>
      </div>
      <div className="mt-4 md:w-[60vw]" >
        <div className=" pb-12 flex flex-col md:w-[100%]  md:flex-row md:justify-center">
          <img
            className="md:w-[50%]"
            src={poster_path ? baseImageUrl + poster_path : defaultImage}
            alt="poster"
          />
          <div className="flex flex-col justify-between">
            <table className="min-w-full text-white">
              <tbody>
                <tr>
                  <td className="px-6 py-3 border-b border-gray-400 capitalize">Release Date</td>
                  <td className="px-6 py-3 border-b border-gray-400">{release_date}</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 border-b border-gray-400 capitalize" >Rate</td>
                  <td className="px-6 py-3 border-b border-gray-400">{vote_average}</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 border-b border-gray-400 capitalize">Total Vote</td>
                  <td className="px-6 py-3 border-b border-gray-400">{vote_count}</td>
                </tr>

                <tr>
                  <td className="px-6 py-3 border-b border-gray-400 capitalize">runtime</td>
                  <td className="px-6 py-3 border-b border-gray-400">{runtime} min.</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 border-b border-gray-400 capitalize">original language</td>
                  <td className="px-6 py-3 border-b border-gray-400 uppercase">{original_language}</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 border-b border-gray-400 capitalize">status</td>
                  <td className="px-6 py-3 border-b border-gray-400">{status}</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 border-b border-gray-400 capitalize">popularity</td>
                  <td className="px-6 py-3 border-b border-gray-400">{popularity}</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 border-b border-gray-400">Total Vote</td>
                  <td className="px-6 py-3 border-b border-gray-400">{vote_count}</td>
                </tr>
              </tbody>
            </table>
            <div className="text-center">
              <Link to={-1} className="text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out">
                Go Back
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
};

export default MovieDetail;
