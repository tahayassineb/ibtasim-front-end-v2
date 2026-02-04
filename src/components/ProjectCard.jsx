import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Heart, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProgressBar from './ProgressBar';

// Translations for ProjectCard
const translations = {
  ar: {
    goalReached: 'تم تحقيق الهدف! 🎉',
    projectCompleted: 'المشروع منتهي ✓',
    almostFunded: 'على وشك التمويل!',
    viewProject: 'عرض المشروع',
    makeDonation: 'تبرع الآن',
    of: 'من',
    donors: 'متبرعين',
    daysLeft: 'يوم متبقي',
    viewDetails: 'عرض التفاصيل',
  },
  fr: {
    goalReached: 'Objectif atteint! 🎉',
    projectCompleted: 'Projet terminé ✓',
    almostFunded: 'Presque financé!',
    viewProject: 'Voir le projet',
    makeDonation: 'Faire un don',
    of: 'sur',
    donors: 'donateurs',
    daysLeft: 'jours restants',
    viewDetails: 'Voir les détails',
  },
  en: {
    goalReached: 'Goal reached! 🎉',
    projectCompleted: 'Project completed ✓',
    almostFunded: 'Almost funded!',
    viewProject: 'View project',
    makeDonation: 'Donate now',
    of: 'of',
    donors: 'donors',
    daysLeft: 'days left',
    viewDetails: 'View details',
  },
};

const ProjectCard = ({ project, variant = 'default' }) => {
  const { formatCurrency, getStatusLabel, getStatusColor, language } = useApp();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const t = translations[language] || translations.ar;
  const isRTL = language === 'ar';
  
  const percentage = Math.round((project.raisedAmount / project.goalAmount) * 100);
  const isFunded = project.status === 'funded';
  const isFinished = project.status === 'finished';
  const isActive = project.status === 'active';
  const isAlmostFunded = percentage >= 80 && percentage < 100;

  const getBadge = () => {
    if (isFunded) return { 
      text: t.goalReached, 
      className: 'bg-success-100 text-success-800 border-success-200',
      icon: null
    };
    if (isFinished) return { 
      text: t.projectCompleted, 
      className: 'bg-gray-100 text-gray-800 border-gray-200',
      icon: null
    };
    if (isAlmostFunded && isActive) return { 
      text: t.almostFunded, 
      className: 'bg-warning-100 text-warning-800 border-warning-200',
      icon: null
    };
    return null;
  };

  const badge = getBadge();

  const getButtonStyles = () => {
    if (isFunded || isFinished) {
      return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    }
    return 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30';
  };

  const getButtonText = () => {
    if (isFunded || isFinished) return t.viewProject;
    return t.makeDonation;
  };

  // Compact variant for grids with limited space
  if (variant === 'compact') {
    return (
      <article className="card flex flex-col h-full group">
        <div className="relative h-40 overflow-hidden">
          {/* Skeleton loader */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          <img 
            src={project.mainImage} 
            alt={project.title}
            className={`
              w-full h-full object-cover transition-all duration-500
              ${imageLoaded ? 'opacity-100' : 'opacity-0'}
              group-hover:scale-105
            `}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          {/* Status badge */}
          <div className="absolute top-3 left-3">
            <span className={`
              inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full
              ${getStatusColor(project.status)}
            `}>
              {getStatusLabel(project.status)}
            </span>
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide mb-1">
            {project.category}
          </span>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {project.title}
          </h3>
          <ProgressBar percentage={percentage} size="sm" className="mb-2" />
          <div className={`flex justify-between text-sm mt-auto ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="font-semibold text-gray-900">{formatCurrency(project.raisedAmount)}</span>
            <span className="text-gray-500">{t.of} {formatCurrency(project.goalAmount)}</span>
          </div>
        </div>
      </article>
    );
  }

  // Horizontal variant for lists
  if (variant === 'horizontal') {
    return (
      <article 
        className="card flex flex-col sm:flex-row overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          <img 
            src={project.mainImage} 
            alt={project.title}
            className={`
              w-full h-full object-cover transition-all duration-500
              ${imageLoaded ? 'opacity-100' : 'opacity-0'}
              ${isHovered ? 'scale-105' : 'scale-100'}
            `}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-white/95 text-primary-600 shadow-sm">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1 group-hover:text-primary-600 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {project.shortDescription}
            </p>
          </div>

          {/* Progress */}
          <div className="mb-4">
            <ProgressBar percentage={percentage} showLabel />
            <div className={`flex justify-between mt-2 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="font-semibold text-gray-900">{formatCurrency(project.raisedAmount)}</span>
              <span className="text-gray-500">{t.of} {formatCurrency(project.goalAmount)}</span>
            </div>
          </div>

          {/* Footer */}
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-4 text-sm text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Users className="w-4 h-4" aria-hidden="true" />
                <span>{project.donorsCount} {t.donors}</span>
              </div>
              {isActive && project.daysLeft > 0 && (
                <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  <span>{project.daysLeft} {t.daysLeft}</span>
                </div>
              )}
            </div>
            <Link 
              to={`/projets/${project.id}`}
              className={`
                inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${getButtonStyles()}
              `}
            >
              {getButtonText()}
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // Default card variant
  return (
    <article 
      className="card flex flex-col h-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <img 
          src={project.mainImage} 
          alt={project.title}
          className={`
            w-full h-full object-cover transition-all duration-500
            ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            ${isHovered ? 'scale-105' : 'scale-100'}
          `}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full bg-white/95 text-primary-600 shadow-sm backdrop-blur-sm">
            {project.category}
          </span>
        </div>
        {/* Status badge */}
        {badge && (
          <div className="absolute top-3 right-3">
            <span className={`
              inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full border
              ${badge.className}
            `}>
              {badge.text}
            </span>
          </div>
        )}
        {/* Hover overlay */}
        <div className={`
          absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent
          transition-opacity duration-300
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}>
          <div className={`absolute bottom-4 ${isRTL ? 'right-4' : 'left-4'} ${isRTL ? 'left-4' : 'right-4'}`}>
            <Link 
              to={`/projets/${project.id}`}
              className={`inline-flex items-center gap-2 text-white text-sm font-medium hover:underline ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {t.viewDetails}
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Progress */}
        <div className="mb-4">
          <ProgressBar percentage={percentage} showLabel />
          <div className={`flex justify-between mt-2 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="font-semibold text-gray-900">{formatCurrency(project.raisedAmount)}</span>
            <span className="text-gray-500">{t.of} {formatCurrency(project.goalAmount)}</span>
          </div>
        </div>

        {/* Stats */}
        <div className={`flex items-center gap-4 text-sm text-gray-500 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Users className="w-4 h-4" aria-hidden="true" />
            <span>{project.donorsCount} {t.donors}</span>
          </div>
          {isActive && project.daysLeft > 0 && (
            <div className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Clock className="w-4 h-4" aria-hidden="true" />
              <span>{project.daysLeft} {t.daysLeft}</span>
            </div>
          )}
        </div>

        {/* Button */}
        <Link 
          to={`/projets/${project.id}`}
          className={`
            mt-auto w-full py-3 px-4 rounded-xl font-medium text-center 
            inline-flex items-center justify-center gap-2 transition-all duration-200
            ${getButtonStyles()}
            ${isHovered && !isFunded && !isFinished ? '-translate-y-0.5' : ''}
          `}
        >
          <Heart className={`w-4 h-4 ${isFunded || isFinished ? '' : 'fill-current'}`} aria-hidden="true" />
          {getButtonText()}
        </Link>
      </div>
    </article>
  );
};

export default ProjectCard;
