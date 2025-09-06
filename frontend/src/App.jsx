import React from 'react'
import './App.css'
import AppRouter from './routes/AppRouter'
import Loading from './components/Loading/loading.jsx';
import HomePage from './pages/Landing/HomePage.jsx';

function App() {
 
  
  return (
    <div className="min-h-screen w-screen">
      <HomePage />
    </div>
  )
}

export default App
