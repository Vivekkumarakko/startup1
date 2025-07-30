# Firebase Analytics Setup Guide

## Overview
This guide covers the setup and usage of Firebase Analytics in your Problinx app for tracking user behavior and app performance.

## 🔥 Analytics Configuration

### 1. Firebase Analytics Setup
Your Firebase project is already configured with Analytics:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAVBsmh2BHDkYZSlS6SSxMQ7NNRVJry58I",
  authDomain: "problinx-app.firebaseapp.com",
  projectId: "problinx-app",
  storageBucket: "problinx-app.firebasestorage.app",
  messagingSenderId: "52502049403",
  appId: "1:52502049403:web:9e153bca45cc1cbf2768de",
  measurementId: "G-YEJWRGRNZX"  // Analytics Measurement ID
};
```

### 2. Analytics Service
The analytics service is located at `src/services/analyticsService.ts` and provides:

- **User tracking** (signup, login, logout)
- **Page view tracking**
- **Feature usage tracking**
- **Error tracking**
- **Custom event tracking**

## 📊 Available Analytics Events

### User Events
```typescript
import { trackEvents } from '../services/analyticsService';

// Track user signup
trackEvents.signUp('email'); // or 'google', 'facebook'

// Track user login
trackEvents.login('email'); // or 'google', 'facebook'

// Set user properties
trackEvents.setUser(userId, {
  email: 'user@example.com',
  display_name: 'John Doe',
  user_type: 'partner'
});
```

### Page Views
```typescript
// Track page views
trackEvents.pageView('home', 'Home Page');
trackEvents.pageView('problems', 'Problem Board');
trackEvents.pageView('pricing', 'Pricing Page');
```

### Content Events
```typescript
// Track problem creation
trackEvents.problemCreated('web-development', 'medium');

// Track solution submission
trackEvents.solutionSubmitted('web-development', true); // hasPrice

// Track partner application
trackEvents.partnerApplication();
```

### App Usage Events
```typescript
// Track chatbot usage
trackEvents.chatbotMessage('user_message');
trackEvents.chatbotMessage('bot_response');

// Track feature usage
trackEvents.featureUsage('problem_search');
trackEvents.featureUsage('solution_filter');

// Track search events
trackEvents.search('react developer', 'web-development');
```

### Error Tracking
```typescript
// Track errors
trackEvents.error('authentication_error', 'Invalid credentials');
trackEvents.error('database_error', 'Connection failed');
```

## 🛠️ Integration Examples

### 1. Authentication Tracking (Already Integrated)
The AuthContext automatically tracks:
- User signup events
- User login events
- User logout events
- Password reset requests
- Authentication errors

### 2. Page View Tracking
Add to your components:

```typescript
import { useEffect } from 'react';
import { trackEvents } from '../services/analyticsService';

const HomePage = () => {
  useEffect(() => {
    trackEvents.pageView('home', 'Home Page');
  }, []);

  return <div>Home Page Content</div>;
};
```

### 3. Feature Usage Tracking
Track when users interact with features:

```typescript
import { trackEvents } from '../services/analyticsService';

const ProblemBoard = () => {
  const handleProblemCreate = () => {
    // Create problem logic
    trackEvents.problemCreated('web-development', 'medium');
  };

  const handleSearch = (searchTerm: string) => {
    // Search logic
    trackEvents.search(searchTerm, 'web-development');
  };

  return (
    <div>
      <button onClick={handleProblemCreate}>Create Problem</button>
      <input onChange={(e) => handleSearch(e.target.value)} />
    </div>
  );
};
```

### 4. Error Tracking
Track errors throughout your app:

```typescript
import { trackEvents } from '../services/analyticsService';

const handleError = (error: Error, context: string) => {
  trackEvents.error(`${context}_error`, error.message);
  // Show error to user
};
```

## 📈 Analytics Dashboard

### Access Analytics Data
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your **"problinx-app"** project
3. Go to **Analytics** in the left sidebar
4. View reports and insights

### Key Metrics to Monitor
- **User engagement** (daily/monthly active users)
- **Authentication conversion** (signup to login ratio)
- **Feature adoption** (which features are most used)
- **Error rates** (identify and fix issues)
- **User retention** (how long users stay engaged)

## 🎯 Custom Events

### Creating Custom Events
```typescript
// Track custom events
trackEvents.custom('problem_viewed', {
  problem_id: 'problem123',
  category: 'web-development',
  user_type: 'partner'
});

trackEvents.custom('solution_accepted', {
  problem_id: 'problem123',
  solution_id: 'solution456',
  price: 500
});
```

### Recommended Custom Events
```typescript
// User engagement
trackEvents.custom('profile_updated', { fields_updated: ['bio', 'skills'] });
trackEvents.custom('settings_changed', { setting: 'notifications' });

// Business metrics
trackEvents.custom('pricing_page_viewed', { plan: 'premium' });
trackEvents.custom('contact_form_submitted', { form_type: 'support' });

// Performance tracking
trackEvents.custom('page_load_time', { page: 'home', load_time: 1200 });
trackEvents.custom('api_call_duration', { endpoint: 'problems', duration: 500 });
```

## 🔧 Development vs Production

### Development
- Analytics events are tracked but may have delays
- Use Firebase Console to verify events
- Test all tracking implementations

### Production
- Real-time analytics data
- Set up alerts for critical metrics
- Monitor user behavior patterns
- Optimize based on analytics insights

## 📊 Privacy and Compliance

### GDPR Compliance
- Analytics respects user privacy settings
- Users can opt out of analytics tracking
- No personally identifiable information (PII) in events

### Data Retention
- Firebase Analytics retains data for 14 months by default
- Configure data retention in Firebase Console
- Export data for long-term storage if needed

## 🚀 Best Practices

### 1. Event Naming
- Use consistent naming conventions
- Make events descriptive and meaningful
- Group related events with prefixes

### 2. Parameter Usage
- Keep parameters simple and consistent
- Avoid sensitive information in parameters
- Use standardized parameter names

### 3. Performance
- Don't over-track (avoid tracking every click)
- Focus on meaningful user actions
- Batch events when possible

### 4. Testing
- Test analytics in development
- Verify events in Firebase Console
- Monitor for missing or incorrect events

## 🎯 Next Steps

### Immediate Actions:
1. ✅ **Analytics is already configured** in your Firebase project
2. ✅ **Analytics service is ready** to use
3. ✅ **Authentication tracking is integrated**
4. 🔧 **Add page view tracking** to your components
5. 🔧 **Add feature usage tracking** to key interactions

### Advanced Setup:
1. **Set up custom dashboards** in Firebase Console
2. **Configure alerts** for important metrics
3. **Export analytics data** for external analysis
4. **Integrate with other tools** (Google Analytics, etc.)

Your Firebase Analytics is now fully configured and ready to track user behavior! 📊 