import React from 'react';
import { Link } from 'react-router-dom';
import {
  Camera,
  Upload,
  Leaf,
  Users,
  Award,
  TrendingUp,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Home.css';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Camera,
      title: 'AI Disease Detection',
      description: 'Upload or capture plant images for instant AI-powered disease identification with 95% accuracy.',
    },
    {
      icon: Leaf,
      title: 'Treatment Plans',
      description: 'Get detailed treatment recommendations and step-by-step care instructions for healthier plants.',
    },
    {
      icon: Users,
      title: 'Expert Community',
      description: 'Connect with plant experts and enthusiasts in our interactive chat board and forums.',
    },
    {
      icon: Award,
      title: 'Plant Library',
      description: 'Access comprehensive information about thousands of plant species and their care requirements.',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Plants Analyzed' },
    { number: '95%', label: 'Accuracy Rate' },
    { number: '10K+', label: 'Happy Users' },
    { number: '500+', label: 'Plant Species' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Home Gardener',
      content: 'PlantDoc AI saved my tomato plants! The disease detection was spot-on and the treatment worked perfectly.',
      rating: 5,
    },
    {
      name: 'Mike Chen',
      role: 'Professional Landscaper',
      content: 'As a professional, I rely on accurate diagnostics. This app has become an essential tool in my work.',
      rating: 5,
    },
    {
      name: 'Emma Davis',
      role: 'Plant Enthusiast',
      content: 'The community feature is amazing. I love sharing my plant journey and learning from experts.',
      rating: 5,
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-container">
          <h1 className="hero-title">
            AI-Powered Plant <span className="hero-highlight">Disease Detection</span>
          </h1>
          <p className="hero-subtitle">
            Identify plant diseases instantly with our advanced AI technology. Get expert treatment recommendations and keep your plants healthy.
          </p>

          <div className="hero-buttons">
            {user ? (
              <Link to="/dashboard" className="primary-button">
                Go to Dashboard
                <ArrowRight className="button-icon" />
              </Link>
            ) : (
              <>
                <Link to="/register" className="primary-button">
                  Get Started Free
                </Link>
                <Link to="/about" className="secondary-button">
                  Learn More
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="section-container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Everything You Need for Plant Health</h2>
            <p className="section-description">
              Our comprehensive platform combines cutting-edge AI technology with expert knowledge to provide complete plant care solutions.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon-container">
                  <feature.icon className="feature-icon" />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-description">Get plant health insights in three simple steps</p>
          </div>

          <div className="steps-grid">
            {[
              { icon: <Upload className="step-icon" />, step: '1. Upload Image', text: 'Take a photo or upload an image of your plant showing any concerning symptoms.' },
              { icon: <TrendingUp className="step-icon" />, step: '2. AI Analysis', text: 'Our advanced AI analyzes the image and identifies potential diseases with high accuracy.' },
              { icon: <CheckCircle className="step-icon" />, step: '3. Get Treatment', text: 'Receive detailed treatment plans and care recommendations to restore plant health.' },
            ].map((item, i) => (
              <div key={i} className="step-card">
                <div className="step-icon-container">
                  {item.icon}
                </div>
                <h3 className="step-title">{item.step}</h3>
                <p className="step-description">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">What Our Users Say</h2>
            <p className="section-description">Join thousands of satisfied gardeners and plant enthusiasts</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((t, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="star">⭐</span>
                  ))}
                </div>
                <p className="testimonial-text">"{t.content}"</p>
                <div className="testimonial-author">
                  <div className="author-name">{t.name}</div>
                  <div className="author-role">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-section">
        <div className="section-container">
          <h2 className="cta-title">Ready to Transform Your Plant Care?</h2>
          <p className="cta-description">
            Join our community of plant lovers and start your journey to healthier, happier plants with AI-powered insights.
          </p>
          {!user && (
            <Link to="/register" className="primary-button">
              Start Your Free Account
              <ArrowRight className="button-icon" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;