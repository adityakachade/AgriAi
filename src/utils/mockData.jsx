export const mockDiseases = [
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
  },
  {
    id: '3',
    name: 'Root Rot',
    confidence: 92,
    severity: 'High',
    description: 'A serious condition caused by overwatering and poor drainage, leading to root decay.',
    symptoms: ['Yellowing leaves', 'Musty smell from soil', 'Soft, brown roots', 'Stunted growth'],
    treatments: [
      'Remove plant from soil immediately',
      'Cut away all affected roots',
      'Repot in fresh, well-draining soil',
      'Reduce watering frequency significantly'
    ],
    prevention: [
      'Use well-draining potting mix',
      'Ensure pots have drainage holes',
      'Water only when top inch of soil is dry',
      'Avoid letting plants sit in standing water'
    ],
    affectedParts: ['Roots', 'Lower stems', 'Leaves']
  },
  {
    id: '4',
    name: 'Aphid Infestation',
    confidence: 85,
    severity: 'Medium',
    description: 'Small, soft-bodied insects that feed on plant sap, causing damage to leaves and stems.',
    symptoms: ['Curled or distorted leaves', 'Sticky honeydew on leaves', 'Yellowing foliage', 'Visible small insects'],
    treatments: [
      'Spray with insecticidal soap',
      'Use neem oil treatment',
      'Introduce beneficial insects like ladybugs',
      'Rinse plants with strong water spray'
    ],
    prevention: [
      'Regular inspection of plants',
      'Maintain proper plant spacing',
      'Avoid over-fertilizing with nitrogen',
      'Encourage beneficial insects in garden'
    ],
    affectedParts: ['Leaves', 'Stems', 'Buds']
  }
];

export const generateMockResult = () => {
  const selectedDiseases = mockDiseases.slice(0, Math.floor(Math.random() * 3) + 1);
  const overallHealth = Math.floor(Math.random() * 40) + 50; // 50-90%
  
  return {
    diseases: selectedDiseases,
    overallHealth,
    recommendations: [
      'Monitor plant daily for changes',
      'Adjust watering schedule based on soil moisture',
      'Consider changing plant location for better light conditions',
      'Apply organic fertilizer monthly during growing season',
      'Prune dead or diseased parts regularly',
      'Maintain proper humidity levels around the plant'
    ].slice(0, Math.floor(Math.random() * 3) + 3)
  };
};
