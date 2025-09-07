# CampusOS AI Chatbot Integration

This directory contains a complete AI chatbot implementation for your CampusOS application. The chatbot is designed to help students, faculty, and staff with various campus-related queries.

## 📁 File Structure

```
src/components/Chatbot/
├── ChatBot.jsx              # Basic chatbot component
├── ChatBotEnhanced.jsx      # Enhanced chatbot with additional features
├── ChatBotIntegration.jsx   # Integration wrapper component
├── ChatBot.css              # Styles for the chatbot
├── config.js                # Configuration file
├── index.js                 # Export file
└── README.md                # This file

src/hooks/
└── useChatBot.js            # Custom hook for chatbot functionality

src/services/
└── chatBotService.js        # API service for AI communication
```

## 🚀 Quick Start

### 1. Add to Your App Component

Add the chatbot to your main App component:

```jsx
import React from 'react';
import { ChatBotIntegration } from './components/Chatbot';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Your existing app content */}
      
      {/* Add the chatbot */}
      <ChatBotIntegration enabled={true} />
    </div>
  );
}

export default App;
```

### 2. Environment Variables

Create or update your `.env` file with the following variables:

```env
# AI API Configuration
VITE_AI_API_URL=http://your-ai-api-endpoint.com/api
VITE_AI_API_KEY=your-api-key-here

# Optional: Use mock responses for development
VITE_USE_MOCK_AI=false
```

### 3. Install Required Dependencies

Make sure you have the following dependencies installed:

```bash
npm install lucide-react
```

## 🎯 Components Overview

### ChatBot.jsx
Basic chatbot component with essential functionality:
- Send/receive messages
- Typing indicators
- Message history
- Basic UI controls

### ChatBotEnhanced.jsx
Advanced chatbot component with additional features:
- Quick response buttons
- Connection status monitoring
- Message suggestions
- Confidence indicators
- Error handling and retry options
- Service status display

### ChatBotIntegration.jsx
Wrapper component for easy integration:
- Configurable positioning
- Theme support
- Enable/disable functionality

## 🔧 Configuration

The chatbot can be configured using the `config.js` file:

```js
import { chatBotConfig, updateConfig } from './components/Chatbot/config';

// Update configuration
updateConfig('ui.theme', 'dark');
updateConfig('features.quickResponses', false);
updateConfig('campus.name', 'Your Campus Name');
```

### Key Configuration Options

- **API Settings**: Base URL, API key, timeout settings
- **UI Customization**: Colors, size, position, animations
- **Feature Toggles**: Quick responses, suggestions, feedback
- **Campus-Specific**: Welcome message, quick actions, capabilities

## 🎨 Styling and Themes

The chatbot supports multiple themes:
- `default`: Standard blue gradient theme
- `dark`: Dark mode theme
- `campus`: Custom campus-branded theme

### Custom Styling

You can customize the appearance by modifying `ChatBot.css` or overriding CSS variables:

```css
:root {
  --chatbot-primary: #your-color;
  --chatbot-secondary: #your-color;
  --chatbot-background: #your-color;
}
```

## 🔌 API Integration

### Setting Up Your AI API

When you receive your AI API, update the `chatBotService.js` file:

1. **Update the endpoint URL** in your environment variables
2. **Add your API key** to the environment variables
3. **Modify the request format** if needed in the `sendMessage` method
4. **Update response parsing** in the service methods

### Expected API Format

The service expects your AI API to accept requests in this format:

```json
{
  "message": "User's message",
  "conversation_history": [
    {"role": "user", "content": "Previous message"},
    {"role": "assistant", "content": "Previous response"}
  ],
  "session_id": "unique-session-id",
  "context": {
    "platform": "CampusOS",
    "timestamp": "2025-01-01T12:00:00Z",
    "user_type": "student"
  }
}
```

And return responses in this format:

```json
{
  "response": "AI's response message",
  "confidence": 0.95,
  "suggestions": ["Follow-up question 1", "Follow-up question 2"],
  "metadata": {
    "processing_time": 1.2,
    "model_version": "1.0"
  }
}
```

## 🎯 Features

### ✅ Currently Implemented
- [x] Real-time messaging
- [x] Typing indicators
- [x] Message history
- [x] Quick response buttons
- [x] Connection status monitoring
- [x] Error handling and retry
- [x] Responsive design
- [x] Dark mode support
- [x] Session management
- [x] Configuration system

### 🚧 Ready for API Integration
- [ ] AI response processing
- [ ] Context-aware conversations
- [ ] User authentication integration
- [ ] Campus-specific knowledge base
- [ ] Analytics and feedback

### 🔮 Future Enhancements
- [ ] Voice input/output
- [ ] File upload support
- [ ] Multi-language support
- [ ] Conversation export
- [ ] Admin dashboard
- [ ] Custom training

## 🔍 Usage Examples

### Basic Integration
```jsx
import { ChatBot } from './components/Chatbot';

<ChatBot />
```

### Advanced Integration with Custom Config
```jsx
import { ChatBotEnhanced } from './components/Chatbot';
import { updateConfig } from './components/Chatbot/config';

// Customize before rendering
updateConfig('campus.name', 'My University');
updateConfig('ui.colors.primary', '#your-brand-color');

<ChatBotEnhanced />
```

### Using the Hook Directly
```jsx
import { useChatBot } from './hooks/useChatBot';

function CustomChatInterface() {
  const { 
    messages, 
    sendMessage, 
    isTyping, 
    isConnected 
  } = useChatBot();

  // Your custom UI implementation
}
```

## 🛠️ Development

### Running in Development Mode
The chatbot includes development features:
- Debug logging
- Mock API responses
- Configuration validation

### Testing
Test the chatbot functionality:
1. Open the application
2. Click the chatbot icon
3. Try sending messages
4. Test quick responses
5. Verify error handling

## 🤝 Contributing

When adding new features:
1. Update the configuration in `config.js`
2. Add appropriate styles to `ChatBot.css`
3. Update this README
4. Test on different screen sizes
5. Ensure accessibility compliance

## 📱 Mobile Support

The chatbot is fully responsive and includes:
- Touch-friendly interface
- Mobile-optimized layout
- Gesture support
- Keyboard handling

## 🔒 Security Considerations

- API keys are stored in environment variables
- Messages are not persisted locally by default
- User authentication integration ready
- CORS considerations for API calls

## 📞 Support

For questions about the chatbot implementation:
1. Check the configuration options
2. Review the console for error messages
3. Verify environment variables
4. Test API connectivity

---

**Note**: This chatbot is ready for integration with your AI API. Once you provide the API details, update the `chatBotService.js` file and environment variables to complete the integration.
