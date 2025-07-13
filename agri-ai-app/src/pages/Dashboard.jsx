import React, { useState } from 'react';
import { 
  Camera, Upload, Leaf, AlertCircle, CheckCircle, Info, Clock, 
  Droplets, Sun, Bug, TrendingUp, Award, Users 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePlant } from '../contexts/PlantContext';
import '../styles/Dashboard.css';

const mockDiseases = [
  {
    id: '1',
    name: 'Leaf Blight',
    confidence: 87,
    severity: 'Medium',
    description: 'A fungal disease that causes brown spots and yellowing of leaves, commonly affecting various plant species.',
    symptoms: ['Brown spots on leaves', 'Yellowing edges', 'Leaf wilting', 'Premature leaf drop'],
    treatments: [
      'Remove affected leaves immediately',
      'Apply copper-based fungicide spray',
      'Improve air circulation around plant',
      'Reduce watering frequency'
    ],
    prevention: [
      'Ensure proper spacing between plants',
      'Water at soil level, not on leaves',
      'Apply preventive fungicide during humid seasons',
      'Remove plant debris regularly'
    ],
    affectedParts: ['Leaves', 'Stems']
  },
  {
    id: '2',
    name: 'Powdery Mildew',
    confidence: 73,
    severity: 'Low',
    description: 'A fungal infection that appears as white powdery spots on leaves and stems.',
    symptoms: ['White powdery coating', 'Leaf distortion', 'Stunted growth', 'Yellowing leaves'],
    treatments: [
      'Spray with neem oil solution',
      'Apply baking soda mixture (1 tsp per quart water)',
      'Increase air circulation',
      'Remove severely affected parts'
    ],
    prevention: [
      'Avoid overcrowding plants',
      'Water early morning at soil level',
      'Choose resistant plant varieties',
      'Maintain proper humidity levels'
    ],
    affectedParts: ['Leaves', 'Stems', 'Buds']
  }
];

