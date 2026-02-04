import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MessageCircle, Download, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';

const AdminDonors = () => {
  const { donors, formatCurrency, formatDate, language } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const t = {
    ar: {
      title: 'المتبرعون',
      total: 'المجموع',
      donors: 'متبرع',
      exportCSV: 'تصدير CSV',
      search: 'البحث بالاسم، البريد أو الهاتف...',
      name: 'الاسم',
      whatsapp: 'واتساب',
      email: 'البريد الإلكتروني',
      totalDonated: 'إجمالي التبرعات',
      donationCount: 'عدد التبرعات',
      lastDonation: 'آخر تبرع',
      actions: 'إجراءات',
      view: 'عرض',
      contact: 'تواصل عبر واتساب',
      noDonors: 'لا يوجد متبرعون',
    },
    fr: {
      title: 'Donateurs',
      total: 'Total',
      donors: 'donateurs',
      exportCSV: 'Exporter CSV',
      search: 'Rechercher par nom, email ou téléphone...',
      name: 'Nom',
      whatsapp: 'WhatsApp',
      email: 'Email',
      totalDonated: 'Total donné',
      donationCount: 'Nb dons',
      lastDonation: 'Dernier don',
      actions: 'Actions',
      view: 'Voir',
      contact: 'Contacter sur WhatsApp',
      noDonors: 'Aucun donateur trouvé',
    },
    en: {
      title: 'Donors',
      total: 'Total',
      donors: 'donors',
      exportCSV: 'Export CSV',
      search: 'Search by name, email or phone...',
      name: 'Name',
      whatsapp: 'WhatsApp',
      email: 'Email',
      totalDonated: 'Total Donated',
      donationCount: 'Donations',
      lastDonation: 'Last Donation',
      actions: 'Actions',
      view: 'View',
      contact: 'Contact on WhatsApp',
      noDonors: 'No donors found',
    },
  }[language] || {};

  const getFilteredDonors = () => {
    if (!searchTerm) return donors;
    return donors.filter(d => 
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.phone.includes(searchTerm)
    );
  };

  const filteredDonors = getFilteredDonors();

  const handleExport = () => {
    alert(language === 'ar' ? 'جاري تصدير CSV...' : language === 'fr' ? 'Export CSV en cours...' : 'Exporting CSV...');
  };

  const isRTL = language === 'ar';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
          <p className="text-gray-600 mt-1">{t.total}: <span className="font-semibold">{donors.length}</span> {t.donors}</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 w-full sm:w-auto"
        >
          <Download className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t.exportCSV}
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="relative max-w-md">
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

      {/* Mobile Cards */}
      <div className="block lg:hidden space-y-4">
        {filteredDonors.map((donor) => (
          <div key={donor.id} className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary-600 font-medium text-lg">{donor.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{donor.name}</p>
                <p className="text-sm text-gray-500">{donor.phone}</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{t.email}:</span>
                <span className="text-gray-700 truncate max-w-[150px]">{donor.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{t.totalDonated}:</span>
                <span className="font-semibold text-gray-900">{formatCurrency(donor.totalDonated)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{t.donationCount}:</span>
                <span className="text-gray-700">{donor.donationCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{t.lastDonation}:</span>
                <span className="text-gray-600">{formatDate(donor.lastDonation)}</span>
              </div>
            </div>

            <div className={`flex gap-2 pt-3 border-t border-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Link 
                to={`/admin/donateurs/${donor.id}`}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100"
              >
                <Eye className="w-4 h-4" /> {t.view}
              </Link>
              <a
                href={`https://wa.me/${donor.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-green-600 bg-green-50 rounded-lg hover:bg-green-100"
              >
                <MessageCircle className="w-4 h-4" /> {t.whatsapp}
              </a>
            </div>
          </div>
        ))}
        {filteredDonors.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-gray-500">{t.noDonors}</p>
          </div>
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase ${isRTL ? 'text-right' : 'text-left'}`}>{t.name}</th>
                <th className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase ${isRTL ? 'text-right' : 'text-left'}`}>{t.whatsapp}</th>
                <th className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase ${isRTL ? 'text-right' : 'text-left'}`}>{t.email}</th>
                <th className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase ${isRTL ? 'text-right' : 'text-left'}`}>{t.totalDonated}</th>
                <th className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase ${isRTL ? 'text-right' : 'text-left'}`}>{t.donationCount}</th>
                <th className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase ${isRTL ? 'text-right' : 'text-left'}`}>{t.lastDonation}</th>
                <th className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase ${isRTL ? 'text-right' : 'text-left'}`}>{t.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDonors.map((donor) => (
                <tr key={donor.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-primary-600 font-medium">{donor.name.charAt(0)}</span>
                      </div>
                      <span className="font-medium text-gray-900">{donor.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{donor.phone}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{donor.email}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{formatCurrency(donor.totalDonated)}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{donor.donationCount}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{formatDate(donor.lastDonation)}</td>
                  <td className="px-4 py-3">
                    <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Link 
                        to={`/admin/donateurs/${donor.id}`}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                        title={t.view}
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <a
                        href={`https://wa.me/${donor.phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-green-100 rounded-lg text-green-600"
                        title={t.contact}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredDonors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">{t.noDonors}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDonors;
