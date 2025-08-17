import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Heart,
  Book,
  Leaf,
  Sun,
  Droplets,
  Thermometer,
  Sparkles,
  Info,
  Clock,
  Zap,
  Star,
  TrendingUp,
  X
} from 'lucide-react';
import { plantDatabase, plantCategories, difficultyLevels, careRequirements, seasonalCare } from '../utils/plantDatabase';
import '../styles/PlantLibrary.css';

const PlantLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [likedPlants, setLikedPlants] = useState(new Set());
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [showCareGuide, setShowCareGuide] = useState(false);
  const [currentSeason, setCurrentSeason] = useState('spring');

  // Get current season
  useEffect(() => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) setCurrentSeason('spring');
    else if (month >= 5 && month <= 7) setCurrentSeason('summer');
    else if (month >= 8 && month <= 10) setCurrentSeason('autumn');
    else setCurrentSeason('winter');
  }, []);

  const toggleLike = (plantId) => {
    const newLikedPlants = new Set(likedPlants);
    if (newLikedPlants.has(plantId)) {
      newLikedPlants.delete(plantId);
    } else {
      newLikedPlants.add(plantId);
    }
    setLikedPlants(newLikedPlants);
  };

  const filteredPlants = plantDatabase.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || plant.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === 'all' || plant.difficulty === difficultyFilter;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyClass = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'badge easy';
      case 'Medium': return 'badge medium';
      case 'Hard': return 'badge hard';
      default: return 'badge';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Indoor': return <Leaf size={16} className="text-emerald-500" />;
      case 'Vegetable': return <span className="text-orange-500">🥕</span>;
      case 'Flower': return <span className="text-pink-500">🌸</span>;
      case 'Herb': return <span className="text-lime-500">🌿</span>;
      case 'Succulent': return <span className="text-yellow-500">🌵</span>;
      default: return <Leaf size={16} className="text-emerald-500" />;
    }
  };

  const openCareGuide = (plant) => {
    setSelectedPlant(plant);
    setShowCareGuide(true);
  };

  const closeCareGuide = () => {
    setShowCareGuide(false);
    setSelectedPlant(null);
  };

  const getCareIcon = (careType) => {
    switch (careType) {
      case 'light': return <Sun size={16} />;
      case 'water': return <Droplets size={16} />;
      case 'temperature': return <Thermometer size={16} />;
      default: return <Info size={16} />;
    }
  };

  return (
    <div className="plant-library">
      {/* Header Section */}
      <div className="header">
        <div className="header-content">
          <div className="header-title">
            <Leaf size={32} className="text-emerald-500" />
            <h1>Plant Library</h1>
            <Sparkles size={24} className="text-yellow-400" />
          </div>
          <p className="subtitle">Discover comprehensive care guides for your favorite plant species</p>
          <div className="header-stats">
            <div className="stat-item">
              <TrendingUp size={20} />
              <span>{plantDatabase.length} Plants</span>
            </div>
            <div className="stat-item">
              <Star size={20} />
              <span>Expert Care Tips</span>
            </div>
            <div className="stat-item">
              <Zap size={20} />
              <span>AI-Powered Insights</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="filters">
        <div className="filter-input">
          <Search size={18} className="icon" />
          <input
            type="text"
            placeholder="Search plants by name, scientific name, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-select">
          <Filter size={18} className="icon" />
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            {plantCategories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-select">
          <Book size={18} className="icon" />
          <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)}>
            {difficultyLevels.map(diff => (
              <option key={diff.id} value={diff.id}>
                {diff.icon} {diff.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="result-count">
        <span className="count-number">{filteredPlants.length}</span>
        <span className="count-text">
          {filteredPlants.length === 1 ? 'plant' : 'plants'} found
        </span>
        {(searchTerm || categoryFilter !== 'all' || difficultyFilter !== 'all') && (
          <button
            className="clear-filters"
            onClick={() => {
              setSearchTerm('');
              setCategoryFilter('all');
              setDifficultyFilter('all');
            }}
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Plant Grid */}
      <div className="plant-grid">
        {filteredPlants.map(plant => (
          <div key={plant.id} className="plant-card group">
            <div className="plant-image">
              <img src={plant.image} alt={plant.name} className="group-hover:scale-105" />
              <span className={getDifficultyClass(plant.difficulty)}>{plant.difficulty}</span>
              <button 
                className={`like-button ${likedPlants.has(plant.id) ? 'liked' : ''}`}
                onClick={() => toggleLike(plant.id)}
              >
                <Heart size={16} fill={likedPlants.has(plant.id) ? 'currentColor' : 'none'} />
              </button>
            </div>
            <div className="plant-content">
              <div className="plant-category">
                {getCategoryIcon(plant.category)} <span>{plant.category}</span>
              </div>
              <h3>{plant.name}</h3>
              <p className="sci-name">{plant.scientificName}</p>
              <p className="description">{plant.description}</p>

              <div className="care-info">
                <div className="care-item">
                  <Sun size={16} className="care-icon" />
                  <span>{plant.light}</span>
                </div>
                <div className="care-item">
                  <Droplets size={16} className="care-icon" />
                  <span>{plant.water}</span>
                </div>
                <div className="care-item">
                  <Thermometer size={16} className="care-icon" />
                  <span>{plant.temperature}</span>
                </div>
              </div>

              <div className="plant-details">
                <div className="detail-item">
                  <span className="detail-label">Growth Rate:</span>
                  <span className="detail-value">{plant.growthRate}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Max Height:</span>
                  <span className="detail-value">{plant.maxHeight}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Pet Safe:</span>
                  <span className={`detail-value ${plant.toxicity.includes('Non-toxic') ? 'safe' : 'toxic'}`}>
                    {plant.toxicity.includes('Non-toxic') ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>

              <div className="diseases">
                <strong>Common Issues:</strong>
                <div className="disease-tags">
                  {plant.commonDiseases.slice(0, 3).map((issue, i) => (
                    <span key={i} className="disease-tag">{issue}</span>
                  ))}
                  {plant.commonDiseases.length > 3 && (
                    <span className="disease-tag more">+{plant.commonDiseases.length - 3} more</span>
                  )}
                </div>
              </div>

              <button 
                className="guide-button"
                onClick={() => openCareGuide(plant)}
              >
                <Book size={16} />
                <span>View Care Guide</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredPlants.length === 0 && (
        <div className="no-results">
          <Search size={48} className="icon-large" />
          <h3>No plants found</h3>
          <p>Try adjusting your filters or search terms</p>
          <button
            className="clear-button"
            onClick={() => {
              setSearchTerm('');
              setCategoryFilter('all');
              setDifficultyFilter('all');
            }}
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Care Guide Modal */}
      {showCareGuide && selectedPlant && (
        <div className="care-guide-modal" onClick={closeCareGuide}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedPlant.name}</h2>
              <button className="close-button" onClick={closeCareGuide}>
                <X size={24} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="plant-overview">
                <img src={selectedPlant.image} alt={selectedPlant.name} />
                <div className="overview-info">
                  <p className="scientific-name">{selectedPlant.scientificName}</p>
                  <p className="description">{selectedPlant.description}</p>
                  <div className="quick-stats">
                    <span className="stat">Difficulty: {selectedPlant.difficulty}</span>
                    <span className="stat">Growth: {selectedPlant.growthRate}</span>
                    <span className="stat">Height: {selectedPlant.maxHeight}</span>
                  </div>
                </div>
              </div>

              <div className="care-requirements">
                <h3>Care Requirements</h3>
                <div className="requirements-grid">
                  <div className="requirement-item">
                    <div className="requirement-header">
                      <Sun size={20} />
                      <span>Light</span>
                    </div>
                    <p className="requirement-value">{selectedPlant.light}</p>
                    <p className="requirement-description">
                      {careRequirements.light[selectedPlant.light]}
                    </p>
                  </div>
                  
                  <div className="requirement-item">
                    <div className="requirement-header">
                      <Droplets size={20} />
                      <span>Water</span>
                    </div>
                    <p className="requirement-value">{selectedPlant.water}</p>
                    <p className="requirement-description">
                      {careRequirements.water[selectedPlant.water]}
                    </p>
                  </div>
                  
                  <div className="requirement-item">
                    <div className="requirement-header">
                      <Thermometer size={20} />
                      <span>Temperature</span>
                    </div>
                    <p className="requirement-value">{selectedPlant.temperature}</p>
                    <p className="requirement-description">
                      {careRequirements.temperature[selectedPlant.temperature]}
                    </p>
                  </div>
                  
                  <div className="requirement-item">
                    <div className="requirement-header">
                      <Leaf size={20} />
                      <span>Humidity</span>
                    </div>
                    <p className="requirement-value">{selectedPlant.humidity}</p>
                    <p className="requirement-description">
                      {careRequirements.humidity[selectedPlant.humidity]}
                    </p>
                  </div>
                </div>
              </div>

              <div className="care-tips">
                <h3>Care Tips</h3>
                <ul className="tips-list">
                  {selectedPlant.careTips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>

              <div className="seasonal-care">
                <h3>Seasonal Care - {seasonalCare[currentSeason].title}</h3>
                <ul className="seasonal-tips">
                  {seasonalCare[currentSeason].tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>

              <div className="disease-prevention">
                <h3>Common Issues & Prevention</h3>
                <div className="diseases-list">
                  {selectedPlant.commonDiseases.map((disease, index) => (
                    <div key={index} className="disease-item">
                      <span className="disease-name">{disease}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantLibrary;