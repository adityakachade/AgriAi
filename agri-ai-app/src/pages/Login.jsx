import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Leaf } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Login.css'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Login failed');
    }

    setLoading(false);
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <div className="login-header">
          <div className="leaf-icon">
            <Leaf className="leaf-icon-inner" />
          </div>
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Sign in to your PlantDoc AI account</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="email" className="label">Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="label">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="input"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="eye-icon" /> : <Eye className="eye-icon" />}
              </button>
            </div>
          </div>

          <div className="remember-forgot">
            <label className="remember">
              <input type="checkbox" name="remember-me" />
              Remember me
            </label>
            <a href="#" className="forgot">Forgot your password?</a>
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? (
              <div className="loading-spinner">
                <div className="spinner" />
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </button>

          <div className="signup-text">
            Don’t have an account? <Link to="/register">Sign up here</Link>
          </div>
        </form>

        <div className="demo-credentials">
          <h3>Demo Credentials:</h3>
          <p>Email: demo@plantdocai.com</p>
          <p>Password: Any password will work for demo</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
