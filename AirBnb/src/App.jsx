import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ScrollBar from './Component/Header/ScrollBar'
import SearchBar from './Component/Header/SearchBar'
import HomePage from './Component/Pages/HomePage'
import Header from './Component/Header/Header'

function App() {
  return (
    <>
      <div className='mainDiv'>
      <Header/>
      <SearchBar />
      <ScrollBar />
      <HomePage/>
      </div>
    </>
  )
}

export default App
