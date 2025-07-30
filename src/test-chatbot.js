// Simple test to verify chatbot setup
console.log('Chatbot test file loaded');

// Test the config
import { config } from './config/env.js';
console.log('API Key configured:', config.GEMINI_API_KEY ? 'Yes' : 'No');
console.log('API URL:', config.GEMINI_API_URL);

// Test API call
async function testGeminiAPI() {
  try {
    const response = await fetch(`${config.GEMINI_API_URL}?key=${config.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: 'Hello, can you respond with a simple greeting?'
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 100,
        }
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('API Test Success:', data);
    } else {
      console.error('API Test Failed:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('API Test Error:', error);
  }
}

// Run test if this file is executed directly
if (typeof window !== 'undefined') {
  console.log('Running in browser environment');
  // testGeminiAPI(); // Uncomment to test API
} 