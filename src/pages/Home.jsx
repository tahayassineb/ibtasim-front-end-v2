import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, ArrowLeft, Sparkles, HandHeart, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProjectCard from '../components/ProjectCard';
import AnimatedCounter from '../components/AnimatedCounter';

const Home = () => {
  const { projects, stats, associationInfo, language, isAuthenticated } = useApp();
  
  const featuredProjects = projects.filter(p => p.featured && p.status === 'active').slice(0, 3);

  // Translations
  const t = {
    ar: {
      trustBadge: `جمعية معتمدة | تأسست عام ${associationInfo.foundedYear}`,
      heroTitle: 'حياة أطفالنا',
      heroSubtitle: 'هدفكم',
      heroDesc: 'نسعى لتقديم مستقبل أفضل للأطفال الأيتام والعائلات المحتاجة في المغرب. كل تبرع يصنع فرقاً حقيقياً.',
      discoverProjects: 'اكتشف المشاريع',
      donateNow: 'تبرع الآن',
      startNow: 'ابدأ الآن',
      // Stats
      collected: 'مجموع التبرعات',
      beneficiaries: 'مستفيد',
      projectsCompleted: 'مشروع',
      // Projects
      ourProjects: 'مشاريعنا',
      projectsDesc: 'قضايا تحتاج إلى دعمكم',
      seeAllProjects: 'عرض الكل',
      // How it works
      howItWorks: 'كيفية التبرع',
      step1Title: 'اختر مشروعاً',
      step1Desc: 'تصفح المشاريع واختر القضية التي تلامس قلبك',
      step2Title: 'سجل معلوماتك',
      step2Desc: 'أدخل بياناتك للتواصل وإرسال إيصالات التبرع',
      step3Title: 'أتمم التبرع',
      step3Desc: 'ادفع بأمان عبر البطاقة أو التحويل البنكي',
      // CTA
      ctaTitle: 'كن جزءاً من التغيير',
      ctaDesc: 'معاً نستطيع أن نمنح الأطفال الأيتام حياة كريمة ومستقبلاً مشرقاً',
      createAccount: 'أنشئ حسابك',
      // Dua
      duaText: '"أنا وكافل اليتيم في الجنة هكذا"',
      duaSource: 'رواه البخاري ومسلم',
    },
    fr: {
      trustBadge: `Association reconnue | Créée en ${associationInfo.foundedYear}`,
      heroTitle: 'La vie de nos enfants',
      heroSubtitle: 'Votre objectif',
      heroDesc: 'Nous nous efforçons d\'offrir un avenir meilleur aux enfants orphelins et aux familles dans le besoin au Maroc. Chaque don fait une différence réelle.',
      discoverProjects: 'Découvrir les projets',
      donateNow: 'Faire un don',
      startNow: 'Commencer',
      // Stats
      collected: 'Collectés',
      beneficiaries: 'Bénéficiaires',
      projectsCompleted: 'Projets',
      // Projects
      ourProjects: 'Nos projets',
      projectsDesc: 'Causes qui ont besoin de votre soutien',
      seeAllProjects: 'Voir tout',
      // How it works
      howItWorks: 'Comment donner',
      step1Title: 'Choisissez un projet',
      step1Desc: 'Parcourez nos projets et choisissez la cause qui vous touche',
      step2Title: 'Inscrivez-vous',
      step2Desc: 'Entrez vos coordonnées pour recevoir les reçus de don',
      step3Title: 'Finalisez',
      step3Desc: 'Payez en toute sécurité par carte ou virement bancaire',
      // CTA
      ctaTitle: 'Soyez le changement',
      ctaDesc: 'Ensemble, nous pouvons offrir aux enfants orphelins une vie digne et un avenir prometteur',
      createAccount: 'Créer un compte',
      // Dua
      duaText: '"Celui qui prend en charge un orphelin et moi, nous serons ainsi au Paradis"',
      duaSource: 'Rapporté par Al-Bukhari et Muslim',
    },
    en: {
      trustBadge: `Registered Association | Founded in ${associationInfo.foundedYear}`,
      heroTitle: 'Our children\'s lives',
      heroSubtitle: 'Your goal',
      heroDesc: 'We strive to provide a better future for orphaned children and families in need across Morocco. Every donation makes a real difference.',
      discoverProjects: 'Discover Projects',
      donateNow: 'Donate Now',
      startNow: 'Get Started',
      // Stats
      collected: 'Raised',
      beneficiaries: 'Beneficiaries',
      projectsCompleted: 'Projects',
      // Projects
      ourProjects: 'Our Projects',
      projectsDesc: 'Causes that need your support',
      seeAllProjects: 'See All',
      // How it works
      howItWorks: 'How to Donate',
      step1Title: 'Choose a Project',
      step1Desc: 'Browse our projects and select the cause that touches your heart',
      step2Title: 'Register',
      step2Desc: 'Enter your details to receive donation receipts',
      step3Title: 'Complete',
      step3Desc: 'Pay securely by card or bank transfer',
      // CTA
      ctaTitle: 'Be the Change',
      ctaDesc: 'Together, we can give orphaned children a dignified life and a promising future',
      createAccount: 'Create Account',
      // Dua
      duaText: '"I and the caretaker of the orphan will be in Paradise like this"',
      duaSource: 'Reported by Al-Bukhari and Muslim',
    },
  }[language] || {};

  const isRTL = language === 'ar';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const steps = [
    { icon: Heart, title: t.step1Title, desc: t.step1Desc },
    { icon: Users, title: t.step2Title, desc: t.step2Desc },
    { icon: HandHeart, title: t.step3Title, desc: t.step3Desc },
  ];

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section - Clean Apple Style */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80"
            alt="Children"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-32 text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-10 border border-white/10">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-white/90 text-sm font-medium tracking-wide">{t.trustBadge}</span>
          </div>

          {/* Logo */}
          <div className="mb-8">
            <img 
              src="https://nlfixnhoufntbbcccnwr.supabase.co/storage/v1/object/public/campaigns/Gemini_Generated_Image_7ce0up7ce0up7ce0-Photoroom%20(1).png"
              alt="Association Espoir"
              className="h-24 md:h-32 mx-auto drop-shadow-2xl"
            />
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight leading-none">
            {t.heroTitle}
          </h1>
          <p className="text-4xl md:text-6xl lg:text-7xl font-light text-white/80 mb-8 tracking-tight">
            {t.heroSubtitle}
          </p>

          {/* Dua */}
          <div className="mb-10">
            <p className="text-2xl md:text-3xl text-white/90 font-arabic italic leading-relaxed">
              {t.duaText}
            </p>
            <p className="text-white/50 text-sm mt-2">{t.duaSource}</p>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
            {t.heroDesc}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {isAuthenticated ? (
              <Link
                to="/projets"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 font-semibold rounded-full text-lg hover:bg-white/90 transition-all duration-300 shadow-2xl"
              >
                <Heart className="w-5 h-5 text-rose-500" />
                {t.donateNow}
                <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <>
                <Link
                  to="/connexion"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 font-semibold rounded-full text-lg hover:bg-white/90 transition-all duration-300 shadow-2xl"
                >
                  <Heart className="w-5 h-5 text-rose-500" />
                  {t.startNow}
                  <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/projets"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md text-white font-medium rounded-full text-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  {t.discoverProjects}
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </section>

      {/* Stats Section - Minimal Bar */}
      <section className="py-16 bg-gray-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                <AnimatedCounter end={stats.totalDonated} prefix="" suffix=" DH" />
              </p>
              <p className="text-sm text-gray-500">{t.collected}</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                <AnimatedCounter end={stats.beneficiaries} suffix="+" />
              </p>
              <p className="text-sm text-gray-500">{t.beneficiaries}</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                <AnimatedCounter end={stats.completedProjects} />
              </p>
              <p className="text-sm text-gray-500">{t.projectsCompleted}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                {t.ourProjects}
              </h2>
              <p className="text-xl text-gray-500">{t.projectsDesc}</p>
            </div>
            <Link
              to="/projets"
              className="inline-flex items-center gap-2 text-gray-900 font-medium hover:text-rose-600 transition-colors group"
            >
              {t.seeAllProjects}
              <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Projects Grid */}
          {featuredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} variant="premium" />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-3xl">
              <p className="text-gray-400 text-lg">Aucun projet disponible</p>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16 tracking-tight">
            {t.howItWorks}
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-lg shadow-gray-200/50 flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-7 h-7 text-rose-500" />
                </div>
                <div className="text-sm font-medium text-rose-500 mb-2">0{index + 1}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            {t.ctaTitle}
          </h2>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
            {t.ctaDesc}
          </p>
          {!isAuthenticated && (
            <Link
              to="/connexion"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gray-900 text-white font-semibold rounded-full text-lg hover:bg-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <Heart className="w-5 h-5" />
              {t.createAccount}
              <ArrowIcon className="w-5 h-5" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
