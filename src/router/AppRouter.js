import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import LandingPage from "../pages/LandingPage"
import Register from "../pages/Register"
import Login from "../pages/Login"
import MovieDetail from "../pages/MovieDetail"
import PrivateRouter from './PrivateRouter'


const AppRouter = () => {
  return (
    <>
    <Navbar/>
    <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route element={<PrivateRouter/>}>
          <Route path="/details/:id" element={<MovieDetail />} />
        </Route>
    </Routes>
    </>
  )
}

export default AppRouter