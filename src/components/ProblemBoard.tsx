import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Search, Filter, Clock, Coins, Tag, Users, Eye, ChevronDown, X, Star, TrendingUp, Bookmark, Share2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { problemService } from '../services/firestoreService';
import { trackEvents } from '../services/analyticsService';
import ProblemSubmission from './ProblemSubmission';
import LoadingSpinner from './LoadingSpinner';
import { Timestamp } from 'firebase/firestore';

interface Problem {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  reward: number;
  deadline: Timestamp;
  tags: string[];
  submissions: number;
  views: number;
  createdAt: Timestamp;
  userId: string;
  createdBy?: string;
  budget?: number;
  requirements?: string[];
  solversNeeded?: number;
  isBookmarked?: boolean;
  rating?: number;
}

type SortOption = 'newest' | 'oldest' | 'reward-high' | 'reward-low' | 'deadline' | 'popularity';

const ProblemBoard = () => {
  const { currentUser } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedReward, setSelectedReward] = useState('all');
  const [selectedDeadline, setSelectedDeadline] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showProblemSubmission, setShowProblemSubmission] = useState(false);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [bookmarkedProblems, setBookmarkedProblems] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [problemsPerPage] = useState(12);

  const categories = [
    { id: 'all', name: 'All Categories', count: 45, icon: '🎯' },
    { id: 'ai', name: 'AI & Machine Learning', count: 12, icon: '🤖' },
    { id: 'web-dev', name: 'Web Development', count: 15, icon: '🌐' },
    { id: 'data-analysis', name: 'Data Analysis', count: 8, icon: '📊' },
    { id: 'mobile', name: 'Mobile Development', count: 6, icon: '📱' },
    { id: 'blockchain', name: 'Blockchain', count: 4, icon: '⛓️' },
    { id: 'cybersecurity', name: 'Cybersecurity', count: 7, icon: '🔒' },
    { id: 'ui-ux', name: 'UI/UX Design', count: 9, icon: '🎨' }
  ];

  // Load problems from Firestore with error handling
  useEffect(() => {
    const loadProblems = async () => {
      try {
        setLoading(true);
        setError(null);
        const problemsData = await problemService.getProblems(50);
        
        // Add sample problems if no data from Firestore
        if (!problemsData || problemsData.length === 0) {
          const sampleProblems: Problem[] = [
            {
              id: '1',
              title: 'Build a Real-time Chat Application',
              description: 'Create a modern chat application with real-time messaging, user authentication, and file sharing capabilities. The app should support group chats, private messages, and message encryption.',
              category: 'web-dev',
              difficulty: 'medium',
              reward: 450,
              deadline: Timestamp.fromDate(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)), // 14 days
              tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
              submissions: 8,
              views: 156,
              createdAt: Timestamp.fromDate(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)),
              userId: 'company-1',
              createdBy: 'TechCorp Inc.',
              budget: 2500,
              requirements: [
                'Real-time messaging with WebSocket',
                'User authentication and authorization',
                'File upload and sharing',
                'Message encryption',
                'Responsive design for mobile'
              ],
              solversNeeded: 2,
              rating: 4.5
            },
            {
              id: '2',
              title: 'AI-Powered Resume Parser',
              description: 'Develop an intelligent resume parsing system that can extract key information from various resume formats and automatically categorize candidates based on skills and experience.',
              category: 'ai',
              difficulty: 'hard',
              reward: 800,
              deadline: Timestamp.fromDate(new Date(Date.now() + 21 * 24 * 60 * 60 * 1000)), // 21 days
              tags: ['Python', 'Machine Learning', 'NLP', 'FastAPI'],
              submissions: 12,
              views: 234,
              createdAt: Timestamp.fromDate(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)),
              userId: 'company-2',
              createdBy: 'HR Solutions Ltd.',
              budget: 5000,
              requirements: [
                'Support for PDF, DOC, DOCX formats',
                'Extract contact info, skills, experience',
                'Skill categorization and matching',
                'API endpoint for integration',
                'Accuracy above 90%'
              ],
              solversNeeded: 1,
              rating: 4.8
            },
            {
              id: '3',
              title: 'E-commerce Mobile App',
              description: 'Create a full-featured e-commerce mobile application with product catalog, shopping cart, payment integration, and order tracking. Focus on user experience and performance.',
              category: 'mobile',
              difficulty: 'medium',
              reward: 600,
              deadline: Timestamp.fromDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)), // 30 days
              tags: ['React Native', 'Redux', 'Stripe', 'Firebase'],
              submissions: 15,
              views: 189,
              createdAt: Timestamp.fromDate(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)),
              userId: 'company-3',
              createdBy: 'ShopSmart Retail',
              budget: 3500,
              requirements: [
                'Product catalog with search and filters',
                'Shopping cart and checkout process',
                'Payment gateway integration',
                'Order tracking and notifications',
                'User reviews and ratings'
              ],
              solversNeeded: 3,
              rating: 4.2
            },
            {
              id: '4',
              title: 'Data Visualization Dashboard',
              description: 'Build an interactive dashboard for visualizing business metrics and KPIs. Include charts, graphs, and real-time data updates with customizable widgets.',
              category: 'data-analysis',
              difficulty: 'easy',
              reward: 300,
              deadline: Timestamp.fromDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)), // 7 days
              tags: ['JavaScript', 'D3.js', 'Chart.js', 'Vue.js'],
              submissions: 6,
              views: 98,
              createdAt: Timestamp.fromDate(new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)),
              userId: 'company-4',
              createdBy: 'DataViz Analytics',
              budget: 1500,
              requirements: [
                'Interactive charts and graphs',
                'Real-time data updates',
                'Customizable dashboard layout',
                'Export functionality',
                'Responsive design'
              ],
              solversNeeded: 1,
              rating: 4.0
            },
            {
              id: '5',
              title: 'Blockchain Smart Contract',
              description: 'Develop a smart contract for a decentralized voting system with transparency, security, and immutability. Include frontend interface for voting.',
              category: 'blockchain',
              difficulty: 'expert',
              reward: 1200,
              deadline: Timestamp.fromDate(new Date(Date.now() + 28 * 24 * 60 * 60 * 1000)), // 28 days
              tags: ['Solidity', 'Ethereum', 'Web3.js', 'React'],
              submissions: 4,
              views: 76,
              createdAt: Timestamp.fromDate(new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)),
              userId: 'company-5',
              createdBy: 'VoteChain Solutions',
              budget: 8000,
              requirements: [
                'Secure voting mechanism',
                'Voter authentication',
                'Result transparency',
                'Gas optimization',
                'Frontend voting interface'
              ],
              solversNeeded: 1,
              rating: 4.7
            },
            {
              id: '6',
              title: 'Cybersecurity Penetration Testing Tool',
              description: 'Create a comprehensive penetration testing tool that can identify vulnerabilities in web applications and provide detailed security reports.',
              category: 'cybersecurity',
              difficulty: 'hard',
              reward: 900,
              deadline: Timestamp.fromDate(new Date(Date.now() + 25 * 24 * 60 * 60 * 1000)), // 25 days
              tags: ['Python', 'Security', 'Web Scraping', 'Reporting'],
              submissions: 7,
              views: 145,
              createdAt: Timestamp.fromDate(new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)),
              userId: 'company-6',
              createdBy: 'SecureNet Labs',
              budget: 6000,
              requirements: [
                'Vulnerability scanning',
                'SQL injection detection',
                'XSS detection',
                'Detailed security reports',
                'Command-line interface'
              ],
              solversNeeded: 2,
              rating: 4.6
            },
            {
              id: '7',
              title: 'UI/UX Design System',
              description: 'Design and implement a comprehensive design system with reusable components, documentation, and design guidelines for consistent user experience.',
              category: 'ui-ux',
              difficulty: 'medium',
              reward: 550,
              deadline: Timestamp.fromDate(new Date(Date.now() + 18 * 24 * 60 * 60 * 1000)), // 18 days
              tags: ['Figma', 'React', 'Storybook', 'Design Tokens'],
              submissions: 9,
              views: 167,
              createdAt: Timestamp.fromDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
              userId: 'company-7',
              createdBy: 'DesignHub Studio',
              budget: 3000,
              requirements: [
                'Component library with 20+ components',
                'Design tokens and theming',
                'Interactive documentation',
                'Accessibility guidelines',
                'Design guidelines document'
              ],
              solversNeeded: 1,
              rating: 4.3
            },
            {
              id: '8',
              title: 'Machine Learning Recommendation Engine',
              description: 'Build a recommendation system for an e-commerce platform using collaborative filtering and content-based approaches to suggest products to users.',
              category: 'ai',
              difficulty: 'hard',
              reward: 750,
              deadline: Timestamp.fromDate(new Date(Date.now() + 35 * 24 * 60 * 60 * 1000)), // 35 days
              tags: ['Python', 'Scikit-learn', 'Pandas', 'Flask'],
              submissions: 11,
              views: 203,
              createdAt: Timestamp.fromDate(new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)),
              userId: 'company-8',
              createdBy: 'AI Commerce Solutions',
              budget: 4500,
              requirements: [
                'Collaborative filtering algorithm',
                'Content-based filtering',
                'Real-time recommendations',
                'Performance optimization',
                'A/B testing framework'
              ],
              solversNeeded: 2,
              rating: 4.9
            }
          ];
          setProblems(sampleProblems);
        } else {
          setProblems(problemsData);
        }
        trackEvents.pageView('problem-board', 'Problem Board');
      } catch (error) {
        console.error('Error loading problems:', error);
        setError('Failed to load problems. Please try again.');
        trackEvents.error('problems_load_error', error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProblems();
  }, []);

  // Enhanced filtering and sorting
  const filteredAndSortedProblems = useMemo(() => {
    let filtered = problems.filter(problem => {
      const matchesCategory = selectedCategory === 'all' || problem.category === selectedCategory;
      const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           problem.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                           problem.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Enhanced reward filtering
      let matchesReward = true;
      if (selectedReward !== 'all') {
        const reward = problem.reward || 0;
        switch (selectedReward) {
          case 'low': matchesReward = reward >= 100 && reward <= 300; break;
          case 'medium': matchesReward = reward > 300 && reward <= 500; break;
          case 'high': matchesReward = reward > 500; break;
        }
      }

      // Enhanced deadline filtering
      let matchesDeadline = true;
      if (selectedDeadline !== 'all' && problem.deadline) {
        const deadline = problem.deadline.toDate ? problem.deadline.toDate() : new Date(problem.deadline);
        const now = new Date();
        const diffDays = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        
        switch (selectedDeadline) {
          case 'urgent': matchesDeadline = diffDays <= 7; break;
          case 'soon': matchesDeadline = diffDays > 7 && diffDays <= 14; break;
          case 'later': matchesDeadline = diffDays > 14; break;
        }
      }

      return matchesCategory && matchesSearch && matchesReward && matchesDeadline;
    });

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime();
        case 'oldest':
          return a.createdAt.toDate().getTime() - b.createdAt.toDate().getTime();
        case 'reward-high':
          return (b.reward || 0) - (a.reward || 0);
        case 'reward-low':
          return (a.reward || 0) - (b.reward || 0);
        case 'deadline':
          return a.deadline.toDate().getTime() - b.deadline.toDate().getTime();
        case 'popularity':
          return (b.views || 0) - (a.views || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [problems, selectedCategory, searchQuery, selectedReward, selectedDeadline, sortBy]);

  // Pagination
  const paginatedProblems = useMemo(() => {
    const startIndex = (currentPage - 1) * problemsPerPage;
    return filteredAndSortedProblems.slice(startIndex, startIndex + problemsPerPage);
  }, [filteredAndSortedProblems, currentPage, problemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedProblems.length / problemsPerPage);

  const handlePostProblem = useCallback(() => {
    if (!currentUser) {
      alert('Please log in to post a problem');
      return;
    }
    setShowProblemSubmission(true);
    trackEvents.featureUsage('post_problem_button_clicked');
  }, [currentUser]);

  const handleProblemSubmitted = useCallback(() => {
    const loadProblems = async () => {
      try {
        const problemsData = await problemService.getProblems(50);
        setProblems(problemsData);
      } catch (error) {
        console.error('Error refreshing problems:', error);
      }
    };
    loadProblems();
  }, []);

  const handleBookmark = useCallback((problemId: string) => {
    setBookmarkedProblems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(problemId)) {
        newSet.delete(problemId);
      } else {
        newSet.add(problemId);
      }
      return newSet;
    });
    trackEvents.featureUsage('problem_bookmarked');
  }, []);

  const handleShare = useCallback((problem: Problem) => {
    if (navigator.share) {
      navigator.share({
        title: problem.title,
        text: problem.description,
        url: window.location.href + `#problem-${problem.id}`
      });
    } else {
      navigator.clipboard.writeText(window.location.href + `#problem-${problem.id}`);
      alert('Link copied to clipboard!');
    }
    trackEvents.featureUsage('problem_shared');
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-orange-100 text-orange-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Beginner';
      case 'medium': return 'Intermediate';
      case 'hard': return 'Advanced';
      case 'expert': return 'Expert';
      default: return difficulty;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'ai': 'bg-purple-100 text-purple-800',
      'web-dev': 'bg-blue-100 text-blue-800',
      'data-analysis': 'bg-green-100 text-green-800',
      'mobile': 'bg-pink-100 text-pink-800',
      'blockchain': 'bg-orange-100 text-orange-800',
      'cybersecurity': 'bg-red-100 text-red-800',
      'ui-ux': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const formatDeadline = (deadline: Timestamp) => {
    if (!deadline) return 'No deadline';
    
    const date = deadline.toDate ? deadline.toDate() : new Date(deadline);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return '1 day left';
    return `${diffDays} days left`;
  };

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      trackEvents.search(query, selectedCategory);
    }
  }, [selectedCategory]);

  if (error) {
    return (
      <section id="problems" className="py-16 lg:py-24 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Failed to Load Problems</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#DAA520] text-white font-semibold rounded-lg hover:bg-[#B8860B] transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="problems" className="py-16 lg:py-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#002D62] mb-4">
            Problem Board
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse real-world challenges posted by companies and start building your portfolio today
          </p>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search problems, companies, or tags..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DAA520] focus:border-transparent"
              />
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DAA520] focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="reward-high">Highest Reward</option>
                <option value="reward-low">Lowest Reward</option>
                <option value="deadline">Deadline</option>
                <option value="popularity">Most Popular</option>
              </select>
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-[#002D62] text-white rounded-lg"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              <ChevronDown className={`h-4 w-4 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-[#DAA520] text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-[#DAA520] text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                <div className="w-4 h-4 flex flex-col space-y-1">
                  <div className="bg-current h-0.5 rounded"></div>
                  <div className="bg-current h-0.5 rounded"></div>
                  <div className="bg-current h-0.5 rounded"></div>
                </div>
              </button>
            </div>
          </div>

          {/* Enhanced Filters */}
          <div className={`mt-6 transition-all duration-300 ${showFilters || window.innerWidth >= 1024 ? 'block' : 'hidden'} lg:block`}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DAA520] focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name} ({category.count})
                    </option>
                  ))}
                </select>
              </div>

              {/* Token Reward Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Token Reward</label>
                <select
                  value={selectedReward}
                  onChange={(e) => setSelectedReward(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DAA520] focus:border-transparent"
                >
                  <option value="all">All Rewards</option>
                  <option value="low">100-300 tokens</option>
                  <option value="medium">300-500 tokens</option>
                  <option value="high">500+ tokens</option>
                </select>
              </div>

              {/* Deadline Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
                <select
                  value={selectedDeadline}
                  onChange={(e) => setSelectedDeadline(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DAA520] focus:border-transparent"
                >
                  <option value="all">All Deadlines</option>
                  <option value="urgent">Due in 7 days</option>
                  <option value="soon">Due in 14 days</option>
                  <option value="later">Due in 30+ days</option>
                </select>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedReward('all');
                    setSelectedDeadline('all');
                    setSearchQuery('');
                  }}
                  className="w-full px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count and Stats */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <p className="text-gray-600">
              {loading ? 'Loading problems...' : `Showing ${paginatedProblems.length} of ${filteredAndSortedProblems.length} problems`}
            </p>
            {filteredAndSortedProblems.length > 0 && (
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <TrendingUp className="h-4 w-4" />
                <span>{Math.round((filteredAndSortedProblems.length / problems.length) * 100)}% match your filters</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>New problems added this week</span>
          </div>
        </div>

        {/* Problem Cards */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size="lg" showText={true} />
          </div>
        ) : paginatedProblems.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No problems found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or filters to find more problems.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedReward('all');
                setSelectedDeadline('all');
                setSearchQuery('');
              }}
              className="px-6 py-3 bg-[#DAA520] text-white font-semibold rounded-lg hover:bg-[#B8860B] transition-colors duration-300"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>
              {paginatedProblems.map((problem) => (
                <div
                  key={problem.id}
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group ${
                    viewMode === 'list' ? 'flex items-center p-6' : 'p-6'
                  }`}
                  onClick={() => setSelectedProblem(problem)}
                >
                  <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                    {/* Header */}
                    <div className={`${viewMode === 'list' ? 'flex items-start justify-between' : 'mb-4'}`}>
                      <div className={`${viewMode === 'list' ? 'flex-1 pr-4' : ''}`}>
                        <h3 className="text-lg font-bold text-[#002D62] group-hover:text-[#DAA520] transition-colors duration-300 mb-2">
                          {problem.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">Posted by {problem.createdBy || 'Anonymous'}</p>
                      </div>

                      {/* Action Buttons */}
                      <div className={`${viewMode === 'list' ? 'flex items-center space-x-2' : 'absolute top-4 right-4 flex items-center space-x-2'}`}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookmark(problem.id);
                          }}
                          className={`p-2 rounded-lg transition-colors ${
                            bookmarkedProblems.has(problem.id) 
                              ? 'text-[#DAA520] bg-yellow-50' 
                              : 'text-gray-400 hover:text-[#DAA520] hover:bg-yellow-50'
                          }`}
                        >
                          <Bookmark className="h-4 w-4" fill={bookmarkedProblems.has(problem.id) ? 'currentColor' : 'none'} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShare(problem);
                          }}
                          className="p-2 rounded-lg text-gray-400 hover:text-[#DAA520] hover:bg-gray-50 transition-colors"
                        >
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Budget and Deadline */}
                    <div className={`${viewMode === 'list' ? 'flex items-center space-x-4' : 'flex items-center justify-between mb-4'}`}>
                      {problem.budget && (
                        <div className="flex items-center space-x-1 text-[#DAA520] font-semibold">
                          <Coins className="h-4 w-4" />
                          <span>${problem.budget}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1 text-gray-500 text-sm">
                        <Clock className="h-4 w-4" />
                        <span>{formatDeadline(problem.deadline)}</span>
                      </div>
                    </div>

                    {/* Tags and Difficulty */}
                    <div className={`${viewMode === 'list' ? 'flex items-center space-x-4 mb-0' : 'mb-4'}`}>
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                          {getDifficultyLabel(problem.difficulty)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(problem.category)}`}>
                          {categories.find(c => c.id === problem.category)?.name.split(' ')[0] || problem.category}
                        </span>
                      </div>
                    </div>

                    {/* Solvers Info and Rating */}
                    <div className={`${viewMode === 'list' ? 'flex items-center space-x-4' : 'flex items-center justify-between'}`}>
                      <div className="flex items-center space-x-1 text-gray-500 text-sm">
                        <Users className="h-4 w-4" />
                        <span>{problem.solversNeeded || 1} solvers needed</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {problem.rating && (
                          <div className="flex items-center space-x-1 text-yellow-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-sm">{problem.rating.toFixed(1)}</span>
                          </div>
                        )}
                        <button className="flex items-center space-x-1 text-[#DAA520] hover:text-[#B8860B] transition-colors duration-300 text-sm font-medium">
                          <Eye className="h-4 w-4" />
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center mt-8">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg ${
                          currentPage === page
                            ? 'bg-[#DAA520] text-white'
                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Sticky CTA */}
        <div className="fixed bottom-6 right-6 z-40">
          <button 
            onClick={handlePostProblem}
            className="px-6 py-3 bg-[#DAA520] text-white font-semibold rounded-full shadow-lg hover:bg-[#B8860B] transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
          >
            <span>Post a Problem</span>
            <Tag className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Problem Detail Modal */}
      {selectedProblem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#002D62] mb-2">{selectedProblem.title}</h2>
                  <p className="text-gray-600">Posted by {selectedProblem.createdBy || 'Anonymous'}</p>
                </div>
                <button
                  onClick={() => setSelectedProblem(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Problem Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {selectedProblem.budget && (
                  <div className="flex items-center space-x-2">
                    <Coins className="h-5 w-5 text-[#DAA520]" />
                    <span className="font-semibold">${selectedProblem.budget}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <span>{formatDeadline(selectedProblem.deadline)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-gray-500" />
                  <span>{selectedProblem.solversNeeded || 1} solvers needed</span>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedProblem.difficulty)}`}>
                    {getDifficultyLabel(selectedProblem.difficulty)}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#002D62] mb-3">Problem Description</h3>
                <p className="text-gray-700 leading-relaxed">{selectedProblem.description}</p>
              </div>

              {/* Requirements */}
              {selectedProblem.requirements && selectedProblem.requirements.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#002D62] mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {selectedProblem.requirements.map((req: string, index: number) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#DAA520] rounded-full"></div>
                        <span className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              {selectedProblem.tags && selectedProblem.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#002D62] mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProblem.tags.map((tag: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="flex space-x-4">
                <button className="flex-1 px-6 py-3 bg-[#DAA520] text-white font-semibold rounded-lg hover:bg-[#B8860B] transition-colors duration-300">
                  Submit Solution
                </button>
                <button className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-300">
                  Save for Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Problem Submission Modal */}
      <ProblemSubmission
        isOpen={showProblemSubmission}
        onClose={() => setShowProblemSubmission(false)}
        onSuccess={handleProblemSubmitted}
      />
    </section>
  );
};

export default ProblemBoard;