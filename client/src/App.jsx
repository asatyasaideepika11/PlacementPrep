import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, AuthContext } from './context/AuthContext';
// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import DSASheet from './pages/DSASheet';
import QuestionDetails from './pages/QuestionDetails';
import Timer from './pages/Timer';
import Notes from './pages/Notes';
import Aptitude from './pages/Aptitude';
import Interview from './pages/Interview';
import Profile from './pages/Profile';
// Layout
import Layout from './components/Layout';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = React.useContext(AuthContext);
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dsa" element={<DSASheet />} />
                    <Route path="/dsa/:id" element={<QuestionDetails />} />
                    <Route path="/timer" element={<Timer />} />
                    <Route path="/notes" element={<Notes />} />
                    <Route path="/aptitude" element={<Aptitude />} />
                    <Route path="/interview" element={<Interview />} />
                    <Route path="/profile" element={<Profile />} />
                    {/* Additional routes can be added here */}
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
