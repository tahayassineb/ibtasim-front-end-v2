import React, { useState } from 'react';
import { Upload, Bell, Users, CreditCard, Save, Copy, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

const AdminSettings = () => {
  const { associationInfo, language } = useApp();
  const [copied, setCopied] = useState(null);
  const [settings, setSettings] = useState({
    name: associationInfo.name,
    arabicName: associationInfo.arabicName,
    description: associationInfo.description,
    email: associationInfo.email,
    phone: associationInfo.phone,
    whatsapp: associationInfo.whatsapp,
    address: associationInfo.address,
    bankName: associationInfo.bankName,
    accountHolder: associationInfo.accountHolder,
    rib: associationInfo.rib,
    notifications: {
      newDonation: true,
      pendingVerification: true,
      projectFunded: true,
      newDonor: true,
    },
  });

  const t = {
    ar: {
      title: 'الإعدادات',
      association: 'الجمعية',
      associationName: 'اسم الجمعية',
      arabicName: 'الاسم بالعربية',
      description: 'الوصف',
      contactEmail: 'البريد الإلكتروني للتواصل',
      phone: 'الهاتف',
      address: 'العنوان',
      bankInfo: 'المعلومات البنكية',
      bankInfoDesc: 'ستظهر هذه المعلومات للمتبرعين للتحويلات البنكية',
      bank: 'البنك',
      accountHolder: 'صاحب الحساب',
      rib: 'RIB',
      whatsappNotifications: 'إشعارات واتساب',
      teamNumber: 'رقم واتساب الفريق',
      notificationsToReceive: 'الإشعارات المراد استلامها',
      newDonation: 'تبرع جديد مستلم',
      pendingVerification: 'تبرع بانتظار التحقق',
      projectFunded: 'مشروع ممول 100%',
      newDonor: 'متبرع جديد مسجل',
      team: 'الفريق',
      mainAdmin: 'المشرف الرئيسي',
      active: 'نشط',
      inviteAdmin: '+ دعوة مشرف جديد',
      saveChanges: 'حفظ التغييرات',
      saved: 'تم الحفظ!',
    },
    fr: {
      title: 'Paramètres',
      association: 'Association',
      associationName: "Nom de l'association",
      arabicName: 'Nom en arabe',
      description: 'Description',
      contactEmail: 'Email de contact',
      phone: 'Téléphone',
      address: 'Adresse',
      bankInfo: 'Informations bancaires',
      bankInfoDesc: 'Ces informations seront affichées aux donateurs pour les virements',
      bank: 'Banque',
      accountHolder: 'Titulaire du compte',
      rib: 'RIB',
      whatsappNotifications: 'Notifications WhatsApp',
      teamNumber: 'Numéro WhatsApp de\'équipe',
      notificationsToReceive: 'Notifications à recevoir',
      newDonation: 'Nouveau don reçu',
      pendingVerification: 'Don en attente de vérification',
      projectFunded: 'Projet financé à 100%',
      newDonor: 'Nouveau donateur inscrit',
      team: 'Équipe',
      mainAdmin: 'Admin principal',
      active: 'Actif',
      inviteAdmin: '+ Inviter un nouvel admin',
      saveChanges: 'Enregistrer les modifications',
      saved: 'Enregistré!',
    },
    en: {
      title: 'Settings',
      association: 'Association',
      associationName: 'Association Name',
      arabicName: 'Arabic Name',
      description: 'Description',
      contactEmail: 'Contact Email',
      phone: 'Phone',
      address: 'Address',
      bankInfo: 'Bank Information',
      bankInfoDesc: 'This information will be displayed to donors for bank transfers',
      bank: 'Bank',
      accountHolder: 'Account Holder',
      rib: 'RIB',
      whatsappNotifications: 'WhatsApp Notifications',
      teamNumber: 'Team WhatsApp Number',
      notificationsToReceive: 'Notifications to receive',
      newDonation: 'New donation received',
      pendingVerification: 'Donation pending verification',
      projectFunded: 'Project 100% funded',
      newDonor: 'New donor registered',
      team: 'Team',
      mainAdmin: 'Main Admin',
      active: 'Active',
      inviteAdmin: '+ Invite new admin',
      saveChanges: 'Save Changes',
      saved: 'Saved!',
    },
  }[language] || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSave = () => {
    alert(t.saved);
  };

  const isRTL = language === 'ar';

  const notificationItems = [
    { key: 'newDonation', label: t.newDonation },
    { key: 'pendingVerification', label: t.pendingVerification },
    { key: 'projectFunded', label: t.projectFunded },
    { key: 'newDonor', label: t.newDonor },
  ];

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{t.title}</h1>

      <div className="space-y-6">
        {/* Association Info */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-2">
              <span className="text-primary-600 text-sm">A</span>
            </span>
            {t.association}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.associationName}</label>
              <input
                type="text"
                name="name"
                value={settings.name}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.arabicName}</label>
              <input
                type="text"
                name="arabicName"
                value={settings.arabicName}
                onChange={handleChange}
                className="input-field text-right"
                dir="rtl"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.description}</label>
              <textarea
                name="description"
                value={settings.description}
                onChange={handleChange}
                rows={3}
                className="input-field resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.contactEmail}</label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.phone}</label>
              <input
                type="tel"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.address}</label>
              <input
                type="text"
                name="address"
                value={settings.address}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Bank Info */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CreditCard className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t.bankInfo}
          </h2>
          <p className="text-sm text-gray-500 mb-4">{t.bankInfoDesc}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.bank}</label>
              <input
                type="text"
                name="bankName"
                value={settings.bankName}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.accountHolder}</label>
              <input
                type="text"
                name="accountHolder"
                value={settings.accountHolder}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.rib}</label>
              <div className="relative">
                <input
                  type="text"
                  name="rib"
                  value={settings.rib}
                  onChange={handleChange}
                  className={`input-field font-mono ${isRTL ? 'pl-12' : 'pr-12'}`}
                />
                <button
                  onClick={() => handleCopy(settings.rib, 'rib')}
                  className={`absolute top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded ${isRTL ? 'left-3' : 'right-3'}`}
                >
                  {copied === 'rib' ? <CheckCircle className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-gray-400" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Notifications */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Bell className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t.whatsappNotifications}
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.teamNumber}</label>
            <input
              type="tel"
              name="whatsapp"
              value={settings.whatsapp}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <p className="text-sm font-medium text-gray-700 mb-3">{t.notificationsToReceive}:</p>
          <div className="space-y-3">
            {notificationItems.map((item) => (
              <label key={item.key} className={`flex items-center gap-3 cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
                <input
                  type="checkbox"
                  checked={settings.notifications[item.key]}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    notifications: { ...prev.notifications, [item.key]: e.target.checked }
                  }))}
                  className="w-5 h-5 text-primary-600 rounded"
                />
                <span className="text-gray-700">{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Users className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t.team}
          </h2>
          <div className={`flex items-center justify-between p-4 bg-gray-50 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-medium">A</span>
              </div>
              <div className={isRTL ? 'text-right' : ''}>
                <p className="font-medium">{associationInfo.name}</p>
                <p className="text-sm text-gray-500">{t.mainAdmin}</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">{t.active}</span>
          </div>
          <button className="mt-4 text-primary-600 text-sm hover:underline">
            {t.inviteAdmin}
          </button>
        </div>

        {/* Save Button */}
        <div className={`flex justify-end ${isRTL ? 'flex-row-reverse' : ''}`}>
          <button onClick={handleSave} className="btn-primary flex items-center">
            <Save className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t.saveChanges}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
