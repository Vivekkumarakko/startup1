import React, { useState, useEffect } from 'react';
import { Search, Filter, Clock, Coins, Tag, Users, Eye, ChevronDown, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { problemService } from '../services/firestoreService';
import { trackEvents } from '../services/analyticsService';
import ProblemSubmission from './ProblemSubmission';
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
}

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

  const categories = [
    { id: 'all', name: 'All Categories', count: 45 },
    { id: 'ai', name: 'AI & Machine Learning', count: 12 },
    { id: 'web-dev', name: 'Web Development', count: 15 },
    { id: 'data-analysis', name: 'Data Analysis', count: 8 },
    { id: 'mobile', name: 'Mobile Development', count: 6 },
    { id: 'blockchain', name: 'Blockchain', count: 4 }
  ];

  // Load problems from Firestore
  useEffect(() => {
    const loadProblems = async () => {
      try {
        setLoading(true);
        const problemsData = await problemService.getProblems(50);
        setProblems(problemsData);
      } catch (error) {
        console.error('Error loading problems:', error);
        trackEvents.error('problems_load_error', error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProblems();
  }, []);

  const handlePostProblem = () => {
    if (!currentUser) {
      // Show login modal or redirect to login
      alert('Please log in to post a problem');
      return;
    }
    setShowProblemSubmission(true);
    trackEvents.featureUsage('post_problem_button_clicked');
  };

  const handleProblemSubmitted = () => {
    // Refresh problems list
    const loadProblems = async () => {
      try {
        const problemsData = await problemService.getProblems(50);
        setProblems(problemsData);
      } catch (error) {
        console.error('Error refreshing problems:', error);
      }
    };
    loadProblems();
  };

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
      'blockchain': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const filteredProblems = problems.filter(problem => {
    const matchesCategory = selectedCategory === 'all' || problem.category === selectedCategory;
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         problem.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search problems, companies, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DAA520] focus:border-transparent"
              />
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

          {/* Filters */}
          <div className={`mt-6 transition-all duration-300 ${showFilters || window.innerWidth >= 1024 ? 'block' : 'hidden'} lg:block`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                      {category.name} ({category.count})
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
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {loading ? 'Loading problems...' : `Showing ${filteredProblems.length} of ${problems.length} problems`}
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>New problems added this week</span>
          </div>
        </div>

        {/* Problem Cards */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DAA520]"></div>
          </div>
        ) : (
          <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>
            {filteredProblems.map((problem) => (
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
                      <p className="text-gray-600 text-sm mb-2">Posted by {problem.createdBy}</p>
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

                  {/* Solvers Info */}
                  <div className={`${viewMode === 'list' ? 'flex items-center space-x-4' : 'flex items-center justify-between'}`}>
                    <div className="flex items-center space-x-1 text-gray-500 text-sm">
                      <Users className="h-4 w-4" />
                      <span>{problem.solversNeeded || 1} solvers needed</span>
                    </div>
                    <button className="flex items-center space-x-1 text-[#DAA520] hover:text-[#B8860B] transition-colors duration-300 text-sm font-medium">
                      <Eye className="h-4 w-4" />
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                  <p className="text-gray-600">Posted by {selectedProblem.createdBy}</p>
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