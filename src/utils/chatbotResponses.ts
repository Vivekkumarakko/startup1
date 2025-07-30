export interface ChatbotResponse {
  text: string;
  suggestions?: string[];
}

export const generateBotResponse = (userInput: string): ChatbotResponse => {
  const input = userInput.toLowerCase().trim();
  
  // Greetings
  if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
    return {
      text: 'Hello! How can I help you today?',
      suggestions: ['Tell me about your services', 'What are your pricing options?', 'How can I get support?']
    };
  }
  
  // Help and support
  if (input.includes('help') || input.includes('support')) {
    return {
      text: 'I\'m here to help! You can ask me about our services, pricing, or any general questions. What would you like to know?',
      suggestions: ['Services overview', 'Pricing information', 'Contact details']
    };
  }
  
  // Pricing questions
  if (input.includes('pricing') || input.includes('cost') || input.includes('price') || input.includes('how much')) {
    return {
      text: 'Our pricing varies based on your needs. We offer flexible plans starting from $29/month. You can check our pricing page for detailed information, or I can help you find the right plan for you.',
      suggestions: ['View pricing plans', 'Schedule a demo', 'Contact sales']
    };
  }
  
  // Contact information
  if (input.includes('contact') || input.includes('email') || input.includes('phone') || input.includes('reach')) {
    return {
      text: 'You can reach us at support@example.com or call us at +1 (555) 123-4567. Our support team is available Monday-Friday, 9 AM - 6 PM EST. I can also help you schedule a call if needed.',
      suggestions: ['Schedule a call', 'Send email', 'Live chat']
    };
  }
  
  // Features and services
  if (input.includes('feature') || input.includes('service') || input.includes('what do you do') || input.includes('capabilities')) {
    return {
      text: 'We offer a comprehensive suite of services including problem-solving tools, analytics dashboards, partner programs, and custom integrations. Our platform helps businesses streamline their operations and improve efficiency.',
      suggestions: ['Learn more about features', 'Request a demo', 'View case studies']
    };
  }
  
  // Demo requests
  if (input.includes('demo') || input.includes('trial') || input.includes('test')) {
    return {
      text: 'Great! I\'d be happy to help you schedule a demo. Our team can show you how our platform works and answer any specific questions you have. When would be a good time for you?',
      suggestions: ['Schedule demo', 'Free trial', 'Contact sales']
    };
  }
  
  // Partnership inquiries
  if (input.includes('partner') || input.includes('affiliate') || input.includes('reseller')) {
    return {
      text: 'We have excellent partnership opportunities! Our partner program offers competitive commissions, marketing support, and dedicated resources. Would you like to learn more about becoming a partner?',
      suggestions: ['Partner program details', 'Apply to be a partner', 'Contact partner team']
    };
  }
  
  // Technical questions
  if (input.includes('technical') || input.includes('integration') || input.includes('api') || input.includes('setup')) {
    return {
      text: 'For technical questions, our engineering team is here to help! We provide comprehensive documentation, API guides, and technical support. What specific technical aspect would you like to discuss?',
      suggestions: ['View documentation', 'API reference', 'Technical support']
    };
  }
  
  // Default response
  return {
    text: 'Thank you for your message! I\'m here to help with any questions about our services, pricing, support, or technical details. How can I assist you further?',
    suggestions: ['Services overview', 'Pricing information', 'Get support', 'Schedule demo']
  };
};

export const getQuickReplies = (): string[] => {
  return [
    'Tell me about your services',
    'What are your pricing options?',
    'How can I get support?',
    'Schedule a demo',
    'Become a partner'
  ];
}; 