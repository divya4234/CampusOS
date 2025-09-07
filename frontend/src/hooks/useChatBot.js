import { useState, useCallback, useRef, useEffect } from 'react';
import chatBotService from '../services/chatBotService';

/**
 * Custom hook for managing chatbot functionality
 * @returns {Object} - Chatbot state and methods
 */
export const useChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      text: "Hello! I'm your CampusOS AI Assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [serviceStatus, setServiceStatus] = useState(null);
  const abortControllerRef = useRef(null);

  // Check service status on mount
  useEffect(() => {
    checkServiceStatus();
  }, [checkServiceStatus]);

  /**
   * Check if the AI service is available
   */
  const checkServiceStatus = useCallback(async () => {
    try {
      const status = await chatBotService.getServiceStatus();
      setServiceStatus(status);
      setIsConnected(status.online);
    } catch (error) {
      console.error('Failed to check service status:', error);
      setIsConnected(false);
    }
  }, []);

  /**
   * Send a message to the AI chatbot
   * @param {string} messageText - The message to send
   */
  const sendMessage = useCallback(async (messageText) => {
    if (!messageText.trim() || isTyping) return;

    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();

    const userMessage = {
      id: `user_${Date.now()}`,
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Prepare conversation history
      const conversationHistory = chatBotService.formatConversationHistory(messages);
      
      // Send message to AI service
      const response = await chatBotService.sendMessage(messageText, conversationHistory);

      if (response.success) {
        const botMessage = {
          id: `bot_${Date.now()}`,
          text: response.message,
          sender: 'bot',
          timestamp: new Date(),
          confidence: response.confidence,
          suggestions: response.suggestions || [],
          metadata: response.metadata || {}
        };

        setMessages(prev => [...prev, botMessage]);
        setIsConnected(true);
      } else {
        throw new Error(response.error || 'Failed to get AI response');
      }

    } catch (error) {
      if (error.name === 'AbortError') {
        return; // Request was cancelled, don't show error
      }

      console.error('Error sending message:', error);
      
      const errorMessage = {
        id: `error_${Date.now()}`,
        text: error.message || "Sorry, I'm having trouble connecting right now. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
        isError: true
      };

      setMessages(prev => [...prev, errorMessage]);
      setIsConnected(false);
    } finally {
      setIsTyping(false);
      abortControllerRef.current = null;
    }
  }, [messages, isTyping]);

  /**
   * Clear the conversation
   */
  const clearConversation = useCallback(() => {
    setMessages([
      {
        id: 'welcome',
        text: "Hello! I'm your CampusOS AI Assistant. How can I help you today?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
    chatBotService.clearSession();
  }, []);

  /**
   * Send a quick response
   * @param {Object} quickResponse - Quick response object
   */
  const sendQuickResponse = useCallback((quickResponse) => {
    sendMessage(quickResponse.message);
  }, [sendMessage]);

  /**
   * Get available quick responses
   */
  const getQuickResponses = useCallback(() => {
    return chatBotService.getQuickResponses();
  }, []);

  /**
   * Submit feedback for a message
   * @param {string} messageId - ID of the message
   * @param {number} rating - Rating from 1-5
   * @param {string} feedback - Optional text feedback
   */
  const submitFeedback = useCallback(async (messageId, rating, feedback = '') => {
    try {
      const result = await chatBotService.submitFeedback(messageId, rating, feedback);
      return result;
    } catch (error) {
      console.error('Error submitting feedback:', error);
      return { success: false, error: error.message };
    }
  }, []);

  /**
   * Retry the last failed message
   */
  const retryLastMessage = useCallback(() => {
    const lastUserMessage = [...messages].reverse().find(msg => msg.sender === 'user');
    if (lastUserMessage) {
      // Remove any error messages after the last user message
      const lastUserIndex = messages.findLastIndex(msg => msg.id === lastUserMessage.id);
      setMessages(prev => prev.slice(0, lastUserIndex + 1));
      sendMessage(lastUserMessage.text);
    }
  }, [messages, sendMessage]);

  /**
   * Cancel the current typing operation
   */
  const cancelTyping = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsTyping(false);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    // State
    messages,
    isTyping,
    isConnected,
    serviceStatus,
    
    // Actions
    sendMessage,
    clearConversation,
    sendQuickResponse,
    getQuickResponses,
    submitFeedback,
    retryLastMessage,
    cancelTyping,
    checkServiceStatus,
    
    // Utilities
    conversationLength: messages.length,
    hasErrors: messages.some(msg => msg.isError),
    lastMessage: messages[messages.length - 1]
  };
};
