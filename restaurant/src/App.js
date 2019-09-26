import React from 'react'
import './App.css'
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider as ReduxProvider} from 'react-redux'

import Dashboard from './components/dashboard/Dashboard'
import configureStore from './state/store'
const reduxStore = configureStore({})

function App() {
  return (
    <ReduxProvider store={reduxStore}>
      <Router>
        <div className="App">
          <Dashboard />
        </div>
      </Router>
    </ReduxProvider>
  )
}

export default App
