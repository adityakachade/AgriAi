import React, { useState } from 'react';
import {
  Search,
  Filter,
  Heart,
  Book,
  Leaf,
  Sun,
  Droplets,
  Thermometer,
  Sparkles
} from 'lucide-react';
import '../styles/PlantLibrary.css';

const PlantLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [likedPlants, setLikedPlants] = useState(new Set());

  const plants = [
    // Your plant data here
  ];

  const categories = ['all', 'Indoor', 'Vegetable', 'Flower', 'Herb'];
  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];

  const toggleLike = (plantId) => {
    const newLikedPlants = new Set(likedPlants);
    if (newLikedPlants.has(plantId)) {
      newLikedPlants.delete(plantId);
    } else {
      newLikedPlants.add(plantId);
    }
    setLikedPlants(newLikedPlants);
  };

  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
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
      default: return <Leaf size={16} className="text-emerald-500" />;
    }
  };

  return (
    <div className="plant-library">
      <div className="header">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Leaf size={28} className="text-emerald-500" />
          <h1>Plant Library</h1>
          <Sparkles size={20} className="text-yellow-400" />
        </div>
        <p className="subtitle">Discover comprehensive care guides for your favorite plant species</p>
      </div>

      <div className="filters">
        <div className="filter-input">
          <Search size={18} className="icon" />
          <input
            type="text"
            placeholder="Search plants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-select">
          <Filter size={18} className="icon" />
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-select">
          <Book size={18} className="icon" />
          <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)}>
            {difficulties.map(diff => (
              <option key={diff} value={diff}>
                {diff === 'all' ? 'All Difficulties' : diff}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="result-count">
        Showing {filteredPlants.length} {filteredPlants.length === 1 ? 'plant' : 'plants'} of {plants.length}
      </p>

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
                <div><Sun size={16} /> {plant.care.light}</div>
                <div><Droplets size={16} /> {plant.care.water}</div>
                <div><Thermometer size={16} /> {plant.care.temperature}</div>
              </div>

              <div className="diseases">
                <strong>Common Issues:</strong>
                <div className="disease-tags">
                  {plant.commonDiseases.map((issue, i) => (
                    <span key={i}>{issue}</span>
                  ))}
                </div>
              </div>

              <button className="guide-button">
                View Care Guide
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

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
    </div>
  );
};

export default PlantLibrary;