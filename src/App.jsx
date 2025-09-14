import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import ThreeScene from './components/ThreeScene'
import GlitchText from './components/GlitchText';
import Home from './pages/Home.jsx'
import { Route, Router, Routes } from 'react-router-dom'
import StarryBackground from './components/StarryBackground.jsx'

function App() {

  return (
    <>
      <StarryBackground />
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  )
}

export default App
