import React from 'react';
import '../styles/HealthMeter.css'; // Make sure to create this CSS file

export const HealthMeter = ({ health }) => {
  const getHealthColor = (health) => {
    if (health >= 80) return 'text-green';
    if (health >= 60) return 'text-yellow';
    return 'text-red';
  };

  const getProgressColor = (health) => {
    if (health >= 80) return 'bg-green';
    if (health >= 60) return 'bg-yellow';
    return 'bg-red';
  };

  return (
    <div className="health-meter-card">
      <div className="health-meter-header">
        <h3 className="health-meter-title">Overall Plant Health</h3>
        <div className={`health-meter-value ${getHealthColor(health)}`}>
          {health}%
        </div>
      </div>
      <div className="health-meter-bar">
        <div
          className={`health-meter-fill ${getProgressColor(health)}`}
          style={{ width: `${health}%` }}
        ></div>
      </div>
    </div>
  );
};
