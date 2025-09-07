// ChatBot Configuration
export const chatBotConfig = {
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_AI_API_URL || 'http://localhost:3001/api',
    apiKey: import.meta.env.VITE_AI_API_KEY || '',
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
    retryDelay: 1000, // 1 second
  },

  // UI Configuration
  ui: {
    theme: 'default', // 'default', 'dark', 'campus'
    position: 'bottom-right', // 'bottom-right', 'bottom-left', 'top-right', 'top-left'
    size: {
      width: 380,
      height: 500,
      minimizedHeight: 60
    },
    colors: {
      primary: '#667eea',
      secondary: '#764ba2',
      success: '#2ed573',
      error: '#ff4757',
      warning: '#ffa502',
      text: '#2c3e50',
      background: '#ffffff'
    },
    animation: {
      enabled: true,
      duration: 300
    }
  },

  // Feature Configuration
  features: {
    quickResponses: true,
    typing: true,
    suggestions: true,
    feedback: true,
    fileUpload: false,
    voiceInput: false,
    darkMode: true,
    persistence: true, // Remember conversation history
    notifications: false
  },

  // Behavior Configuration
  behavior: {
    welcomeMessage: "Hello! I'm your CampusOS AI Assistant. How can I help you today?",
    placeholderText: "Type your message...",
    maxMessageLength: 1000,
    maxConversationHistory: 50,
    autoFocus: true,
    autoScroll: true,
    showTimestamps: true,
    showConfidence: true
  },

  // Campus-specific Configuration
  campus: {
    name: 'CampusOS',
    capabilities: [
      'Academic information',
      'Fee management',
      'Hostel services',
      'Library services',
      'Attendance tracking',
      'Grade inquiries',
      'Schedule information',
      'Campus navigation'
    ],
    quickActions: [
      {
        id: 'attendance',
        text: 'Check my attendance',
        message: 'Can you help me check my attendance status?',
        category: 'academic'
      },
      {
        id: 'grades',
        text: 'View my grades',
        message: 'I want to see my current grades and academic performance.',
        category: 'academic'
      },
      {
        id: 'fees',
        text: 'Fee information',
        message: 'Can you help me with fee payment and due dates?',
        category: 'financial'
      },
      {
        id: 'library',
        text: 'Library services',
        message: 'Tell me about library services and book availability.',
        category: 'services'
      },
      {
        id: 'hostel',
        text: 'Hostel information',
        message: 'I need information about hostel facilities and services.',
        category: 'services'
      },
      {
        id: 'schedule',
        text: 'Class schedule',
        message: 'Can you show me my class schedule for today?',
        category: 'academic'
      }
    ]
  },

  // Error Messages
  errorMessages: {
    network: "I'm having trouble connecting to the server. Please check your internet connection and try again.",
    authentication: "Authentication failed. Please log in again to continue using the AI assistant.",
    authorization: "You don't have permission to access the AI assistant. Please contact your administrator.",
    rateLimit: "Too many requests. Please wait a moment before sending another message.",
    serverError: "The AI service is temporarily unavailable. Please try again in a few minutes.",
    generic: "I'm experiencing some technical difficulties. Please try again later.",
    timeout: "The request timed out. Please try again.",
    invalidInput: "Please enter a valid message."
  },

  // Development Configuration
  development: {
    debug: import.meta.env.MODE === 'development',
    mockResponses: import.meta.env.VITE_USE_MOCK_AI === 'true',
    logLevel: 'info' // 'debug', 'info', 'warn', 'error'
  }
};

// Helper function to get configuration value
export const getConfig = (path, defaultValue = null) => {
  const keys = path.split('.');
  let value = chatBotConfig;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return defaultValue;
    }
  }
  
  return value;
};

// Helper function to update configuration
export const updateConfig = (path, newValue) => {
  const keys = path.split('.');
  let current = chatBotConfig;
  
  for (let i = 0; i < keys.length - 1; i++) {
    if (!(keys[i] in current)) {
      current[keys[i]] = {};
    }
    current = current[keys[i]];
  }
  
  current[keys[keys.length - 1]] = newValue;
};

export default chatBotConfig;
