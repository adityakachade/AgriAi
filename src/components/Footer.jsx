import React from 'react';
import { Link } from 'react-router-dom'; // For navigation links
import {
  Leaf,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Github
} from 'lucide-react'; // Icon set used in footer

import '../styles/Footer.css';
const Footer = () => {
  return (
    <footer className="footer">
      {/* Container for max-width and padding */}
      <div className="footer-container">
        
        {/* Grid layout for footer sections */}
        <div className="footer-grid">
          
          {/* ----- Company Info Section ----- */}
          <div className="footer-section">
            {/* Logo and brand name */}
            <div className="footer-logo">
              <div className="logo-icon">
                <Leaf className="icon-white" /> {/* Green leaf icon */}
              </div>
              <div>
                <h3 className="logo-title">Agrihub</h3>
                <p className="logo-subtitle">Plant Health Expert</p>
              </div>
            </div>

            {/* Description text */}
            <p className="footer-description">
              Advanced AI-powered plant disease detection and treatment recommendations 
              to help you maintain healthy plants and gardens.
            </p>

            {/* Social media icons */}
            <div className="footer-social">
              <a href="#"><Facebook className="icon-gray" /></a>
              <a href="#"><Twitter className="icon-gray" /></a>
              <a href="#"><Instagram className="icon-gray" /></a>
              <a href="#"><Github className="icon-gray" /></a>
            </div>
          </div>

          {/* ----- Quick Links Section ----- */}
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/plant-library">Plant Library</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
          </div>

          {/* ----- Services Section ----- */}
          <div className="footer-section">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-list">
              <li>Disease Detection</li>
              <li>Treatment Recommendations</li>
              <li>Plant Care Tips</li>
              <li>Expert Consultation</li>
              <li>Plant Health Monitoring</li>
            </ul>
          </div>

          {/* ----- Contact Information Section ----- */}
          <div className="footer-section">
            <h4 className="footer-heading">Contact Us</h4>
            <div className="footer-contact">
              <div><Mail className="icon-green" /> <span>support@plantdocai.com</span></div>
              <div><Phone className="icon-green" /> <span>+1 (555) 123-4567</span></div>
              <div><MapPin className="icon-green" /> <span>123 Garden St, Plant City, PC 12345</span></div>
            </div>
          </div>
        </div>

        {/* ----- Footer Bottom Bar ----- */}
        <div className="footer-bottom">
          <p>© 2024 Agrihub . All rights reserved.</p>
          <div className="footer-policies">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
