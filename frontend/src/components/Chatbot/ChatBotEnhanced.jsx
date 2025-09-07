import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, Minimize2, Maximize2, RotateCcw, Zap, Settings } from 'lucide-react';
import { useChatBot } from '../../hooks/useChatBot';
import './ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [showQuickResponses, setShowQuickResponses] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const {
    messages,
    isTyping,
    isConnected,
    serviceStatus,
    sendMessage,
    clearConversation,
    sendQuickResponse,
    getQuickResponses,
    retryLastMessage,
    cancelTyping,
    checkServiceStatus,
    hasErrors
  } = useChatBot();

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chatbot opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;
    
    const messageToSend = inputMessage;
    setInputMessage('');
    setShowQuickResponses(false);
    
    await sendMessage(messageToSend);
  };

  const handleQuickResponse = (quickResponse) => {
    setShowQuickResponses(false);
    sendQuickResponse(quickResponse);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleClearChat = () => {
    clearConversation();
    setShowQuickResponses(true);
  };

  const quickResponses = getQuickResponses();

  return (
    <>
      {/* Chatbot Toggle Button */}
      {!isOpen && (
        <button
          onClick={toggleChatbot}
          className="chatbot-toggle-btn"
          aria-label="Open AI Assistant - Get help with campus services"
          title="AI Assistant - Click to chat!"
        >
          <Bot size={26} />
          <span className="chatbot-badge">AI</span>
          {!isConnected && <div className="connection-indicator offline"></div>}
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className={`chatbot-container ${isMinimized ? 'minimized' : ''}`}>
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-title">
              <Bot size={20} />
              <span>CampusOS AI Assistant</span>
              <div className={`status-indicator ${isConnected ? 'online' : 'offline'}`}></div>
            </div>
            <div className="chatbot-controls">
              {!isMinimized && (
                <>
                  <button
                    onClick={checkServiceStatus}
                    className="control-btn"
                    title="Check connection"
                    aria-label="Check connection"
                  >
                    <RotateCcw size={14} />
                  </button>
                  <button
                    onClick={handleClearChat}
                    className="control-btn"
                    title="Clear conversation"
                    aria-label="Clear conversation"
                  >
                    <Settings size={14} />
                  </button>
                </>
              )}
              <button
                onClick={toggleMinimize}
                className="control-btn"
                aria-label={isMinimized ? 'Maximize' : 'Minimize'}
              >
                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
              <button
                onClick={toggleChatbot}
                className="control-btn close-btn"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Connection Status */}
          {!isMinimized && !isConnected && (
            <div className="connection-status">
              <span>⚠️ Connection issues detected. Some features may be limited.</span>
              <button onClick={checkServiceStatus} className="retry-btn">
                Retry
              </button>
            </div>
          )}

          {/* Messages Container */}
          {!isMinimized && (
            <>
              <div className="chatbot-messages">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`message ${message.sender} ${message.isError ? 'error' : ''}`}
                  >
                    <div className="message-avatar">
                      {message.sender === 'bot' ? <Bot size={16} /> : <User size={16} />}
                    </div>
                    <div className="message-content">
                      <div className="message-text">{message.text}</div>
                      <div className="message-time">{formatTime(message.timestamp)}</div>
                      
                      {/* Suggestions */}
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className="message-suggestions">
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              className="suggestion-btn"
                              onClick={() => sendMessage(suggestion)}
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                      
                      {/* Confidence indicator for bot messages */}
                      {message.sender === 'bot' && message.confidence && (
                        <div className="confidence-indicator">
                          <small>Confidence: {Math.round(message.confidence * 100)}%</small>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Quick Responses */}
                {showQuickResponses && messages.length <= 1 && (
                  <div className="quick-responses">
                    <div className="quick-responses-title">
                      <Zap size={14} />
                      <span>Quick actions:</span>
                    </div>
                    <div className="quick-responses-grid">
                      {quickResponses.map((response) => (
                        <button
                          key={response.id}
                          className="quick-response-btn"
                          onClick={() => handleQuickResponse(response)}
                        >
                          {response.text}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="message bot">
                    <div className="message-avatar">
                      <Bot size={16} />
                    </div>
                    <div className="message-content">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <button 
                        className="cancel-typing-btn"
                        onClick={cancelTyping}
                        title="Cancel"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Error retry option */}
                {hasErrors && !isTyping && (
                  <div className="error-actions">
                    <button onClick={retryLastMessage} className="retry-btn">
                      <RotateCcw size={14} />
                      Retry last message
                    </button>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="chatbot-input-area">
                <div className="input-container">
                  <textarea
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isConnected ? "Type your message..." : "Connection required to send messages..."}
                    className="message-input"
                    rows="1"
                    disabled={isTyping || !isConnected}
                    maxLength={1000}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping || !isConnected}
                    className="send-btn"
                    aria-label="Send message"
                  >
                    <Send size={16} />
                  </button>
                </div>
                <div className="input-footer">
                  <small>
                    {isConnected 
                      ? `Powered by AI • Press Enter to send • ${inputMessage.length}/1000`
                      : 'Offline mode • Limited functionality'
                    }
                  </small>
                  {serviceStatus && (
                    <small className="service-status">
                      v{serviceStatus.version} • Status: {serviceStatus.status}
                    </small>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;
