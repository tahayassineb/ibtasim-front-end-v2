import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Heart, MessageCircle, ArrowLeft, ArrowRight, User, Mail, Lock, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import CountryCodeSelector from '../components/CountryCodeSelector';

// Auto-fill Verification Code Component
const VerificationCodeInput = ({ code, setCode, error, setError, onComplete }) => {
  const inputRefs = useRef([]);

  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError('');

    // Auto-advance to next field
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if complete
    if (newCode.every(digit => digit !== '') && newCode.join('').length === 6) {
      onComplete?.(newCode.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    // Backspace on empty field goes to previous
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    // Arrow keys navigation
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pastedData) {
      const newCode = [...code];
      for (let i = 0; i < pastedData.length && i < 6; i++) {
        newCode[i] = pastedData[i];
      }
      setCode(newCode);
      // Focus the next empty field or last field
      const nextEmptyIndex = newCode.findIndex(d => d === '');
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex]?.focus();
      } else {
        inputRefs.current[5]?.focus();
      }
      if (pastedData.length === 6) {
        onComplete?.(pastedData);
      }
    }
  };

  return (
    <div className="flex justify-center gap-2" dir="ltr">
      {code.map((digit, index) => (
        <input
          key={index}
          ref={el => inputRefs.current[index] = el}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={`w-12 h-14 text-center text-2xl font-bold border-2 rounded-xl outline-none transition-all duration-200 ${
            digit 
              ? 'border-primary-500 bg-primary-50 text-primary-700' 
              : 'border-gray-300 bg-white text-gray-900'
          } ${error ? 'border-red-500 shake' : ''} focus:border-primary-500 focus:ring-4 focus:ring-primary-100`}
        />
      ))}
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginAsAdmin, donors, language } = useApp();
  
  // Get redirect path from query params
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get('redirect') || '/projets';
  
  const [step, setStep] = useState('register'); // 'register' | 'verify'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+212',
    country: 'MA'
  });
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(45);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const translations = {
    ar: {
      loginTitle: 'إنشاء حساب',
      verifyTitle: 'تأكيد الرقم',
      nameLabel: 'الاسم الكامل',
      namePlaceholder: 'محمد أحمد',
      nameRequired: 'الاسم مطلوب',
      emailLabel: 'البريد الإلكتروني',
      emailPlaceholder: 'your@email.com',
      emailRequired: 'البريد الإلكتروني مطلوب',
      emailInvalid: 'بريد إلكتروني غير صالح',
      phoneLabel: 'رقم الواتساب',
      phonePlaceholder: '6XX XXX XXX',
      phoneRequired: 'رقم الهاتف مطلوب',
      phoneIncomplete: 'الرقم غير مكتمل',
      createAccount: 'إنشاء حساب',
      verifying: 'جاري التحقق...',
      codeSent: 'تم إرسال رمز التحقق إلى',
      enterCode: 'أدخل الرمز المكون من 6 أرقام',
      verify: 'تأكيد',
      resendIn: 'إعادة الإرسال بعد',
      resendCode: 'إعادة إرسال الرمز',
      back: '← رجوع',
      haveAccount: 'لديك حساب؟',
      login: 'تسجيل الدخول',
      agreement: 'بإنشاء حساب، أنت توافق على',
      terms: 'شروط الاستخدام',
      and: 'و',
      privacy: 'سياسة الخصوصية',
      codeIncomplete: 'الرجاء إدخال الرمز كاملاً',
      codeInvalid: 'الرمز غير صحيح',
      success: 'تم إنشاء الحساب بنجاح!',
      requiredForDonation: 'مطلوب للتبرع - أنشئ حسابك في دقيقة واحدة'
    },
    fr: {
      loginTitle: 'Créer un compte',
      verifyTitle: 'Vérification',
      nameLabel: 'Nom complet',
      namePlaceholder: 'Prénom Nom',
      nameRequired: 'Le nom est requis',
      emailLabel: 'Email',
      emailPlaceholder: 'votre@email.com',
      emailRequired: 'L\'email est requis',
      emailInvalid: 'Email invalide',
      phoneLabel: 'Numéro WhatsApp',
      phonePlaceholder: '6XX XXX XXX',
      phoneRequired: 'Le numéro est requis',
      phoneIncomplete: 'Numéro incomplet',
      createAccount: 'Créer un compte',
      verifying: 'Vérification...',
      codeSent: 'Code envoyé au',
      enterCode: 'Entrez le code à 6 chiffres',
      verify: 'Vérifier',
      resendIn: 'Renvoyer dans',
      resendCode: 'Renvoyer le code',
      back: '← Retour',
      haveAccount: 'Déjà un compte?',
      login: 'Se connecter',
      agreement: 'En créant un compte, vous acceptez',
      terms: 'les conditions d\'utilisation',
      and: 'et',
      privacy: 'la politique de confidentialité',
      codeIncomplete: 'Veuillez entrer le code complet',
      codeInvalid: 'Code invalide',
      success: 'Compte créé avec succès!',
      requiredForDonation: 'Requis pour donner - Créez votre compte en 1 minute'
    },
    en: {
      loginTitle: 'Create Account',
      verifyTitle: 'Verification',
      nameLabel: 'Full Name',
      namePlaceholder: 'First Last',
      nameRequired: 'Name is required',
      emailLabel: 'Email',
      emailPlaceholder: 'your@email.com',
      emailRequired: 'Email is required',
      emailInvalid: 'Invalid email',
      phoneLabel: 'WhatsApp Number',
      phonePlaceholder: '6XX XXX XXX',
      phoneRequired: 'Phone number is required',
      phoneIncomplete: 'Incomplete number',
      createAccount: 'Create Account',
      verifying: 'Verifying...',
      codeSent: 'Code sent to',
      enterCode: 'Enter 6-digit code',
      verify: 'Verify',
      resendIn: 'Resend in',
      resendCode: 'Resend code',
      back: '← Back',
      haveAccount: 'Already have an account?',
      login: 'Log in',
      agreement: 'By creating an account, you agree to',
      terms: 'Terms of Service',
      and: 'and',
      privacy: 'Privacy Policy',
      codeIncomplete: 'Please enter the complete code',
      codeInvalid: 'Invalid code',
      success: 'Account created successfully!',
      requiredForDonation: 'Required to donate - Create your account in 1 minute'
    }
  };

  const t = translations[language] || translations.ar;
  const isRTL = language === 'ar';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  useEffect(() => {
    if (step === 'verify' && countdown > 0) {
      const timer = setInterval(() => setCountdown(c => c - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [step, countdown]);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    // Remove all non-digits for validation
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 9;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 15) {
      setFormData(prev => ({ ...prev, phone: value }));
      setError('');
    }
  };

  const handleCountryChange = (country) => {
    setFormData(prev => ({
      ...prev,
      countryCode: country.dialCode,
      country: country.code
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      setError(t.nameRequired);
      return;
    }
    if (!formData.email.trim()) {
      setError(t.emailRequired);
      return;
    }
    if (!validateEmail(formData.email)) {
      setError(t.emailInvalid);
      return;
    }
    if (!formData.phone) {
      setError(t.phoneRequired);
      return;
    }
    if (!validatePhone(formData.phone)) {
      setError(t.phoneIncomplete);
      return;
    }

    // Simulate sending code
    setStep('verify');
    setCountdown(45);
  };

  const handleVerify = (fullCode) => {
    const verificationCode = fullCode || code.join('');
    
    if (verificationCode.length !== 6) {
      setError(t.codeIncomplete);
      return;
    }

    setIsLoading(true);

    // Simulate API verification
    setTimeout(() => {
      // Check if user exists
      const existingDonor = donors.find(d => d.phone?.includes(formData.phone));
      
      if (existingDonor) {
        login(existingDonor);
      } else {
        // Create new user
        const newUser = {
          id: Date.now(),
          name: formData.name,
          email: formData.email,
          phone: `${formData.countryCode} ${formData.phone}`,
          country: formData.country,
          memberSince: new Date().toISOString().split('T')[0],
          donations: [],
          followedProjects: [],
          preferences: { whatsappUpdates: true, emailNews: true },
        };
        login(newUser);
      }
      
      setIsLoading(false);
      navigate(redirectTo);
    }, 1500);
  };

  const handleResend = () => {
    if (countdown === 0) {
      setCountdown(45);
      // Simulate resend
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-primary-500/30">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {step === 'register' ? t.loginTitle : t.verifyTitle}
          </h1>
          {step === 'register' && (
            <p className="text-gray-500 mt-2 text-sm">{t.requiredForDonation}</p>
          )}
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-8">
          {step === 'register' ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.nameLabel}
                </label>
                <div className="relative">
                  <User className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t.namePlaceholder}
                    className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all`}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.emailLabel}
                </label>
                <div className="relative">
                  <Mail className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.emailPlaceholder}
                    className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all`}
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.phoneLabel}
                </label>
                <div className="flex gap-2">
                  <CountryCodeSelector
                    selectedCountry={formData.country}
                    onSelect={handleCountryChange}
                    language={language}
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder={t.phonePlaceholder}
                    className={`flex-1 py-3 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all`}
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {t.createAccount}
                <ArrowIcon className="w-5 h-5" />
              </button>

              {/* Terms Agreement */}
              <p className="text-center text-xs text-gray-500 leading-relaxed">
                {t.agreement}{' '}
                <Link to="/terms" className="text-primary-600 hover:underline">{t.terms}</Link>{' '}
                {t.and}{' '}
                <Link to="/privacy" className="text-primary-600 hover:underline">{t.privacy}</Link>
              </p>
            </form>
          ) : (
            <div className="space-y-6">
              <button
                onClick={() => setStep('register')}
                className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ArrowLeft className={`w-4 h-4 ${isRTL ? 'ml-1 rotate-180' : 'mr-1'}`} />
                {t.back}
              </button>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-gray-600 mb-1">
                  {t.codeSent}
                </p>
                <p className="font-semibold text-gray-900">
                  {formData.countryCode} {formData.phone}
                </p>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500 mb-4">{t.enterCode}</p>
                <VerificationCodeInput
                  code={code}
                  setCode={setCode}
                  error={error}
                  setError={setError}
                  onComplete={handleVerify}
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">{error}</p>
              )}

              <button
                onClick={() => handleVerify()}
                disabled={isLoading || code.join('').length !== 6}
                className="w-full py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t.verifying}
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    {t.verify}
                  </>
                )}
              </button>

              <p className="text-center text-sm">
                {countdown > 0 ? (
                  <span className="text-gray-500">
                    {t.resendIn} <span className="font-medium text-gray-700">{formatTime(countdown)}</span>
                  </span>
                ) : (
                  <button
                    onClick={handleResend}
                    className="text-primary-600 font-medium hover:underline"
                  >
                    {t.resendCode}
                  </button>
                )}
              </p>
            </div>
          )}
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-primary-600 transition-colors"
          >
            ← {language === 'ar' ? 'العودة للرئيسية' : language === 'fr' ? 'Retour à l\'accueil' : 'Back to Home'}
          </Link>
        </div>

        {/* Admin quick access for demo - hidden in production */}
        <div className="mt-4 text-center">
          <button
            onClick={() => {
              loginAsAdmin({
                id: 999,
                name: 'Admin',
                email: 'admin@itassim.ma',
                role: 'admin'
              });
              navigate('/admin');
            }}
            className="text-xs text-gray-400 hover:text-primary-600 transition-colors"
          >
            [Demo] Admin Access
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
