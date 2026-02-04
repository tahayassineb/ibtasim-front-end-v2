import React, { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProjectCard from '../components/ProjectCard';

const ProjectsList = () => {
  const { projects, getStatusLabel } = useApp();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filters = [
    { key: 'all', label: 'Tous' },
    { key: 'active', label: 'En cours' },
    { key: 'funded', label: 'Financés' },
    { key: 'finished', label: 'Terminés' },
  ];

  const getFilteredProjects = () => {
    let filtered = projects;

    // Apply status filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(p => p.status === activeFilter);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredProjects = getFilteredProjects();
  const projectCounts = {
    all: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    funded: projects.filter(p => p.status === 'funded').length,
    finished: projects.filter(p => p.status === 'finished').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Nos Projets</h1>
          <p className="text-gray-600">
            Découvrez les causes qui ont besoin de votre soutien
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter.key
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {filter.label} ({projectCounts[filter.key]})
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un projet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun projet dans cette catégorie
            </h3>
            <p className="text-gray-600 mb-6">
              Essayez de modifier vos critères de recherche ou consultez tous les projets.
            </p>
            <button
              onClick={() => {
                setActiveFilter('all');
                setSearchTerm('');
              }}
              className="btn-primary"
            >
              Voir tous les projets
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsList;
