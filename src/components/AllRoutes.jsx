import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { MovieDetails } from '../pages/MovieDetails'
import { Favorites } from '../pages/Favorites'
import { Signup } from '../pages/Signup'
import { Login } from '../pages/Login'

export const AllRoutes = () => {
  return (
    <Routes>
       <Route path="*" element={<h1>404 Page Not Found</h1>} />
       <Route path='/' element={<HomePage/>}/>
       <Route path='/movie/:imdbID' element={<MovieDetails/>} />
       <Route path='/favorites' element={<Favorites/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/signup' element={<Signup/>}/>
    </Routes>
  )
}