const Dashboard = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const { user, updateUser } = useAuth();
  const { addAnalysis, analysisHistory } = usePlant();

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Please upload an image smaller than 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);

    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Please upload an image smaller than 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragOver(false);
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setAnalyzing(true);

    await new Promise(resolve => setTimeout(resolve, 2000)); // mock delay

    const mockResult = {
      diseases: mockDiseases,
      overallHealth: Math.floor(Math.random() * 40) + 50,
      recommendations: [
        'Monitor plant daily for changes',
        'Adjust watering schedule',
        'Consider changing plant location for better light',
        'Apply organic fertilizer monthly'
      ]
    };

    setResult(mockResult);
    setAnalyzing(false);

    addAnalysis({
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      image: selectedImage,
      result: mockResult,
      plantType: 'Unknown Plant'
    });

    updateUser({
      plantsAnalyzed: (user?.plantsAnalyzed || 0) + 1
    });
  };

  const getSeverityClass = (severity) => {
    switch (severity) {
      case 'High': return 'severity-high';
      case 'Medium': return 'severity-medium';
      case 'Low': return 'severity-low';
      default: return 'severity-default';
    }
  };

  const getHealthClass = (health) => {
    if (health >= 80) return 'health-high';
    if (health >= 60) return 'health-medium';
    return 'health-low';
  };

  const stats = [
    {
      icon: TrendingUp,
      label: 'Plants Analyzed',
      value: user?.plantsAnalyzed || 0,
      colorClass: 'stat-blue'
    },
    {
      icon: Award,
      label: 'Diseases Cured',
      value: user?.diseasesCured || 0,
      colorClass: 'stat-green'
    },
    {
      icon: Users,
      label: 'Community Rank',
      value: 'Beginner',
      colorClass: 'stat-purple'
    }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-inner">
        {/* Welcome */}
        <section className="welcome-section">
          <h1>Welcome back, {user?.name}!</h1>
          <p>Ready to analyze your plants and keep them healthy?</p>
        </section>

        {/* Stats Cards */}
        <section className="stats-grid">
          {stats.map((stat, i) => (
            <div key={i} className="stat-card">
              <div className={`stat-icon ${stat.colorClass}`}>
                <stat.icon />
              </div>
              <div className="stat-info">
                <p className="stat-label">{stat.label}</p>
                <p className="stat-value">{stat.value}</p>
              </div>
            </div>
          ))}
        </section>

        <div className="main-grid">
          {/* Upload & Analysis */}
          <div className="upload-section">
            <div className="upload-card">
              <h2>Plant Health Analysis</h2>

              {!selectedImage ? (
                <div
                  className={`upload-dropzone ${dragOver ? 'drag-over' : ''}`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <div className="upload-content">
                    <div className="upload-icon">
                      <Upload />
                    </div>
                    <p className="upload-title">Drop your plant image here</p>
                    <p className="upload-subtitle">or click to browse from your device</p>
                    <div className="upload-buttons">
                      <label className="btn btn-green">
                        <Upload />
                        <span>Choose File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden-input"
                        />
                      </label>
                      <label className="btn btn-blue">
                        <Camera />
                        <span>Take Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          onChange={handleImageUpload}
                          className="hidden-input"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="analysis-controls">
                  <div className="image-wrapper">
                    <img src={selectedImage} alt="Plant to analyze" />
                    <button
                      aria-label="Remove selected image"
                      onClick={() => {
                        setSelectedImage(null);
                        setResult(null);
                      }}
                      className="btn-remove"
                    >
                      <AlertCircle />
                    </button>
                  </div>

                  <button
                    onClick={analyzeImage}
                    disabled={analyzing}
                    className="btn-analyze"
                    aria-busy={analyzing}
                    aria-label={analyzing ? 'Analyzing plant health' : 'Analyze plant health'}
                  >
                    {analyzing ? (
                      <>
                        <Clock className="spinner" />
                        <span>Analyzing Plant...</span>
                      </>
                    ) : (
                      <>
                        <Leaf />
                        <span>Analyze Plant Health</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Results */}
            {result && (
              <div className="results-section">
                <section className="overall-health-card">
                  <div className="overall-header">
                    <h3>Overall Plant Health</h3>
                    <div className={`health-score ${getHealthClass(result.overallHealth)}`}>
                      {result.overallHealth}%
                    </div>
                  </div>
                  <div className="health-bar">
                    <div
                      className={`health-progress ${getHealthClass(result.overallHealth)}`}
                      style={{ width: `${result.overallHealth}%` }}
                    />
                  </div>
                </section>

                <section className="disease-detection-card">
                  <h3>Detected Issues</h3>
                  <div className="disease-list">
                    {result.diseases.map(disease => (
                      <article key={disease.id} className="disease-card">
                        <header className="disease-header">
                          <div className="disease-title">
                            <Bug className="icon-red" />
                            <h4>{disease.name}</h4>
                          </div>
                          <div className="disease-meta">
                            <span className={`severity-badge ${getSeverityClass(disease.severity)}`}>
                              {disease.severity}
                            </span>
                            <span className="confidence">{disease.confidence}% confident</span>
                          </div>
                        </header>

                        <p className="disease-desc">{disease.description}</p>

                        <div className="disease-details-grid">
                          <div>
                            <h5 className="section-title symptoms-title">
                              <AlertCircle className="icon-red" />
                              Symptoms
                            </h5>
                            <ul className="list-bullets">
                              {disease.symptoms.map((symptom, i) => (
                                <li key={i}>{symptom}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h5 className="section-title treatment-title">
                              <CheckCircle className="icon-green" />
                              Treatment
                            </h5>
                            <ul className="list-bullets">
                              {disease.treatments.map((treatment, i) => (
                                <li key={i}>{treatment}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="recommendations-card">
                  <h3>
                    <Info className="icon-blue" />
                    General Recommendations
                  </h3>
                  <ul className="list-checks">
                    {result.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </section>
              </div>
            )}
          </div>

          {/* Recent Analysis History */}
          <aside className="history-section">
            <h3>Recent Analysis</h3>
            <div className="history-list">
              {analysisHistory.length === 0 ? (
                <p className="empty-history-msg">No recent analyses</p>
              ) : (
                analysisHistory.map(analysis => (
                  <div key={analysis.id} className="history-item">
                    <img
                      src={analysis.image}
                      alt={`Analysis on ${new Date(analysis.timestamp).toLocaleDateString()}`}
                      className="history-image"
                    />
                    <div className="history-info">
                      <p className="history-date">
                        {new Date(analysis.timestamp).toLocaleDateString()}
                      </p>
                      <p className="history-plant-type">{analysis.plantType}</p>
                      <p className="history-health-score">
                        Health: {analysis.result.overallHealth}%
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
