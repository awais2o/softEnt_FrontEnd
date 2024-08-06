// import logo from './logo.svg'
import { Toaster } from 'react-hot-toast'
import './App.css'
import React, { createContext, useState, useContext } from 'react'
import LoginPage from './Pages/LoginPage'
import UserProvider from './Providers/UserProvider'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoute from './Components/PrivateRoute'
import ProductPage from './Pages/ProductPage'

function App () {
  return (
    <>
      <Toaster />
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route
              path='/product'
              element={
                <PrivateRoute>
                  <ProductPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  )
}

export default App
