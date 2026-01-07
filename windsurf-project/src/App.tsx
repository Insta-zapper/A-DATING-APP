import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { MatchProvider } from './contexts/MatchContext';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import ProfileSetup from './pages/ProfileSetup';
import Discover from './pages/Discover';
import Matches from './pages/Matches';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
function AppRoutes() {
  const { user, profileComplete } = useAuth();
  if (!user) {
    return <Auth />;
  }
  if (!profileComplete) {
    return <ProfileSetup />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
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
      <AuthProvider>
        <MatchProvider>
          <AppRoutes />
        </MatchProvider>
      </AuthProvider>
    </Router>
  );
}
export default App;
