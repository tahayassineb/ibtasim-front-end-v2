import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, ChevronDown, Globe, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Header = () => {
  const { user, isAuthenticated, logout, associationInfo, language, setLanguage } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const profileRef = useRef(null);
  const langRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Navigation labels in Arabic (default), French, and English
  const navLabels = {
    ar: {
      home: 'الرئيسية',
      projects: 'المشاريع',
      about: 'من نحن',
      contact: 'اتصل بنا',
      login: 'تسجيل الدخول',
      profile: 'الملف الشخصي',
      admin: 'الإدارة',
      logout: 'تسجيل الخروج',
      donate: 'تبرع الآن',
    },
    fr: {
      home: 'Accueil',
      projects: 'Projets',
      about: 'À propos',
      contact: 'Contact',
      login: 'Connexion',
      profile: 'Mon profil',
      admin: 'Administration',
      logout: 'Se déconnecter',
      donate: 'Faire un don',
    },
    en: {
      home: 'Home',
      projects: 'Projects',
      about: 'About',
      contact: 'Contact',
      login: 'Login',
      profile: 'My Profile',
      admin: 'Administration',
      logout: 'Logout',
      donate: 'Donate Now',
    },
  };

  const t = navLabels[language] || navLabels.ar;

  const navLinks = [
    { path: '/', label: t.home },
    { path: '/projets', label: t.projects },
    { path: '/a-propos', label: t.about },
    { path: '/contact', label: t.contact },
  ];

  // Available languages: French and English (Arabic is default)
  const availableLanguages = [
    { code: 'fr', label: 'Français', flag: 'FR' },
    { code: 'en', label: 'English', flag: 'EN' },
  ];

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/');
  };

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    setIsLangOpen(false);
  };

  const isRTL = language === 'ar';

  return (
    <header 
      className={`
        sticky top-0 z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-soft' 
          : 'bg-white'}
      `}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="page-container">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 lg:gap-3 flex-shrink-0"
            aria-label="Association Espoir - Retour à l'accueil"
          >
            <img
              src="https://nlfixnhoufntbbcccnwr.supabase.co/storage/v1/object/public/campaigns/Gemini_Generated_Image_7ce0up7ce0up7ce0-Photoroom%20(1).png"
              alt="Association Espoir"
              className="h-10 lg:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav 
            className="hidden lg:flex items-center gap-1"
            aria-label="Navigation principale"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                  ${isActive(link.path)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
                aria-current={isActive(link.path) ? 'page' : undefined}
              >
                {link.label}
                {isActive(link.path) && (
                  <span 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full"
                    aria-hidden="true"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Language toggle - Desktop */}
            <div className="relative hidden sm:block" ref={langRef}>
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                aria-expanded={isLangOpen}
                aria-haspopup="listbox"
                aria-label="Changer de langue"
              >
                <Globe className="w-4 h-4" aria-hidden="true" />
                <span className="font-medium uppercase">{language === 'ar' ? 'AR' : language}</span>
                <ChevronDown className={`
                  w-3 h-3 transition-transform duration-200
                  ${isLangOpen ? 'rotate-180' : ''}
                `} aria-hidden="true" />
              </button>
              
              {/* Language Dropdown */}
              {isLangOpen && (
                <div 
                  className="absolute right-0 rtl:left-0 rtl:right-auto mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-1 animate-scale-in"
                  role="listbox"
                  aria-label="Sélection de langue"
                >
                  {/* Arabic is default - shown as info */}
                  <div className="px-4 py-2 text-sm text-gray-400 border-b border-gray-100">
                    <span className="uppercase font-medium">AR</span>
                    <span className="ml-2 rtl:mr-2 rtl:ml-0">العربية (Default)</span>
                  </div>
                  {/* Selectable languages */}
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`
                        w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2
                        ${language === lang.code ? 'text-primary-600 font-medium bg-primary-50/50' : 'text-gray-700'}
                      `}
                      role="option"
                      aria-selected={language === lang.code}
                    >
                      <span className="uppercase text-xs w-6 text-center">{lang.flag}</span>
                      <span>{lang.label}</span>
                      {language === lang.code && (
                        <span className="ml-auto rtl:mr-auto rtl:ml-0">
                          <span className="w-1.5 h-1.5 bg-primary-600 rounded-full" aria-hidden="true" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Donate Button - Desktop */}
            <Link
              to="/projets"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-semibold rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <Heart className="w-4 h-4" aria-hidden="true" />
              <span>{t.donate}</span>
            </Link>

            {/* Auth buttons or profile */}
            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
                  aria-expanded={isProfileOpen}
                  aria-haspopup="menu"
                  aria-label="Menu utilisateur"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-600" aria-hidden="true" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {user?.name?.split(' ')[0]}
                  </span>
                  <ChevronDown className={`
                    w-4 h-4 text-gray-400 hidden sm:block transition-transform duration-200
                    ${isProfileOpen ? 'rotate-180' : ''}
                  `} aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                {isProfileOpen && (
                  <div 
                    className="absolute right-0 rtl:left-0 rtl:right-auto mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-scale-in"
                    role="menu"
                    aria-label="Menu utilisateur"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                    <Link
                      to="/profil"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      role="menuitem"
                    >
                      <User className="w-4 h-4 text-gray-400" />
                      {t.profile}
                    </Link>
                    <Link
                      to="/admin"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      role="menuitem"
                    >
                      <span className="w-4 h-4 rounded bg-primary-100 flex items-center justify-center text-xs font-bold text-primary-600">A</span>
                      {t.admin}
                    </Link>
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-error-600 hover:bg-error-50 transition-colors"
                      role="menuitem"
                    >
                      <LogOut className="w-4 h-4" />
                      {t.logout}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/connexion"
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
              >
                <User className="w-4 h-4" aria-hidden="true" />
                <span>{t.login}</span>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors touch-target"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`
          lg:hidden fixed inset-x-0 top-[64px] lg:top-[80px] bottom-0 bg-white z-50
          transform transition-transform duration-300 ease-out-expo
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        aria-hidden={!isMobileMenuOpen}
      >
        <nav
          className="h-full overflow-y-auto px-4 py-6 space-y-1"
          aria-label="Navigation mobile"
        >
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              className={`
                flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-200
                ${isActive(link.path)
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-700 hover:bg-gray-50'
                }
              `}
              style={{ 
                animationDelay: `${index * 50}ms`,
                animation: isMobileMenuOpen ? 'slideUp 0.3s ease-out forwards' : 'none'
              }}
              aria-current={isActive(link.path) ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
          
          {/* Mobile Donate Button */}
          <Link
            to="/projets"
            className="flex items-center justify-center gap-2 px-4 py-3 mt-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
          >
            <Heart className="w-5 h-5" aria-hidden="true" />
            {t.donate}
          </Link>

          {/* Mobile Language Toggle */}
          <div className="pt-4 mt-4 border-t border-gray-100">
            <p className="px-4 text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Langue / Language
            </p>
            <div className="flex gap-2 px-4">
              <button
                onClick={() => handleLanguageChange('ar')}
                className={`
                  flex-1 py-2 px-3 text-sm font-medium rounded-lg border transition-colors
                  ${language === 'ar' 
                    ? 'border-primary-600 text-primary-600 bg-primary-50' 
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'}
                `}
              >
                العربية
              </button>
              <button
                onClick={() => handleLanguageChange('fr')}
                className={`
                  flex-1 py-2 px-3 text-sm font-medium rounded-lg border transition-colors
                  ${language === 'fr' 
                    ? 'border-primary-600 text-primary-600 bg-primary-50' 
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'}
                `}
              >
                Français
              </button>
              <button
                onClick={() => handleLanguageChange('en')}
                className={`
                  flex-1 py-2 px-3 text-sm font-medium rounded-lg border transition-colors
                  ${language === 'en' 
                    ? 'border-primary-600 text-primary-600 bg-primary-50' 
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'}
                `}
              >
                English
              </button>
            </div>
          </div>

          {/* Mobile Auth */}
          {!isAuthenticated && (
            <div className="pt-4 mt-4 border-t border-gray-100">
              <Link
                to="/connexion"
                className="flex items-center justify-center gap-2 px-4 py-3 text-base font-medium text-primary-600 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors"
              >
                <User className="w-5 h-5" aria-hidden="true" />
                {t.login}
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
