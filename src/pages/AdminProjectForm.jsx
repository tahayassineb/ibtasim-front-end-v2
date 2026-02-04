import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Eye, Upload, Bold, Italic, List, Image as ImageIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';

const AdminProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProjectById, addProject, updateProject, language } = useApp();
  const isEdit = Boolean(id);
  const existingProject = isEdit ? getProjectById(id) : null;

  const t = {
    ar: {
      editTitle: 'تعديل المشروع',
      newTitle: 'مشروع جديد',
      back: 'رجوع',
      preview: 'معاينة',
      edit: 'تعديل',
      save: 'حفظ',
      publish: 'نشر',
      notFound: 'المشروع غير موجود',
      backToProjects: 'العودة للمشاريع',
      mainInfo: 'المعلومات الرئيسية',
      projectTitle: 'عنوان المشروع',
      required: 'مطلوب',
      category: 'التصنيف',
      goalAmount: 'هدف التبرعات (درهم)',
      shortDesc: 'وصف مختصر (حد أقصى 150 حرف)',
      charCount: 'حرف',
      dates: 'التواريخ',
      startDate: 'تاريخ البدء',
      endDate: 'تاريخ الانتهاء',
      endDateHelp: 'سيتم تحويل المشروع تلقائياً إلى منتهي الصلاحية بعد هذا التاريخ',
      mainImage: 'الصورة الرئيسية',
      clickOrDrag: 'انقر أو اسحب صورة هنا',
      imageHint: 'JPG, PNG موصى به - 1200x800px',
      imageUrl: 'رابط الصورة',
      fullDescription: 'الوصف الكامل',
      bold: 'عريض',
      italic: 'مائل',
      list: 'قائمة',
      image: 'صورة',
      placeholder: 'صف المشروع بالتفصيل...',
      settings: 'الإعدادات',
      status: 'الحالة',
      active: 'نشط',
      stopped: 'متوقف',
      statusHelp: 'سيتم التحويل تلقائياً إلى ممول عند الوصول للهدف. يمكن تحديد منتهي يدوياً.',
      featured: 'تثبيت في الصفحة الرئيسية',
      cancel: 'إلغاء',
      saveDraft: 'حفظ كمسودة',
      saveChanges: 'حفظ التغييرات',
      publishProject: 'نشر المشروع',
      categories: ['تعليم', 'صحة', 'أيتام', 'مجتمع', 'طوارئ', 'مساعدات غذائية', 'تدريب', 'بنية تحتية', 'أخرى'],
    },
    fr: {
      editTitle: 'Modifier le projet',
      newTitle: 'Nouveau projet',
      back: 'Retour',
      preview: 'Aperçu',
      edit: 'Éditer',
      save: 'Enregistrer',
      publish: 'Publier',
      notFound: 'Projet non trouvé',
      backToProjects: 'Retour aux projets',
      mainInfo: 'Informations principales',
      projectTitle: 'Titre du projet',
      required: 'Requis',
      category: 'Catégorie',
      goalAmount: 'Objectif de collecte (DH)',
      shortDesc: 'Description courte (max 150 caractères)',
      charCount: 'caractères',
      dates: 'Dates',
      startDate: 'Date de début',
      endDate: 'Date de fin',
      endDateHelp: 'Le projet passera automatiquement en \'Expiré\' après cette date',
      mainImage: 'Image principale',
      clickOrDrag: 'Cliquez ou glissez une image ici',
      imageHint: 'JPG, PNG recommandé - 1200x800px',
      imageUrl: 'URL de l\'image',
      fullDescription: 'Description complète',
      bold: 'Gras',
      italic: 'Italique',
      list: 'Liste',
      image: 'Image',
      placeholder: 'Décrivez le projet en détail...',
      settings: 'Paramètres',
      status: 'Statut',
      active: 'Actif',
      stopped: 'Arrêté',
      statusHelp: '\'Financé\' sera automatique quand l\'objectif est atteint. \'Terminé\' est à définir manuellement.',
      featured: 'Mettre en avant sur la page d\'accueil',
      cancel: 'Annuler',
      saveDraft: 'Enregistrer comme brouillon',
      saveChanges: 'Enregistrer les modifications',
      publishProject: 'Publier le projet',
      categories: ['Éducation', 'Santé', 'Orphelins', 'Communauté', 'Urgence', 'Aide alimentaire', 'Formation', 'Infrastructure', 'Autre'],
    },
    en: {
      editTitle: 'Edit Project',
      newTitle: 'New Project',
      back: 'Back',
      preview: 'Preview',
      edit: 'Edit',
      save: 'Save',
      publish: 'Publish',
      notFound: 'Project not found',
      backToProjects: 'Back to Projects',
      mainInfo: 'Main Information',
      projectTitle: 'Project Title',
      required: 'Required',
      category: 'Category',
      goalAmount: 'Goal Amount (DH)',
      shortDesc: 'Short Description (max 150 chars)',
      charCount: 'characters',
      dates: 'Dates',
      startDate: 'Start Date',
      endDate: 'End Date',
      endDateHelp: 'Project will automatically become \'Expired\' after this date',
      mainImage: 'Main Image',
      clickOrDrag: 'Click or drag an image here',
      imageHint: 'JPG, PNG recommended - 1200x800px',
      imageUrl: 'Image URL',
      fullDescription: 'Full Description',
      bold: 'Bold',
      italic: 'Italic',
      list: 'List',
      image: 'Image',
      placeholder: 'Describe the project in detail...',
      settings: 'Settings',
      status: 'Status',
      active: 'Active',
      stopped: 'Stopped',
      statusHelp: '\'Funded\' will be automatic when goal is reached. \'Finished\' is set manually.',
      featured: 'Feature on homepage',
      cancel: 'Cancel',
      saveDraft: 'Save as Draft',
      saveChanges: 'Save Changes',
      publishProject: 'Publish Project',
      categories: ['Education', 'Health', 'Orphans', 'Community', 'Emergency', 'Food Aid', 'Training', 'Infrastructure', 'Other'],
    },
  }[language] || {};

  const [formData, setFormData] = useState({
    title: '',
    category: t.categories?.[0] || 'Éducation',
    shortDescription: '',
    description: '',
    goalAmount: '',
    startDate: '',
    endDate: '',
    status: 'active',
    featured: false,
    mainImage: '',
  });
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    if (existingProject) {
      setFormData({
        title: existingProject.title,
        category: existingProject.category,
        shortDescription: existingProject.shortDescription,
        description: existingProject.description,
        goalAmount: existingProject.goalAmount,
        startDate: existingProject.createdAt || '',
        endDate: existingProject.endDate || '',
        status: existingProject.status,
        featured: existingProject.featured,
        mainImage: existingProject.mainImage,
      });
    }
  }, [existingProject]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectData = {
      ...formData,
      goalAmount: parseInt(formData.goalAmount),
      raisedAmount: existingProject?.raisedAmount || 0,
      donorsCount: existingProject?.donorsCount || 0,
      updates: existingProject?.updates || [],
    };

    if (isEdit) {
      updateProject(parseInt(id), projectData);
      navigate(`/admin/projets/${id}`);
    } else {
      addProject(projectData);
      navigate('/admin/projets');
    }
  };

  const isRTL = language === 'ar';

  if (isEdit && !existingProject) {
    return (
      <div className="text-center py-12" dir={isRTL ? 'rtl' : 'ltr'}>
        <p className="text-gray-500">{t.notFound}</p>
        <Link to="/admin/projets" className="btn-primary mt-4 inline-block">
          {t.backToProjects}
        </Link>
      </div>
    );
  }

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6`}>
        <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Link to="/admin/projets" className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className={`w-5 h-5 text-gray-600 ${isRTL ? 'rotate-180' : ''}`} />
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            {isEdit ? t.editTitle : t.newTitle}
          </h1>
        </div>
        <div className={`flex items-center gap-3 w-full sm:w-auto ${isRTL ? 'flex-row-reverse' : ''}`}>
          <button
            onClick={() => setIsPreview(!isPreview)}
            className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Eye className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {isPreview ? t.edit : t.preview}
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 sm:flex-none btn-primary flex items-center justify-center"
          >
            <Save className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {isEdit ? t.save : t.publish}
          </button>
        </div>
      </div>

      {isPreview ? (
        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-4">{formData.title || t.projectTitle}</h2>
          <p className="text-gray-600 mb-4">{formData.shortDescription || 'Description courte'}</p>
          <div className="prose max-w-none">
            <p className="whitespace-pre-line">{formData.description || t.placeholder}</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Info */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.mainInfo}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.projectTitle} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder={language === 'ar' ? 'مثال: العودة المدرسية لـ 50 يتيماً' : 'Ex: Rentrée scolaire pour 50 orphelins'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.category} <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input-field"
                >
                  {t.categories?.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.goalAmount} <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="goalAmount"
                  value={formData.goalAmount}
                  onChange={handleChange}
                  required
                  min="100"
                  className="input-field"
                  placeholder="25000"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.shortDesc}
                </label>
                <input
                  type="text"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  maxLength={150}
                  className="input-field"
                  placeholder={language === 'ar' ? 'ملخص المشروع للبطاقات...' : 'Résumé du projet pour les cartes...'}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.shortDescription.length}/150 {t.charCount}
                </p>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.dates}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.startDate}</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.endDate}</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="input-field"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {t.endDateHelp}
                </p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.mainImage}</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 sm:p-8 text-center hover:border-primary-500 transition-colors">
              {formData.mainImage ? (
                <div className="relative">
                  <img src={formData.mainImage} alt="" className="max-h-48 mx-auto rounded-lg" />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, mainImage: '' }))}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">{t.clickOrDrag}</p>
                  <p className="text-sm text-gray-500">{t.imageHint}</p>
                  <input
                    type="text"
                    name="mainImage"
                    value={formData.mainImage}
                    onChange={handleChange}
                    placeholder={t.imageUrl}
                    className="mt-4 input-field w-full max-w-md mx-auto"
                  />
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.fullDescription}</h2>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div className={`flex items-center gap-2 p-3 border-b border-gray-300 bg-gray-50 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <button type="button" className="p-2 hover:bg-gray-200 rounded" title={t.bold}><Bold className="w-4 h-4" /></button>
                <button type="button" className="p-2 hover:bg-gray-200 rounded" title={t.italic}><Italic className="w-4 h-4" /></button>
                <div className="w-px h-4 bg-gray-300" />
                <button type="button" className="p-2 hover:bg-gray-200 rounded" title={t.list}><List className="w-4 h-4" /></button>
                <button type="button" className="p-2 hover:bg-gray-200 rounded" title={t.image}><ImageIcon className="w-4 h-4" /></button>
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={8}
                className="w-full p-4 outline-none resize-none"
                placeholder={t.placeholder}
              />
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.settings}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.status}</label>
                <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {['active', 'stopped'].map((status) => (
                    <label key={status} className={`flex items-center gap-2 cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <input
                        type="radio"
                        name="status"
                        value={status}
                        checked={formData.status === status}
                        onChange={handleChange}
                        className="w-4 h-4 text-primary-600"
                      />
                      <span className="capitalize">{status === 'active' ? t.active : t.stopped}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {t.statusHelp}
                </p>
              </div>

              <label className={`flex items-center gap-3 cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-5 h-5 text-primary-600 rounded"
                />
                <span className="text-gray-700">{t.featured}</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <Link to="/admin/projets" className="text-gray-600 hover:text-gray-900 text-center py-2">
              ← {t.cancel}
            </Link>
            <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                {t.saveDraft}
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                {isEdit ? t.saveChanges : t.publishProject}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminProjectForm;
