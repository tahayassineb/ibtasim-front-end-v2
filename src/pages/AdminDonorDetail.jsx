import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Heart, User, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';

const AdminDonorDetail = () => {
  const { id } = useParams();
  const { getDonorById, getDonationsByDonor, formatCurrency, formatDate, getStatusLabel, getStatusColor, language } = useApp();
  const [notes, setNotes] = useState('');

  const t = {
    ar: {
      notFound: 'المتبرع غير موجود',
      backToDonors: 'العودة للمتبرعين',
      contactWhatsApp: 'تواصل عبر واتساب',
      donorSince: 'متبرع منذ',
      whatsapp: 'واتساب',
      email: 'البريد الإلكتروني',
      totalDonated: 'إجمالي التبرعات',
      donationsMade: 'عدد التبرعات',
      internalNotes: 'ملاحظات داخلية',
      addNote: '+ إضافة ملاحظة',
      donationHistory: 'سجل التبرعات',
      noDonations: 'لا توجد تبرعات',
      notePlaceholder: 'أضف ملاحظة عن هذا المتبرع...',
    },
    fr: {
      notFound: 'Donateur non trouvé',
      backToDonors: 'Retour aux donateurs',
      contactWhatsApp: 'Contacter sur WhatsApp',
      donorSince: 'Donateur depuis',
      whatsapp: 'WhatsApp',
      email: 'Email',
      totalDonated: 'Total donné',
      donationsMade: 'Dons effectués',
      internalNotes: 'Notes internes',
      addNote: '+ Ajouter une note',
      donationHistory: 'Historique des dons',
      noDonations: 'Aucun don trouvé',
      notePlaceholder: 'Ajouter une note sur ce donateur...',
    },
    en: {
      notFound: 'Donor not found',
      backToDonors: 'Back to Donors',
      contactWhatsApp: 'Contact on WhatsApp',
      donorSince: 'Donor since',
      whatsapp: 'WhatsApp',
      email: 'Email',
      totalDonated: 'Total Donated',
      donationsMade: 'Donations Made',
      internalNotes: 'Internal Notes',
      addNote: '+ Add Note',
      donationHistory: 'Donation History',
      noDonations: 'No donations found',
      notePlaceholder: 'Add a note about this donor...',
    },
  }[language] || {};

  const donor = getDonorById(id);
  const donations = getDonationsByDonor(id);
  const isRTL = language === 'ar';

  if (!donor) {
    return (
      <div className="text-center py-12" dir={isRTL ? 'rtl' : 'ltr'}>
        <p className="text-gray-500">{t.notFound}</p>
        <Link to="/admin/donateurs" className="btn-primary mt-4 inline-block">
          {t.backToDonors}
        </Link>
      </div>
    );
  }

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
        <Link to="/admin/donateurs" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className={`w-5 h-5 text-gray-600 ${isRTL ? 'rotate-180' : ''}`} />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{donor.name}</h1>
        </div>
        <a
          href={`https://wa.me/${donor.phone.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 w-full sm:w-auto"
        >
          <MessageCircle className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t.contactWhatsApp}
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Info Card */}
        <div>
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <div className={`flex items-center gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 text-primary-600" />
              </div>
              <div className={isRTL ? 'text-right' : ''}>
                <h2 className="text-xl font-semibold">{donor.name}</h2>
                <p className="text-gray-500">{t.donorSince} {formatDate(donor.memberSince)}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className={isRTL ? 'text-right' : ''}>
                <p className="text-sm text-gray-500">{t.whatsapp}</p>
                <a 
                  href={`https://wa.me/${donor.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline"
                >
                  {donor.phone}
                </a>
              </div>
              <div className={isRTL ? 'text-right' : ''}>
                <p className="text-sm text-gray-500">{t.email}</p>
                <a href={`mailto:${donor.email}`} className="text-primary-600 hover:underline break-all">
                  {donor.email}
                </a>
              </div>
              <hr />
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-xl sm:text-2xl font-bold text-primary-600">{formatCurrency(donor.totalDonated)}</p>
                  <p className="text-sm text-gray-600">{t.totalDonated}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-xl sm:text-2xl font-bold text-primary-600">{donor.donationCount}</p>
                  <p className="text-sm text-gray-600">{t.donationsMade}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mt-6">
            <h3 className="font-semibold text-gray-900 mb-4">{t.internalNotes}</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.notePlaceholder}
              rows={4}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm resize-none focus:ring-2 focus:ring-primary-300 outline-none"
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            <button className="mt-3 text-sm text-primary-600 hover:underline">
              {t.addNote}
            </button>
          </div>
        </div>

        {/* Donations History */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h3 className="font-semibold text-gray-900 mb-4">{t.donationHistory}</h3>
            <div className="space-y-3">
              {donations.map((donation) => (
                <div key={donation.id} className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg gap-3 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Heart className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className={isRTL ? 'text-right' : ''}>
                      <p className="font-medium text-gray-900">{donation.projectName}</p>
                      <p className="text-sm text-gray-500">{formatDate(donation.date)}</p>
                    </div>
                  </div>
                  <div className={`text-left sm:text-right ${isRTL ? 'text-right sm:text-left' : ''}`}>
                    <p className="font-bold text-primary-600">{formatCurrency(donation.amount)}</p>
                    <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${getStatusColor(donation.status)}`}>
                      {getStatusLabel(donation.status)}
                    </span>
                  </div>
                </div>
              ))}
              {donations.length === 0 && (
                <p className="text-gray-500 text-center py-8">{t.noDonations}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDonorDetail;
