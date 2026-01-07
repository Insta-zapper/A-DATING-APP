import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext.simple';
import { MatchProvider } from './contexts/MatchContext';
import './index.css'

console.log('Step 5: Testing without page components');

function TestComponent() {
  return (
    <div style={{ padding: '20px', backgroundColor: 'green', color: 'white' }}>
      <h1>STEP 5: Test Component</h1>
      <p>Testing without page components...</p>
    </div>
  );
}

function AppRoutes() {
  const { user, profileComplete } = useAuth();
  console.log('AppRoutes - user:', user, 'profileComplete:', profileComplete);
  
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fef2f2', padding: '20px' }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h1 style={{ color: '#000', marginBottom: '10px' }}>A DATING! APP - Step 5</h1>
        <p style={{ color: '#000' }}>Testing without page components... User: {user?.name || 'None'}</p>
      </div>
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/discover" element={<TestComponent />} />
          <Route path="/matches" element={<TestComponent />} />
          <Route path="/chat/:matchId" element={<TestComponent />} />
          <Route path="/profile" element={<TestComponent />} />
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
