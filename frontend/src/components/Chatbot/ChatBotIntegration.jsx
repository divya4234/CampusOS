import React from 'react';
import ChatBot from './ChatBot';

/**
 * ChatBot integration wrapper component
 * This component handles the integration of the chatbot with your application
 */
const ChatBotIntegration = ({ 
  enabled = true, 
  position = 'bottom-right',
  theme = 'default' 
}) => {
  // Don't render if disabled
  if (!enabled) return null;

  return (
    <div className={`chatbot-integration ${position} ${theme}`}>
      <ChatBot />
    </div>
  );
};

export default ChatBotIntegration;
