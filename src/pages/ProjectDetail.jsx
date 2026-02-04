import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Users, Clock, CheckCircle, XCircle, MessageCircle, Facebook, Copy, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProgressBar from '../components/ProgressBar';
import ProjectCard from '../components/ProjectCard';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProjectById, projects, formatCurrency, formatDate, formatRelativeTime } = useApp();
  const [activeTab, setActiveTab] = useState('description');
  const [showShareToast, setShowShareToast] = useState(false);

  const project = getProjectById(id);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Projet non trouvé</h1>
          <Link to="/projets" className="btn-primary">
            Voir tous les projets
          </Link>
        </div>
      </div>
    );
  }

  const percentage = Math.round((project.raisedAmount / project.goalAmount) * 100);
  const isActive = project.status === 'active';
  const isFunded = project.status === 'funded';
  const isFinished = project.status === 'finished';
  const relatedProjects = projects
    .filter(p => p.id !== project.id && p.category === project.category)
    .slice(0, 2);

  const handleShare = (platform) => {
    const url = window.location.href;
    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2000);
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(`Soutenez ce projet: ${project.title} ${url}`)}`, '_blank');
    }
  };

  const getStatusBadge = () => {
    if (isFunded) return { text: '🎉 Objectif atteint!', className: 'bg-yellow-100 text-yellow-800' };
    if (isFinished) return { text: '✓ Projet terminé', className: 'bg-blue-100 text-blue-800' };
    if (project.status === 'stopped') return { text: 'Projet arrêté', className: 'bg-orange-100 text-orange-800' };
    if (project.status === 'expired') return { text: 'Projet expiré', className: 'bg-red-100 text-red-800' };
    return null;
  };

  const statusBadge = getStatusBadge();

  const renderDonationButton = () => {
    if (isActive) {
      return (
        <button
          onClick={() => navigate(`/don/${project.id}/montant`)}
          className="w-full btn-primary text-lg py-4"
        >
          Faire un don
        </button>
      );
    }
    if (isFunded) {
      return (
        <div className="text-center">
          <button disabled className="w-full bg-yellow-100 text-yellow-800 font-medium py-4 rounded-lg cursor-not-allowed">
            🎉 Objectif atteint
          </button>
          <p className="mt-3 text-green-700 font-medium">Merci à tous les donateurs!</p>
          <Link to="/projets" className="inline-block mt-2 text-primary-600 hover:underline">
            Découvrir d'autres projets →
          </Link>
        </div>
      );
    }
    return (
      <div className="text-center">
        <button disabled className="w-full bg-blue-100 text-blue-800 font-medium py-4 rounded-lg cursor-not-allowed">
          ✓ Ce projet est terminé
        </button>
        <p className="mt-3 text-gray-600">Ce projet a été réalisé avec succès</p>
        <Link to="/projets" className="inline-block mt-2 text-primary-600 hover:underline">
          Découvrir d'autres projets →
        </Link>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="relative h-64 md:h-96">
        <img 
          src={project.mainImage} 
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-4 left-4">
          <Link 
            to="/projets" 
            className="flex items-center space-x-2 text-white bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-black/50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Category & Status */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                {project.category}
              </span>
              {statusBadge && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusBadge.className}`}>
                  {statusBadge.text}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {project.title}
            </h1>

            {/* Mobile Progress Box */}
            <div className="lg:hidden bg-white rounded-xl p-6 shadow-sm mb-6">
              <ProgressBar percentage={percentage} size="lg" showLabel />
              <div className="flex justify-between mt-3 text-sm">
                <span className="font-bold text-xl">{formatCurrency(project.raisedAmount)}</span>
                <span className="text-gray-500">sur {formatCurrency(project.goalAmount)}</span>
              </div>
              <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{project.donorsCount} donateurs</span>
                </div>
                {isActive && (
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{project.daysLeft} jours restants</span>
                  </div>
                )}
              </div>
              <div className="mt-6">
                {renderDonationButton()}
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  {['description', 'updates', 'donors'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-4 px-6 text-sm font-medium text-center border-b-2 transition-colors ${
                        activeTab === tab
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab === 'description' && 'Description'}
                      {tab === 'updates' && `Mises à jour (${project.updates?.length || 0})`}
                      {tab === 'donors' && 'Donateurs'}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'description' && (
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {project.description}
                    </p>
                    {project.gallery && project.gallery.length > 0 && (
                      <div className="mt-8 grid grid-cols-2 gap-4">
                        {project.gallery.map((img, idx) => (
                          <img 
                            key={idx} 
                            src={img} 
                            alt={`${project.title} - ${idx + 1}`}
                            className="rounded-lg w-full h-48 object-cover"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'updates' && (
                  <div className="space-y-6">
                    {project.updates && project.updates.length > 0 ? (
                      project.updates.map((update) => (
                        <div key={update.id} className="border-l-2 border-primary-200 pl-4">
                          <p className="text-sm text-gray-500 mb-1">{formatRelativeTime(update.date)}</p>
                          <h4 className="font-semibold text-gray-900 mb-2">{update.title}</h4>
                          <p className="text-gray-600">{update.content}</p>
                          {update.image && (
                            <img 
                              src={update.image} 
                              alt={update.title}
                              className="mt-3 rounded-lg w-full max-w-md h-48 object-cover"
                            />
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-8">Aucune mise à jour pour le moment.</p>
                    )}
                  </div>
                )}

                {activeTab === 'donors' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">Ahmed M.</span>
                      <span className="text-primary-600 font-semibold">500 DH</span>
                      <span className="text-sm text-gray-500">Il y a 2 jours</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">Fatima B.</span>
                      <span className="text-primary-600 font-semibold">200 DH</span>
                      <span className="text-sm text-gray-500">Il y a 3 jours</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-500">Anonyme</span>
                      <span className="text-primary-600 font-semibold">200 DH</span>
                      <span className="text-sm text-gray-500">Il y a 4 jours</span>
                    </div>
                    <p className="text-center text-sm text-gray-500 mt-4">
                      + {Math.max(0, project.donorsCount - 3)} autres donateurs
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              {/* Progress Card */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <ProgressBar percentage={percentage} size="lg" showLabel />
                <div className="mt-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-2xl font-bold text-gray-900">
                      {formatCurrency(project.raisedAmount)}
                    </span>
                    <span className="text-gray-500">
                      sur {formatCurrency(project.goalAmount)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{percentage}% financé</p>
                </div>

                <div className="flex items-center justify-between mt-4 py-4 border-t border-gray-100">
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-900">{project.donorsCount}</p>
                    <p className="text-sm text-gray-500">donateurs</p>
                  </div>
                  {isActive ? (
                    <div className="text-center">
                      <p className="text-xl font-bold text-gray-900">{project.daysLeft}</p>
                      <p className="text-sm text-gray-500">jours restants</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-xl font-bold text-gray-900">{formatDate(project.endDate)}</p>
                      <p className="text-sm text-gray-500">date de fin</p>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  {renderDonationButton()}
                </div>

                {/* Share buttons */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm font-medium text-gray-700 mb-3">Partager ce projet</p>
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => handleShare('whatsapp')}
                      className="flex-1 flex items-center justify-center py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleShare('facebook')}
                      className="flex-1 flex items-center justify-center py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleShare('copy')}
                      className="flex-1 flex items-center justify-center py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Association Info Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Organisé par</p>
                    <p className="text-primary-600">Association Espoir</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Association vérifiée</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Projets similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((p) => (
                <ProjectCard key={p.id} project={p} variant="compact" />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Share Toast */}
      {showShareToast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          Lien copié!
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
