import React from 'react';
import { Bug, AlertCircle, CheckCircle } from 'lucide-react';
import '../styles/DiseaseCard.css'
export const DiseaseCard = ({ disease }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High':
        return 'high-severity';
      case 'Medium':
        return 'medium-severity';
      case 'Low':
        return 'low-severity';
      default:
        return 'default-severity';
    }
  };

  return (
    <div className="disease-card">
      <div className="card-header">
        <div className="card-title">
          <Bug className="icon bug-icon" />
          <h4>{disease.name}</h4>
        </div>
        <div className="card-info">
          <span className={`severity-badge ${getSeverityColor(disease.severity)}`}>
            {disease.severity}
          </span>
          <span className="confidence-text">{disease.confidence}% confident</span>
        </div>
      </div>

      <p className="description">{disease.description}</p>

      <div className="card-sections">
        <div className="section">
          <h5 className="section-title">
            <AlertCircle className="icon symptom-icon" />
            Symptoms
          </h5>
          <ul className="section-list">
            {disease.symptoms.map((symptom, index) => (
              <li key={index} className="list-item">
                <span className="dot"></span>
                {symptom}
              </li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h5 className="section-title">
            <CheckCircle className="icon treatment-icon" />
            Treatment
          </h5>
          <ul className="section-list">
            {disease.treatments.map((treatment, index) => (
              <li key={index} className="list-item">
                <span className="dot"></span>
                {treatment}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
