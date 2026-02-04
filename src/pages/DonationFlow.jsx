import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Routes, Route, Link } from 'react-router-dom';
import { ArrowLeft, Check, CreditCard, Building2, MessageCircle, Upload, Copy, CheckCircle2, Share2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProgressBar from '../components/ProgressBar';
import CountryCodeSelector from '../components/CountryCodeSelector';

// Translation object for all steps
const translations = {
  ar: {
    // Step 1: Amount
    backToProject: 'العودة إلى المشروع',
    projectNotFound: 'المشروع غير موجود',
    funded: 'تم تمويله',
    howMuchToDonate: 'كم تريد أن تتبرع؟',
    otherAmount: 'مبلغ آخر:',
    customAmountPlaceholder: 'أدخل المبلغ',
    currency: 'درهم',
    anonymousDonation: 'تبرع مجهول',
    continue: 'متابعة',
    impactMessages: {
      50: 'لوازم مدرسية أساسية',
      100: 'لوازم مدرسية لطفل واحد',
      200: 'زي مدرسي كامل',
      500: 'حقيبة + لوازم مدرسية كاملة',
    },
    // Step 2: Donor Info
    yourDonation: 'تبرعك',
    yourInfo: 'معلوماتك',
    fullName: 'الاسم الكامل',
    fullNamePlaceholder: 'الاسم الرباعي',
    nameRequired: 'الاسم مطلوب',
    email: 'البريد الإلكتروني',
    emailPlaceholder: 'بريدك@email.com',
    emailRequired: 'البريد الإلكتروني مطلوب',
    emailInvalid: 'بريد إلكتروني غير صالح',
    whatsapp: 'واتساب',
    whatsappPlaceholder: '6XX XXX XXX',
    phoneRequired: 'رقم الواتساب مطلوب',
    phoneIncomplete: 'الرقم غير مكتمل',
    verificationInfo: 'ستستلم رمز التحقق وآخر المستجدات على الواتساب',
    back: '← رجوع',
    // Step 3: Verification
    whatsappVerification: 'التحقق من الواتساب',
    enterCode: 'أدخل الرمز المرسل على الواتساب',
    codeSentTo: 'تم إرسال الرمز إلى',
    verify: 'تحقق',
    resendIn: 'إعادة الإرسال بعد',
    resendCode: 'إعادة إرسال الرمز',
    modifyNumber: '← تعديل الرقم',
    codeIncomplete: 'يرجى إدخال الرمز الكامل المكون من 6 أرقام',
    // Step 4: Payment
    donationOf: 'تبرع بقيمة',
    forProject: 'للمشروع',
    choosePaymentMethod: 'اختر طريقة الدفع',
    cardPayment: 'الدفع بالبطاقة',
    cardPaymentDesc: 'فيزا، ماستركارد، Google Pay، Apple Pay، PayPal',
    cardRedirect: 'سيتم توجيهك إلى بوابة الدفع الآمنة',
    bankTransfer: 'التحويل البنكي',
    bankTransferDesc: 'CIH Bank - تحويل من بنكك',
    bank: 'البنك',
    accountHolder: 'صاحب الحساب',
    rib: 'الحساب البنكي (RIB)',
    reference: 'المرجع',
    copied: 'تم النسخ',
    important: 'مهم:',
    includeReference: 'تضمين المرجع',
    inYourTransfer: 'في التحويل الخاص بك',
    transferSteps: [
      'قم بإجراء التحويل من بنكك',
      'تضمين المرجع',
      'عد هنا لإرسال الإيصال',
    ],
    sendOnWhatsapp: 'إرسال على الواتساب',
    pay: 'ادفع',
    iMadeTransfer: 'لقد قمت بالتحويل →',
    // Step 5: Receipt
    sendReceipt: 'أرسل إيصال التحويل',
    referenceLabel: 'المرجع:',
    clickOrDrag: 'اضغط أو اسحب الإيصال هنا',
    fileTypes: 'JPG، PNG أو PDF',
    send: 'إرسال',
    verificationTime: 'سنتحقق من تبرعك خلال 24-48 ساعة',
    // Step 6: Processing
    redirectingToPayment: 'جاري التوجيه إلى بوابة الدفع الآمنة...',
    pleaseWait: 'يرجى الانتظار',
    // Step 7: Thank You
    thankYou: 'شكراً لك',
    receiptSent: 'تم إرسال الإيصال',
    teamWillVerify: 'سنتحقق من تحويلك خلال 24-48 ساعة',
    whatsappConfirmation: 'ستستلم تأكيداً عبر الواتساب',
    donationConfirmed: 'تم تأكيد تبرعك بقيمة',
    shareProject: 'شارك هذا المشروع',
    viewMyDonations: 'عرض تبرعاتي',
    discoverOtherProjects: 'اكتشف مشاريع أخرى →',
    linkCopied: 'تم نسخ الرابط!',
  },
  fr: {
    // Step 1: Amount
    backToProject: 'Retour au projet',
    projectNotFound: 'Projet non trouvé',
    funded: 'financé',
    howMuchToDonate: 'Combien souhaitez-vous donner?',
    otherAmount: 'Autre montant:',
    customAmountPlaceholder: 'Montant personnalisé',
    currency: 'DH',
    anonymousDonation: 'Faire un don anonyme',
    continue: 'Continuer',
    impactMessages: {
      50: 'Fournitures scolaires de base',
      100: 'Fournitures scolaires pour 1 enfant',
      200: 'Uniforme scolaire complet',
      500: 'Cartable + fournitures complet',
    },
    // Step 2: Donor Info
    yourDonation: 'Votre don',
    yourInfo: 'Vos informations',
    fullName: 'Nom complet',
    fullNamePlaceholder: 'Prénom Nom',
    nameRequired: 'Le nom est requis',
    email: 'Email',
    emailPlaceholder: 'votre@email.com',
    emailRequired: 'L\'email est requis',
    emailInvalid: 'Email invalide',
    whatsapp: 'WhatsApp',
    whatsappPlaceholder: '6XX XXX XXX',
    phoneRequired: 'Le numéro WhatsApp est requis',
    phoneIncomplete: 'Numéro incomplet',
    verificationInfo: 'Vous recevrez un code de vérification et les actualités du projet',
    back: '← Retour',
    // Step 3: Verification
    whatsappVerification: 'Vérification WhatsApp',
    enterCode: 'Entrez le code envoyé sur WhatsApp',
    codeSentTo: 'Code envoyé au',
    verify: 'Vérifier',
    resendIn: 'Renvoyer dans',
    resendCode: 'Renvoyer le code',
    modifyNumber: '← Modifier le numéro',
    codeIncomplete: 'Veuillez entrer le code complet à 6 chiffres',
    // Step 4: Payment
    donationOf: 'Don de',
    forProject: 'pour le projet',
    choosePaymentMethod: 'Choisissez votre méthode de paiement',
    cardPayment: 'Paiement par carte',
    cardPaymentDesc: 'Visa, Mastercard, Google Pay, Apple Pay, PayPal',
    cardRedirect: 'Vous serez redirigé vers notre partenaire de paiement sécurisé',
    bankTransfer: 'Virement bancaire',
    bankTransferDesc: 'CIH Bank - Virement depuis votre banque',
    bank: 'Banque',
    accountHolder: 'Titulaire',
    rib: 'RIB',
    reference: 'Référence',
    copied: 'Copié',
    important: 'Important:',
    includeReference: 'Incluez la référence',
    inYourTransfer: 'dans votre virement',
    transferSteps: [
      'Effectuez le virement depuis votre banque',
      'Incluez la référence',
      'Revenez ici pour envoyer le reçu',
    ],
    sendOnWhatsapp: 'Envoyer sur WhatsApp',
    pay: 'Payer',
    iMadeTransfer: 'J\'ai effectué le virement →',
    // Step 5: Receipt
    sendReceipt: 'Envoyez-nous votre reçu de virement',
    referenceLabel: 'Référence:',
    clickOrDrag: 'Cliquez ou glissez votre reçu ici',
    fileTypes: 'JPG, PNG ou PDF',
    send: 'Envoyer',
    verificationTime: 'Notre équipe vérifiera votre don sous 24-48h',
    // Step 6: Processing
    redirectingToPayment: 'Redirection vers le paiement sécurisé...',
    pleaseWait: 'Veuillez patienter',
    // Step 7: Thank You
    thankYou: 'Merci',
    receiptSent: 'Votre reçu a été envoyé',
    teamWillVerify: 'Notre équipe vérifiera votre virement sous 24-48h',
    whatsappConfirmation: 'Vous recevrez une confirmation par WhatsApp',
    donationConfirmed: 'Votre don a été confirmé',
    shareProject: 'Partager ce projet',
    viewMyDonations: 'Voir mes dons',
    discoverOtherProjects: 'Découvrir d\'autres projets →',
    linkCopied: 'Lien copié!',
  },
  en: {
    // Step 1: Amount
    backToProject: 'Back to project',
    projectNotFound: 'Project not found',
    funded: 'funded',
    howMuchToDonate: 'How much would you like to donate?',
    otherAmount: 'Other amount:',
    customAmountPlaceholder: 'Enter amount',
    currency: 'MAD',
    anonymousDonation: 'Make an anonymous donation',
    continue: 'Continue',
    impactMessages: {
      50: 'Basic school supplies',
      100: 'School supplies for 1 child',
      200: 'Complete school uniform',
      500: 'Backpack + complete supplies',
    },
    // Step 2: Donor Info
    yourDonation: 'Your donation',
    yourInfo: 'Your information',
    fullName: 'Full name',
    fullNamePlaceholder: 'First Last',
    nameRequired: 'Name is required',
    email: 'Email',
    emailPlaceholder: 'your@email.com',
    emailRequired: 'Email is required',
    emailInvalid: 'Invalid email',
    whatsapp: 'WhatsApp',
    whatsappPlaceholder: '6XX XXX XXX',
    phoneRequired: 'WhatsApp number is required',
    phoneIncomplete: 'Incomplete number',
    verificationInfo: 'You will receive a verification code and project updates',
    back: '← Back',
    // Step 3: Verification
    whatsappVerification: 'WhatsApp Verification',
    enterCode: 'Enter the code sent on WhatsApp',
    codeSentTo: 'Code sent to',
    verify: 'Verify',
    resendIn: 'Resend in',
    resendCode: 'Resend code',
    modifyNumber: '← Modify number',
    codeIncomplete: 'Please enter the complete 6-digit code',
    // Step 4: Payment
    donationOf: 'Donation of',
    forProject: 'for project',
    choosePaymentMethod: 'Choose your payment method',
    cardPayment: 'Card payment',
    cardPaymentDesc: 'Visa, Mastercard, Google Pay, Apple Pay, PayPal',
    cardRedirect: 'You will be redirected to our secure payment partner',
    bankTransfer: 'Bank transfer',
    bankTransferDesc: 'CIH Bank - Transfer from your bank',
    bank: 'Bank',
    accountHolder: 'Account holder',
    rib: 'RIB',
    reference: 'Reference',
    copied: 'Copied',
    important: 'Important:',
    includeReference: 'Include the reference',
    inYourTransfer: 'in your transfer',
    transferSteps: [
      'Make the transfer from your bank',
      'Include the reference',
      'Come back here to send the receipt',
    ],
    sendOnWhatsapp: 'Send on WhatsApp',
    pay: 'Pay',
    iMadeTransfer: 'I made the transfer →',
    // Step 5: Receipt
    sendReceipt: 'Send us your transfer receipt',
    referenceLabel: 'Reference:',
    clickOrDrag: 'Click or drag your receipt here',
    fileTypes: 'JPG, PNG or PDF',
    send: 'Send',
    verificationTime: 'Our team will verify your donation within 24-48h',
    // Step 6: Processing
    redirectingToPayment: 'Redirecting to secure payment...',
    pleaseWait: 'Please wait',
    // Step 7: Thank You
    thankYou: 'Thank you',
    receiptSent: 'Your receipt has been sent',
    teamWillVerify: 'Our team will verify your transfer within 24-48h',
    whatsappConfirmation: 'You will receive confirmation via WhatsApp',
    donationConfirmed: 'Your donation of',
    hasBeenConfirmed: 'has been confirmed',
    shareProject: 'Share this project',
    viewMyDonations: 'View my donations',
    discoverOtherProjects: 'Discover other projects →',
    linkCopied: 'Link copied!',
  },
};

// Step 1: Choose Amount
const DonationAmount = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { getProjectById, updateDonation, currentDonation, formatCurrency, associationInfo, language, isAuthenticated, currentUser } = useApp();
  const project = getProjectById(projectId);

  const [amount, setAmount] = useState(currentDonation?.amount || '');
  const [isAnonymous, setIsAnonymous] = useState(currentDonation?.isAnonymous || false);
  const [customAmount, setCustomAmount] = useState('');

  const t = translations[language] || translations.ar;
  const isRTL = language === 'ar';
  const ArrowIcon = isRTL ? ArrowRight : ArrowLeft;

  const presetAmounts = [50, 100, 200, 500];

  const handleAmountSelect = (amt) => {
    setAmount(amt);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCustomAmount(value);
      setAmount(value ? parseInt(value) : '');
    }
  };

  const handleContinue = () => {
    if (amount && amount >= 10) {
      // Check if user is authenticated
      if (!isAuthenticated) {
        // Redirect to login with redirect back to donation
        navigate(`/connexion?redirect=/don/${projectId}/montant`);
        return;
      }
      
      updateDonation({ amount: parseInt(amount), isAnonymous });
      navigate(`/don/${projectId}/paiement`);
    }
  };

  if (!project) return <div className="min-h-screen flex items-center justify-center text-gray-600">{t.projectNotFound}</div>;

  const percentage = Math.round((project.raisedAmount / project.goalAmount) * 100);

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-lg mx-auto px-4">
        {/* Back */}
        <Link to={`/projets/${projectId}`} className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowIcon className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t.backToProject}
        </Link>

        {/* Project Mini Card */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6 flex items-center gap-4">
          <img src={project.mainImage} alt={project.title} className="w-20 h-20 object-cover rounded-lg" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 line-clamp-2">{project.title}</h3>
            <ProgressBar percentage={percentage} size="sm" className="mt-2" />
            <p className="text-sm text-gray-500 mt-1">{percentage}% {t.funded}</p>
          </div>
        </div>

        {/* Amount Selection */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{t.howMuchToDonate}</h2>

          {/* Preset Buttons */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {presetAmounts.map((amt) => (
              <button
                key={amt}
                onClick={() => handleAmountSelect(amt)}
                className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                  amount === amt && !customAmount
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {amt} {language === 'ar' ? '' : (language === 'en' ? 'MAD' : 'DH')}
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.otherAmount}
            </label>
            <div className="relative">
              <input
                type="text"
                value={customAmount}
                onChange={handleCustomAmountChange}
                placeholder={t.customAmountPlaceholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none"
              />
              <span className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-gray-500`}>{t.currency}</span>
            </div>
          </div>

          {/* Impact Hint */}
          {amount && amount >= 50 && t.impactMessages[amount] && (
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
              <p className="text-primary-700 text-sm">
                <strong>{amount} {t.currency}</strong> = {t.impactMessages[amount]}
              </p>
            </div>
          )}

          {/* Anonymous Checkbox */}
          <label className="flex items-center gap-3 mb-6 cursor-pointer">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-5 h-5 text-primary-500 rounded border-gray-300 focus:ring-primary-500"
            />
            <span className="text-gray-700">{t.anonymousDonation}</span>
          </label>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!amount || amount < 10}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAuthenticated ? t.continue : (language === 'ar' ? 'تسجيل الدخول للتبرع' : language === 'fr' ? 'Se connecter pour donner' : 'Login to Donate')}
          </button>
          
          {!isAuthenticated && (
            <p className="text-center text-sm text-gray-500 mt-3">
              {language === 'ar' ? 'يجب تسجيل الدخول أولاً للتبرع' : language === 'fr' ? 'Connexion requise pour faire un don' : 'Login required to donate'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// Step 2: Donor Information
const DonorInfo = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { currentDonation, updateDonation, formatCurrency, language } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+212',
  });
  const [errors, setErrors] = useState({});

  const t = translations[language] || translations.ar;
  const isRTL = language === 'ar';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setFormData(prev => ({ ...prev, phone: value }));
    }
  };

  const handleCountryCodeChange = (code) => {
    setFormData(prev => ({ ...prev, countryCode: code }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t.nameRequired;
    if (!formData.email.trim()) {
      newErrors.email = t.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.emailInvalid;
    }
    if (!formData.phone) {
      newErrors.phone = t.phoneRequired;
    } else if (formData.phone.length < 9) {
      newErrors.phone = t.phoneIncomplete;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      updateDonation({ donorInfo: formData });
      navigate(`/don/${projectId}/verification`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-lg mx-auto px-4">
        {/* Amount Summary */}
        <div className="bg-primary-500 text-white rounded-xl p-4 mb-6 text-center">
          <p className="text-sm opacity-90">{t.yourDonation}</p>
          <p className="text-3xl font-bold">{formatCurrency(currentDonation?.amount || 0)}</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{t.yourInfo}</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.fullName} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t.fullNamePlaceholder}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.email} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t.emailPlaceholder}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.whatsapp} <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <CountryCodeSelector
                  value={formData.countryCode}
                  onChange={handleCountryCodeChange}
                  language={language}
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder={t.whatsappPlaceholder}
                  className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none ${isRTL ? 'rounded-r-none' : 'rounded-l-none'} ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              <p className="text-xs text-gray-500 mt-2">
                {t.verificationInfo}
              </p>
            </div>
          </div>

          <button
            onClick={handleContinue}
            className="w-full btn-primary mt-6"
          >
            {t.continue}
          </button>

          <button
            onClick={() => navigate(-1)}
            className="w-full text-center text-gray-600 mt-4 hover:text-gray-900"
          >
            {t.back}
          </button>
        </div>
      </div>
    </div>
  );
};

// Step 3: WhatsApp Verification
const DonationVerification = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { currentDonation, updateDonation, language } = useApp();

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(45);
  const [error, setError] = useState('');

  const t = translations[language] || translations.ar;
  const isRTL = language === 'ar';

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCodeChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      setError('');

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleVerify = () => {
    const fullCode = code.join('');
    if (fullCode.length === 6) {
      // Simulate verification - in real app, validate against backend
      navigate(`/don/${projectId}/paiement`);
    } else {
      setError(t.codeIncomplete);
    }
  };

  const handleResend = () => {
    if (countdown === 0) {
      setCountdown(45);
      // Simulate resend
    }
  };

  const phoneDisplay = currentDonation?.donorInfo?.phone 
    ? `+212 ${currentDonation.donorInfo.phone.slice(0, 1)}XX XXX ${currentDonation.donorInfo.phone.slice(-2)}`
    : '+212 6XX XXX XXX';

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-lg mx-auto px-4">
        <div className="bg-white rounded-xl p-8 shadow-sm text-center">
          {/* WhatsApp Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-10 h-10 text-green-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t.whatsappVerification}
          </h2>
          <p className="text-gray-600 mb-6">
            {t.enterCode}
          </p>

          <p className="text-sm text-gray-500 mb-8">
            {t.codeSentTo} <span className="font-medium text-gray-700">{phoneDisplay}</span>
          </p>

          {/* Code Inputs */}
          <div className="flex justify-center gap-2 mb-6" dir="ltr">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
              />
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          <button
            onClick={handleVerify}
            className="w-full btn-primary mb-4"
          >
            {t.verify}
          </button>

          <div className="space-y-2">
            {countdown > 0 ? (
              <p className="text-sm text-gray-500">
                {t.resendIn} <span className="font-medium">0:{countdown.toString().padStart(2, '0')}</span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                className="text-primary-600 font-medium hover:underline"
              >
                {t.resendCode}
              </button>
            )}
            <p>
              <button
                onClick={() => navigate(-1)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                {t.modifyNumber}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Step 4: Payment Method
const PaymentMethod = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { currentDonation, updateDonation, formatCurrency, associationInfo, language, isAuthenticated, currentUser } = useApp();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [copied, setCopied] = useState(null);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  const t = translations[language] || translations.ar;
  const isRTL = language === 'ar';

  // Whop payment link - using the provided test link
  const WHOP_PAYMENT_LINK = 'https://whop.com/checkout/plan_OvlBK7X2jX7DO';

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const openPaymentPopup = () => {
    const width = 500;
    const height = 700;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    
    const popup = window.open(
      WHOP_PAYMENT_LINK,
      'WhopPayment',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
    );
    
    if (popup) {
      updateDonation({ method: 'card' });
      setShowPaymentPopup(true);
      
      // Check if popup is closed
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          setShowPaymentPopup(false);
          // Navigate to thank you page after popup closes
          navigate(`/don/${projectId}/merci`);
        }
      }, 1000);
    } else {
      // Fallback if popup blocked
      window.location.href = WHOP_PAYMENT_LINK;
    }
  };

  const handleContinue = () => {
    if (selectedMethod === 'card') {
      openPaymentPopup();
    } else if (selectedMethod === 'transfer') {
      updateDonation({ method: 'transfer' });
      navigate(`/don/${projectId}/recu`);
    }
  };

  const reference = `DON-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-lg mx-auto px-4">
        {/* Summary */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <p className="text-sm text-gray-600">{t.donationOf} <span className="font-semibold">{formatCurrency(currentDonation?.amount || 0)}</span> {t.forProject}</p>
          <p className="font-semibold text-gray-900">#{projectId}</p>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-6">{t.choosePaymentMethod}</h2>

        {/* Card Option - Whop Payment */}
        <div
          onClick={() => setSelectedMethod('card')}
          className={`bg-white rounded-xl p-6 shadow-sm cursor-pointer transition-all mb-4 ${
            selectedMethod === 'card' ? 'ring-2 ring-primary-500' : 'hover:shadow-md'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{t.cardPayment}</h3>
              <p className="text-sm text-gray-500">{t.cardPaymentDesc}</p>
              {selectedMethod === 'card' && (
                <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-700 font-medium">
                    {language === 'ar' ? 'سيتم فتح نافذة الدفع الآمنة' : language === 'fr' ? 'Une fenêtre de paiement sécurisée s\'ouvrira' : 'A secure payment window will open'}
                  </p>
                  <p className="text-xs text-purple-600 mt-1">
                    Powered by Whop
                  </p>
                </div>
              )}
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              selectedMethod === 'card' ? 'border-primary-500 bg-primary-500' : 'border-gray-300'
            }`}>
              {selectedMethod === 'card' && <Check className="w-4 h-4 text-white" />}
            </div>
          </div>
        </div>

        {/* Transfer Option */}
        <div 
          onClick={() => setSelectedMethod('transfer')}
          className={`bg-white rounded-xl shadow-sm cursor-pointer transition-all mb-6 ${
            selectedMethod === 'transfer' ? 'ring-2 ring-primary-500' : 'hover:shadow-md'
          }`}
        >
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{t.bankTransfer}</h3>
                <p className="text-sm text-gray-500">{t.bankTransferDesc}</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                selectedMethod === 'transfer' ? 'border-primary-500 bg-primary-500' : 'border-gray-300'
              }`}>
                {selectedMethod === 'transfer' && <Check className="w-4 h-4 text-white" />}
              </div>
            </div>
          </div>

          {selectedMethod === 'transfer' && (
            <div className="px-6 pb-6">
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                {[
                  { label: t.bank, value: associationInfo.bankName },
                  { label: t.accountHolder, value: associationInfo.accountHolder },
                  { label: t.rib, value: associationInfo.rib },
                  { label: t.reference, value: reference },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500">{item.label}</p>
                      <p className="font-mono text-sm font-medium">{item.value}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(item.value, item.label);
                      }}
                      className="p-2 hover:bg-gray-200 rounded transition-colors"
                    >
                      {copied === item.label ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-3">
                <p className="text-sm text-orange-800">
                  <strong>{t.important}</strong> {t.includeReference} <span className="font-mono">{reference}</span> {t.inYourTransfer}
                </p>
              </div>

              <ol className={`mt-4 space-y-2 text-sm text-gray-600 ${isRTL ? 'list-inside' : ''}`}>
                {t.transferSteps.map((step, idx) => (
                  <li key={idx}>{idx + 1}. {step} <span className="font-mono">{idx === 1 ? reference : ''}</span></li>
                ))}
              </ol>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`https://wa.me/${associationInfo.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Bonjour, voici mes coordonnées pour le virement:\n${t.reference}: ${reference}\n${language === 'ar' ? 'المبلغ' : 'Montant'}: ${currentDonation?.amount} DH`)}`, '_blank');
                }}
                className="w-full mt-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
              >
                <MessageCircle className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t.sendOnWhatsapp}
              </button>
            </div>
          )}
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedMethod}
          className="w-full btn-primary disabled:opacity-50"
        >
          {selectedMethod === 'card' ? `${t.pay} ${formatCurrency(currentDonation?.amount || 0)}` : t.iMadeTransfer}
        </button>
      </div>
    </div>
  );
};

