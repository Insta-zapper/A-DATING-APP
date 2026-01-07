import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext.simple';
import { MatchProvider } from './contexts/MatchContext';
import Auth from './pages/Auth';
import './index.css'

console.log('Step 6: Testing with Auth component only');

function AppRoutes() {
  const { user, profileComplete } = useAuth();
  console.log('AppRoutes - user:', user, 'profileComplete:', profileComplete);
  
  if (!user) {
    console.log('Rendering Auth component');
    return <Auth />;
  }
  
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fef2f2', padding: '20px' }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h1 style={{ color: '#000', marginBottom: '10px' }}>A DATING! APP - Step 6</h1>
        <p style={{ color: '#000' }}>Testing with Auth component only... User: {user?.name || 'None'}</p>
      </div>
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/discover" element={<div>Discover Page</div>} />
          <Route path="/matches" element={<div>Matches Page</div>} />
          <Route path="/chat/:matchId" element={<div>Chat Page</div>} />
          <Route path="/profile" element={<div>Profile Page</div>} />
          <Route path="/" element={<Navigate to="/discover" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <MatchProvider>
          <AppRoutes />
        </MatchProvider>
      </AuthProvider>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
);
