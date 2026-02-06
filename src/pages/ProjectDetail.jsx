import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Card, Button, ProgressBar } from '../components';

// ============================================
// PROJECT DETAIL PAGE - Glassmorphic Sidebar
// ============================================

const ProjectDetail = () => {
  const { t, language } = useApp();
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock project data - in real app, fetch by id
  const project = {
    id: id,
    title: {
      en: 'Sustainable Atlas Education Hub',
      fr: 'Centre d\'Éducation Durable de l\'Atlas',
      ar: 'مركز التعليم المستدام في الأطلس',
    },
    location: {
      en: 'High Atlas Mountains, Morocco',
      fr: 'Haut Atlas, Maroc',
      ar: 'جبال الأطلس العالي، المغرب',
    },
    description: {
      en: 'In the heart of the High Atlas, children travel hours to reach basic education. Our mission is to build a sustainable, eco-friendly school that serves as a beacon of hope for three surrounding villages.',
      fr: 'Au cœur du Haut Atlas, les enfants parcourent des heures pour accéder à l\'éducation de base. Notre mission est de construire une école durable et écologique qui serve de phare d\'espoir pour trois villages environnants.',
      ar: 'في قلب الأطلس العالي، يسافر الأطفال ساعات للوصول إلى التعليم الأساسي. مهمتنا هي بناء مدرسة مستدامة وصديقة للبيئة تكون منارة أمل لثلاث قرى مجاورة.',
    },
    description2: {
      en: 'The architecture draws inspiration from traditional earth-building techniques, ensuring natural thermal regulation during harsh winters and hot summers, combined with modern solar energy and digital facilities.',
      fr: 'L\'architecture s\'inspire des techniques traditionnelles de construction en terre, assurant une régulation thermique naturelle pendant les hivers rigoureux et les étés chauds, combinée avec l\'énergie solaire moderne et les installations numériques.',
      ar: 'يستلهم العمارة التقنيات التقليدية للبناء بالطين، مما يضمن التنظيم الحراري الطبيعي خلال فصول الشتاء القاسية والصيف الحار، بالإضافة إلى الطاقة الشمسية الحديثة والمرافق الرقمية.',
    },
    raised: 52480,
    goal: 75000,
    progress: 70,
    donors: 124,
    daysLeft: 12,
    category: 'education',
    image: 'https://images.unsplash.com/photo-1564429238984-b3cd3a5ba0b4?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80',
      'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=600&q=80',
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    ],
    updates: [
      {
        id: 1,
        date: 'Oct 24, 2023',
        title: {
          en: 'Foundation Completed',
          fr: 'Fondation Terminée',
          ar: 'اكتمل الأساس',
        },
        description: {
          en: 'The main structure base is now secure and ready for wall assembly.',
          fr: 'La base de la structure principale est maintenant sécurisée et prête pour l\'assemblage des murs.',
          ar: 'قاعدة الهيكل الرئيسي آمنة الآن وجاهزة لتجميع الجدران.',
        },
        icon: 'foundation',
      },
      {
        id: 2,
        date: 'Nov 15, 2023',
        title: {
          en: 'Materials Delivered',
          fr: 'Matériaux Livrés',
          ar: 'تم تسليم المواد',
        },
        description: {
          en: 'All sustainable building materials have arrived at the construction site.',
          fr: 'Tous les matériaux de construction durables sont arrivés sur le chantier.',
          ar: 'وصلت جميع مواد البناء المستدامة إلى موقع البناء.',
        },
        icon: 'local_shipping',
      },
    ],
  };

  const getLocalizedText = (obj) => {
    if (typeof obj === 'string') return obj;
    return obj[language] || obj.en;
  };

  return (
    <div className="bg-bg-light dark:bg-bg-dark min-h-screen">
      {/* Main Content Container */}
      <div className="flex flex-col gap-6 px-4 pb-10 max-w-desktop mx-auto">
        {/* Hero Image */}
        <div className="w-full">
          <div
            className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-xl min-h-[300px] md:min-h-[400px] shadow-sm"
            style={{ backgroundImage: `url("${project.image}")` }}
          />
        </div>

        {/* Headline Text */}
        <div className="flex flex-col">
          <h1 className="text-text-primary dark:text-white tracking-tight text-[28px] md:text-[32px] font-bold leading-tight pt-2">
            {getLocalizedText(project.title)}
          </h1>
          <div className="flex items-center gap-2 mt-2 text-primary font-medium">
            <span className="material-symbols-outlined text-sm">location_on</span>
            <span className="text-sm">{getLocalizedText(project.location)}</span>
          </div>
        </div>

        {/* Sticky Donation Card (Glassmorphic) */}
        <div className="bg-white/70 dark:bg-bg-dark-card/70 backdrop-blur-xl rounded-xl p-6 shadow-xl sticky top-20 z-40 border border-white/20 dark:border-white/10">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-text-secondary dark:text-text-white/60">
                  {language === 'ar'
                    ? 'تم جمعه من أصل $75,000'
                    : language === 'fr'
                    ? 'Collecté sur $75,000'
                    : 'Raised of $75,000'}
                </p>
                <h3 className="text-2xl font-bold text-primary">${project.raised.toLocaleString()}</h3>
              </div>
              <p className="text-sm font-bold text-text-primary dark:text-white">{project.progress}%</p>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-primary/20 rounded-full h-4 overflow-hidden">
              <div
                className="bg-primary h-full rounded-full transition-all duration-500"
                style={{ width: `${project.progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs font-medium text-text-secondary dark:text-text-white/70">
              <span>
                {project.donors} {language === 'ar' ? 'متبرع' : language === 'fr' ? 'Donateurs' : 'Donors'}
              </span>
              <span>
                {project.daysLeft} {language === 'ar' ? 'يوم متبقي' : language === 'fr' ? 'Jours Restants' : 'Days Left'}
              </span>
            </div>
            <Link to={`/donate/${project.id}`}>
              <Button size="lg" fullWidth className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">favorite</span>
                {language === 'ar' ? 'تبرع الآن' : language === 'fr' ? 'Faire un Don' : 'Donate Now'}
              </Button>
            </Link>
          </div>
        </div>

        {/* About Section */}
        <div className="space-y-4">
          <h3 className="text-text-primary dark:text-white text-xl font-bold leading-tight">
            {language === 'ar' ? 'عن هذا المشروع' : language === 'fr' ? 'À propos de ce projet' : 'About this project'}
          </h3>
          <p className="text-text-secondary dark:text-text-white/80 text-base font-normal leading-relaxed">
            {getLocalizedText(project.description)}
          </p>
          <p className="text-text-secondary dark:text-text-white/80 text-base font-normal leading-relaxed">
            {getLocalizedText(project.description2)}
          </p>
        </div>

        {/* Gallery Section */}
        <div className="pt-4">
          <h3 className="text-text-primary dark:text-white text-lg font-bold leading-tight mb-4">
            {language === 'ar' ? 'المجتمع والتقدم' : language === 'fr' ? 'Communauté et Progrès' : 'Community & Progress'}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src={project.gallery[0]}
                alt="Community"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src={project.gallery[1]}
                alt="Construction"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="col-span-2 h-48 rounded-lg overflow-hidden">
              <img
                src={project.gallery[2]}
                alt="Landscape"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        {/* Project Progress Updates */}
        <div className="flex flex-col gap-4 py-6">
          <div className="flex items-center justify-between">
            <h3 className="text-text-primary dark:text-white text-lg font-bold">
              {language === 'ar' ? 'آخر التحديثات' : language === 'fr' ? 'Dernières Mises à Jour' : 'Latest Updates'}
            </h3>
            <span className="text-primary text-sm font-bold cursor-pointer hover:underline">
              {language === 'ar' ? 'عرض الكل' : language === 'fr' ? 'Voir Tout' : 'View All'}
            </span>
          </div>
          {project.updates.map((update) => (
            <div
              key={update.id}
              className="flex gap-4 p-4 rounded-xl bg-white dark:bg-white/5 border border-primary/10"
            >
              <div className="flex-shrink-0 size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">{update.icon}</span>
              </div>
              <div>
                <p className="text-xs text-text-muted dark:text-text-white/50">{update.date}</p>
                <h4 className="font-bold text-text-primary dark:text-white">{getLocalizedText(update.title)}</h4>
                <p className="text-sm text-text-secondary dark:text-text-white/70">
                  {getLocalizedText(update.description)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Action - Transparency */}
        <div className="py-8 flex flex-col items-center gap-4 text-center">
          <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
            <span className="material-symbols-outlined text-4xl">verified_user</span>
          </div>
          <h4 className="font-bold text-text-primary dark:text-white text-xl">
            {language === 'ar' ? '100٪ شفافية' : language === 'fr' ? '100% de Transparence' : '100% Transparency'}
          </h4>
          <p className="text-sm text-text-secondary dark:text-text-white/60 px-8 max-w-md">
            {language === 'ar'
              ? 'يتم تتبع كل درهم وتدقيقه لضمان الاستفادة المباشرة للمجتمع.'
              : language === 'fr'
              ? 'Chaque dirham est suivi et audité pour garantir qu\'il profite directement à la communauté.'
              : 'Every dirham is tracked and audited to ensure it directly benefits the community.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
