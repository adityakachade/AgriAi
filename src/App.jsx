import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import ChatBoard from './pages/ChatBoard';
import Profile from './pages/Profile';
import History from './pages/History';
import PlantLibrary from './pages/PlantLibrary';
import Footer from './components/Footer';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { PlantProvider } from './contexts/PlantContext';
import { ChatProvider } from './contexts/ChatContext';
import './index.css';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
          <Route path="/about" element={<About />} />
          <Route path="/plant-library" element={<PlantLibrary />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/chat" element={user ? <ChatBoard /> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/history" element={user ? <History /> : <Navigate to="/login" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <PlantProvider>
          <ChatProvider>
            <AppContent />
          </ChatProvider>
        </PlantProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;