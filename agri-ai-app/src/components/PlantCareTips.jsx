import React from 'react';
import { Droplets, Sun, Leaf } from 'lucide-react';
import '../styles/PlantCareTips.css';

export const PlantCareTips = () => {
  const tips = [
    {
      icon: Droplets,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
      title: 'Proper Watering',
      description: 'Water when soil feels dry 1-2 inches below surface',
    },
    {
      icon: Sun,
      iconColor: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      title: 'Adequate Light',
      description: 'Most plants need 6-8 hours of indirect sunlight',
    },
    {
      icon: Leaf,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100',
      title: 'Regular Inspection',
      description: 'Check for pests and diseases weekly',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Plant Care Tips</h3>
      <div className="space-y-4">
        {tips.map(({ icon: Icon, iconColor, bgColor, title, description }) => (
          <div key={title} className="flex items-start space-x-3">
            <div className={`p-2 ${bgColor} rounded-lg`}>
              <Icon className={`h-5 w-5 ${iconColor}`} aria-hidden="true" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{title}</h4>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
