import { useState } from 'react'
import SearchBar from '../components/SearchBar/SearchBar.jsx'
import Results from '../components/Results/Results.jsx'
import './App.css'

function App() {

  return (
    <div id="App">
      <h1>Vite + React</h1>
      <SearchBar />
      <Results />
    </div>
  )
}

export default App
