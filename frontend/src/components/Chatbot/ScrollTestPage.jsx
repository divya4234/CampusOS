import React from 'react';

const ScrollTestPage = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Scroll Test Page</h1>
      <p>This page is designed to test the chatbot's floating behavior while scrolling.</p>
      
      {Array.from({ length: 50 }, (_, index) => (
        <div key={index} style={{ 
          margin: '20px 0', 
          padding: '20px', 
          backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#e9ecef',
          borderRadius: '8px'
        }}>
          <h3>Section {index + 1}</h3>
          <p>
            This is section {index + 1}. The AI chatbot should remain visible in the bottom-right corner
            as you scroll through this content. The chatbot button should float smoothly and stay fixed
            in position regardless of how far you scroll down or up on this page.
          </p>
          <p>
            Try scrolling to different parts of this page and notice how the chatbot button maintains
            its position. You can click on it at any time to open the AI assistant and get help with
            campus-related queries like attendance, grades, fees, library services, and more.
          </p>
        </div>
      ))}
      
      <div style={{ 
        margin: '40px 0', 
        padding: '30px', 
        backgroundColor: '#d1ecf1', 
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <h2>🤖 AI Chatbot Test</h2>
        <p>
          If you can see the AI chatbot button floating in the bottom-right corner throughout
          your scroll journey, then the implementation is working correctly!
        </p>
        <p>
          The chatbot should have a subtle floating animation and glow effect when you hover over it.
        </p>
      </div>
    </div>
  );
};

export default ScrollTestPage;
