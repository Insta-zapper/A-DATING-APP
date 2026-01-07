import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MatchProvider } from './contexts/MatchContext';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import ProfileSetup from './pages/ProfileSetup';
import Discover from './pages/Discover';
import Matches from './pages/Matches';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import './index.css'

console.log('Step 3: Testing without AuthContext');

function AppRoutes() {
  console.log('AppRoutes without AuthContext');
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fef2f2', padding: '20px' }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h1 style={{ color: '#000', marginBottom: '10px' }}>A DATING! APP - Step 3</h1>
        <p style={{ color: '#000' }}>Testing without AuthContext...</p>
      </div>
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/discover" element={<Discover />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/chat/:matchId" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Navigate to="/discover" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <MatchProvider>
        <AppRoutes />
      </MatchProvider>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
);
