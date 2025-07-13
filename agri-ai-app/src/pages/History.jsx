import React, { useState } from 'react';
import { Calendar, Search, Filter, Trash2, Eye, Download, Share } from 'lucide-react';
import { usePlant } from '../contexts/PlantContext';
import '../styles/History.css';  // Import custom CSS

const History = () => {
  const { analysisHistory, deleteAnalysis } = usePlant();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  const filteredHistory = analysisHistory
    .filter(analysis => {
      const matchesSearch = analysis.plantType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        analysis.result.diseases.some(disease =>
          disease.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

      if (filterBy === 'all') return matchesSearch;
      if (filterBy === 'healthy') return matchesSearch && analysis.result.overallHealth >= 80;
      if (filterBy === 'sick') return matchesSearch && analysis.result.overallHealth < 60;
      if (filterBy === 'moderate') return matchesSearch && analysis.result.overallHealth >= 60 && analysis.result.overallHealth < 80;

      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.timestamp) - new Date(a.timestamp);
      if (sortBy === 'oldest') return new Date(a.timestamp) - new Date(b.timestamp);
      if (sortBy === 'healthiest') return b.result.overallHealth - a.result.overallHealth;
      if (sortBy === 'sickest') return a.result.overallHealth - b.result.overallHealth;
      return 0;
    });

  const getHealthColor = (health) => {
    if (health >= 80) return 'text-green-600 bg-green-100';
    if (health >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleDelete = (analysisId) => {
    if (window.confirm('Are you sure you want to delete this analysis?')) {
      deleteAnalysis(analysisId);
    }
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analysis History</h1>
          <p className="text-gray-600">
            View and manage your plant health analysis history
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                aria-label="Search plants or diseases"
                placeholder="Search plants or diseases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Filter by Health */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                aria-label="Filter by health"
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
              >
                <option value="all">All Plants</option>
                <option value="healthy">Healthy (80%+)</option>
                <option value="moderate">Moderate (60-79%)</option>
                <option value="sick">Sick (&lt;60%)</option>
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                aria-label="Sort by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="healthiest">Healthiest First</option>
                <option value="sickest">Sickest First</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-center bg-gray-50 rounded-lg px-4 py-2">
              <span className="text-sm text-gray-600">
                {filteredHistory.length} result{filteredHistory.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Analysis Grid */}
        {filteredHistory.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHistory.map((analysis) => (
              <div
                key={analysis.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div className="relative h-48">
                  <img
                    src={analysis.image}
                    alt={analysis.plantType}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthColor(analysis.result.overallHealth)}`}
                    >
                      {analysis.result.overallHealth}% Health
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{analysis.plantType}</h3>
                    <span className="text-xs text-gray-500">
                      {new Date(analysis.timestamp).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Diseases */}
                  <div className="mb-3">
                    {analysis.result.diseases.length > 0 ? (
                      <div className="space-y-1">
                        {analysis.result.diseases.slice(0, 2).map((disease) => (
                          <div key={disease.id} className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">{disease.name}</span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(disease.severity)}`}
                            >
                              {disease.severity}
                            </span>
                          </div>
                        ))}
                        {analysis.result.diseases.length > 2 && (
                          <p className="text-xs text-gray-500">
                            +{analysis.result.diseases.length - 2} more issue
                            {analysis.result.diseases.length - 2 !== 1 ? 's' : ''}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-green-600">No diseases detected</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedAnalysis(analysis)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="View Details"
                        aria-label={`View details of ${analysis.plantType}`}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                        title="Download Report"
                        aria-label={`Download report of ${analysis.plantType}`}
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
                        title="Share"
                        aria-label={`Share analysis of ${analysis.plantType}`}
                      >
                        <Share className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleDelete(analysis.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete"
                      aria-label={`Delete analysis of ${analysis.plantType}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Calendar className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No analysis history found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterBy !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Start analyzing your plants to build your history'}
            </p>
            {!searchTerm && filterBy === 'all' && (
              <a
                href="/dashboard"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center space-x-2"
              >
                <span>Analyze Your First Plant</span>
              </a>
            )}
          </div>
        )}

        {/* Analysis Detail Modal */}
        {selectedAnalysis && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Analysis Details</h2>
                <button
                  onClick={() => setSelectedAnalysis(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close details modal"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Image */}
                  <div>
                    <img
                      src={selectedAnalysis.image}
                      alt={selectedAnalysis.plantType}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="mt-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{selectedAnalysis.plantType}</h3>
                      <p className="text-sm text-gray-600">
                        Analyzed on {new Date(selectedAnalysis.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Analysis Results */}
                  <div className="space-y-6">
                    {/* Overall Health */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">Overall Health</h4>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getHealthColor(
                            selectedAnalysis.result.overallHealth
                          )}`}
                        >
                          {selectedAnalysis.result.overallHealth}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            selectedAnalysis.result.overallHealth >= 80
                              ? 'bg-green-500'
                              : selectedAnalysis.result.overallHealth >= 60
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${selectedAnalysis.result.overallHealth}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Diseases */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Detected Issues</h4>
                      {selectedAnalysis.result.diseases.length > 0 ? (
                        <div className="space-y-3">
                          {selectedAnalysis.result.diseases.map((disease) => (
                            <div key={disease.id} className="border border-gray-200 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-gray-900">{disease.name}</h5>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(
                                    disease.severity
                                  )}`}
                                >
                                  {disease.severity}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{disease.description}</p>
                              <p className="text-xs text-gray-500">{disease.confidence}% confidence</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-green-600">No diseases detected - your plant looks healthy!</p>
                      )}
                    </div>

                    {/* Recommendations */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Recommendations</h4>
                      <ul className="space-y-2">
                        {selectedAnalysis.result.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                            <span className="text-sm text-gray-600">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