// Step 5a: Receipt Upload
const ReceiptUpload = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { currentDonation, formatCurrency, completeDonation, language } = useApp();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const t = translations[language] || translations.ar;
  const isRTL = language === 'ar';

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    completeDonation();
    navigate(`/don/${projectId}/merci`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-lg mx-auto px-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{t.sendReceipt}</h2>
          
          <div className="bg-gray-100 rounded-lg p-3 mb-6">
            <p className="text-sm text-gray-600">{t.referenceLabel} <span className="font-mono font-medium">DON-2024-0847</span></p>
          </div>

          {!previewUrl ? (
            <label className="block w-full border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-all">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-700 font-medium mb-1">{t.clickOrDrag}</p>
              <p className="text-sm text-gray-500">{t.fileTypes}</p>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="relative">
              <img src={previewUrl} alt="Receipt preview" className="w-full rounded-lg" />
              <button
                onClick={() => {
                  setUploadedFile(null);
                  setPreviewUrl(null);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          )}

          {uploadedFile && (
            <button
              onClick={handleSubmit}
              className="w-full btn-primary mt-6"
            >
              {t.send}
            </button>
          )}

          <p className="text-sm text-gray-500 text-center mt-4">
            {t.verificationTime}
          </p>
        </div>
      </div>
    </div>
  );
};

// Step 5b: Processing
const PaymentProcessing = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { completeDonation, language } = useApp();

  const t = translations[language] || translations.ar;

  useEffect(() => {
    const timer = setTimeout(() => {
      completeDonation();
      navigate(`/don/${projectId}/merci`);
    }, 3000);
    return () => clearInterval(timer);
  }, [navigate, projectId, completeDonation]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{t.redirectingToPayment}</h2>
        <p className="text-gray-500">{t.pleaseWait}</p>
      </div>
    </div>
  );
};

