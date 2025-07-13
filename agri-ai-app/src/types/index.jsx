// Example Disease object
const disease = {
  id: '1',
  name: 'Powdery Mildew',
  confidence: 85,
  severity: 'Medium', // 'Low' | 'Medium' | 'High'
  description: 'A fungal disease that affects leaves...',
  symptoms: ['White powdery spots', 'Leaf curling'],
  treatments: ['Fungicide spray', 'Prune affected areas'],
  prevention: ['Avoid overhead watering', 'Increase air circulation'],
  affectedParts: ['Leaves', 'Stems']
};

// Example AnalysisResult object
const analysisResult = {
  diseases: [disease],
  overallHealth: 75,
  recommendations: ['Improve ventilation', 'Apply fungicide']
};

// Example PlantImage object
const plantImage = {
  id: 'img123',
  url: 'https://example.com/image.jpg',
  uploadedAt: new Date(),
  analysisResult: analysisResult
};
