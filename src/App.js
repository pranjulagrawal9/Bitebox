import React from 'react'
import './App.scss'
import NavBar from './components/NavBar/NavBar'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className='app'>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default App