import React from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'

function App() {
  return (
    <Router>
      <div className="App">
        <Dashboard />
      </div>
    </Router>
  )
}

export default App
