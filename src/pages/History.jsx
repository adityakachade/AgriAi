import React, { useState } from 'react';
import { Calendar, Search, Filter, Trash2, Eye, Download, Share } from 'lucide-react';
import { usePlant } from '../contexts/PlantContext';
import '../styles/History.css';

const History = () => {
  const { analysisHistory, deleteAnalysis } = usePlant();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  const filteredHistory = analysisHistory
    .filter((analysis) => {
      const matchesSearch =
        analysis.plantType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        analysis.result.diseases.some((disease) =>
          disease.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

      if (filterBy === 'all') return matchesSearch;
      if (filterBy === 'healthy') return matchesSearch && analysis.result.overallHealth >= 80;
      if (filterBy === 'sick') return matchesSearch && analysis.result.overallHealth < 60;
      if (filterBy === 'moderate')
        return matchesSearch && analysis.result.overallHealth >= 60 && analysis.result.overallHealth < 80;

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
    if (health >= 80) return 'health-green';
    if (health >= 60) return 'health-yellow';
    return 'health-red';
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High':
        return 'severity-high';
      case 'Medium':
        return 'severity-medium';
      case 'Low':
        return 'severity-low';
      default:
        return 'severity-default';
    }
  };

  const handleDelete = (analysisId) => {
    if (window.confirm('Are you sure you want to delete this analysis?')) {
      deleteAnalysis(analysisId);
    }
  };

  return (
    <div className="history-page">
      <div className="history-container">
        {/* Header */}
        <div className="history-header">
          <h1>Analysis History</h1>
                        <p className="section-subtitle">View and manage your plant health analysis history</p>
        </div>

        {/* Search & Filter */}
        <div className="history-controls">
          <div className="search-bar">
            <Search className="icon" />
            <input
              type="text"
              placeholder="Search plants or diseases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-select">
            <Filter className="icon" />
            <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
              <option value="all">All Plants</option>
              <option value="healthy">Healthy (80%+)</option>
              <option value="moderate">Moderate (60-79%)</option>
              <option value="sick">Sick (&lt;60%)</option>
            </select>
          </div>
          <div className="sort-select">
            <Calendar className="icon" />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="healthiest">Healthiest First</option>
              <option value="sickest">Sickest First</option>
            </select>
          </div>
          <div className="results-count">
            <span>{filteredHistory.length} result{filteredHistory.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* History Grid */}
        {filteredHistory.length > 0 ? (
          <div className="history-grid">
            {filteredHistory.map((analysis) => (
              <div key={analysis.id} className="history-card">
                <div className="card-image">
                  <img src={analysis.image} alt={analysis.plantType} />
                  <span className={`health-badge ${getHealthColor(analysis.result.overallHealth)}`}>
                    {analysis.result.overallHealth}% Health
                  </span>
                </div>

                <div className="card-content">
                  <div className="card-header">
                    <h3>{analysis.plantType}</h3>
                    <span>{new Date(analysis.timestamp).toLocaleDateString()}</span>
                  </div>

                  <div className="card-diseases">
                    {analysis.result.diseases.length > 0 ? (
                      <>
                        {analysis.result.diseases.slice(0, 2).map((disease) => (
                          <div key={disease.id} className="disease-row">
                            <span>{disease.name}</span>
                            <span className={`severity-badge ${getSeverityColor(disease.severity)}`}>
                              {disease.severity}
                            </span>
                          </div>
                        ))}
                        {analysis.result.diseases.length > 2 && (
                          <p className="more-diseases">
                            +{analysis.result.diseases.length - 2} more issue
                            {analysis.result.diseases.length - 2 !== 1 ? 's' : ''}
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="healthy-text">No diseases detected</p>
                    )}
                  </div>

                  <div className="card-actions">
                    <div className="action-buttons">
                      <button onClick={() => setSelectedAnalysis(analysis)} title="View Details">
                        <Eye className="icon" />
                      </button>
                      <button title="Download Report">
                        <Download className="icon" />
                      </button>
                      <button title="Share">
                        <Share className="icon" />
                      </button>
                    </div>
                    <button onClick={() => handleDelete(analysis.id)} title="Delete">
                      <Trash2 className="icon delete" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <Calendar className="icon-large" />
            <h3>No analysis history found</h3>
            <p>
              {searchTerm || filterBy !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Start analyzing your plants to build your history'}
            </p>
            {!searchTerm && filterBy === 'all' && (
              <a href="/dashboard" className="cta-button">
                Analyze Your First Plant
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
