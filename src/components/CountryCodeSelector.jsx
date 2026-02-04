import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Search } from 'lucide-react';

// Country data with dial codes and flags
const countries = [
  { code: 'MA', name: 'Morocco', dialCode: '+212', flag: '🇲🇦', nameAr: 'المغرب', nameFr: 'Maroc' },
  { code: 'DZ', name: 'Algeria', dialCode: '+213', flag: '🇩🇿', nameAr: 'الجزائر', nameFr: 'Algérie' },
  { code: 'TN', name: 'Tunisia', dialCode: '+216', flag: '🇹🇳', nameAr: 'تونس', nameFr: 'Tunisie' },
  { code: 'EG', name: 'Egypt', dialCode: '+20', flag: '🇪🇬', nameAr: 'مصر', nameFr: 'Égypte' },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦', nameAr: 'السعودية', nameFr: 'Arabie Saoudite' },
  { code: 'AE', name: 'UAE', dialCode: '+971', flag: '🇦🇪', nameAr: 'الإمارات', nameFr: 'Émirats Arabes Unis' },
  { code: 'QA', name: 'Qatar', dialCode: '+974', flag: '🇶🇦', nameAr: 'قطر', nameFr: 'Qatar' },
  { code: 'KW', name: 'Kuwait', dialCode: '+965', flag: '🇰🇼', nameAr: 'الكويت', nameFr: 'Koweït' },
  { code: 'BH', name: 'Bahrain', dialCode: '+973', flag: '🇧🇭', nameAr: 'البحرين', nameFr: 'Bahreïn' },
  { code: 'OM', name: 'Oman', dialCode: '+968', flag: '🇴🇲', nameAr: 'عمان', nameFr: 'Oman' },
  { code: 'JO', name: 'Jordan', dialCode: '+962', flag: '🇯🇴', nameAr: 'الأردن', nameFr: 'Jordanie' },
  { code: 'LB', name: 'Lebanon', dialCode: '+961', flag: '🇱🇧', nameAr: 'لبنان', nameFr: 'Liban' },
  { code: 'SY', name: 'Syria', dialCode: '+963', flag: '🇸🇾', nameAr: 'سوريا', nameFr: 'Syrie' },
  { code: 'IQ', name: 'Iraq', dialCode: '+964', flag: '🇮🇶', nameAr: 'العراق', nameFr: 'Irak' },
  { code: 'YE', name: 'Yemen', dialCode: '+967', flag: '🇾🇪', nameAr: 'اليمن', nameFr: 'Yémen' },
  { code: 'SD', name: 'Sudan', dialCode: '+249', flag: '🇸🇩', nameAr: 'السودان', nameFr: 'Soudan' },
  { code: 'LY', name: 'Libya', dialCode: '+218', flag: '🇱🇾', nameAr: 'ليبيا', nameFr: 'Libye' },
  { code: 'PS', name: 'Palestine', dialCode: '+970', flag: '🇵🇸', nameAr: 'فلسطين', nameFr: 'Palestine' },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷', nameAr: 'فرنسا', nameFr: 'France' },
  { code: 'BE', name: 'Belgium', dialCode: '+32', flag: '🇧🇪', nameAr: 'بلجيكا', nameFr: 'Belgique' },
  { code: 'CH', name: 'Switzerland', dialCode: '+41', flag: '🇨🇭', nameAr: 'سويسرا', nameFr: 'Suisse' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦', nameAr: 'كندا', nameFr: 'Canada' },
  { code: 'US', name: 'USA', dialCode: '+1', flag: '🇺🇸', nameAr: 'أمريكا', nameFr: 'États-Unis' },
  { code: 'GB', name: 'UK', dialCode: '+44', flag: '🇬🇧', nameAr: 'بريطانيا', nameFr: 'Royaume-Uni' },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪', nameAr: 'ألمانيا', nameFr: 'Allemagne' },
  { code: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹', nameAr: 'إيطاليا', nameFr: 'Italie' },
  { code: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸', nameAr: 'إسبانيا', nameFr: 'Espagne' },
  { code: 'NL', name: 'Netherlands', dialCode: '+31', flag: '🇳🇱', nameAr: 'هولندا', nameFr: 'Pays-Bas' },
  { code: 'SE', name: 'Sweden', dialCode: '+46', flag: '🇸🇪', nameAr: 'السويد', nameFr: 'Suède' },
  { code: 'NO', name: 'Norway', dialCode: '+47', flag: '🇳🇴', nameAr: 'النرويج', nameFr: 'Norvège' },
  { code: 'DK', name: 'Denmark', dialCode: '+45', flag: '🇩🇰', nameAr: 'الدنمارك', nameFr: 'Danemark' },
  { code: 'FI', name: 'Finland', dialCode: '+358', flag: '🇫🇮', nameAr: 'فنلندا', nameFr: 'Finlande' },
  { code: 'TR', name: 'Turkey', dialCode: '+90', flag: '🇹🇷', nameAr: 'تركيا', nameFr: 'Turquie' },
  { code: 'CN', name: 'China', dialCode: '+86', flag: '🇨🇳', nameAr: 'الصين', nameFr: 'Chine' },
  { code: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵', nameAr: 'اليابان', nameFr: 'Japon' },
  { code: 'KR', name: 'South Korea', dialCode: '+82', flag: '🇰🇷', nameAr: 'كوريا الجنوبية', nameFr: 'Corée du Sud' },
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳', nameAr: 'الهند', nameFr: 'Inde' },
  { code: 'PK', name: 'Pakistan', dialCode: '+92', flag: '🇵🇰', nameAr: 'باكستان', nameFr: 'Pakistan' },
  { code: 'BD', name: 'Bangladesh', dialCode: '+880', flag: '🇧🇩', nameAr: 'بنغلاديش', nameFr: 'Bangladesh' },
  { code: 'ID', name: 'Indonesia', dialCode: '+62', flag: '🇮🇩', nameAr: 'إندونيسيا', nameFr: 'Indonésie' },
  { code: 'MY', name: 'Malaysia', dialCode: '+60', flag: '🇲🇾', nameAr: 'ماليزيا', nameFr: 'Malaisie' },
  { code: 'PH', name: 'Philippines', dialCode: '+63', flag: '🇵🇭', nameAr: 'الفلبين', nameFr: 'Philippines' },
  { code: 'TH', name: 'Thailand', dialCode: '+66', flag: '🇹🇭', nameAr: 'تايلاند', nameFr: 'Thaïlande' },
  { code: 'VN', name: 'Vietnam', dialCode: '+84', flag: '🇻🇳', nameAr: 'فيتنام', nameFr: 'Vietnam' },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺', nameAr: 'أستراليا', nameFr: 'Australie' },
  { code: 'NZ', name: 'New Zealand', dialCode: '+64', flag: '🇳🇿', nameAr: 'نيوزيلندا', nameFr: 'Nouvelle-Zélande' },
  { code: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦', nameAr: 'جنوب أفريقيا', nameFr: 'Afrique du Sud' },
  { code: 'NG', name: 'Nigeria', dialCode: '+234', flag: '🇳🇬', nameAr: 'نيجيريا', nameFr: 'Nigéria' },
  { code: 'KE', name: 'Kenya', dialCode: '+254', flag: '🇰🇪', nameAr: 'كينيا', nameFr: 'Kenya' },
  { code: 'GH', name: 'Ghana', dialCode: '+233', flag: '🇬🇭', nameAr: 'غانا', nameFr: 'Ghana' },
  { code: 'ET', name: 'Ethiopia', dialCode: '+251', flag: '🇪🇹', nameAr: 'إثيوبيا', nameFr: 'Éthiopie' },
  { code: 'UG', name: 'Uganda', dialCode: '+256', flag: '🇺🇬', nameAr: 'أوغندا', nameFr: 'Ouganda' },
  { code: 'TZ', name: 'Tanzania', dialCode: '+255', flag: '🇹🇿', nameAr: 'تنزانيا', nameFr: 'Tanzanie' },
  { code: 'MZ', name: 'Mozambique', dialCode: '+258', flag: '🇲🇿', nameAr: 'موزمبيق', nameFr: 'Mozambique' },
  { code: 'ZM', name: 'Zambia', dialCode: '+260', flag: '🇿🇲', nameAr: 'زامبيا', nameFr: 'Zambie' },
  { code: 'ZW', name: 'Zimbabwe', dialCode: '+263', flag: '🇿🇼', nameAr: 'زيمبابوي', nameFr: 'Zimbabwe' },
  { code: 'BW', name: 'Botswana', dialCode: '+267', flag: '🇧🇼', nameAr: 'بوتسوانا', nameFr: 'Botswana' },
  { code: 'NA', name: 'Namibia', dialCode: '+264', flag: '🇳🇦', nameAr: 'ناميبيا', nameFr: 'Namibie' },
  { code: 'MW', name: 'Malawi', dialCode: '+265', flag: '🇲🇼', nameAr: 'مالاوي', nameFr: 'Malawi' },
  { code: 'MG', name: 'Madagascar', dialCode: '+261', flag: '🇲🇬', nameAr: 'مدغشقر', nameFr: 'Madagascar' },
  { code: 'MU', name: 'Mauritius', dialCode: '+230', flag: '🇲🇺', nameAr: 'موريشيوس', nameFr: 'Maurice' },
  { code: 'SZ', name: 'Eswatini', dialCode: '+268', flag: '🇸🇿', nameAr: 'إسواتيني', nameFr: 'Eswatini' },
  { code: 'LS', name: 'Lesotho', dialCode: '+266', flag: '🇱🇸', nameAr: 'ليسوتو', nameFr: 'Lesotho' },
  { code: 'RU', name: 'Russia', dialCode: '+7', flag: '🇷🇺', nameAr: 'روسيا', nameFr: 'Russie' },
  { code: 'UA', name: 'Ukraine', dialCode: '+380', flag: '🇺🇦', nameAr: 'أوكرانيا', nameFr: 'Ukraine' },
  { code: 'PL', name: 'Poland', dialCode: '+48', flag: '🇵🇱', nameAr: 'بولندا', nameFr: 'Pologne' },
  { code: 'CZ', name: 'Czech Republic', dialCode: '+420', flag: '🇨🇿', nameAr: 'التشيك', nameFr: 'République Tchèque' },
  { code: 'HU', name: 'Hungary', dialCode: '+36', flag: '🇭🇺', nameAr: 'المجر', nameFr: 'Hongrie' },
  { code: 'RO', name: 'Romania', dialCode: '+40', flag: '🇷🇴', nameAr: 'رومانيا', nameFr: 'Roumanie' },
  { code: 'BG', name: 'Bulgaria', dialCode: '+359', flag: '🇧🇬', nameAr: 'بلغاريا', nameFr: 'Bulgarie' },
  { code: 'HR', name: 'Croatia', dialCode: '+385', flag: '🇭🇷', nameAr: 'كرواتيا', nameFr: 'Croatie' },
  { code: 'RS', name: 'Serbia', dialCode: '+381', flag: '🇷🇸', nameAr: 'صربيا', nameFr: 'Serbie' },
  { code: 'SI', name: 'Slovenia', dialCode: '+386', flag: '🇸🇮', nameAr: 'سلوفينيا', nameFr: 'Slovénie' },
  { code: 'SK', name: 'Slovakia', dialCode: '+421', flag: '🇸🇰', nameAr: 'سلوفاكيا', nameFr: 'Slovaquie' },
  { code: 'AT', name: 'Austria', dialCode: '+43', flag: '🇦🇹', nameAr: 'النمسا', nameFr: 'Autriche' },
  { code: 'PT', name: 'Portugal', dialCode: '+351', flag: '🇵🇹', nameAr: 'البرتغال', nameFr: 'Portugal' },
  { code: 'GR', name: 'Greece', dialCode: '+30', flag: '🇬🇷', nameAr: 'اليونان', nameFr: 'Grèce' },
  { code: 'IE', name: 'Ireland', dialCode: '+353', flag: '🇮🇪', nameAr: 'أيرلندا', nameFr: 'Irlande' },
  { code: 'IS', name: 'Iceland', dialCode: '+354', flag: '🇮🇸', nameAr: 'آيسلندا', nameFr: 'Islande' },
  { code: 'MT', name: 'Malta', dialCode: '+356', flag: '🇲🇹', nameAr: 'مالطا', nameFr: 'Malte' },
  { code: 'CY', name: 'Cyprus', dialCode: '+357', flag: '🇨🇾', nameAr: 'قبرص', nameFr: 'Chypre' },
  { code: 'LU', name: 'Luxembourg', dialCode: '+352', flag: '🇱🇺', nameAr: 'لوكسمبورغ', nameFr: 'Luxembourg' },
  { code: 'MC', name: 'Monaco', dialCode: '+377', flag: '🇲🇨', nameAr: 'موناكو', nameFr: 'Monaco' },
  { code: 'LI', name: 'Liechtenstein', dialCode: '+423', flag: '🇱🇮', nameAr: 'ليختنشتاين', nameFr: 'Liechtenstein' },
  { code: 'AD', name: 'Andorra', dialCode: '+376', flag: '🇦🇩', nameAr: 'أندورا', nameFr: 'Andorre' },
  { code: 'SM', name: 'San Marino', dialCode: '+378', flag: '🇸🇲', nameAr: 'سان مارينو', nameFr: 'Saint-Marin' },
  { code: 'VA', name: 'Vatican', dialCode: '+379', flag: '🇻🇦', nameAr: 'الفاتيكان', nameFr: 'Vatican' },
  { code: 'BY', name: 'Belarus', dialCode: '+375', flag: '🇧🇾', nameAr: 'بيلاروس', nameFr: 'Biélorussie' },
  { code: 'MD', name: 'Moldova', dialCode: '+373', flag: '🇲🇩', nameAr: 'مولدوفا', nameFr: 'Moldavie' },
  { code: 'EE', name: 'Estonia', dialCode: '+372', flag: '🇪🇪', nameAr: 'إستونيا', nameFr: 'Estonie' },
  { code: 'LV', name: 'Latvia', dialCode: '+371', flag: '🇱🇻', nameAr: 'لاتفيا', nameFr: 'Lettonie' },
  { code: 'LT', name: 'Lithuania', dialCode: '+370', flag: '🇱🇹', nameAr: 'ليتوانيا', nameFr: 'Lituanie' },
  { code: 'GE', name: 'Georgia', dialCode: '+995', flag: '🇬🇪', nameAr: 'جورجيا', nameFr: 'Géorgie' },
  { code: 'AM', name: 'Armenia', dialCode: '+374', flag: '🇦🇲', nameAr: 'أرمينيا', nameFr: 'Arménie' },
  { code: 'AZ', name: 'Azerbaijan', dialCode: '+994', flag: '🇦🇿', nameAr: 'أذربيجان', nameFr: 'Azerbaïdjan' },
  { code: 'KZ', name: 'Kazakhstan', dialCode: '+7', flag: '🇰🇿', nameAr: 'كازاخستان', nameFr: 'Kazakhstan' },
  { code: 'UZ', name: 'Uzbekistan', dialCode: '+998', flag: '🇺🇿', nameAr: 'أوزبكستان', nameFr: 'Ouzbékistan' },
  { code: 'KG', name: 'Kyrgyzstan', dialCode: '+996', flag: '🇰🇬', nameAr: 'قيرغيزستان', nameFr: 'Kirghizistan' },
  { code: 'TJ', name: 'Tajikistan', dialCode: '+992', flag: '🇹🇯', nameAr: 'طاجيكستان', nameFr: 'Tadjikistan' },
  { code: 'TM', name: 'Turkmenistan', dialCode: '+993', flag: '🇹🇲', nameAr: 'تركمانستان', nameFr: 'Turkménistan' },
  { code: 'AF', name: 'Afghanistan', dialCode: '+93', flag: '🇦🇫', nameAr: 'أفغانستان', nameFr: 'Afghanistan' },
  { code: 'IR', name: 'Iran', dialCode: '+98', flag: '🇮🇷', nameAr: 'إيران', nameFr: 'Iran' },
  { code: 'PK', name: 'Pakistan', dialCode: '+92', flag: '🇵🇰', nameAr: 'باكستان', nameFr: 'Pakistan' },
  { code: 'BR', name: 'Brazil', dialCode: '+55', flag: '🇧🇷', nameAr: 'البرازيل', nameFr: 'Brésil' },
  { code: 'AR', name: 'Argentina', dialCode: '+54', flag: '🇦🇷', nameAr: 'الأرجنتين', nameFr: 'Argentine' },
  { code: 'CL', name: 'Chile', dialCode: '+56', flag: '🇨🇱', nameAr: 'تشيلي', nameFr: 'Chili' },
  { code: 'CO', name: 'Colombia', dialCode: '+57', flag: '🇨🇴', nameAr: 'كولومبيا', nameFr: 'Colombie' },
  { code: 'PE', name: 'Peru', dialCode: '+51', flag: '🇵🇪', nameAr: 'بيرو', nameFr: 'Pérou' },
  { code: 'VE', name: 'Venezuela', dialCode: '+58', flag: '🇻🇪', nameAr: 'فنزويلا', nameFr: 'Venezuela' },
  { code: 'EC', name: 'Ecuador', dialCode: '+593', flag: '🇪🇨', nameAr: 'الإكوادور', nameFr: 'Équateur' },
  { code: 'BO', name: 'Bolivia', dialCode: '+591', flag: '🇧🇴', nameAr: 'بوليفيا', nameFr: 'Bolivie' },
  { code: 'PY', name: 'Paraguay', dialCode: '+595', flag: '🇵🇾', nameAr: 'باراغواي', nameFr: 'Paraguay' },
  { code: 'UY', name: 'Uruguay', dialCode: '+598', flag: '🇺🇾', nameAr: 'أوروغواي', nameFr: 'Uruguay' },
  { code: 'GY', name: 'Guyana', dialCode: '+592', flag: '🇬🇾', nameAr: 'غيانا', nameFr: 'Guyana' },
  { code: 'SR', name: 'Suriname', dialCode: '+597', flag: '🇸🇷', nameAr: 'سورينام', nameFr: 'Suriname' },
  { code: 'GF', name: 'French Guiana', dialCode: '+594', flag: '🇬🇫', nameAr: 'غويانا الفرنسية', nameFr: 'Guyane française' },
  { code: 'FK', name: 'Falkland Islands', dialCode: '+500', flag: '🇫🇰', nameAr: 'جزر فوكلاند', nameFr: 'Îles Falkland' },
  { code: 'MX', name: 'Mexico', dialCode: '+52', flag: '🇲🇽', nameAr: 'المكسيك', nameFr: 'Mexique' },
  { code: 'GT', name: 'Guatemala', dialCode: '+502', flag: '🇬🇹', nameAr: 'غواتيمالا', nameFr: 'Guatemala' },
  { code: 'BZ', name: 'Belize', dialCode: '+501', flag: '🇧🇿', nameAr: 'بليز', nameFr: 'Belize' },
  { code: 'SV', name: 'El Salvador', dialCode: '+503', flag: '🇸🇻', nameAr: 'السلفادور', nameFr: 'Salvador' },
  { code: 'HN', name: 'Honduras', dialCode: '+504', flag: '🇭🇳', nameAr: 'هندوراس', nameFr: 'Honduras' },
  { code: 'NI', name: 'Nicaragua', dialCode: '+505', flag: '🇳🇮', nameAr: 'نيكاراغوا', nameFr: 'Nicaragua' },
  { code: 'CR', name: 'Costa Rica', dialCode: '+506', flag: '🇨🇷', nameAr: 'كوستاريكا', nameFr: 'Costa Rica' },
  { code: 'PA', name: 'Panama', dialCode: '+507', flag: '🇵🇦', nameAr: 'بنما', nameFr: 'Panama' },
  { code: 'CU', name: 'Cuba', dialCode: '+53', flag: '🇨🇺', nameAr: 'كوبا', nameFr: 'Cuba' },
  { code: 'JM', name: 'Jamaica', dialCode: '+1', flag: '🇯🇲', nameAr: 'جامايكا', nameFr: 'Jamaïque' },
  { code: 'HT', name: 'Haiti', dialCode: '+509', flag: '🇭🇹', nameAr: 'هايتي', nameFr: 'Haïti' },
  { code: 'DO', name: 'Dominican Republic', dialCode: '+1', flag: '🇩🇴', nameAr: 'جمهورية الدومينيكان', nameFr: 'République dominicaine' },
  { code: 'PR', name: 'Puerto Rico', dialCode: '+1', flag: '🇵🇷', nameAr: 'بورتوريكو', nameFr: 'Porto Rico' },
  { code: 'BS', name: 'Bahamas', dialCode: '+1', flag: '🇧🇸', nameAr: 'الباهاما', nameFr: 'Bahamas' },
  { code: 'BB', name: 'Barbados', dialCode: '+1', flag: '🇧🇧', nameAr: 'باربادوس', nameFr: 'Barbade' },
  { code: 'TT', name: 'Trinidad and Tobago', dialCode: '+1', flag: '🇹🇹', nameAr: 'ترينيداد وتوباغو', nameFr: 'Trinité-et-Tobago' },
  { code: 'GD', name: 'Grenada', dialCode: '+1', flag: '🇬🇩', nameAr: 'غرينادا', nameFr: 'Grenade' },
  { code: 'VC', name: 'Saint Vincent', dialCode: '+1', flag: '🇻🇨', nameAr: 'سانت فينسنت', nameFr: 'Saint-Vincent' },
  { code: 'LC', name: 'Saint Lucia', dialCode: '+1', flag: '🇱🇨', nameAr: 'سانت لوسيا', nameFr: 'Sainte-Lucie' },
  { code: 'DM', name: 'Dominica', dialCode: '+1', flag: '🇩🇲', nameAr: 'دومينيكا', nameFr: 'Dominique' },
  { code: 'AG', name: 'Antigua and Barbuda', dialCode: '+1', flag: '🇦🇬', nameAr: 'أنتيغوا وبربودا', nameFr: 'Antigua-et-Barbuda' },
  { code: 'KN', name: 'Saint Kitts', dialCode: '+1', flag: '🇰🇳', nameAr: 'سانت كيتس', nameFr: 'Saint-Christophe' },
  { code: 'AI', name: 'Anguilla', dialCode: '+1', flag: '🇦🇮', nameAr: 'أنغويلا', nameFr: 'Anguilla' },
  { code: 'MS', name: 'Montserrat', dialCode: '+1', flag: '🇲🇸', nameAr: 'مونتسيرات', nameFr: 'Montserrat' },
  { code: 'VG', name: 'British Virgin Islands', dialCode: '+1', flag: '🇻🇬', nameAr: 'جزر العذراء البريطانية', nameFr: 'Îles Vierges britanniques' },
  { code: 'TC', name: 'Turks and Caicos', dialCode: '+1', flag: '🇹🇨', nameAr: 'تركس وكايكوس', nameFr: 'Îles Turques-et-Caïques' },
  { code: 'KY', name: 'Cayman Islands', dialCode: '+1', flag: '🇰🇾', nameAr: 'جزر كايمان', nameFr: 'Îles Caïmans' },
  { code: 'BM', name: 'Bermuda', dialCode: '+1', flag: '🇧🇲', nameAr: 'برمودا', nameFr: 'Bermudes' },
  { code: 'GL', name: 'Greenland', dialCode: '+299', flag: '🇬🇱', nameAr: 'غرينلاند', nameFr: 'Groenland' },
  { code: 'AX', name: 'Aland Islands', dialCode: '+358', flag: '🇦🇽', nameAr: 'جزر آلاند', nameFr: 'Îles Åland' },
  { code: 'FO', name: 'Faroe Islands', dialCode: '+298', flag: '🇫🇴', nameAr: 'جزر فارو', nameFr: 'Îles Féroé' },
  { code: 'SJ', name: 'Svalbard', dialCode: '+47', flag: '🇸🇯', nameAr: 'سفالبارد', nameFr: 'Svalbard' },
  { code: 'GI', name: 'Gibraltar', dialCode: '+350', flag: '🇬🇮', nameAr: 'جبل طارق', nameFr: 'Gibraltar' },
  { code: 'GG', name: 'Guernsey', dialCode: '+44', flag: '🇬🇬', nameAr: 'غيرنزي', nameFr: 'Guernesey' },
  { code: 'JE', name: 'Jersey', dialCode: '+44', flag: '🇯🇪', nameAr: 'جيرسي', nameFr: 'Jersey' },
  { code: 'IM', name: 'Isle of Man', dialCode: '+44', flag: '🇮🇲', nameAr: 'جزيرة مان', nameFr: 'Île de Man' },
  { code: 'SH', name: 'Saint Helena', dialCode: '+290', flag: '🇸🇭', nameAr: 'سانت هيلينا', nameFr: 'Sainte-Hélène' },
  { code: 'AC', name: 'Ascension Island', dialCode: '+247', flag: '🇦🇨', nameAr: 'جزيرة أسينشين', nameFr: 'Île de l\'Ascension' },
  { code: 'TA', name: 'Tristan da Cunha', dialCode: '+290', flag: '🇹🇦', nameAr: 'تريستان دا كونا', nameFr: 'Tristan da Cunha' },
  { code: 'IO', name: 'British Indian Ocean', dialCode: '+246', flag: '🇮🇴', nameAr: 'المحيط الهندي البريطاني', nameFr: 'Territoire britannique de l\'océan Indien' },
  { code: 'PN', name: 'Pitcairn Islands', dialCode: '+64', flag: '🇵🇳', nameAr: 'جزر بيتكيرن', nameFr: 'Îles Pitcairn' },
  { code: 'WF', name: 'Wallis and Futuna', dialCode: '+681', flag: '🇼🇫', nameAr: 'واليس وفوتونا', nameFr: 'Wallis-et-Futuna' },
  { code: 'NC', name: 'New Caledonia', dialCode: '+687', flag: '🇳🇨', nameAr: 'كاليدونيا الجديدة', nameFr: 'Nouvelle-Calédonie' },
  { code: 'PF', name: 'French Polynesia', dialCode: '+689', flag: '🇵🇫', nameAr: 'بولينيزيا الفرنسية', nameFr: 'Polynésie française' },
  { code: 'PM', name: 'Saint Pierre', dialCode: '+508', flag: '🇵🇲', nameAr: 'سان بيير وميكلون', nameFr: 'Saint-Pierre-et-Miquelon' },
  { code: 'GP', name: 'Guadeloupe', dialCode: '+590', flag: '🇬🇵', nameAr: 'غوادلوب', nameFr: 'Guadeloupe' },
  { code: 'MQ', name: 'Martinique', dialCode: '+596', flag: '🇲🇶', nameAr: 'مارتينيك', nameFr: 'Martinique' },
  { code: 'YT', name: 'Mayotte', dialCode: '+262', flag: '🇾🇹', nameAr: 'مايوت', nameFr: 'Mayotte' },
  { code: 'RE', name: 'Reunion', dialCode: '+262', flag: '🇷🇪', nameAr: 'ريونيون', nameFr: 'La Réunion' },
  { code: 'TF', name: 'French Southern', dialCode: '+262', flag: '🇹🇫', nameAr: 'الأقاليم الجنوبية الفرنسية', nameFr: 'Terres australes françaises' },
  { code: 'AW', name: 'Aruba', dialCode: '+297', flag: '🇦🇼', nameAr: 'أروبا', nameFr: 'Aruba' },
  { code: 'CW', name: 'Curacao', dialCode: '+599', flag: '🇨🇼', nameAr: 'كوراساو', nameFr: 'Curaçao' },
  { code: 'SX', name: 'Sint Maarten', dialCode: '+599', flag: '🇸🇽', nameAr: 'سينت مارتن', nameFr: 'Saint-Martin' },
  { code: 'BQ', name: 'Caribbean Netherlands', dialCode: '+599', flag: '🇧🇶', nameAr: 'هولندا الكاريبية', nameFr: 'Pays-Bas caribéens' },
  { code: 'BL', name: 'Saint Barthelemy', dialCode: '+590', flag: '🇧🇱', nameAr: 'سان بارتيلمي', nameFr: 'Saint-Barthélemy' },
  { code: 'MF', name: 'Saint Martin', dialCode: '+590', flag: '🇲🇫', nameAr: 'سانت مارتن', nameFr: 'Saint-Martin' },
  { code: 'XK', name: 'Kosovo', dialCode: '+383', flag: '🇽🇰', nameAr: 'كوسوفو', nameFr: 'Kosovo' },
];

const CountryCodeSelector = ({ value, onChange, language = 'ar' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Get display name based on language
  const getDisplayName = (country) => {
    if (language === 'ar') return country.nameAr;
    if (language === 'fr') return country.nameFr;
    return country.name;
  };

  // Find selected country
  const selectedCountry = useMemo(() => {
    return countries.find(c => c.dialCode === value) || countries[0];
  }, [value]);

  // Filter countries based on search
  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return countries;
    const query = searchQuery.toLowerCase();
    return countries.filter(country => 
      country.name.toLowerCase().includes(query) ||
      country.nameAr.includes(query) ||
      country.nameFr.toLowerCase().includes(query) ||
      country.dialCode.includes(query) ||
      country.code.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Focus search input when opened
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Handle country selection
  const handleSelect = (country) => {
    onChange(country.dialCode);
    setIsOpen(false);
    setSearchQuery('');
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setSearchQuery('');
    }
  };

  const isRTL = language === 'ar';

  return (
    <div className="relative" ref={dropdownRef} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Selected Country Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`
          flex items-center gap-2 px-3 py-3
          bg-gray-50 border border-gray-200
          ${isRTL ? 'rounded-r-lg border-l-0' : 'rounded-l-lg border-r-0'}
          hover:bg-gray-100 transition-colors
          focus:outline-none focus:ring-2 focus:ring-primary-500/20
          min-w-[100px] justify-between
        `}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="flex items-center gap-2">
          <span className="text-lg" role="img" aria-label={selectedCountry.name}>
            {selectedCountry.flag}
          </span>
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
            {selectedCountry.dialCode}
          </span>
        </span>
        <ChevronDown className={`
          w-4 h-4 text-gray-400 transition-transform duration-200
          ${isOpen ? 'rotate-180' : ''}
        `} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className={`
          absolute z-50 mt-1
          ${isRTL ? 'right-0' : 'left-0'}
          w-72 bg-white rounded-xl shadow-xl border border-gray-100
          overflow-hidden animate-scale-in
        `}>
          {/* Search Input */}
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search className={`
                absolute top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400
                ${isRTL ? 'right-3' : 'left-3'}
              `} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'ar' ? 'ابحث عن دولة...' :
                  language === 'fr' ? 'Rechercher un pays...' :
                  'Search country...'
                }
                className={`
                  w-full py-2 pr-3 pl-9 text-sm
                  bg-gray-50 border border-gray-200 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
                  ${isRTL ? 'pl-3 pr-9' : ''}
                `}
              />
            </div>
          </div>

          {/* Country List */}
          <div className="max-h-60 overflow-y-auto scrollbar-hide">
            {filteredCountries.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                {language === 'ar' ? 'لا توجد نتائج' :
                 language === 'fr' ? 'Aucun résultat' :
                 'No results found'}
              </div>
            ) : (
              <ul role="listbox" className="py-1">
                {filteredCountries.map((country) => (
                  <li key={country.code}>
                    <button
                      type="button"
                      onClick={() => handleSelect(country)}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2.5 text-left
                        hover:bg-gray-50 transition-colors
                        ${value === country.dialCode ? 'bg-primary-50 text-primary-700' : 'text-gray-700'}
                      `}
                      role="option"
                      aria-selected={value === country.dialCode}
                    >
                      <span className="text-xl flex-shrink-0" role="img" aria-label={country.name}>
                        {country.flag}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {getDisplayName(country)}
                        </p>
                        <p className="text-xs text-gray-400">
                          {country.dialCode}
                        </p>
                      </div>
                      {value === country.dialCode && (
                        <div className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryCodeSelector;
