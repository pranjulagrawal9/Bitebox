import React from 'react'
import './App.scss'
import NavBar from './components/NavBar/NavBar'
import CardContainer from './components/CardContainer/CardContainer'

function App() {
  return (
    <div className='app'>
      <NavBar />
      <CardContainer />
    </div>
  )
}

export default App