import React from 'react'
import './index.css'
import AppRouter from './routes/AppRouter.jsx';
import { ChatBotIntegration } from './components/Chatbot';

function App() {
  return (
    <div className="App">
      <AppRouter />
      {/* AI Chatbot - Available throughout the application */}
      <ChatBotIntegration enabled={true} />
    </div>
  )
}

export default App
