export interface ChatbotResponse {
  text: string;
  suggestions?: string[];
}

export const generateBotResponse = (userInput: string): ChatbotResponse => {
  const input = userInput.toLowerCase().trim();
  
  // Web Development Projects
  if (input.includes('web development') || input.includes('web dev') || input.includes('frontend') || input.includes('backend') || input.includes('full stack')) {
    return {
      text: 'Great! We have several web development projects available on Problinx:\n\n' +
            '🔥 **Real-time Chat Application** - React, Node.js, Socket.io\n' +
            '💰 Reward: 450 tokens | Budget: $2,500\n\n' +
            '📊 **Data Visualization Dashboard** - JavaScript, D3.js, Vue.js\n' +
            '💰 Reward: 300 tokens | Budget: $1,500\n\n' +
            '🎨 **UI/UX Design System** - React, Storybook, Design Tokens\n' +
            '💰 Reward: 550 tokens | Budget: $3,000\n\n' +
            'Click "Solve Now" to view all projects and filter by web development!',
      suggestions: ['View all web dev projects', 'How to apply for projects', 'What skills do I need?']
    };
  }

  // Specific technologies
  if (input.includes('react') || input.includes('node.js') || input.includes('javascript')) {
    return {
      text: 'Perfect! We have projects using those technologies:\n\n' +
            '⚡ **Real-time Chat App** - React + Node.js + Socket.io\n' +
            '📊 **Data Dashboard** - JavaScript + D3.js + Vue.js\n' +
            '🎨 **Design System** - React + Storybook\n\n' +
            'These projects are perfect for React/Node.js developers. Check them out in our Problem Board!',
      suggestions: ['View React projects', 'Node.js opportunities', 'JavaScript projects']
    };
  }

  // AI and Machine Learning projects
  if (input.includes('ai') || input.includes('machine learning') || input.includes('ml') || input.includes('python')) {
    return {
      text: 'Excellent! We have exciting AI/ML projects:\n\n' +
            '🤖 **AI-Powered Resume Parser** - Python, ML, NLP\n' +
            '💰 Reward: 800 tokens | Budget: $5,000\n\n' +
            '🧠 **ML Recommendation Engine** - Python, Scikit-learn, Pandas\n' +
            '💰 Reward: 750 tokens | Budget: $4,500\n\n' +
            'Perfect for data scientists and ML engineers!',
      suggestions: ['View AI projects', 'Python opportunities', 'ML challenges']
    };
  }

  // Mobile Development projects
  if (input.includes('mobile') || input.includes('react native') || input.includes('ios') || input.includes('android')) {
    return {
      text: 'Mobile development projects available:\n\n' +
            '📱 **E-commerce Mobile App** - React Native, Redux, Stripe\n' +
            '💰 Reward: 600 tokens | Budget: $3,500\n\n' +
            'Features: Product catalog, shopping cart, payment integration, order tracking\n' +
            'Perfect for mobile developers!',
      suggestions: ['View mobile projects', 'React Native opportunities', 'Mobile app development']
    };
  }

  // Blockchain projects
  if (input.includes('blockchain') || input.includes('ethereum') || input.includes('solidity') || input.includes('web3')) {
    return {
      text: 'Blockchain projects on Problinx:\n\n' +
            '⛓️ **Smart Contract Voting System** - Solidity, Ethereum, Web3.js\n' +
            '💰 Reward: 1200 tokens | Budget: $8,000\n\n' +
            'Features: Secure voting, transparency, gas optimization\n' +
            'Advanced blockchain development opportunity!',
      suggestions: ['View blockchain projects', 'Smart contract development', 'Web3 opportunities']
    };
  }

  // Cybersecurity projects
  if (input.includes('cybersecurity') || input.includes('security') || input.includes('penetration') || input.includes('hacking')) {
    return {
      text: 'Cybersecurity challenges available:\n\n' +
            '🔒 **Penetration Testing Tool** - Python, Security, Web Scraping\n' +
            '💰 Reward: 900 tokens | Budget: $6,000\n\n' +
            'Features: Vulnerability scanning, SQL injection detection, XSS detection\n' +
            'Perfect for security professionals!',
      suggestions: ['View security projects', 'Penetration testing', 'Cybersecurity tools']
    };
  }

  // How to submit solutions
  if (input.includes('submit') || input.includes('apply') || input.includes('solution') || input.includes('how to start')) {
    return {
      text: 'Here\'s how to submit solutions on Problinx:\n\n' +
            '1️⃣ **Choose a Project** - Browse and select a challenge\n' +
            '2️⃣ **Read Requirements** - Understand the project specs\n' +
            '3️⃣ **Develop Solution** - Create your code/prototype\n' +
            '4️⃣ **Submit Work** - Upload code, demo, documentation\n' +
            '5️⃣ **Get Evaluated** - Companies review and provide feedback\n' +
            '6️⃣ **Earn Rewards** - Get tokens for quality solutions!\n\n' +
            'Ready to start? Click "Solve Now" to browse projects!',
      suggestions: ['Browse projects', 'Create account', 'View submission guidelines']
    };
  }

  // Token rewards and earnings
  if (input.includes('token') || input.includes('earn') || input.includes('reward') || input.includes('money')) {
    return {
      text: 'Earn tokens by solving problems on Problinx:\n\n' +
            '💰 **Token Rewards** - 300-1200 tokens per project\n' +
            '💼 **Job Opportunities** - Top performers get hired\n' +
            '📈 **Portfolio Building** - Real projects for your resume\n' +
            '🚀 **Skill Development** - Work on cutting-edge technologies\n\n' +
            'Projects range from $1,500-$8,000 budgets. Start earning today!',
      suggestions: ['View project rewards', 'How to earn more', 'Success stories']
    };
  }

  // Project categories
  if (input.includes('project') || input.includes('challenge') || input.includes('problem')) {
    return {
      text: 'We have 8+ active projects across different categories:\n\n' +
            '🌐 **Web Development** - Chat apps, dashboards, design systems\n' +
            '🤖 **AI & Machine Learning** - Resume parsers, recommendation engines\n' +
            '📱 **Mobile Development** - E-commerce apps\n' +
            '⛓️ **Blockchain** - Smart contracts, voting systems\n' +
            '🔒 **Cybersecurity** - Penetration testing tools\n\n' +
            'All projects offer token rewards and real-world experience!',
      suggestions: ['Browse all projects', 'Filter by category', 'How to submit solutions']
    };
  }

  // How Problinx works
  if (input.includes('how it works') || input.includes('how does this work') || input.includes('process')) {
    return {
      text: 'Here\'s how Problinx works:\n\n' +
            '1️⃣ **Browse Projects** - Companies post real challenges\n' +
            '2️⃣ **Submit Solutions** - Show your skills with working code\n' +
            '3️⃣ **Earn Tokens** - Get rewarded for quality solutions\n' +
            '4️⃣ **Get Hired** - Top performers get job opportunities\n\n' +
            'No resumes needed - your work speaks for itself!',
      suggestions: ['View current projects', 'How to get started', 'Success stories']
    };
  }

  // Greetings
  if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
    return {
      text: 'Hello! Welcome to Problinx! 👋\n\n' +
            'I can help you find projects, understand how our platform works, or answer any questions about solving real-world problems and earning tokens.',
      suggestions: ['Show me web dev projects', 'How does Problinx work?', 'What skills do I need?']
    };
  }
  
  // Help and support
  if (input.includes('help') || input.includes('support')) {
    return {
      text: 'I\'m here to help! I can:\n\n' +
            '🔍 Find projects in your field\n' +
            '📚 Explain how Problinx works\n' +
            '💡 Guide you through the process\n' +
            '🎯 Help you get started\n\n' +
            'What would you like to know?',
      suggestions: ['Find web dev projects', 'How to get started', 'Browse all projects']
    };
  }
  
  // Pricing questions
  if (input.includes('pricing') || input.includes('cost') || input.includes('price') || input.includes('how much')) {
    return {
      text: 'Problinx is FREE to join! 🎉\n\n' +
            '💰 **Earn tokens** by solving problems\n' +
            '💼 **Get hired** by top companies\n' +
            '📈 **Build portfolio** with real projects\n' +
            '🚀 **No upfront costs** - start solving today!\n\n' +
            'Companies pay for solutions, you earn tokens and opportunities!',
      suggestions: ['Browse free projects', 'How to earn tokens', 'Success stories']
    };
  }
  
  // Contact information
  if (input.includes('contact') || input.includes('email') || input.includes('phone') || input.includes('reach')) {
    return {
      text: 'You can reach the Problinx team at:\n\n' +
            '📧 support@problinx.com\n' +
            '📱 +1 (555) 123-4567\n' +
            '⏰ Mon-Fri, 9 AM - 6 PM EST\n\n' +
            'Or I can help you right here! What do you need?',
      suggestions: ['Find projects', 'How to get started', 'Technical support']
    };
  }
  
  // Features and services
  if (input.includes('feature') || input.includes('service') || input.includes('what do you do') || input.includes('capabilities')) {
    return {
      text: 'Problinx connects talented developers with real-world problems:\n\n' +
            '🎯 **Real Projects** - Solve actual company challenges\n' +
            '💰 **Token Rewards** - Earn for quality solutions\n' +
            '💼 **Job Opportunities** - Get hired based on skills\n' +
            '📚 **Portfolio Building** - Show real work, not just resumes\n' +
            '🌐 **Multiple Categories** - Web dev, AI, mobile, blockchain\n\n' +
            'Ready to start solving?',
      suggestions: ['Browse projects', 'How it works', 'Success stories']
    };
  }
  
  // Demo requests
  if (input.includes('demo') || input.includes('trial') || input.includes('test')) {
    return {
      text: 'Great! You can start using Problinx right now:\n\n' +
            '1️⃣ **Browse Projects** - Click "Solve Now" to see current challenges\n' +
            '2️⃣ **Create Account** - Sign up for free to submit solutions\n' +
            '3️⃣ **Start Solving** - Pick a project and show your skills!\n\n' +
            'No demo needed - jump right in! 🚀',
      suggestions: ['Browse projects now', 'Create account', 'How to submit solutions']
    };
  }
  
  // Partnership inquiries
  if (input.includes('partner') || input.includes('affiliate') || input.includes('reseller') || input.includes('company')) {
    return {
      text: 'Want to post problems on Problinx? 🏢\n\n' +
            'We help companies:\n' +
            '🔍 Find talented developers\n' +
            '💡 Get innovative solutions\n' +
            '💰 Pay only for results\n' +
            '🚀 Scale development teams\n\n' +
            'Perfect for startups, agencies, and enterprises!',
      suggestions: ['Post a problem', 'Partner program', 'Contact sales']
    };
  }
  
  // Technical questions
  if (input.includes('technical') || input.includes('integration') || input.includes('api') || input.includes('setup')) {
    return {
      text: 'Technical questions? I can help!\n\n' +
            '🔧 **Solution Submission** - Upload code, demos, documentation\n' +
            '📊 **Project Requirements** - Clear specs and evaluation criteria\n' +
            '🤝 **Communication** - Direct contact with companies\n' +
            '📚 **Resources** - Documentation and support available\n\n' +
            'What specific technical aspect do you need help with?',
      suggestions: ['How to submit solutions', 'Project requirements', 'Technical support']
    };
  }

  // Skills and requirements
  if (input.includes('skill') || input.includes('experience') || input.includes('level') || input.includes('beginner')) {
    return {
      text: 'Problinx welcomes all skill levels! 🎓\n\n' +
            '🌟 **Beginner** - Start with easy projects (300 tokens)\n' +
            '🚀 **Intermediate** - Medium complexity (450-600 tokens)\n' +
            '💎 **Expert** - Advanced challenges (750-1200 tokens)\n\n' +
            'Projects are clearly labeled by difficulty. Start where you\'re comfortable!',
      suggestions: ['Easy projects', 'Intermediate projects', 'Expert challenges']
    };
  }

  // Success stories and testimonials
  if (input.includes('success') || input.includes('testimonial') || input.includes('story') || input.includes('hired')) {
    return {
      text: 'Success stories from Problinx solvers:\n\n' +
            '🎯 **Sarah** - Web Developer\n' +
            'Solved 3 projects → Hired at TechCorp ($85k salary)\n\n' +
            '🚀 **Alex** - ML Engineer\n' +
            'Built AI parser → Joined AI startup ($95k + equity)\n\n' +
            '💎 **Mike** - Full-stack Developer\n' +
            'Completed 5 projects → Remote job at $90k\n\n' +
            'Your success story could be next!',
      suggestions: ['Browse projects', 'How to get started', 'View more stories']
    };
  }

  // Default response
  return {
    text: 'Thanks for your message! I\'m here to help you find projects, understand how Problinx works, and get started on solving real-world problems. What would you like to know?',
    suggestions: ['Show me web dev projects', 'How does Problinx work?', 'Browse all projects', 'How to get started']
  };
};

export const getQuickReplies = (): string[] => {
  return [
    'Show me web dev projects',
    'How does Problinx work?',
    'What skills do I need?',
    'Browse all projects',
    'How to get started'
  ];
}; 