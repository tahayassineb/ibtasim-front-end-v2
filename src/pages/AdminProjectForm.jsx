import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Card from '../components/Card';
import Button from '../components/Button';

// ============================================
// ADMIN PROJECT FORM PAGE - Create/Edit Projects
// ============================================

const AdminProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentLanguage } = useApp();
  const isEditMode = Boolean(id);
  const [activeTab, setActiveTab] = useState('en');
  const [progress, setProgress] = useState(65);

  // Translations
  const translations = {
    ar: {
      createTitle: 'إنشاء مشروع جديد',
      editTitle: 'تعديل المشروع',
      basicInfo: 'المعلومات الأساسية',
      financialSettings: 'الإعدادات المالية',
      mediaGallery: 'معرض الوسائط',
      location: 'الموقع',
      projectTitle: 'عنوان المشروع',
      shortDescription: 'وصف قصير',
      goalAmount: 'المبلغ المستهدف',
      currency: 'العملة',
      visibility: 'الرؤية',
      public: 'عام',
      private: 'خاص',
      saveDraft: 'حفظ كمسودة',
      publish: 'نشر المشروع',
      preview: 'معاينة',
      help: 'مساعدة',
      completionProgress: 'تقدم الإكمال',
      maxFiles: 'الحد الأقصى 10 ملفات. الصيغ المدعومة: JPG, PNG, MP4. يوصى بصور عالية الدقة.',
      add: 'إضافة',
      editMap: 'تحرير الخريطة',
    },
    fr: {
      createTitle: 'Créer un Nouveau Projet',
      editTitle: 'Modifier le Projet',
      basicInfo: 'Informations de Base',
      financialSettings: 'Paramètres Financiers',
      mediaGallery: 'Galerie Média',
      location: 'Localisation',
      projectTitle: 'Titre du Projet',
      shortDescription: 'Description Courte',
      goalAmount: 'Montant Objectif',
      currency: 'Devise',
      visibility: 'Visibilité',
      public: 'Public',
      private: 'Privé',
      saveDraft: 'Enregistrer Brouillon',
      publish: 'Publier le Projet',
      preview: 'Aperçu',
      help: 'Aide',
      completionProgress: 'Progression',
      maxFiles: 'Maximum 10 fichiers. Formats supportés: JPG, PNG, MP4. Images haute résolution recommandées.',
      add: 'Ajouter',
      editMap: 'Modifier la Carte',
    },
    en: {
      createTitle: 'Create New Project',
      editTitle: 'Edit Project',
      basicInfo: 'Basic Information',
      financialSettings: 'Financial Settings',
      mediaGallery: 'Media Gallery',
      location: 'Location',
      projectTitle: 'Project Title',
      shortDescription: 'Short Description',
      goalAmount: 'Goal Amount',
      currency: 'Currency',
      visibility: 'Visibility',
      public: 'Public',
      private: 'Private',
      saveDraft: 'Save Draft',
      publish: 'Publish Project',
      preview: 'Preview',
      help: 'Help',
      completionProgress: 'Completion Progress',
      maxFiles: 'Maximum 10 files. Supported formats: JPG, PNG, MP4. High resolution images recommended.',
      add: 'Add',
      editMap: 'Edit Map',
    },
  };

  const t = translations[currentLanguage.code] || translations.en;

  // Form state
  const [formData, setFormData] = useState({
    title: {
      en: 'Community Water Access Initiative',
      fr: 'Initiative d\'Accès à l\'Eau Communautaire',
      ar: 'مبادرة الوصول إلى المياه المجتمعية',
    },
    description: {
      en: 'Providing sustainable clean water solutions for rural communities in the Atlas Mountains region.',
      fr: 'Fournir des solutions d\'eau potable durables pour les communautés rurales de la région de l\'Atlas.',
      ar: 'توفير حلول مياه نظيفة مستدامة للمجتمعات الريفية في منطقة جبال الأطلس.',
    },
    goal: 25000,
    currency: 'USD',
    visibility: 'public',
    mainImage: 'https://images.unsplash.com/photo-1538300342682-cf57afb97285?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1541544537156-21c5299228d8?w=400',
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400',
    ],
    location: 'Atlas Mountains Region, Province d\'Al Haouz, Morocco',
  });

  const handleInputChange = (field, value, lang = null) => {
    if (lang) {
      setFormData(prev => ({
        ...prev,
        [field]: { ...prev[field], [lang]: value },
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save logic here
    navigate('/admin/projects');
  };

  return (
    <div className="max-w-4xl mx-auto pb-24">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 dark:bg-bg-dark-card/80 backdrop-blur-md border-b border-border-light dark:border-white/10 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin/projects')}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h2 className="text-lg font-bold leading-tight tracking-tight text-text-primary dark:text-white">
              {isEditMode ? t.editTitle : t.createTitle}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-primary text-sm font-bold cursor-pointer hover:opacity-80">
              {t.preview}
            </button>
            <button className="text-primary text-sm font-bold cursor-pointer hover:opacity-80">
              {t.help}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.05em]">{t.completionProgress}</span>
            <span className="text-xs font-bold text-primary">{progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card padding="lg">
          <div className="flex items-center gap-2 mb-5">
            <span className="material-symbols-outlined text-primary text-xl">info</span>
            <h3 className="font-bold text-base tracking-tight text-text-primary dark:text-white">{t.basicInfo}</h3>
          </div>

          <div className="space-y-5">
            {/* Main Image */}
            <div className="relative group">
              <div
                className="aspect-video w-full rounded-xl bg-cover bg-center border border-border-light dark:border-white/10 overflow-hidden"
                style={{ backgroundImage: `url('${formData.mainImage}')` }}
              >
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-white text-3xl">add_a_photo</span>
                </div>
              </div>
            </div>

            {/* Title with Language Tabs */}
            <div>
              <label className="block text-xs font-bold mb-2 text-slate-500 uppercase tracking-wider">{t.projectTitle}</label>
              <div className="flex gap-1 p-1 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg mb-3">
                {['en', 'fr', 'ar'].map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setActiveTab(lang)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                      activeTab === lang
                        ? 'bg-white text-primary shadow-sm border border-slate-100 dark:bg-slate-700 dark:border-slate-600'
                        : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={formData.title[activeTab]}
                onChange={(e) => handleInputChange('title', e.target.value, activeTab)}
                className="w-full bg-slate-50 dark:bg-slate-800 rounded-lg text-sm py-3 px-4 border border-slate-200 dark:border-slate-700 text-text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold mb-2 text-slate-500 uppercase tracking-wider">{t.shortDescription}</label>
              <textarea
                value={formData.description[activeTab]}
                onChange={(e) => handleInputChange('description', e.target.value, activeTab)}
                rows={3}
                className="w-full bg-slate-50 dark:bg-slate-800 rounded-lg text-sm py-3 px-4 border border-slate-200 dark:border-slate-700 text-text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>
          </div>
        </Card>

        {/* Financial Settings */}
        <Card padding="lg">
          <div className="flex items-center gap-2 mb-5">
            <span className="material-symbols-outlined text-primary text-xl">payments</span>
            <h3 className="font-bold text-base tracking-tight text-text-primary dark:text-white">{t.financialSettings}</h3>
          </div>

          <div className="space-y-5">
            {/* Goal Amount */}
            <div>
              <label className="block text-xs font-bold mb-2 text-slate-500 uppercase tracking-wider">{t.goalAmount}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-slate-400 text-sm">$</span>
                </div>
                <input
                  type="number"
                  value={formData.goal}
                  onChange={(e) => handleInputChange('goal', parseInt(e.target.value))}
                  className="w-full pl-8 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm py-3 px-4 border border-slate-200 dark:border-slate-700 text-text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Currency */}
              <div>
                <label className="block text-xs font-bold mb-2 text-slate-500 uppercase tracking-wider">{t.currency}</label>
                <select
                  value={formData.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 rounded-lg text-sm py-3 px-4 border border-slate-200 dark:border-slate-700 text-text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="USD">USD - Dollars</option>
                  <option value="MAD">MAD - Dirhams</option>
                  <option value="EUR">EUR - Euros</option>
                </select>
              </div>

              {/* Visibility */}
              <div>
                <label className="block text-xs font-bold mb-2 text-slate-500 uppercase tracking-wider">{t.visibility}</label>
                <div className="flex items-center h-[46px] px-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{formData.visibility === 'public' ? t.public : t.private}</span>
                  <button
                    type="button"
                    onClick={() => handleInputChange('visibility', formData.visibility === 'public' ? 'private' : 'public')}
                    className={`ml-auto w-9 h-5 rounded-full relative cursor-pointer transition-colors ${
                      formData.visibility === 'public' ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${
                      formData.visibility === 'public' ? 'right-0.5' : 'left-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Media Gallery */}
        <Card padding="lg">
          <div className="flex items-center gap-2 mb-5">
            <span className="material-symbols-outlined text-primary text-xl">perm_media</span>
            <h3 className="font-bold text-base tracking-tight text-text-primary dark:text-white">{t.mediaGallery}</h3>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* Add Button */}
            <div className="aspect-square rounded-lg bg-slate-50 dark:bg-slate-800 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-400 hover:border-primary/50 hover:text-primary transition-all cursor-pointer">
              <span className="material-symbols-outlined mb-1">add_a_photo</span>
              <span className="text-[10px] font-bold uppercase">{t.add}</span>
            </div>
            {/* Gallery Images */}
            {formData.gallery.map((image, index) => (
              <div
                key={index}
                className="aspect-square rounded-lg bg-cover bg-center border border-border-light dark:border-white/10"
                style={{ backgroundImage: `url('${image}')` }}
              />
            ))}
          </div>
          <p className="mt-4 text-[11px] text-slate-500 leading-relaxed">{t.maxFiles}</p>
        </Card>

        {/* Location */}
        <Card padding="lg">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">location_on</span>
              <h3 className="font-bold text-base tracking-tight text-text-primary dark:text-white">{t.location}</h3>
            </div>
            <button type="button" className="text-[11px] font-bold text-primary uppercase tracking-wider">
              {t.editMap}
            </button>
          </div>

          <div className="h-36 rounded-xl overflow-hidden relative border border-border-light dark:border-white/10">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600"
              alt="Map"
              className="w-full h-full object-cover saturate-50 opacity-80"
            />
            <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="material-symbols-outlined text-primary text-3xl filled-icon drop-shadow-md" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />
          </div>
          <div className="mt-4 flex items-start gap-2">
            <span className="material-symbols-outlined text-slate-400 text-sm mt-0.5">place</span>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{formData.location}</p>
          </div>
        </Card>
      </form>

      {/* Footer Actions */}
      <footer className="fixed bottom-0 left-0 right-0 lg:left-64 p-4 pb-8 bg-white/95 dark:bg-bg-dark-card/95 backdrop-blur-lg border-t border-border-light dark:border-white/10 flex gap-4 z-30">
        <button
          type="button"
          onClick={() => navigate('/admin/projects')}
          className="flex-1 py-3.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold text-sm text-slate-600 dark:text-slate-300 active:scale-95 transition-transform"
        >
          {t.saveDraft}
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="flex-[1.5] py-3.5 px-4 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 active:scale-95 transition-transform"
        >
          {t.publish}
        </button>
      </footer>
    </div>
  );
};

export default AdminProjectForm;
