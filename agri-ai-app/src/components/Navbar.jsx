import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Leaf, Menu, X, User, LogOut, MessageCircle, History, BookOpen } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setProfileDropdown(false);
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: null },
    { name: 'Plant Library', path: '/plant-library', icon: BookOpen },
    { name: 'About', path: '/about', icon: null },
  ];

  const userLinks = user ? [
    { name: 'Dashboard', path: '/dashboard', icon: null },
    { name: 'Chat Board', path: '/chat', icon: MessageCircle },
    { name: 'History', path: '/history', icon: History },
  ] : [];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-icon">
            <Leaf className="icon leaf-icon" />
          </div>
          <div>
            <h1 className="navbar-title">Agrihub</h1>
            <p className="navbar-subtitle">Plant Health Expert</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-links desktop-only">
          {navLinks.map(({ name, path, icon: Icon }) => (
            <Link
              key={name}
              to={path}
              className={`nav-link ${isActive(path) ? 'active' : ''}`}
            >
              {Icon && <Icon className="nav-icon" />}
              <span>{name}</span>
            </Link>
          ))}

          {user && userLinks.map(({ name, path, icon: Icon }) => (
            <Link
              key={name}
              to={path}
              className={`nav-link ${isActive(path) ? 'active' : ''}`}
            >
              {Icon && <Icon className="nav-icon" />}
              <span>{name}</span>
            </Link>
          ))}
        </div>

        {/* User Menu / Auth Buttons */}
        <div className="user-menu desktop-only">
          {user ? (
            <div className="profile-dropdown-wrapper">
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="profile-button"
                aria-haspopup="true"
                aria-expanded={profileDropdown}
              >
                <div className="profile-avatar">
                  <User className="icon user-icon" />
                </div>
                <span className="profile-name">{user.name}</span>
              </button>

              {profileDropdown && (
                <div className="profile-dropdown">
                  <Link
                    to="/profile"
                    className="dropdown-item"
                    onClick={() => setProfileDropdown(false)}
                  >
                    <User className="icon dropdown-icon" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item"
                  >
                    <LogOut className="icon dropdown-icon" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-button">Login</Link>
              <Link to="/register" className="signup-button">Sign Up</Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="mobile-only">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mobile-menu-button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="icon" /> : <Menu className="icon" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="mobile-menu mobile-only">
          <div className="mobile-links">
            {navLinks.map(({ name, path, icon: Icon }) => (
              <Link
                key={name}
                to={path}
                className={`mobile-nav-link ${isActive(path) ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {Icon && <Icon className="nav-icon" />}
                <span>{name}</span>
              </Link>
            ))}

            {user && userLinks.map(({ name, path, icon: Icon }) => (
              <Link
                key={name}
                to={path}
                className={`mobile-nav-link ${isActive(path) ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {Icon && <Icon className="nav-icon" />}
                <span>{name}</span>
              </Link>
            ))}
          </div>

          <div className="mobile-auth-section">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="mobile-nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="nav-icon" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="mobile-nav-link"
                >
                  <LogOut className="nav-icon" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="mobile-nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="mobile-signup-button"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
