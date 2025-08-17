import React, { useState } from 'react';
import { User, Mail, Calendar, Camera, Edit3, Save, X, Award, TrendingUp, Heart, Leaf } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePlant } from '../contexts/PlantContext';
import '../styles/Profile.css';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { analysisHistory, favorites } = usePlant();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    location: user?.location || ''
  });

  const handleSave = () => {
    updateUser(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || '',
      location: user?.location || ''
    });
    setIsEditing(false);
  };

  const stats = [
    {
      icon: TrendingUp,
      label: 'Plants Analyzed',
      value: analysisHistory.length
    },
    {
      icon: Award,
      label: 'Diseases Identified',
      value: analysisHistory.reduce((acc, a) => acc + a.result.diseases.length, 0)
    },
    {
      icon: Heart,
      label: 'Favorites',
      value: favorites.length
    }
  ];

  const achievements = [
    {
      title: 'First Analysis',
      description: 'Completed your first plant analysis',
      earned: analysisHistory.length > 0,
      icon: '🌱'
    },
    {
      title: 'Plant Expert',
      description: 'Analyzed 10 different plants',
      earned: analysisHistory.length >= 10,
      icon: '🌿'
    },
    {
      title: 'Disease Detective',
      description: 'Identified 5 different diseases',
      earned: analysisHistory.reduce((acc, a) => acc + a.result.diseases.length, 0) >= 5,
      icon: '🔍'
    },
    {
      title: 'Community Helper',
      description: 'Active in community discussions',
      earned: false,
      icon: '🤝'
    }
  ];

  return (
    <div className="profile-container">
      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <User size={32} />
            )}
          </div>

        </div>

        <div className="profile-info">
          {isEditing ? (
            <div className="edit-form">
              {['name', 'email', 'bio', 'location'].map(field => (
                <div key={field} className="input-group">
                  <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  {field === 'bio' ? (
                    <textarea
                      rows="3"
                      value={editForm[field]}
                      onChange={e => setEditForm({ ...editForm, [field]: e.target.value })}
                    />
                  ) : (
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      value={editForm[field]}
                      onChange={e => setEditForm({ ...editForm, [field]: e.target.value })}
                    />
                  )}
                </div>
              ))}
              <div className="button-group">
                <button onClick={handleSave} className="btn save-btn">
                  <Save size={16} /> Save Changes
                </button>
                <button onClick={handleCancel} className="btn cancel-btn">
                  <X size={16} /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Profile Logo */}
               <div className="name-edit">
                <h1>{user?.name}</h1>
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="edit-btn"
                >
                  <Edit3 size={18} />
                </button>
              </div>
              <div className="info-line">
                <Mail size={18} className="info-icon" /> 
                <span>{user?.email}</span>
              </div>
              <div className="info-line">
                <Calendar size={18} className="info-icon" /> 
                <span>Joined {new Date(user?.joinedAt).toLocaleDateString()}</span>
              </div>
              {user?.bio && <p className="user-bio">{user.bio}</p>}
              {user?.location && (
                <div className="location">
                  <span className="location-icon">📍</span> 
                  <span>{user.location}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div className="stat-box" key={i}>
            <div className="stat-icon">
              <stat.icon size={24} />
            </div>
            <div className="stat-content">
              <p className="stat-label">{stat.label}</p>
              <strong className="stat-value">{stat.value}</strong>
            </div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="achievements-section">
        <h2 className="section-title">
          <Award size={24} className="section-icon" />
          Achievements
        </h2>
        <div className="achievements-grid">
          {achievements.map((a, i) => (
            <div className={`achievement-card ${a.earned ? 'earned' : 'locked'}`} key={i}>
              <span className="achievement-icon">{a.icon}</span>
              <div className="achievement-details">
                <h3>{a.title}</h3>
                <p>{a.description}</p>
              </div>
              {a.earned ? (
                <Award size={20} className="achievement-badge" />
              ) : (
                <div className="achievement-lock">🔒</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="activity-section">
        <h2 className="section-title">
          <TrendingUp size={24} className="section-icon" />
          Recent Activity
        </h2>
        {analysisHistory.length > 0 ? (
          <div className="activity-list">
            {analysisHistory.slice(0, 5).map((a) => (
              <div className="activity-item" key={a.id}>
                <div className="activity-image">
                  <img src={a.image} alt="plant" />
                </div>
                <div className="activity-info">
                  <h3>{a.plantType}</h3>
                  <p>{a.result.diseases.length} issue{a.result.diseases.length !== 1 ? 's' : ''} detected</p>
                  <span className="activity-date">
                    {new Date(a.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <div className={`health-tag ${
                  a.result.overallHealth >= 80 ? 'good' : 
                  a.result.overallHealth >= 60 ? 'okay' : 'bad'
                }`}>
                  {a.result.overallHealth}% Health
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-activity">
            <TrendingUp size={48} className="no-activity-icon" />
            <p>No plant analyses yet</p>
            <button className="btn primary-btn">
              Analyze Your First Plant
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;