import React, { useState, useEffect } from 'react';
import { 
  Camera, Upload, Leaf, AlertCircle, CheckCircle, Info, Clock, 
  Droplets, Sun, Bug, TrendingUp, Award, Users, Bot, Sparkles,
  Image as ImageIcon, X, BarChart3, Activity, Zap
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePlant } from '../contexts/PlantContext';
import aiService from '../utils/aiService';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [imageMetadata, setImageMetadata] = useState({});
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const { user, updateUser } = useAuth();
  const { addAnalysis, analysisHistory } = usePlant();

  // AI processing simulation with progress
  useEffect(() => {
    if (analyzing) {
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      return () => clearInterval(interval);
    } else {
      setAnalysisProgress(0);
    }
  }, [analyzing]);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file.');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert('Please upload an image smaller than 10MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setResult(null);
        
        // Extract image metadata
        const img = new Image();
        img.onload = () => {
          setImageMetadata({
            width: img.width,
            height: img.height,
            size: file.size,
            type: file.type
          });
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);

    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 10 * 1024 * 1024) {
        alert('Please upload an image smaller than 10MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setResult(null);
        
        // Extract image metadata
        const img = new Image();
        img.onload = () => {
          setImageMetadata({
            width: img.width,
            height: img.height,
            size: file.size,
            type: file.type
          });
        };
        img.src = e.target.result;
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
    setAnalysisProgress(0);

    try {
      // Use AI service for analysis
      const aiResult = await aiService.analyzeImage(selectedImage, imageMetadata);
      
      setResult(aiResult);
      
      // Add to analysis history
      addAnalysis({
        id: aiResult.analysisId,
        timestamp: aiResult.timestamp,
        image: selectedImage,
        result: aiResult,
        plantType: aiResult.plantType
      });

      // Update user stats
      updateUser({
        plantsAnalyzed: (user?.plantsAnalyzed || 0) + 1
      });

    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Analysis failed. Please try again.');
    } finally {
      setAnalyzing(false);
      setAnalysisProgress(0);
    }
  };

  const getSeverityClass = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'severity-high';
      case 'medium': return 'severity-medium';
      case 'low': return 'severity-low';
      default: return 'severity-default';
    }
  };

  const getHealthClass = (health) => {
    if (health >= 80) return 'health-high';
    if (health >= 60) return 'health-medium';
    return 'health-low';
  };

  const getPriorityClass = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-default';
    }
  };

  const stats = [
    {
      icon: TrendingUp,
      label: 'Plants Analyzed',
      value: user?.plantsAnalyzed || 0,
      colorClass: 'stat-blue',
      description: 'Total plants analyzed'
    },
    {
      icon: Award,
      label: 'Diseases Cured',
      value: user?.diseasesCured || 0,
      colorClass: 'stat-green',
      description: 'Successfully treated'
    },
    {
      icon: Users,
      label: 'Community Rank',
      value: 'Beginner',
      colorClass: 'stat-purple',
      description: 'Your current level'
    },
    {
      icon: Activity,
      label: 'AI Accuracy',
      value: '95%',
      colorClass: 'stat-orange',
      description: 'Detection confidence'
    }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-inner">
        {/* Welcome Section */}
        <section className="welcome-section">
          <div className="welcome-content">
            <div className="welcome-text">
              <h1>Welcome back, {user?.name}! 👋</h1>
              <p>Ready to analyze your plants and keep them healthy with AI-powered insights?</p>
            </div>
            <div className="ai-badge">
              <Bot className="ai-icon" />
              <span>AI-Powered</span>
              <Sparkles className="sparkle-icon" />
            </div>
          </div>
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
                <p className="stat-description">{stat.description}</p>
              </div>
            </div>
          ))}
        </section>

        <div className="main-grid">
          {/* Upload & Analysis Section */}
          <div className="upload-section">
            <div className="upload-card">
              <div className="card-header">
                <h2>
                  <Bot className="header-icon" />
                  AI Plant Health Analysis
                </h2>
                <p>Upload a clear image of your plant for instant AI-powered health assessment</p>
              </div>

              {!selectedImage ? (
                <div
                  className={`upload-dropzone ${dragOver ? 'drag-over' : ''}`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <div className="upload-content">
                    <div className="upload-icon-container">
                      <div className="upload-icon-wrapper">
                        <Upload className="upload-icon" />
                        <div className="ai-indicator">
                          <Bot className="ai-bot-icon" />
                          <Sparkles className="ai-sparkle" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="upload-text">
                      <h3 className="upload-title">Drop your plant image here</h3>
                      <p className="upload-subtitle">
                        Our AI will analyze your plant's health and detect any diseases
                      </p>
                      <p className="upload-features">
                        Supports JPG, PNG, HEIC • Max 10MB • High accuracy detection
                      </p>
                    </div>
                    
                    <div className="upload-buttons">
                      <label className="upload-button primary">
                        <Upload className="button-icon" />
                        <span>Choose File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden-input"
                        />
                      </label>
                      <label className="upload-button secondary">
                        <Camera className="button-icon" />
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
                    
                    <div className="upload-tips">
                      <div className="tip-item">
                        <div className="tip-icon">💡</div>
                        <span>Ensure good lighting for best results</span>
                      </div>
                      <div className="tip-item">
                        <div className="tip-icon">📱</div>
                        <span>Take a clear, close-up shot of affected areas</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="analysis-controls">
                  <div className="image-preview">
                    <div className="image-wrapper">
                      <img src={selectedImage} alt="Plant to analyze" />
                      <div className="image-overlay">
                        <div className="overlay-content">
                          <ImageIcon className="overlay-icon" />
                          <span>Image Ready for Analysis</span>
                        </div>
                      </div>
                      <button
                        aria-label="Remove selected image"
                        onClick={() => {
                          setSelectedImage(null);
                          setResult(null);
                          setImageMetadata({});
                        }}
                        className="btn-remove"
                      >
                        <X className="remove-icon" />
                      </button>
                    </div>

                    <div className="image-info">
                      <div className="info-item">
                        <span className="info-label">Resolution:</span>
                        <span className="info-value">{imageMetadata.width} × {imageMetadata.height}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Size:</span>
                        <span className="info-value">{(imageMetadata.size / 1024 / 1024).toFixed(1)} MB</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Type:</span>
                        <span className="info-value">{imageMetadata.type}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={analyzeImage}
                    disabled={analyzing}
                    className={`btn-analyze ${analyzing ? 'analyzing' : ''}`}
                    aria-busy={analyzing}
                    aria-label={analyzing ? 'Analyzing plant health' : 'Analyze plant health'}
                  >
                    {analyzing ? (
                      <>
                        <div className="progress-ring">
                          <div className="progress-circle" style={{ strokeDasharray: `${analysisProgress * 3.14 / 50} 3.14` }}></div>
                        </div>
                        <span>AI Analyzing... {Math.round(analysisProgress)}%</span>
                      </>
                    ) : (
                      <>
                        <Zap className="analyze-icon" />
                        <span>Analyze Plant Health</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* AI Analysis Results */}
            {result && (
              <div className="results-section animate-fade-in-up">
                {/* Overall Health Score */}
                <section className="overall-health-card">
                  <div className="health-header">
                    <h3>
                      <BarChart3 className="header-icon" />
                      Overall Plant Health
                    </h3>
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
                  <div className="health-details">
                    <div className="health-metric">
                      <span className="metric-label">Color Health:</span>
                      <span className="metric-value">{Math.round(result.healthAnalysis.colorHealth * 100)}%</span>
                    </div>
                    <div className="health-metric">
                      <span className="metric-label">Texture Health:</span>
                      <span className="metric-value">{Math.round(result.healthAnalysis.textureHealth * 100)}%</span>
                    </div>
                    <div className="health-metric">
                      <span className="metric-label">Shape Health:</span>
                      <span className="metric-value">{Math.round(result.healthAnalysis.shapeHealth * 100)}%</span>
                    </div>
                  </div>
                </section>

                {/* Plant Identification */}
                <section className="plant-identification-card">
                  <h3>
                    <Leaf className="header-icon" />
                    Plant Identification
                  </h3>
                  <div className="plant-info">
                    <div className="plant-name">{result.plantType}</div>
                    <div className="confidence-badge">
                      <span>AI Confidence: {result.confidence}%</span>
                    </div>
                  </div>
                </section>

                {/* Disease Detection */}
                {result.diseases.length > 0 && (
                  <section className="disease-detection-card">
                    <h3>
                      <Bug className="header-icon" />
                      Detected Issues
                    </h3>
                    <div className="disease-list">
                      {result.diseases.map((disease, index) => (
                        <article key={index} className="disease-card">
                          <header className="disease-header">
                            <div className="disease-title">
                              <Bug className="icon-red" />
                              <h4>{disease.name}</h4>
                            </div>
                            <div className="disease-meta">
                              <span className={`severity-badge ${getSeverityClass(disease.severity)}`}>
                                {disease.severity}
                              </span>
                              <span className="confidence">{Math.round(disease.confidence * 100)}% confident</span>
                            </div>
                          </header>

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
                )}

                {/* AI Recommendations */}
                <section className="recommendations-card">
                  <h3>
                    <Info className="header-icon" />
                    AI-Powered Recommendations
                  </h3>
                  <div className="recommendations-list">
                    {result.recommendations.map((rec, i) => (
                      <div key={i} className={`recommendation-item ${getPriorityClass(rec.priority)}`}>
                        <div className="recommendation-header">
                          <span className={`priority-badge ${getPriorityClass(rec.priority)}`}>
                            {rec.priority}
                          </span>
                          <span className="recommendation-category">{rec.category}</span>
                        </div>
                        <p className="recommendation-message">{rec.message}</p>
                        {rec.disease && (
                          <span className="disease-tag">Related to: {rec.disease}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}
          </div>

          {/* Recent Analysis History */}
          <aside className="history-section">
            <h3>
              <Clock className="header-icon" />
              Recent Analysis
            </h3>
            <div className="history-list">
              {analysisHistory.length === 0 ? (
                <div className="empty-history">
                  <ImageIcon className="empty-icon" />
                  <p>No recent analyses</p>
                  <span>Upload an image to get started</span>
                </div>
              ) : (
                analysisHistory.slice(0, 5).map(analysis => (
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
                      <div className="history-health">
                        <span className="health-label">Health:</span>
                        <span className={`health-value ${getHealthClass(analysis.result.overallHealth)}`}>
                          {analysis.result.overallHealth}%
                        </span>
                      </div>
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
