import React, { createContext, useContext, useState, useCallback } from 'react';
import { projects as initialProjects, donations as initialDonations, donors as initialDonors, currentUser as initialUser, associationInfo, stats } from '../data/sampleData';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // User state
  const [user, setUser] = useState(initialUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Data state
  const [projects, setProjects] = useState(initialProjects);
  const [donations, setDonations] = useState(initialDonations);
  const [donors, setDonors] = useState(initialDonors);

  // Donation flow state
  const [currentDonation, setCurrentDonation] = useState(null);

  // Language state - Arabic is default
  const [language, setLanguage] = useState('ar');

  // Auth functions
  const login = useCallback((userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  }, []);

  const loginAsAdmin = useCallback((adminData) => {
    setUser(adminData);
    setIsAuthenticated(true);
    setIsAdmin(true);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  }, []);

  // Project functions
  const getProjectById = useCallback((id) => {
    return projects.find(p => p.id === parseInt(id));
  }, [projects]);

  const getProjectsByStatus = useCallback((status) => {
    if (status === 'all') return projects;
    return projects.filter(p => p.status === status);
  }, [projects]);

  const addProject = useCallback((project) => {
    setProjects(prev => [...prev, { ...project, id: Date.now() }]);
  }, []);

  const updateProject = useCallback((id, updates) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  }, []);

  const deleteProject = useCallback((id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  }, []);

  // Donation functions
  const addDonation = useCallback((donation) => {
    const newDonation = {
      ...donation,
      id: Date.now(),
      date: new Date().toISOString(),
    };
    setDonations(prev => [newDonation, ...prev]);
    
    // Update project raised amount
    if (donation.status === 'verified') {
      setProjects(prev => prev.map(p => {
        if (p.id === donation.projectId) {
          const newRaised = p.raisedAmount + donation.amount;
          const newStatus = newRaised >= p.goalAmount ? 'funded' : p.status;
          return { 
            ...p, 
            raisedAmount: newRaised,
            status: newStatus,
            donorsCount: p.donorsCount + 1
          };
        }
        return p;
      }));
    }
    
    return newDonation;
  }, []);

  const verifyDonation = useCallback((donationId) => {
    setDonations(prev => prev.map(d => {
      if (d.id === donationId) {
        const updated = { ...d, status: 'verified' };
        // Update project amount
        setProjects(projects => projects.map(p => {
          if (p.id === d.projectId) {
            const newRaised = p.raisedAmount + d.amount;
            const newStatus = newRaised >= p.goalAmount ? 'funded' : p.status;
            return { 
              ...p, 
              raisedAmount: newRaised,
              status: newStatus,
            };
          }
          return p;
        }));
        return updated;
      }
      return d;
    }));
  }, []);

  const rejectDonation = useCallback((donationId, reason) => {
    setDonations(prev => prev.map(d => 
      d.id === donationId ? { ...d, status: 'failed', failureReason: reason } : d
    ));
  }, []);

  const getDonationsByProject = useCallback((projectId) => {
    return donations.filter(d => d.projectId === parseInt(projectId));
  }, [donations]);

  const getUserDonations = useCallback(() => {
    if (!user) return [];
    return donations.filter(d => d.donorId === user.id);
  }, [donations, user]);

  const getPendingDonations = useCallback(() => {
    return donations.filter(d => d.status === 'pending');
  }, [donations]);

  // Donor functions
  const getDonorById = useCallback((id) => {
    return donors.find(d => d.id === parseInt(id));
  }, [donors]);

  const getDonationsByDonor = useCallback((donorId) => {
    return donations.filter(d => d.donorId === parseInt(donorId));
  }, [donations]);

  // Donation flow
  const startDonation = useCallback((projectId) => {
    setCurrentDonation({
      projectId,
      amount: null,
      isAnonymous: false,
      donorInfo: null,
      method: null,
      status: 'draft',
    });
  }, []);

  const updateDonation = useCallback((updates) => {
    setCurrentDonation(prev => ({ ...prev, ...updates }));
  }, []);

  const completeDonation = useCallback(() => {
    if (currentDonation) {
      addDonation({
        projectId: currentDonation.projectId,
        donorId: user?.id || null,
        donorName: currentDonation.isAnonymous ? 'Anonyme' : (currentDonation.donorInfo?.name || user?.name),
        amount: currentDonation.amount,
        method: currentDonation.method,
        status: currentDonation.method === 'card' ? 'verified' : 'pending',
        reference: currentDonation.method === 'transfer' ? `DON-${Date.now().toString().slice(-4)}` : null,
        isAnonymous: currentDonation.isAnonymous,
      });
      setCurrentDonation(null);
    }
  }, [currentDonation, user, addDonation]);

  const resetDonation = useCallback(() => {
    setCurrentDonation(null);
  }, []);

  // Utility functions
  const formatCurrency = useCallback((amount) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0,
    }).format(amount);
  }, []);

  const formatDate = useCallback((dateString) => {
    return new Date(dateString).toLocaleDateString('fr-MA', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }, []);

  const formatRelativeTime = useCallback((dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    const labels = {
      ar: {
        justNow: 'الآن',
        hoursAgo: (h) => `منذ ${h} ساعة`,
        yesterday: 'أمس',
        daysAgo: (d) => `منذ ${d} يوم`,
      },
      fr: {
        justNow: "À l'instant",
        hoursAgo: (h) => `Il y a ${h}h`,
        yesterday: 'Hier',
        daysAgo: (d) => `Il y a ${d} jours`,
      },
      en: {
        justNow: 'Just now',
        hoursAgo: (h) => `${h}h ago`,
        yesterday: 'Yesterday',
        daysAgo: (d) => `${d} days ago`,
      },
    };
    
    const t = labels[language] || labels.ar;
    
    if (diffInHours < 1) return t.justNow;
    if (diffInHours < 24) return t.hoursAgo(diffInHours);
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return t.yesterday;
    if (diffInDays < 30) return t.daysAgo(diffInDays);
    return formatDate(dateString);
  }, [formatDate, language]);

  const getStatusLabel = useCallback((status) => {
    const labels = {
      ar: {
        active: 'جاري',
        funded: 'تم التمويل',
        finished: 'منتهي',
        stopped: 'متوقف',
        expired: 'منتهي الصلاحية',
        pending: 'معلق',
        verified: 'تم التحقق',
        failed: 'فاشل',
      },
      fr: {
        active: 'En cours',
        funded: 'Financé',
        finished: 'Terminé',
        stopped: 'Arrêté',
        expired: 'Expiré',
        pending: 'En attente',
        verified: 'Vérifié',
        failed: 'Échoué',
      },
      en: {
        active: 'Active',
        funded: 'Funded',
        finished: 'Finished',
        stopped: 'Stopped',
        expired: 'Expired',
        pending: 'Pending',
        verified: 'Verified',
        failed: 'Failed',
      },
    };
    return (labels[language] || labels.ar)[status] || status;
  }, [language]);

  const getStatusColor = useCallback((status) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      funded: 'bg-yellow-100 text-yellow-800',
      finished: 'bg-blue-100 text-blue-800',
      stopped: 'bg-orange-100 text-orange-800',
      expired: 'bg-red-100 text-red-800',
      pending: 'bg-orange-100 text-orange-700',
      verified: 'bg-green-100 text-green-700',
      failed: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  }, []);

  const value = {
    // State
    user,
    isAuthenticated,
    isAdmin,
    projects,
    donations,
    donors,
    currentDonation,
    associationInfo,
    stats,
    language,
    setLanguage,
    
    // Auth
    login,
    loginAsAdmin,
    logout,
    
    // Projects
    getProjectById,
    getProjectsByStatus,
    addProject,
    updateProject,
    deleteProject,
    
    // Donations
    addDonation,
    verifyDonation,
    rejectDonation,
    getDonationsByProject,
    getUserDonations,
    getPendingDonations,
    
    // Donors
    getDonorById,
    getDonationsByDonor,
    
    // Donation flow
    startDonation,
    updateDonation,
    completeDonation,
    resetDonation,
    
    // Utils
    formatCurrency,
    formatDate,
    formatRelativeTime,
    getStatusLabel,
    getStatusColor,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