// Step 6: Thank You
const DonationThankYou = () => {
  const navigate = useNavigate();
  const { formatCurrency, currentDonation, language } = useApp();
  const [showToast, setShowToast] = useState(false);

  const t = translations[language] || translations.ar;
  const isRTL = language === 'ar';

  const handleShare = (platform) => {
    if (platform === 'copy') {
      navigator.clipboard.writeText(window.location.origin + '/projets');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  const isTransfer = currentDonation?.method === 'transfer';

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-lg mx-auto px-4 text-center">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {t.thankYou} {currentDonation?.donorInfo?.name?.split(' ')[0] || ''}! 💚
        </h1>

        {isTransfer ? (
          <div className="space-y-2 mb-6">
            <p className="text-lg text-gray-700">{t.receiptSent}</p>
            <p className="text-gray-600">{t.teamWillVerify}</p>
            <p className="text-gray-600">{t.whatsappConfirmation}</p>
          </div>
        ) : (
          <div className="space-y-2 mb-6">
            <p className="text-lg text-gray-700">
              {language === 'en' ? `${t.donationConfirmed} ${formatCurrency(currentDonation?.amount || 0)} ${t.hasBeenConfirmed}` : `${t.donationConfirmed} ${formatCurrency(currentDonation?.amount || 0)} ${language === 'ar' ? 'تم تأكيده' : 'a été confirmé'}`}
            </p>
            <p className="text-gray-600">{t.whatsappConfirmation}</p>
          </div>
        )}

        {/* Share Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <p className="font-semibold text-gray-900 mb-4">{t.shareProject}</p>
          <div className="flex justify-center gap-3">
            <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600">
              <MessageCircle className="w-6 h-6" />
            </button>
            <button className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700">
              <Share2 className="w-6 h-6" />
            </button>
            <button 
              onClick={() => handleShare('copy')}
              className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-300"
            >
              <Copy className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/profil')}
            className="w-full btn-primary"
          >
            {t.viewMyDonations}
          </button>
          <button
            onClick={() => navigate('/projets')}
            className="w-full text-primary-600 font-medium hover:underline"
          >
            {t.discoverOtherProjects}
          </button>
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg">
          {t.linkCopied}
        </div>
      )}
    </div>
  );
};

// Main Donation Flow Router
const DonationFlow = () => {
  return (
    <Routes>
      <Route path="montant" element={<DonationAmount />} />
      <Route path="informations" element={<DonorInfo />} />
      <Route path="verification" element={<DonationVerification />} />
      <Route path="paiement" element={<PaymentMethod />} />
      <Route path="recu" element={<ReceiptUpload />} />
      <Route path="processing" element={<PaymentProcessing />} />
      <Route path="merci" element={<DonationThankYou />} />
    </Routes>
  );
};

export default DonationFlow;
