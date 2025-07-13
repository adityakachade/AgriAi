import React from 'react';
import { Leaf, Users, Award, Target, Heart, Lightbulb, Shield, Globe } from 'lucide-react';
import '../styles/About.css'; // Import the CSS file

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="feature-card">
    <div className="feature-icon">
      <Icon className="feature-icon-svg" />
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const TeamMemberCard = ({ name, role, bio, image }) => (
  <div className="team-card">
    <img
      src={image}
      alt={name}
      loading="lazy"
      className="team-member-img"
    />
    <h3>{name}</h3>
    <p className="team-role">{role}</p>
    <p className="team-bio">{bio}</p>
  </div>
);

const StatCard = ({ number, label }) => (
  <div className="stat-card">
    <div className="stat-number">{number}</div>
    <div className="stat-label">{label}</div>
  </div>
);

const About = () => {
  const features = [
    {
      icon: Lightbulb,
      title: 'AI-Powered Detection',
      description: 'Our advanced machine learning algorithms can identify over 500 plant diseases with 95% accuracy.',
    },
    {
      icon: Users,
      title: 'Expert Community',
      description: 'Connect with certified plant pathologists and experienced gardeners from around the world.',
    },
    {
      icon: Shield,
      title: 'Trusted Solutions',
      description: 'All treatment recommendations are verified by agricultural experts and based on scientific research.',
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Helping farmers and gardeners worldwide save crops and maintain healthy plant ecosystems.',
    },
  ];

  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief Plant Pathologist',
      bio: 'PhD in Plant Pathology with 15+ years of experience in disease identification and treatment.',
      image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    },
    {
      name: 'Alex Rodriguez',
      role: 'AI Research Lead',
      bio: 'Machine Learning expert specializing in computer vision and agricultural applications.',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Agricultural Consultant',
      bio: 'Former agricultural extension officer with expertise in sustainable farming practices.',
      image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    },
  ];

  const stats = [
    { number: '500K+', label: 'Plants Analyzed' },
    { number: '95%', label: 'Accuracy Rate' },
    { number: '50K+', label: 'Users Worldwide' },
    { number: '500+', label: 'Disease Types' },
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-icon-container">
              <div className="hero-icon">
                <Leaf className="hero-icon-svg" />
              </div>
            </div>
            <h1>About Agrihub</h1>
            <p className="hero-subtitle">
              Revolutionizing plant healthcare through artificial intelligence, expert knowledge,
              and community collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section mission-section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-content">
              <h2 className="section-title">Our Mission</h2>
              <p>
                At Agrihub, we believe that healthy plants are the foundation of a sustainable
                future. Our mission is to democratize plant healthcare by making expert-level
                disease diagnosis and treatment accessible to everyone, from home gardeners to
                commercial farmers.
              </p>
              <p>
                By combining cutting-edge artificial intelligence with the wisdom of experienced
                plant pathologists, we're creating a world where plant diseases can be identified
                and treated quickly, accurately, and affordably.
              </p>
              <div className="mission-tags">
                <div className="mission-tag accuracy">
                  <Target className="tag-icon" />
                  <span>Accuracy</span>
                </div>
                <div className="mission-tag care">
                  <Heart className="tag-icon" />
                  <span>Care</span>
                </div>
                <div className="mission-tag excellence">
                  <Award className="tag-icon" />
                  <span>Excellence</span>
                </div>
              </div>
            </div>
            <div className="mission-image-container">
              <img
                src="https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Plant research"
                className="mission-image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section stats-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Impact in Numbers</h2>
            <p className="section-subtitle">
              See how we're making a difference in plant healthcare worldwide
            </p>
          </div>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Makes Us Different</h2>
            <p className="section-subtitle">
              We combine the latest technology with human expertise to provide the most accurate
              and actionable plant health insights.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section team-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Meet Our Expert Team</h2>
            <p className="section-subtitle">
              Our team combines decades of experience in plant pathology, artificial intelligence,
              and agricultural science.
            </p>
          </div>

          <div className="team-grid">
            {team.map((member, index) => (
              <TeamMemberCard key={index} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="section tech-section">
        <div className="container">
          <div className="tech-grid">
            <div className="tech-image-container">
              <img
                src="https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="AI Technology"
                className="tech-image"
                loading="lazy"
              />
            </div>
            <div className="tech-content">
              <h2 className="section-title">Cutting-Edge Technology</h2>
              <p>
                PlantDoc AI harnesses the power of deep learning, computer vision, and big data
                analytics to provide precise, real-time plant disease diagnosis.
              </p>
              <p>
                Our constantly evolving AI models are trained on millions of images and validated
                by experts to ensure high accuracy and reliability.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;