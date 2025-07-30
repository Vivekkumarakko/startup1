# Project with Chatbot Integration

This project includes a modern, interactive chatbot that provides customer support and information about your services.

## Features

### 🤖 AI Chatbot
- **Floating Chat Widget**: Modern, responsive chat interface that appears as a floating button
- **Smart Responses**: Context-aware responses based on user input
- **Quick Replies**: Pre-defined response buttons for common questions
- **Typing Indicators**: Visual feedback when the bot is "thinking"
- **Message History**: Persistent conversation history within the session
- **Clear Chat**: Option to reset the conversation
- **Keyboard Support**: Send messages with Enter key

### 🎨 UI/UX Features
- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive**: Works on desktop and mobile devices
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Customizable**: Easy to modify colors, styling, and behavior

## Chatbot Capabilities

The chatbot can help with:

- **General Inquiries**: Greetings and basic questions
- **Service Information**: Details about your products and services
- **Pricing Questions**: Information about plans and costs
- **Support Requests**: Contact information and help options
- **Demo Scheduling**: Assistance with booking demonstrations
- **Partnership Inquiries**: Information about partnership opportunities
- **Technical Questions**: API, integration, and setup help

## Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Open in Browser**:
   Navigate to `http://localhost:5173`

4. **Test the Chatbot**:
   - Click the chat button in the bottom-right corner
   - Try the quick reply buttons
   - Ask questions about services, pricing, or support

## Project Structure

```
src/
├── components/
│   ├── Chatbot.tsx              # Main chatbot component
│   ├── ChatbotContext.tsx       # Context provider for state management
│   └── ...                      # Other existing components
├── utils/
│   └── chatbotResponses.ts      # Response generation logic
├── App.tsx                      # Main app with chatbot integration
└── ...
```

## Customization

### Modifying Responses

Edit `src/utils/chatbotResponses.ts` to customize bot responses:

```typescript
export const generateBotResponse = (userInput: string): ChatbotResponse => {
  const input = userInput.toLowerCase().trim();
  
  // Add your custom response logic here
  if (input.includes('your-keyword')) {
    return {
      text: 'Your custom response',
      suggestions: ['Suggestion 1', 'Suggestion 2']
    };
  }
  
  // Default response
  return {
    text: 'Default response text',
    suggestions: ['Default suggestions']
  };
};
```

### Styling

The chatbot uses Tailwind CSS classes. You can customize the appearance by modifying the classes in `Chatbot.tsx`:

```tsx
// Change the primary color
className="bg-blue-600 hover:bg-blue-700" // Change to your brand color

// Modify the chat window size
className="w-96 h-[500px]" // Adjust width and height
```

### Quick Replies

Update the quick reply options in `src/utils/chatbotResponses.ts`:

```typescript
export const getQuickReplies = (): string[] => {
  return [
    'Your custom quick reply 1',
    'Your custom quick reply 2',
    // Add more quick replies
  ];
};
```

## Integration with External APIs

To connect with real AI services (like OpenAI, Claude, etc.):

1. **Create an API service**:
   ```typescript
   // src/services/aiService.ts
   export const sendMessageToAI = async (message: string) => {
     const response = await fetch('/api/chat', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ message })
     });
     return response.json();
   };
   ```

2. **Update the chatbot** to use the API:
   ```typescript
   // In Chatbot.tsx, replace the setTimeout with:
   const response = await sendMessageToAI(inputValue);
   ```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Lightweight implementation
- No external dependencies beyond React and Lucide icons
- Optimized re-renders with React Context
- Smooth animations and transitions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For questions or issues with the chatbot integration, please:

1. Check the documentation above
2. Review the code comments
3. Open an issue in the repository
4. Contact the development team

---

**Note**: This chatbot currently uses simulated responses. For production use, integrate with a real AI service for more sophisticated responses. 