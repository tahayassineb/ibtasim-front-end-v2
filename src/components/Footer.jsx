import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, CreditCard, Landmark, Heart, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Footer = () => {
  const { associationInfo, stats, language } = useApp();
  const isRTL = language === 'ar';

  // Translations
  const t = {
    ar: {
      quickLinks: 'روابط سريعة',
      ourProjects: 'مشاريعنا',
      about: 'من نحن',
      contact: 'اتصل بنا',
      legal: 'الشروط القانونية',
      contactTitle: 'اتصل بنا',
      paymentMethods: 'طرق الدفع',
      creditCard: 'بطاقة بنكية (Visa, Mastercard)',
      bankTransfer: 'تحويل بنكي',
      bankInfo: 'معلومات البنك',
      allRights: 'جميع الحقوق محفوظة',
      registeredAssoc: 'جمعية معتمدة',
      foundedIn: 'تأسست عام',
      newsletter: 'النشرة الإخبارية',
      newsletterDesc: 'اشترك للحصول على آخر أخبارنا ومشاريعنا',
      subscribe: 'اشترك',
      madeWith: 'صنع ب',
      transparency: 'الشفافية',
      financialReports: 'التقارير المالية',
      impact: 'التأثير',
    },
    fr: {
      quickLinks: 'Liens rapides',
      ourProjects: 'Nos projets',
      about: 'À propos',
      contact: 'Contact',
      legal: 'Mentions légales',
      contactTitle: 'Contact',
      paymentMethods: 'Modes de paiement',
      creditCard: 'Carte bancaire (Visa, Mastercard)',
      bankTransfer: 'Virement bancaire',
      bankInfo: 'Coordonnées bancaires',
      allRights: 'Tous droits réservés',
      registeredAssoc: 'Association reconnue',
      foundedIn: 'Créée en',
      newsletter: 'Newsletter',
      newsletterDesc: 'Inscrivez-vous pour recevoir nos actualités et projets',
      subscribe: "S'inscrire",
      madeWith: 'Fait avec',
      transparency: 'Transparence',
      financialReports: 'Rapports financiers',
      impact: 'Impact',
    },
    en: {
      quickLinks: 'Quick Links',
      ourProjects: 'Our Projects',
      about: 'About',
      contact: 'Contact',
      legal: 'Legal Notice',
      contactTitle: 'Contact',
      paymentMethods: 'Payment Methods',
      creditCard: 'Credit Card (Visa, Mastercard)',
      bankTransfer: 'Bank Transfer',
      bankInfo: 'Bank Information',
      allRights: 'All rights reserved',
      registeredAssoc: 'Registered Association',
      foundedIn: 'Founded in',
      newsletter: 'Newsletter',
      newsletterDesc: 'Subscribe to receive our news and projects',
      subscribe: 'Subscribe',
      madeWith: 'Made with',
      transparency: 'Transparency',
      financialReports: 'Financial Reports',
      impact: 'Impact',
    },
  }[language] || {};

  const quickLinks = [
    { path: '/projets', label: t.ourProjects },
    { path: '/a-propos', label: t.about },
    { path: '/contact', label: t.contact },
  ];

  const legalLinks = [
    { path: '/mentions-legales', label: t.legal },
    { path: '/transparence', label: t.financialReports },
  ];

  const socialLinks = [
    { 
      icon: Facebook, 
      href: associationInfo.socialLinks?.facebook || '#', 
      label: 'Facebook',
      color: 'hover:bg-blue-600 hover:text-white'
    },
    { 
      icon: Instagram, 
      href: associationInfo.socialLinks?.instagram || '#', 
      label: 'Instagram',
      color: 'hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:text-white'
    },
  ];

  const whatsappLink = associationInfo.whatsapp 
    ? `https://wa.me/${associationInfo.whatsapp.replace(/\D/g, '')}` 
    : '#';

  return (
    <footer 
      className="bg-gray-900 text-white"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Main footer */}
      <div className="page-container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* About - Takes 4 columns */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="https://nlfixnhoufntbbcccnwr.supabase.co/storage/v1/object/public/campaigns/Gemini_Generated_Image_7ce0up7ce0up7ce0-Photoroom%20(1).png"
                alt="Association Espoir"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              {associationInfo.description}
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center
                    transition-all duration-200 ${social.color}
                  `}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-all duration-200"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links - Takes 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              {t.quickLinks}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-white transition-colors text-sm inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Transparency - Takes 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              {t.transparency}
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-white transition-colors text-sm inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info - Takes 4 columns */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              {t.contactTitle}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="leading-relaxed">{associationInfo.address}</span>
              </li>
              <li>
                <a 
                  href={`tel:${associationInfo.phone}`}
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" aria-hidden="true" />
                  <span dir="ltr">{associationInfo.phone}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${associationInfo.email}`}
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" aria-hidden="true" />
                  <span>{associationInfo.email}</span>
                </a>
              </li>
            </ul>

            {/* Payment Methods */}
            <div className="mt-6 pt-6 border-t border-gray-800">
              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                {t.paymentMethods}
              </h4>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <CreditCard className="w-4 h-4" aria-hidden="true" />
                  <span>Visa / Mastercard</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <Landmark className="w-4 h-4" aria-hidden="true" />
                  <span>{t.bankTransfer}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="page-container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 text-center md:text-left">
              © {new Date().getFullYear()} {associationInfo.name}. {t.allRights}.
            </p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-xs text-gray-500">
                {t.madeWith}
                <Heart className="w-3 h-3 text-error-500 fill-error-500" aria-hidden="true" />
                {t.foundedIn} {associationInfo.foundedYear}
              </span>
              <span className="hidden md:inline text-gray-700">|</span>
              <span className="text-xs text-gray-500">
                {t.registeredAssoc}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
