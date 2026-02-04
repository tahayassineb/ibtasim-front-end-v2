import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, MoreVertical, Edit, Eye, Trash2, Pin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProgressBar from '../components/ProgressBar';

const AdminProjects = () => {
  const { projects, formatCurrency, getStatusLabel, getStatusColor, deleteProject, updateProject, language } = useApp();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(null);

  const t = {
    ar: {
      title: 'إدارة المشاريع',
      newProject: 'مشروع جديد',
      all: 'الكل',
      active: 'نشط',
      funded: 'ممول',
      finished: 'منتهي',
      stopped: 'متوقف',
      expired: 'منتهي الصلاحية',
      search: 'البحث في المشاريع...',
      project: 'المشروع',
      status: 'الحالة',
      progress: 'التقدم',
      goal: 'الهدف',
      donors: 'المتبرعين',
      created: 'تاريخ الإنشاء',
      actions: 'إجراءات',
      view: 'عرض',
      edit: 'تعديل',
      pin: 'تثبيت',
      unpin: 'إلغاء التثبيت',
      changeStatus: 'تغيير الحالة',
      delete: 'حذف',
      noProjects: 'لا توجد مشاريع',
      featured: 'مثبت',
    },
    fr: {
      title: 'Gestion des projets',
      newProject: 'Nouveau projet',
      all: 'Tous',
      active: 'Actifs',
      funded: 'Financés',
      finished: 'Terminés',
      stopped: 'Arrêtés',
      expired: 'Expirés',
      search: 'Rechercher un projet...',
      project: 'Projet',
      status: 'Statut',
      progress: 'Progression',
      goal: 'Objectif',
      donors: 'Donateurs',
      created: 'Créé le',
      actions: 'Actions',
      view: 'Voir',
      edit: 'Modifier',
      pin: 'Mettre en avant',
      unpin: 'Retirer',
      changeStatus: 'Changer le statut',
      delete: 'Supprimer',
      noProjects: 'Aucun projet trouvé',
      featured: 'Mis en avant',
    },
    en: {
      title: 'Project Management',
      newProject: 'New Project',
      all: 'All',
      active: 'Active',
      funded: 'Funded',
      finished: 'Finished',
      stopped: 'Stopped',
      expired: 'Expired',
      search: 'Search projects...',
      project: 'Project',
      status: 'Status',
      progress: 'Progress',
      goal: 'Goal',
      donors: 'Donors',
      created: 'Created',
      actions: 'Actions',
      view: 'View',
      edit: 'Edit',
      pin: 'Pin',
      unpin: 'Unpin',
      changeStatus: 'Change Status',
      delete: 'Delete',
      noProjects: 'No projects found',
      featured: 'Featured',
    },
  }[language] || {};

  const filters = [
    { key: 'all', label: t.all },
    { key: 'active', label: t.active },
    { key: 'funded', label: t.funded },
    { key: 'finished', label: t.finished },
    { key: 'stopped', label: t.stopped },
    { key: 'expired', label: t.expired },
  ];

  const getFilteredProjects = () => {
    let filtered = projects;
    if (filter !== 'all') {
      filtered = filtered.filter(p => p.status === filter);
    }
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  };

  const filteredProjects = getFilteredProjects();
  const projectCounts = filters.reduce((acc, f) => ({
    ...acc,
    [f.key]: f.key === 'all' ? projects.length : projects.filter(p => p.status === f.key).length
  }), {});

  const handleDelete = (id) => {
    if (window.confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا المشروع؟' : language === 'fr' ? 'Êtes-vous sûr de vouloir supprimer ce projet?' : 'Are you sure you want to delete this project?')) {
      deleteProject(id);
    }
    setShowDropdown(null);
  };

  const handlePin = (project) => {
    updateProject(project.id, { featured: !project.featured });
    setShowDropdown(null);
  };

  const handleStatusChange = (project, newStatus) => {
    updateProject(project.id, { status: newStatus });
    setShowDropdown(null);
  };

  const isRTL = language === 'ar';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
        <Link to="/admin/projets/nouveau" className="btn-primary flex items-center w-full sm:w-auto justify-center">
          <Plus className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t.newProject}
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex flex-wrap gap-2 w-full lg:w-auto">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === f.key
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {f.label} ({projectCounts[f.key]})
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-64">
            <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
            <input
              type="text"
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-300 outline-none`}
            />
          </div>
        </div>
      </div>

      {/* Projects Table - Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {filteredProjects.map((project) => {
          const percentage = Math.round((project.raisedAmount / project.goalAmount) * 100);
          return (
            <div key={project.id} className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-start gap-3 mb-3">
                <img src={project.mainImage} alt="" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 text-sm line-clamp-2">{project.title}</h3>
                  {project.featured && (
                    <span className="text-xs text-primary-600">📌 {t.featured}</span>
                  )}
                  <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${getStatusColor(project.status)}`}>
                    {getStatusLabel(project.status)}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t.goal}:</span>
                  <span className="font-medium">{formatCurrency(project.goalAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t.donors}:</span>
                  <span className="font-medium">{project.donorsCount}</span>
                </div>
                <div>
                  <ProgressBar percentage={percentage} size="sm" />
                  <span className="text-xs text-gray-500">{percentage}%</span>
                </div>
              </div>

              <div className={`flex gap-2 pt-3 border-t border-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Link
                  to={`/admin/projets/${project.id}`}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100"
                >
                  <Eye className="w-4 h-4" /> {t.view}
                </Link>
                <Link
                  to={`/admin/projets/${project.id}/modifier`}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  <Edit className="w-4 h-4" /> {t.edit}
                </Link>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="px-3 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-gray-500">{t.noProjects}</p>
          </div>
        )}
      </div>

      {/* Projects Table - Desktop */}
      <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase ${isRTL ? 'text-right' : 'text-left'}`}>{t.project}</th>
                <th className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase ${isRTL ? 'text-right' : 'text-left'}`}>{t.status}</th>
                <th className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase ${isRTL ? 'text-right' : 'text-left'}`}>{t.progress}</th>
                <th className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase ${isRTL ? 'text-right' : 'text-left'}`}>{t.goal}</th>
                <th className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase ${isRTL ? 'text-right' : 'text-left'}`}>{t.donors}</th>
                <th className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase ${isRTL ? 'text-right' : 'text-left'}`}>{t.created}</th>
                <th className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase ${isRTL ? 'text-right' : 'text-left'}`}>{t.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProjects.map((project) => {
                const percentage = Math.round((project.raisedAmount / project.goalAmount) * 100);
                return (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <img src={project.mainImage} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                        <div className={isRTL ? 'text-right' : ''}>
                          <p className="font-medium text-gray-900">{project.title}</p>
                          {project.featured && (
                            <span className="text-xs text-primary-600">📌 {t.featured}</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                        {getStatusLabel(project.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="w-32">
                        <ProgressBar percentage={percentage} size="sm" />
                        <span className="text-xs text-gray-500">{percentage}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {formatCurrency(project.goalAmount)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {project.donorsCount}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {new Date(project.createdAt).toLocaleDateString('fr-MA')}
                    </td>
                    <td className="px-4 py-3">
                      <div className="relative">
                        <button
                          onClick={() => setShowDropdown(showDropdown === project.id ? null : project.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-500" />
                        </button>
                        {showDropdown === project.id && (
                          <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10`}>
                            <Link
                              to={`/admin/projets/${project.id}`}
                              className={`flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 ${isRTL ? 'flex-row-reverse' : ''}`}
                            >
                              <Eye className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} /> {t.view}
                            </Link>
                            <Link
                              to={`/admin/projets/${project.id}/modifier`}
                              className={`flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 ${isRTL ? 'flex-row-reverse' : ''}`}
                            >
                              <Edit className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} /> {t.edit}
                            </Link>
                            <button
                              onClick={() => handlePin(project)}
                              className={`flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 ${isRTL ? 'flex-row-reverse' : ''}`}
                            >
                              <Pin className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                              {project.featured ? t.unpin : t.pin}
                            </button>
                            <hr className="my-1" />
                            <p className="px-4 py-1 text-xs text-gray-500">{t.changeStatus}:</p>
                            {['active', 'stopped', 'finished'].map((status) => (
                              <button
                                key={status}
                                onClick={() => handleStatusChange(project, status)}
                                className={`flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 capitalize ${isRTL ? 'flex-row-reverse' : ''}`}
                              >
                                {getStatusLabel(status)}
                              </button>
                            ))}
                            <hr className="my-1" />
                            <button
                              onClick={() => handleDelete(project.id)}
                              className={`flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 ${isRTL ? 'flex-row-reverse' : ''}`}
                            >
                              <Trash2 className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} /> {t.delete}
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">{t.noProjects}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProjects;
