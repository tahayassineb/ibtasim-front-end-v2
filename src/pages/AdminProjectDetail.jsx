import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, ChevronDown, Eye, Plus, Trash2, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProgressBar from '../components/ProgressBar';

const AdminProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    getProjectById, 
    getDonationsByProject, 
    formatCurrency, 
    formatDate, 
    formatRelativeTime,
    getStatusLabel,
    getStatusColor,
    updateProject,
    deleteProject,
    language
  } = useApp();

  const t = {
    ar: {
      notFound: 'المشروع غير موجود',
      backToProjects: 'العودة للمشاريع',
      changeStatus: 'تغيير الحالة',
      noChangeAvailable: 'لا يوجد تغيير متاح',
      markAs: 'وضع علامة كـ',
      edit: 'تعديل',
      collected: 'المبلغ المحصل',
      donors: 'المتبرعون',
      progress: 'التقدم',
      daysLeft: 'الأيام المتبقية',
      end: 'النهاية',
      overview: 'نظرة عامة',
      donations: 'التبرعات',
      updates: 'التحديثات',
      settings: 'الإعدادات',
      publicPreview: 'المعاينة العامة',
      viewOnSite: 'عرض على الموقع',
      donationList: 'قائمة التبرعات',
      all: 'الكل',
      pending: 'قيد الانتظار',
      verified: 'تم التحقق',
      donor: 'المتبرع',
      amount: 'المبلغ',
      method: 'الطريقة',
      status: 'الحالة',
      date: 'التاريخ',
      actions: 'إجراءات',
      view: 'عرض',
      publishedUpdates: 'التحديثات المنشورة',
      addUpdate: 'إضافة تحديث',
      noUpdates: 'لا توجد تحديثات لهذا المشروع',
      dangerZone: 'منطقة الخطر',
      deleteWarning: 'الحذف نهائي. سيتم الاحتفاظ بالتبرعات المرتبطة في السجل.',
      deleteProject: 'حذف المشروع',
      confirmDelete: 'تأكيد الحذف',
      deleteConfirmText: 'هل أنت متأكد من حذف هذا المشروع؟ هذا الإجراء لا يمكن التراجع عنه.',
      donationsKept: 'التبرعات المرتبطة سيتم الاحتفاظ بها في السجل.',
      cancel: 'إلغاء',
      deletePermanently: 'حذف نهائي',
      card: 'بطاقة',
      transfer: 'تحويل بنكي',
      from: 'من',
      goal: 'الهدف',
    },
    fr: {
      notFound: 'Projet non trouvé',
      backToProjects: 'Retour aux projets',
      changeStatus: 'Changer le statut',
      noChangeAvailable: 'Aucun changement disponible',
      markAs: 'Marquer comme',
      edit: 'Modifier',
      collected: 'Montant collecté',
      donors: 'Nombre de donateurs',
      progress: 'Progression',
      daysLeft: 'Jours restants',
      end: 'Fin',
      overview: 'Aperçu',
      donations: 'Dons',
      updates: 'Mises à jour',
      settings: 'Paramètres',
      publicPreview: 'Aperçu public',
      viewOnSite: 'Voir sur le site',
      donationList: 'Liste des dons',
      all: 'Tous',
      pending: 'En attente',
      verified: 'Vérifiés',
      donor: 'Donateur',
      amount: 'Montant',
      method: 'Méthode',
      status: 'Statut',
      date: 'Date',
      actions: 'Actions',
      view: 'Voir',
      publishedUpdates: 'Mises à jour publiées',
      addUpdate: 'Ajouter une mise à jour',
      noUpdates: 'Aucune mise à jour pour ce projet',
      dangerZone: 'Zone de danger',
      deleteWarning: 'La suppression est irréversible. Les dons associés seront conservés dans l\'historique.',
      deleteProject: 'Supprimer ce projet',
      confirmDelete: 'Confirmer la suppression',
      deleteConfirmText: 'Êtes-vous sûr de vouloir supprimer ce projet? Cette action est irréversible.',
      donationsKept: 'Les dons associés seront conservés dans l\'historique.',
      cancel: 'Annuler',
      deletePermanently: 'Supprimer définitivement',
      card: 'Carte',
      transfer: 'Virement',
      from: 'sur',
      goal: 'Objectif',
    },
    en: {
      notFound: 'Project not found',
      backToProjects: 'Back to Projects',
      changeStatus: 'Change Status',
      noChangeAvailable: 'No change available',
      markAs: 'Mark as',
      edit: 'Edit',
      collected: 'Amount Collected',
      donors: 'Donors',
      progress: 'Progress',
      daysLeft: 'Days Left',
      end: 'End',
      overview: 'Overview',
      donations: 'Donations',
      updates: 'Updates',
      settings: 'Settings',
      publicPreview: 'Public Preview',
      viewOnSite: 'View on Site',
      donationList: 'Donation List',
      all: 'All',
      pending: 'Pending',
      verified: 'Verified',
      donor: 'Donor',
      amount: 'Amount',
      method: 'Method',
      status: 'Status',
      date: 'Date',
      actions: 'Actions',
      view: 'View',
      publishedUpdates: 'Published Updates',
      addUpdate: 'Add Update',
      noUpdates: 'No updates for this project',
      dangerZone: 'Danger Zone',
      deleteWarning: 'Deletion is irreversible. Associated donations will be kept in history.',
      deleteProject: 'Delete Project',
      confirmDelete: 'Confirm Deletion',
      deleteConfirmText: 'Are you sure you want to delete this project? This action cannot be undone.',
      donationsKept: 'Associated donations will be kept in history.',
      cancel: 'Cancel',
      deletePermanently: 'Delete Permanently',
      card: 'Card',
      transfer: 'Bank Transfer',
      from: 'of',
      goal: 'Goal',
    },
  }[language] || {};

  const [activeTab, setActiveTab] = useState('overview');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const project = getProjectById(id);
  const donations = getDonationsByProject(id);
  const isRTL = language === 'ar';

  if (!project) {
    return (
      <div className="text-center py-12" dir={isRTL ? 'rtl' : 'ltr'}>
        <p className="text-gray-500">{t.notFound}</p>
        <Link to="/admin/projets" className="btn-primary mt-4 inline-block">
          {t.backToProjects}
        </Link>
      </div>
    );
  }

  const percentage = Math.round((project.raisedAmount / project.goalAmount) * 100);

  const handleStatusChange = (newStatus) => {
    updateProject(project.id, { status: newStatus });
    setShowStatusDropdown(false);
  };

  const handleDelete = () => {
    deleteProject(project.id);
    navigate('/admin/projets');
  };

  const availableStatuses = {
    active: ['stopped', 'finished'],
    funded: ['finished'],
    stopped: ['active'],
    finished: [],
    expired: [],
  };

  const tabs = [
    { key: 'overview', label: t.overview },
    { key: 'donations', label: `${t.donations} (${donations.length})` },
    { key: 'updates', label: `${t.updates} (${project.updates?.length || 0})` },
    { key: 'settings', label: t.settings },
  ];

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Link to="/admin/projets" className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className={`w-5 h-5 text-gray-600 ${isRTL ? 'rotate-180' : ''}`} />
          </Link>
          <div className={isRTL ? 'text-right' : ''}>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{project.title}</h1>
            <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${getStatusColor(project.status)}`}>
              {getStatusLabel(project.status)}
            </span>
          </div>
        </div>
        <div className={`flex items-center gap-3 w-full sm:w-auto ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="relative flex-1 sm:flex-none">
            <button
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              className="flex items-center justify-center w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {t.changeStatus}
              <ChevronDown className={`w-4 h-4 ${isRTL ? 'mr-2' : 'ml-2'}`} />
            </button>
            {showStatusDropdown && (
              <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10`}>
                {availableStatuses[project.status]?.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 capitalize ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    {t.markAs} {getStatusLabel(status)}
                  </button>
                ))}
                {availableStatuses[project.status]?.length === 0 && (
                  <p className="px-4 py-2 text-sm text-gray-500">{t.noChangeAvailable}</p>
                )}
              </div>
            )}
          </div>
          <Link
            to={`/admin/projets/${id}/modifier`}
            className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <Edit className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t.edit}
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-600">{t.collected}</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{formatCurrency(project.raisedAmount)}</p>
          <p className="text-xs sm:text-sm text-gray-500">{t.from} {formatCurrency(project.goalAmount)}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-600">{t.donors}</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{project.donorsCount}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-600">{t.progress}</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{percentage}%</p>
          <div className="mt-2">
            <ProgressBar percentage={percentage} size="sm" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-600">{t.daysLeft}</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{project.daysLeft || 0}</p>
          <p className="text-xs sm:text-sm text-gray-500">{t.end}: {formatDate(project.endDate)}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 overflow-x-auto">
          <nav className={`flex min-w-max ${isRTL ? 'flex-row-reverse' : ''}`}>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 sm:px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 sm:p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <h3 className="font-semibold text-gray-900">{t.publicPreview}</h3>
                <Link to={`/projets/${id}`} target="_blank" className="text-primary-600 text-sm hover:underline flex items-center">
                  <Eye className={`w-4 h-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                  {t.viewOnSite} →
                </Link>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 sm:p-6">
                <img src={project.mainImage} alt="" className="w-full h-48 sm:h-64 object-cover rounded-lg mb-4" />
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm mb-3">
                  {project.category}
                </span>
                <h4 className="text-lg sm:text-xl font-semibold mb-2">{project.title}</h4>
                <p className="text-gray-600 mb-4">{project.shortDescription}</p>
                <div className="prose max-w-none text-gray-700 whitespace-pre-line text-sm sm:text-base">
                  {project.description}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'donations' && (
            <div>
              <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                <h3 className="font-semibold text-gray-900">{t.donationList}</h3>
                <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <button className="px-3 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">{t.all}</button>
                  <button className="px-3 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">{t.pending}</button>
                  <button className="px-3 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">{t.verified}</button>
                </div>
              </div>
              
              {/* Mobile Cards */}
              <div className="block lg:hidden space-y-3">
                {donations.map((donation) => (
                  <div key={donation.id} className={`p-4 bg-gray-50 rounded-lg ${donation.status === 'pending' ? 'border-r-4 border-orange-400' : ''}`}>
                    <div className={`flex justify-between items-start mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="font-medium text-gray-900">{donation.donorName}</span>
                      <span className="font-bold text-primary-600">{formatCurrency(donation.amount)}</span>
                    </div>
                    <div className={`flex justify-between items-center text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-gray-500">{donation.method === 'card' ? t.card : t.transfer}</span>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(donation.status)}`}>
                        {getStatusLabel(donation.status)}
                      </span>
                    </div>
                    <p className={`text-xs text-gray-400 mt-2 ${isRTL ? 'text-left' : 'text-right'}`}>{formatRelativeTime(donation.date)}</p>
                  </div>
                ))}
                {donations.length === 0 && (
                  <p className="text-gray-500 text-center py-8">No donations</p>
                )}
              </div>

              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase ${isRTL ? 'text-right' : 'text-left'}`}>{t.donor}</th>
                      <th className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase ${isRTL ? 'text-right' : 'text-left'}`}>{t.amount}</th>
                      <th className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase ${isRTL ? 'text-right' : 'text-left'}`}>{t.method}</th>
                      <th className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase ${isRTL ? 'text-right' : 'text-left'}`}>{t.status}</th>
                      <th className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase ${isRTL ? 'text-right' : 'text-left'}`}>{t.date}</th>
                      <th className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase ${isRTL ? 'text-right' : 'text-left'}`}>{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {donations.map((donation) => (
                      <tr key={donation.id} className={donation.status === 'pending' ? 'bg-orange-50' : ''}>
                        <td className="px-4 py-3">{donation.donorName}</td>
                        <td className="px-4 py-3 font-medium">{formatCurrency(donation.amount)}</td>
                        <td className="px-4 py-3 capitalize">{donation.method === 'card' ? t.card : t.transfer}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${getStatusColor(donation.status)}`}>
                            {donation.status === 'verified' && <CheckCircle className={`w-3 h-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />}
                            {donation.status === 'pending' && <Clock className={`w-3 h-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />}
                            {donation.status === 'failed' && <XCircle className={`w-3 h-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />}
                            {getStatusLabel(donation.status)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">{formatRelativeTime(donation.date)}</td>
                        <td className="px-4 py-3">
                          <Link to={`/admin/dons?donation=${donation.id}`} className="text-primary-600 text-sm hover:underline">
                            {t.view}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'updates' && (
            <div>
              <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <h3 className="font-semibold text-gray-900">{t.publishedUpdates}</h3>
                <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm">
                  <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {t.addUpdate}
                </button>
              </div>
              <div className="space-y-4">
                {project.updates?.map((update) => (
                  <div key={update.id} className="border border-gray-200 rounded-lg p-4">
                    <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <h4 className="font-medium">{update.title}</h4>
                      <span className="text-sm text-gray-500">{formatDate(update.date)}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{update.content}</p>
                    {update.image && (
                      <img src={update.image} alt="" className="mt-3 rounded-lg h-32 object-cover" />
                    )}
                  </div>
                ))}
                {(!project.updates || project.updates.length === 0) && (
                  <p className="text-gray-500 text-center py-8">{t.noUpdates}</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-900 mb-2">{t.dangerZone}</h4>
                <p className="text-yellow-700 text-sm mb-4">
                  {t.deleteWarning}
                </p>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  <Trash2 className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {t.deleteProject}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className={`flex items-center gap-3 text-red-600 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-semibold">{t.confirmDelete}</h3>
            </div>
            <p className="text-gray-600 mb-4">
              {t.deleteConfirmText}
            </p>
            <p className="text-gray-500 text-sm mb-6">
              {t.donationsKept}
            </p>
            <div className={`flex justify-end gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                {t.deletePermanently}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjectDetail;
