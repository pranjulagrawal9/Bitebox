import React from 'react'
import './App.scss'
import NavBar from './components/NavBar/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <div className='app'>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App