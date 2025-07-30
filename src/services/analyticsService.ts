import { 
  logEvent, 
  setUserId, 
  setUserProperties, 
  Analytics 
} from 'firebase/analytics';
import { analytics } from '../config/firebase';

// Analytics service for tracking user events
export class AnalyticsService {
  private analytics: Analytics;

  constructor() {
    this.analytics = analytics;
  }

  // Set user ID for tracking
  setUserId(userId: string) {
    setUserId(this.analytics, userId);
  }

  // Set user properties
  setUserProperties(properties: { [key: string]: string }) {
    setUserProperties(this.analytics, properties);
  }

  // Track page views
  trackPageView(pageName: string, pageTitle?: string) {
    logEvent(this.analytics, 'page_view', {
      page_name: pageName,
      page_title: pageTitle || pageName
    });
  }

  // Track user registration
  trackSignUp(method: string) {
    logEvent(this.analytics, 'sign_up', {
      method: method // 'email', 'google', 'facebook'
    });
  }

  // Track user login
  trackLogin(method: string) {
    logEvent(this.analytics, 'login', {
      method: method
    });
  }

  // Track problem creation
  trackProblemCreated(category: string, difficulty: string) {
    logEvent(this.analytics, 'problem_created', {
      category: category,
      difficulty: difficulty
    });
  }

  // Track solution submission
  trackSolutionSubmitted(problemCategory: string, hasPrice: boolean) {
    logEvent(this.analytics, 'solution_submitted', {
      problem_category: problemCategory,
      has_price: hasPrice
    });
  }

  // Track partner application
  trackPartnerApplication() {
    logEvent(this.analytics, 'partner_application_submitted');
  }

  // Track chatbot usage
  trackChatbotMessage(messageType: string) {
    logEvent(this.analytics, 'chatbot_message', {
      message_type: messageType // 'user_message', 'bot_response'
    });
  }

  // Track pricing page view
  trackPricingPageView() {
    logEvent(this.analytics, 'pricing_page_view');
  }

  // Track feature usage
  trackFeatureUsage(featureName: string) {
    logEvent(this.analytics, 'feature_usage', {
      feature_name: featureName
    });
  }

  // Track search events
  trackSearch(searchTerm: string, category?: string) {
    logEvent(this.analytics, 'search', {
      search_term: searchTerm,
      category: category
    });
  }

  // Track error events
  trackError(errorType: string, errorMessage: string) {
    logEvent(this.analytics, 'error', {
      error_type: errorType,
      error_message: errorMessage
    });
  }

  // Track custom events
  trackCustomEvent(eventName: string, parameters?: { [key: string]: any }) {
    logEvent(this.analytics, eventName, parameters);
  }
}

// Create a singleton instance
export const analyticsService = new AnalyticsService();

// Convenience functions for common events
export const trackEvents = {
  // User events
  signUp: (method: string) => analyticsService.trackSignUp(method),
  login: (method: string) => analyticsService.trackLogin(method),
  setUser: (userId: string, properties?: { [key: string]: string }) => {
    analyticsService.setUserId(userId);
    if (properties) {
      analyticsService.setUserProperties(properties);
    }
  },

  // Content events
  problemCreated: (category: string, difficulty: string) => 
    analyticsService.trackProblemCreated(category, difficulty),
  solutionSubmitted: (problemCategory: string, hasPrice: boolean) => 
    analyticsService.trackSolutionSubmitted(problemCategory, hasPrice),
  partnerApplication: () => analyticsService.trackPartnerApplication(),

  // App usage events
  pageView: (pageName: string, pageTitle?: string) => 
    analyticsService.trackPageView(pageName, pageTitle),
  chatbotMessage: (messageType: string) => 
    analyticsService.trackChatbotMessage(messageType),
  pricingPageView: () => analyticsService.trackPricingPageView(),
  featureUsage: (featureName: string) => 
    analyticsService.trackFeatureUsage(featureName),
  search: (searchTerm: string, category?: string) => 
    analyticsService.trackSearch(searchTerm, category),

  // Error tracking
  error: (errorType: string, errorMessage: string) => 
    analyticsService.trackError(errorType, errorMessage),

  // Custom events
  custom: (eventName: string, parameters?: { [key: string]: any }) => 
    analyticsService.trackCustomEvent(eventName, parameters)
}; 