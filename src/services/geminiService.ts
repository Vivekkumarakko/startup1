import { config } from '../config/env';

const GEMINI_API_KEY = config.GEMINI_API_KEY;
const GEMINI_API_URL = config.GEMINI_API_URL;

export interface GeminiResponse {
  text: string;
  suggestions?: string[];
}

export const sendMessageToGemini = async (message: string, conversationHistory: string[] = []): Promise<GeminiResponse> => {
  try {
    // Create context for the AI
    const systemPrompt = `You are a helpful customer service AI assistant for a business platform. 
    You help customers with:
    - General inquiries about services
    - Pricing and cost questions
    - Technical support
    - Demo scheduling
    - Partnership opportunities
    - Contact information
    
    Keep responses friendly, professional, and concise (under 150 words).
    If asked about specific features, mention problem-solving tools, analytics, and partner programs.
    For pricing, mention flexible plans starting from $29/month.
    For contact, provide support@example.com and +1 (555) 123-4567.
    
    Provide 2-3 relevant follow-up suggestions when appropriate.`;

    const conversationContext = conversationHistory.length > 0 
      ? `Previous conversation: ${conversationHistory.slice(-3).join(' | ')}\n\n`
      : '';

    const requestBody = {
      contents: [{
        parts: [{
          text: `${systemPrompt}\n\n${conversationContext}Customer: ${message}\n\nAssistant:`
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 300,
      }
    };

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const aiResponse = data.candidates[0].content.parts[0].text.trim();
      
      // Extract suggestions if they exist in the response
      const suggestions = extractSuggestions(aiResponse);
      const cleanResponse = aiResponse.replace(/Suggestions?:.*$/s, '').trim();
      
      return {
        text: cleanResponse,
        suggestions: suggestions.length > 0 ? suggestions : undefined
      };
    } else {
      throw new Error('Invalid response format from Gemini API');
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    
    // Fallback to local responses if API fails
    return getFallbackResponse(message);
  }
};

const extractSuggestions = (response: string): string[] => {
  const suggestionMatch = response.match(/Suggestions?:\s*(.+)/i);
  if (suggestionMatch) {
    return suggestionMatch[1]
      .split(/[,;]/)
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .slice(0, 3);
  }
  return [];
};

const getFallbackResponse = (message: string): GeminiResponse => {
  const input = message.toLowerCase();
  
  if (input.includes('hello') || input.includes('hi')) {
    return {
      text: 'Hello! How can I help you today?',
      suggestions: ['Tell me about your services', 'What are your pricing options?', 'How can I get support?']
    };
  }
  
  if (input.includes('pricing') || input.includes('cost')) {
    return {
      text: 'Our pricing varies based on your needs. We offer flexible plans starting from $29/month. You can check our pricing page for detailed information, or I can help you find the right plan for you.',
      suggestions: ['View pricing plans', 'Schedule a demo', 'Contact sales']
    };
  }
  
  if (input.includes('contact') || input.includes('email')) {
    return {
      text: 'You can reach us at support@example.com or call us at +1 (555) 123-4567. Our support team is available Monday-Friday, 9 AM - 6 PM EST.',
      suggestions: ['Schedule a call', 'Send email', 'Live chat']
    };
  }
  
  return {
    text: 'Thank you for your message! I\'m here to help with any questions about our services, pricing, support, or technical details. How can I assist you further?',
    suggestions: ['Services overview', 'Pricing information', 'Get support', 'Schedule demo']
  };
}; 