import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { ToastProvider } from './components/ui';

// Layouts
import Header from './components/Header';
import Footer from './components/Footer';
import AdminLayout from './components/AdminLayout';

// Public Pages
import Home from './pages/Home';
import ProjectsList from './pages/ProjectsList';
import ProjectDetail from './pages/ProjectDetail';
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';

// Donation Flow (nested routes)
import DonationFlow from './pages/DonationFlow';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminProjects from './pages/AdminProjects';
import AdminProjectDetail from './pages/AdminProjectDetail';
import AdminProjectForm from './pages/AdminProjectForm';
import AdminDonations from './pages/AdminDonations';
import AdminDonors from './pages/AdminDonors';
import AdminDonorDetail from './pages/AdminDonorDetail';
import AdminSettings from './pages/AdminSettings';

// Public Layout wrapper
const PublicLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-surface-secondary">
    <Header />
    <main className="flex-1" role="main">
      {children}
    </main>
    <Footer />
  </div>
);

// Protected route for authenticated users
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useApp();
  return isAuthenticated ? children : <Navigate to="/connexion" />;
};

// Protected route for admin
const AdminRoute = ({ children }) => {
  // For demo, allow all authenticated users to access admin
  // In production, would check isAdmin
  const { isAuthenticated } = useApp();
  return isAuthenticated ? children : <Navigate to="/connexion" />;
};

function AppContent() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/projets" element={<PublicLayout><ProjectsList /></PublicLayout>} />
        <Route path="/projets/:id" element={<PublicLayout><ProjectDetail /></PublicLayout>} />
        <Route path="/a-propos" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/connexion" element={<Login />} />
        
        {/* Protected Routes */}
        <Route 
          path="/profil" 
          element={
            <ProtectedRoute>
              <PublicLayout><UserProfile /></PublicLayout>
            </ProtectedRoute>
          } 
        />

        {/* Donation Flow */}
        <Route path="/don/:projectId/*" element={<DonationFlow />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="projets" element={<AdminProjects />} />
          <Route path="projets/nouveau" element={<AdminProjectForm />} />
          <Route path="projets/:id" element={<AdminProjectDetail />} />
          <Route path="projets/:id/modifier" element={<AdminProjectForm />} />
          <Route path="dons" element={<AdminDonations />} />
          <Route path="donateurs" element={<AdminDonors />} />
          <Route path="donateurs/:id" element={<AdminDonorDetail />} />
          <Route path="parametres" element={<AdminSettings />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={
          <PublicLayout>
            <div className="min-h-[60vh] flex items-center justify-center px-4">
              <div className="text-center max-w-md">
                <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl font-bold text-primary-600">404</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-3">Page non trouvée</h1>
                <p className="text-gray-600 mb-6">La page que vous recherchez n'existe pas ou a été déplacée.</p>
                <a href="/" className="btn-primary inline-flex items-center gap-2">
                  Retour à l'accueil
                </a>
              </div>
            </div>
          </PublicLayout>
        } />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AppProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </AppProvider>
  );
}

export default App;
