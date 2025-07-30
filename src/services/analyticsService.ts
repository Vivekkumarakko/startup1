import { 
  logEvent, 
  setUserId, 
  setUserProperties, 
  Analytics 
} from 'firebase/analytics';
import { analytics } from '../config/firebase';

// Analytics service for tracking user events with error handling
export class AnalyticsService {
  private analytics: Analytics;
  private isEnabled: boolean = true;
  private fallbackEvents: Array<{event: string, params: any}> = [];

  constructor() {
    this.analytics = analytics;
    this.checkAnalyticsAvailability();
  }

  private checkAnalyticsAvailability() {
    try {
      // Check if analytics is properly initialized
      if (!this.analytics) {
        console.warn('Analytics not available - running in fallback mode');
        this.isEnabled = false;
      }
    } catch (error) {
      console.warn('Analytics initialization failed:', error);
      this.isEnabled = false;
    }
  }

  private safeLogEvent(eventName: string, parameters?: any) {
    if (!this.isEnabled) {
      // Store events for later if analytics becomes available
      this.fallbackEvents.push({ event: eventName, params: parameters });
      return;
    }

    try {
      logEvent(this.analytics, eventName, parameters);
    } catch (error) {
      console.warn(`Analytics event failed: ${eventName}`, error);
      // Don't break the app if analytics fails
    }
  }

  // Set user ID for tracking
  setUserId(userId: string) {
    if (!this.isEnabled) return;
    
    try {
      setUserId(this.analytics, userId);
    } catch (error) {
      console.warn('Failed to set user ID:', error);
    }
  }

  // Set user properties
  setUserProperties(properties: { [key: string]: string }) {
    if (!this.isEnabled) return;
    
    try {
      setUserProperties(this.analytics, properties);
    } catch (error) {
      console.warn('Failed to set user properties:', error);
    }
  }

  // Track page views
  trackPageView(pageName: string, pageTitle?: string) {
    this.safeLogEvent('page_view', {
      page_name: pageName,
      page_title: pageTitle || pageName
    });
  }

  // Track user registration
  trackSignUp(method: string) {
    this.safeLogEvent('sign_up', {
      method: method // 'email', 'google', 'facebook'
    });
  }

  // Track user login
  trackLogin(method: string) {
    this.safeLogEvent('login', {
      method: method
    });
  }

  // Track problem creation
  trackProblemCreated(category: string, difficulty: string) {
    this.safeLogEvent('problem_created', {
      category: category,
      difficulty: difficulty
    });
  }

  // Track solution submission
  trackSolutionSubmitted(problemCategory: string, hasPrice: boolean) {
    this.safeLogEvent('solution_submitted', {
      problem_category: problemCategory,
      has_price: hasPrice
    });
  }

  // Track partner application
  trackPartnerApplication() {
    this.safeLogEvent('partner_application_submitted');
  }

  // Track chatbot usage
  trackChatbotMessage(messageType: string) {
    this.safeLogEvent('chatbot_message', {
      message_type: messageType // 'user_message', 'bot_response'
    });
  }

  // Track pricing page view
  trackPricingPageView() {
    this.safeLogEvent('pricing_page_view');
  }

  // Track feature usage
  trackFeatureUsage(featureName: string) {
    this.safeLogEvent('feature_usage', {
      feature_name: featureName
    });
  }

  // Track search events
  trackSearch(searchTerm: string, category?: string) {
    this.safeLogEvent('search', {
      search_term: searchTerm,
      category: category
    });
  }

  // Track error events
  trackError(errorType: string, errorMessage: string) {
    this.safeLogEvent('error', {
      error_type: errorType,
      error_message: errorMessage
    });
  }

  // Track custom events
  trackCustomEvent(eventName: string, parameters?: { [key: string]: string | number | boolean }) {
    this.safeLogEvent(eventName, parameters);
  }

  // Retry failed events when analytics becomes available
  retryFailedEvents() {
    if (this.fallbackEvents.length > 0 && this.isEnabled) {
      console.log(`Retrying ${this.fallbackEvents.length} failed analytics events`);
      this.fallbackEvents.forEach(({ event, params }) => {
        this.safeLogEvent(event, params);
      });
      this.fallbackEvents = [];
    }
  }

  // Enable/disable analytics
  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (enabled) {
      this.retryFailedEvents();
    }
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
  custom: (eventName: string, parameters?: { [key: string]: string | number | boolean }) => 
    analyticsService.trackCustomEvent(eventName, parameters)
}; 