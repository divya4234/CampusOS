// AI Chatbot Service
// This service will handle all API communications with the AI chatbot backend

class ChatBotService {
  constructor() {
    this.apiBaseUrl = import.meta.env.VITE_AI_API_URL || 'http://localhost:3001/api';
    this.apiKey = import.meta.env.VITE_AI_API_KEY || '';
    this.sessionId = this.generateSessionId();
  }

  /**
   * Generate a unique session ID for the chat session
   */
  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Send a message to the AI chatbot
   * @param {string} message - The user's message
   * @param {Array} conversationHistory - Previous messages for context
   * @returns {Promise<Object>} - AI response
   */
  async sendMessage(message, conversationHistory = []) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'X-Session-ID': this.sessionId,
        },
        body: JSON.stringify({
          message: message.trim(),
          conversation_history: conversationHistory,
          session_id: this.sessionId,
          context: {
            platform: 'CampusOS',
            timestamp: new Date().toISOString(),
            user_type: this.getUserType(), // You can implement this based on your auth context
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        message: data.response || data.message,
        confidence: data.confidence || null,
        suggestions: data.suggestions || [],
        metadata: data.metadata || {}
      };

    } catch (error) {
      console.error('Error sending message to AI:', error);
      return {
        success: false,
        error: error.message,
        message: this.getErrorMessage(error)
      };
    }
  }

  /**
   * Get predefined quick responses for common queries
   * @returns {Array} - Array of quick response options
   */
  getQuickResponses() {
    return [
      {
        id: 'attendance',
        text: 'Check my attendance',
        message: 'Can you help me check my attendance status?'
      },
      {
        id: 'grades',
        text: 'View my grades',
        message: 'I want to see my current grades and academic performance.'
      },
      {
        id: 'fees',
        text: 'Fee information',
        message: 'Can you help me with fee payment and due dates?'
      },
      {
        id: 'library',
        text: 'Library services',
        message: 'Tell me about library services and book availability.'
      },
      {
        id: 'hostel',
        text: 'Hostel information',
        message: 'I need information about hostel facilities and services.'
      },
      {
        id: 'schedule',
        text: 'Class schedule',
        message: 'Can you show me my class schedule for today?'
      }
    ];
  }

  /**
   * Get user type from authentication context
   * This should be implemented based on your auth system
   */
  getUserType() {
    // TODO: Integrate with your AuthContext
    // For now, return a default value
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.role || 'student';
    } catch {
      return 'student';
    }
  }

  /**
   * Generate appropriate error message based on error type
   * @param {Error} error - The error object
   * @returns {string} - User-friendly error message
   */
  getErrorMessage(error) {
    if (error.message.includes('Failed to fetch')) {
      return "I'm having trouble connecting to the server. Please check your internet connection and try again.";
    }
    
    if (error.message.includes('401')) {
      return "Authentication failed. Please log in again to continue using the AI assistant.";
    }
    
    if (error.message.includes('403')) {
      return "You don't have permission to access the AI assistant. Please contact your administrator.";
    }
    
    if (error.message.includes('429')) {
      return "Too many requests. Please wait a moment before sending another message.";
    }
    
    if (error.message.includes('500')) {
      return "The AI service is temporarily unavailable. Please try again in a few minutes.";
    }
    
    return "I'm experiencing some technical difficulties. Please try again later.";
  }

  /**
   * Format conversation history for API
   * @param {Array} messages - Array of message objects
   * @returns {Array} - Formatted conversation history
   */
  formatConversationHistory(messages) {
    return messages
      .filter(msg => msg.sender === 'user' || msg.sender === 'bot')
      .map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
        timestamp: msg.timestamp
      }))
      .slice(-10); // Keep only last 10 messages for context
  }

  /**
   * Clear the current session
   */
  clearSession() {
    this.sessionId = this.generateSessionId();
  }

  /**
   * Get AI service status
   * @returns {Promise<Object>} - Service status
   */
  async getServiceStatus() {
    try {
      const response = await fetch(`${this.apiBaseUrl}/health`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        online: true,
        status: data.status || 'healthy',
        version: data.version || '1.0.0',
        response_time: data.response_time || null
      };

    } catch (error) {
      console.error('Error checking AI service status:', error);
      return {
        online: false,
        status: 'offline',
        error: error.message
      };
    }
  }

  /**
   * Submit feedback for AI responses
   * @param {string} messageId - ID of the message being rated
   * @param {number} rating - Rating from 1-5
   * @param {string} feedback - Optional text feedback
   * @returns {Promise<Object>} - Feedback submission result
   */
  async submitFeedback(messageId, rating, feedback = '') {
    try {
      const response = await fetch(`${this.apiBaseUrl}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'X-Session-ID': this.sessionId,
        },
        body: JSON.stringify({
          message_id: messageId,
          rating,
          feedback,
          session_id: this.sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();

    } catch (error) {
      console.error('Error submitting feedback:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Create and export a singleton instance
const chatBotService = new ChatBotService();
export default chatBotService;
