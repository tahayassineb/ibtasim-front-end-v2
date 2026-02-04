import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Heart, Bell, Settings, CheckCircle, Clock, XCircle, HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProjectCard from '../components/ProjectCard';

const UserProfile = () => {
  const { user, logout, getUserDonations, getProjectById, formatCurrency, formatDate, projects } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('donations');
  const [notifications, setNotifications] = useState({
    whatsappUpdates: user?.preferences?.whatsappUpdates ?? true,
    emailNews: user?.preferences?.emailNews ?? true,
  });

  const userDonations = getUserDonations();
  const followedProjects = user?.followedProjects?.map(id => getProjectById(id)).filter(Boolean) || [];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'verified':
        return 'Vérifié';
      case 'pending':
        return 'En attente';
      case 'failed':
        return 'Échoué';
      default:
        return status;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'verified':
        return 'text-green-700 bg-green-100';
      case 'pending':
        return 'text-orange-700 bg-orange-100';
      case 'failed':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-primary-500" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
              <p className="text-gray-600">Membre depuis {formatDate(user?.memberSince)}</p>
              <p className="text-gray-500 text-sm mt-1">
                WhatsApp: {user?.phone?.slice(0, 6)} XXX {user?.phone?.slice(-3)}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { id: 'donations', label: 'Mes dons', icon: Heart },
                { id: 'projects', label: 'Projets suivis', icon: Clock },
                { id: 'settings', label: 'Paramètres', icon: Settings },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Donations Tab */}
            {activeTab === 'donations' && (
              <div>
                {userDonations.length > 0 ? (
                  <div className="space-y-4">
                    {userDonations.map((donation) => {
                      const project = getProjectById(donation.projectId);
                      return (
                        <Link
                          key={donation.id}
                          to={`/projets/${donation.projectId}`}
                          className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <img
                            src={project?.mainImage}
                            alt={project?.title}
                            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate">{project?.title}</h3>
                            <p className="text-sm text-gray-500">{formatDate(donation.date)}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary-600">{formatCurrency(donation.amount)}</p>
                            <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs mt-1 ${getStatusClass(donation.status)}`}>
                              {getStatusIcon(donation.status)}
                              <span>{getStatusText(donation.status)}</span>
                              {donation.status === 'failed' && (
                                <HelpCircle className="w-3 h-3 cursor-help" title={donation.failureReason} />
                              )}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Vous n'avez pas encore fait de don
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Découvrez nos projets et faites votre premier don pour soutenir nos actions.
                    </p>
                    <Link to="/projets" className="btn-primary">
                      Découvrir les projets
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div>
                {followedProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {followedProjects.map((project) => (
                      <div key={project.id}>
                        <ProjectCard project={project} variant="compact" />
                        {project.updates && project.updates.length > 0 && (
                          <p className="text-sm text-gray-500 mt-2 ml-2">
                            Dernière mise à jour: {formatDate(project.updates[0].date)}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Aucun projet suivi
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Les projets auxquels vous avez donné apparaîtront ici.
                    </p>
                    <Link to="/projets" className="btn-primary">
                      Découvrir les projets
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations personnelles</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                      <input
                        type="text"
                        defaultValue={user?.name}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        defaultValue={user?.email}
                        className="input-field"
                      />
                    </div>
                    <button className="btn-primary">Enregistrer</button>
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Préférences de notification</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.whatsappUpdates}
                        onChange={(e) => setNotifications(prev => ({ ...prev, whatsappUpdates: e.target.checked }))}
                        className="w-5 h-5 text-primary-500 rounded border-gray-300"
                      />
                      <span className="text-gray-700">Recevoir les mises à jour des projets par WhatsApp</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.emailNews}
                        onChange={(e) => setNotifications(prev => ({ ...prev, emailNews: e.target.checked }))}
                        className="w-5 h-5 text-primary-500 rounded border-gray-300"
                      />
                      <span className="text-gray-700">Recevoir les nouvelles de l'association</span>
                    </label>
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div>
                  <h3 className="text-lg font-semibold text-red-600 mb-4">Zone de danger</h3>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 font-medium hover:text-red-700"
                  >
                    Se déconnecter
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
