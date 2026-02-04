import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, AlertTriangle, CheckCircle, XCircle, Clock, FileText, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';

const AdminDonations = () => {
  const { donations, projects, formatCurrency, formatDate, getStatusLabel, getStatusColor, verifyDonation, rejectDonation, language } = useApp();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState('all');
  const [verificationModal, setVerificationModal] = useState(null);

  const t = {
    ar: {
      title: 'إدارة التبرعات',
      totalThisMonth: 'المجموع هذا الشهر',
      urgent: 'تبرعات بحاجة للتحقق',
      all: 'الكل',
      pending: 'قيد الانتظار',
      verified: 'تم التحقق',
      failed: 'فاشلة',
      allProjects: 'جميع المشاريع',
      search: 'البحث...',
      donor: 'المتبرع',
      project: 'المشروع',
      amount: 'المبلغ',
      method: 'الطريقة',
      reference: 'المرجع',
      status: 'الحالة',
      date: 'التاريخ',
      actions: 'إجراءات',
      verify: 'تحقق',
      card: 'بطاقة',
      transfer: 'تحويل بنكي',
      anonymous: 'مجهول',
      noDonations: 'لا توجد تبرعات',
      verificationTitle: 'التحقق من التبرع',
      donationInfo: 'معلومات التبرع',
      receipt: 'الإيصال',
      checklist: 'قائمة التحقق',
      amountMatch: 'المبلغ يتطابق',
      referenceVisible: 'المرجع مرئي',
      dateRecent: 'التاريخ حديث',
      accountCorrect: 'الحساب المستلم صحيح',
      cancel: 'إلغاء',
      reject: 'رفض',
      approve: 'الموافقة على التبرع',
      noReceipt: 'لا يوجد إيصال',
      declaredAmount: 'المبلغ المعلن',
      submissionDate: 'تاريخ التقديم',
      whatsapp: 'واتساب',
    },
    fr: {
      title: 'Gestion des dons',
      totalThisMonth: 'Total ce mois',
      urgent: 'dons en attente de vérification',
      all: 'Tous',
      pending: 'En attente',
      verified: 'Vérifiés',
      failed: 'Échoués',
      allProjects: 'Tous les projets',
      search: 'Rechercher...',
      donor: 'Donateur',
      project: 'Projet',
      amount: 'Montant',
      method: 'Méthode',
      reference: 'Référence',
      status: 'Statut',
      date: 'Date',
      actions: 'Actions',
      verify: 'Vérifier',
      card: 'Carte',
      transfer: 'Virement',
      anonymous: 'Anonyme',
      noDonations: 'Aucun don trouvé',
      verificationTitle: 'Vérification du don',
      donationInfo: 'Informations du don',
      receipt: 'Reçu envoyé',
      checklist: 'Checklist de vérification',
      amountMatch: 'Le montant correspond',
      referenceVisible: 'La référence est visible',
      dateRecent: 'La date est récente',
      accountCorrect: 'Le compte destinataire est correct',
      cancel: 'Annuler',
      reject: 'Rejeter',
      approve: 'Approuver le don',
      noReceipt: 'Aucun reçu joint',
      declaredAmount: 'Montant déclaré',
      submissionDate: 'Date de soumission',
      whatsapp: 'WhatsApp',
    },
    en: {
      title: 'Donation Management',
      totalThisMonth: 'Total this month',
      urgent: 'donations pending verification',
      all: 'All',
      pending: 'Pending',
      verified: 'Verified',
      failed: 'Failed',
      allProjects: 'All Projects',
      search: 'Search...',
      donor: 'Donor',
      project: 'Project',
      amount: 'Amount',
      method: 'Method',
      reference: 'Reference',
      status: 'Status',
      date: 'Date',
      actions: 'Actions',
      verify: 'Verify',
      card: 'Card',
      transfer: 'Bank Transfer',
      anonymous: 'Anonymous',
      noDonations: 'No donations found',
      verificationTitle: 'Verify Donation',
      donationInfo: 'Donation Information',
      receipt: 'Submitted Receipt',
      checklist: 'Verification Checklist',
      amountMatch: 'Amount matches',
      referenceVisible: 'Reference is visible',
      dateRecent: 'Date is recent',
      accountCorrect: 'Recipient account is correct',
      cancel: 'Cancel',
      reject: 'Reject',
      approve: 'Approve Donation',
      noReceipt: 'No receipt attached',
      declaredAmount: 'Declared Amount',
      submissionDate: 'Submission Date',
      whatsapp: 'WhatsApp',
    },
  }[language] || {};

  const filters = [
    { key: 'all', label: t.all },
    { key: 'pending', label: t.pending },
    { key: 'verified', label: t.verified },
    { key: 'failed', label: t.failed },
  ];

  const getFilteredDonations = () => {
    let filtered = donations;
    if (filter !== 'all') {
      filtered = filtered.filter(d => d.status === filter);
    }
    if (selectedProject !== 'all') {
      filtered = filtered.filter(d => d.projectId === parseInt(selectedProject));
    }
    if (searchTerm) {
      filtered = filtered.filter(d => 
        d.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.reference?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  };

  const filteredDonations = getFilteredDonations();
  const donationCounts = filters.reduce((acc, f) => ({
    ...acc,
    [f.key]: f.key === 'all' ? donations.length : donations.filter(d => d.status === f.key).length
  }), {});

  const pendingCount = donations.filter(d => d.status === 'pending').length;
  const currentMonthTotal = donations
    .filter(d => {
      const date = new Date(d.date);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear() && d.status === 'verified';
    })
    .reduce((sum, d) => sum + d.amount, 0);

  const handleVerify = (donationId) => {
    verifyDonation(donationId);
    setVerificationModal(null);
  };

  const handleReject = (donationId, reason) => {
    rejectDonation(donationId, reason);
    setVerificationModal(null);
  };

  const isRTL = language === 'ar';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
        <p className="text-gray-600 mt-1">{t.totalThisMonth}: <span className="font-semibold text-primary-600">{formatCurrency(currentMonthTotal)}</span></p>
      </div>

      {/* Urgent Alert */}
      {pendingCount > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0" />
            <p className="text-orange-800 font-medium">
              ⚠️ {pendingCount} {t.urgent}
            </p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
          <div className="flex flex-wrap gap-2">
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
                {f.label} ({donationCounts[f.key]})
              </button>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="input-field w-full sm:w-48"
            >
              <option value="all">{t.allProjects}</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
            <div className="relative w-full sm:w-64">
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
      </div>

      {/* Mobile Cards */}
      <div className="block lg:hidden space-y-4">
        {filteredDonations.map((donation) => (
          <div key={donation.id} className={`bg-white rounded-xl shadow-sm p-4 ${donation.status === 'pending' ? 'border-r-4 border-orange-400' : ''}`}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-medium text-gray-900">{donation.donorName}</p>
                {donation.isAnonymous && <span className="text-xs text-gray-500">{t.anonymous}</span>}
              </div>
              <span className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${getStatusColor(donation.status)}`}>
                {donation.status === 'verified' && <CheckCircle className={`w-3 h-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />}
                {donation.status === 'pending' && <Clock className={`w-3 h-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />}
                {donation.status === 'failed' && <XCircle className={`w-3 h-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />}
                {getStatusLabel(donation.status)}
              </span>
            </div>
            
            <div className="space-y-2 mb-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{t.project}:</span>
                <span className="text-gray-700 max-w-[150px] truncate">{donation.projectName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{t.amount}:</span>
                <span className="font-semibold text-gray-900">{formatCurrency(donation.amount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{t.method}:</span>
                <span className="text-gray-700 capitalize">{donation.method === 'card' ? t.card : t.transfer}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{t.date}:</span>
                <span className="text-gray-600">{formatDate(donation.date)}</span>
              </div>
            </div>

            {donation.status === 'pending' && (
              <button
                onClick={() => setVerificationModal(donation)}
                className="w-full py-2 text-primary-600 font-medium bg-primary-50 rounded-lg hover:bg-primary-100"
              >
                {t.verify}
              </button>
            )}
          </div>
        ))}
        {filteredDonations.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-gray-500">{t.noDonations}</p>
          </div>
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase ${isRTL ? 'text-right' : 'text-left'}`}>{t.donor}</th>
                <th className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase ${isRTL ? 'text-right' : 'text-left'}`}>{t.project}</th>
                <th className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase ${isRTL ? 'text-right' : 'text-left'}`}>{t.amount}</th>
                <th className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase ${isRTL ? 'text-right' : 'text-left'}`}>{t.method}</th>
                <th className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase ${isRTL ? 'text-right' : 'text-left'}`}>{t.reference}</th>
                <th className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase ${isRTL ? 'text-right' : 'text-left'}`}>{t.status}</th>
                <th className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase ${isRTL ? 'text-right' : 'text-left'}`}>{t.date}</th>
                <th className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase ${isRTL ? 'text-right' : 'text-left'}`}>{t.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDonations.map((donation) => (
                <tr key={donation.id} className={donation.status === 'pending' ? 'bg-orange-50' : ''}>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-900">{donation.donorName}</p>
                      {donation.isAnonymous && <span className="text-xs text-gray-500">{t.anonymous}</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{donation.projectName}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{formatCurrency(donation.amount)}</td>
                  <td className="px-4 py-3 text-sm capitalize">{donation.method === 'card' ? t.card : t.transfer}</td>
                  <td className="px-4 py-3 text-sm font-mono text-gray-600">{donation.reference || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${getStatusColor(donation.status)}`}>
                      {donation.status === 'verified' && <CheckCircle className={`w-3 h-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />}
                      {donation.status === 'pending' && <Clock className={`w-3 h-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />}
                      {donation.status === 'failed' && <XCircle className={`w-3 h-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />}
                      {getStatusLabel(donation.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{formatDate(donation.date)}</td>
                  <td className="px-4 py-3">
                    {donation.status === 'pending' ? (
                      <button
                        onClick={() => setVerificationModal(donation)}
                        className="text-primary-600 font-medium hover:underline"
                      >
                        {t.verify}
                      </button>
                    ) : (
                      <button className="text-gray-400 hover:text-gray-600">
                        <Eye className="w-5 h-5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredDonations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">{t.noDonations}</p>
          </div>
        )}
      </div>

      {/* Verification Modal */}
      {verificationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{t.verificationTitle}</h3>
              <p className="text-sm text-gray-500">{t.reference}: {verificationModal.reference}</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Donation Info */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">{t.donationInfo}</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-500">{t.donor}:</span>
                      <p className="font-medium">{verificationModal.donorName}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">{t.whatsapp}:</span>
                      <p className="font-medium">{verificationModal.donorPhone}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">{t.project}:</span>
                      <p className="font-medium">{verificationModal.projectName}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">{t.declaredAmount}:</span>
                      <p className="font-medium text-lg">{formatCurrency(verificationModal.amount)}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">{t.submissionDate}:</span>
                      <p className="font-medium">{formatDate(verificationModal.date)}</p>
                    </div>
                  </div>
                </div>

                {/* Receipt */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">{t.receipt}</h4>
                  {verificationModal.receiptUrl ? (
                    <img 
                      src={verificationModal.receiptUrl} 
                      alt="Receipt" 
                      className="w-full rounded-lg border border-gray-200"
                    />
                  ) : (
                    <div className="bg-gray-100 rounded-lg p-8 text-center">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">{t.noReceipt}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Checklist */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">{t.checklist}</h4>
                <div className="space-y-2 text-sm">
                  <label className={`flex items-center gap-2 cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <input type="checkbox" className="rounded" />
                    <span>{t.amountMatch} ({formatCurrency(verificationModal.amount)})</span>
                  </label>
                  <label className={`flex items-center gap-2 cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <input type="checkbox" className="rounded" />
                    <span>{t.referenceVisible} ({verificationModal.reference})</span>
                  </label>
                  <label className={`flex items-center gap-2 cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <input type="checkbox" className="rounded" />
                    <span>{t.dateRecent}</span>
                  </label>
                  <label className={`flex items-center gap-2 cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <input type="checkbox" className="rounded" />
                    <span>{t.accountCorrect}</span>
                  </label>
                </div>
              </div>
            </div>
            <div className={`p-6 border-t border-gray-200 flex justify-end gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button
                onClick={() => setVerificationModal(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                {t.cancel}
              </button>
              <button
                onClick={() => handleReject(verificationModal.id, 'Montant incorrect')}
                className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
              >
                {t.reject}
              </button>
              <button
                onClick={() => handleVerify(verificationModal.id)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                ✓ {t.approve}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDonations;
