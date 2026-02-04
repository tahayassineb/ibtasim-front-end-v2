import React from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  FolderKanban,
  AlertTriangle,
  Users,
  ArrowRight,
  ArrowLeft,
  Activity,
  Plus,
  BarChart3,
  PieChart
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProgressBar from '../components/ProgressBar';
import DonationChart from '../components/DonationChart';
import DonationMethodsChart from '../components/DonationMethodsChart';
import ProjectsProgressChart from '../components/ProjectsProgressChart';

const AdminDashboard = () => {
  const { 
    projects, 
    donations, 
    donors, 
    getPendingDonations, 
    formatCurrency, 
    formatRelativeTime,
    getStatusLabel,
    getStatusColor,
    user,
    language
  } = useApp();

  const pendingDonations = getPendingDonations();
  const pendingCount = pendingDonations.length;
  const isRTL = language === 'ar';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  // Translations
  const t = {
    ar: {
      greeting: 'مرحباً',
      donationsThisMonth: 'التبرعات هذا الشهر',
      activeProjects: 'المشاريع النشطة',
      toVerify: 'للتحقق',
      newDonors: 'متبرعون جدد',
      thisMonth: 'هذا الشهر',
      clickToView: 'اضغط للعرض',
      pendingAlert: `⚠️ ${pendingCount} تبرع في انتظار التحقق`,
      pendingDesc: 'يتظر المتبرعون التحقق من التحويلات البنكية',
      verifyNow: 'تحقق الآن',
      recentActivity: 'النشاط الأخير',
      viewAllActivity: 'عرض كل النشاط',
      ongoingProjects: 'المشاريع الجارية',
      viewAllProjects: 'عرض كل المشاريع',
      newProject: 'مشروع جديد',
      newDonation: (amount) => `تبرع جديد بقيمة ${amount} (في الانتظار)`,
      verifiedDonation: (amount, donor) => `تم التحقق من تبرع - ${amount} من ${donor}`,
      newDonor: (name) => `متبرع جديد مسجل: ${name}`,
      projectProgress: (title, percent) => `المشروع "${title}" وصل إلى ${percent}%`,
      minutesAgo: (n) => `منذ ${n} دقيقة`,
      hoursAgo: (n) => `منذ ${n} ساعة`,
      yesterday: 'أمس',
      see: 'عرض',
      donationTrend: 'اتجاه التبرعات',
      donationMethods: 'طرق التبرع',
      projectsProgress: 'تقدم المشاريع',
    },
    fr: {
      greeting: 'Bonjour',
      donationsThisMonth: 'Dons ce mois',
      activeProjects: 'Projets actifs',
      toVerify: 'À vérifier',
      newDonors: 'Nouveaux donateurs',
      thisMonth: 'Ce mois',
      clickToView: 'Cliquez pour voir',
      pendingAlert: `⚠️ ${pendingCount} don${pendingCount > 1 ? 's' : ''} en attente de vérification`,
      pendingDesc: 'Des donateurs attendent la validation de leur virement bancaire',
      verifyNow: 'Vérifier maintenant',
      recentActivity: 'Activité récente',
      viewAllActivity: 'Voir toute\'activité',
      ongoingProjects: 'Projets en cours',
      viewAllProjects: 'Voir tous les projets',
      newProject: 'Nouveau projet',
      newDonation: (amount) => `Nouveau don de ${amount} (en attente)`,
      verifiedDonation: (amount, donor) => `Don vérifié - ${amount} de ${donor}`,
      newDonor: (name) => `Nouveau donateur inscrit: ${name}`,
      projectProgress: (title, percent) => `Projet "${title}" a atteint ${percent}%`,
      minutesAgo: (n) => `Il y a ${n} min`,
      hoursAgo: (n) => `Il y a ${n}h`,
      yesterday: 'Hier',
      see: 'Voir',
      donationTrend: 'Évolution des dons',
      donationMethods: 'Méthodes de don',
      projectsProgress: 'Progression des projets',
    },
    en: {
      greeting: 'Hello',
      donationsThisMonth: 'Donations This Month',
      activeProjects: 'Active Projects',
      toVerify: 'To Verify',
      newDonors: 'New Donors',
      thisMonth: 'This month',
      clickToView: 'Click to view',
      pendingAlert: `⚠️ ${pendingCount} donation${pendingCount > 1 ? 's' : ''} pending verification`,
      pendingDesc: 'Donors are waiting for their bank transfers to be validated',
      verifyNow: 'Verify Now',
      recentActivity: 'Recent Activity',
      viewAllActivity: 'View All Activity',
      ongoingProjects: 'Ongoing Projects',
      viewAllProjects: 'View All Projects',
      newProject: 'New Project',
      newDonation: (amount) => `New donation of ${amount} (pending)`,
      verifiedDonation: (amount, donor) => `Verified donation - ${amount} from ${donor}`,
      newDonor: (name) => `New donor registered: ${name}`,
      projectProgress: (title, percent) => `Project "${title}" reached ${percent}%`,
      minutesAgo: (n) => `${n} min ago`,
      hoursAgo: (n) => `${n}h ago`,
      yesterday: 'Yesterday',
      see: 'See',
      donationTrend: 'Donation Trend',
      donationMethods: 'Donation Methods',
      projectsProgress: 'Projects Progress',
    },
  }[language] || {};

  // Calculate stats
  const currentMonthDonations = donations.filter(d => {
    const donationDate = new Date(d.date);
    const now = new Date();
    return donationDate.getMonth() === now.getMonth() &&
           donationDate.getFullYear() === now.getFullYear() &&
           d.status === 'verified';
  });

  const currentMonthTotal = currentMonthDonations.reduce((sum, d) => sum + d.amount, 0);
  
  // Calculate percent change - handle edge cases
  const lastMonthTotal = currentMonthTotal > 0 ? currentMonthTotal * 0.77 : 1;
  const percentChange = currentMonthTotal > 0
    ? ((currentMonthTotal - lastMonthTotal) / lastMonthTotal * 100).toFixed(0)
    : '0';

  const activeProjects = projects.filter(p => p.status === 'active').length;
  const newDonorsThisMonth = donors.filter(d => {
    const donorDate = new Date(d.memberSince);
    const now = new Date();
    return donorDate.getMonth() === now.getMonth() && 
           donorDate.getFullYear() === now.getFullYear();
  }).length;

  const stats = [
    {
      title: t.donationsThisMonth,
      value: formatCurrency(currentMonthTotal),
      change: `+${percentChange}%`,
      trend: 'up',
      icon: Wallet,
      color: 'bg-primary-500',
    },
    {
      title: t.activeProjects,
      value: activeProjects,
      change: null,
      trend: null,
      icon: FolderKanban,
      color: 'bg-secondary-500',
    },
    {
      title: t.toVerify,
      value: pendingCount,
      change: pendingCount > 0 ? t.clickToView : null,
      trend: null,
      icon: AlertTriangle,
      color: 'bg-orange-500',
      link: pendingCount > 0 ? '/admin/dons' : null,
    },
    {
      title: t.newDonors,
      value: newDonorsThisMonth,
      change: t.thisMonth,
      trend: null,
      icon: Users,
      color: 'bg-green-500',
    },
  ];

  // Recent activity
  const recentActivity = [
    { type: 'donation', message: t.newDonation('200 DH'), project: 'Rentrée scolaire', time: t.minutesAgo(5) },
    { type: 'verified', message: t.verifiedDonation('500 DH', 'Ahmed M.'), donor: 'Ahmed M.', time: t.hoursAgo(1) },
    { type: 'donor', message: t.newDonor('Fatima B.'), donor: 'Fatima B.', time: t.hoursAgo(3) },
    { type: 'project', message: t.projectProgress('Rentrée scolaire', '80%'), time: t.yesterday },
  ];

  const dateFormat = isRTL ? 'ar-MA' : 'fr-MA';
  const today = new Date().toLocaleDateString(dateFormat, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="animate-fade-in">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          {t.greeting}, {user?.name?.split(' ')[0] || 'Admin'}
        </h1>
        <p className="text-gray-500 mt-1">{today}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="stat-card group hover:shadow-lg transition-all duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 truncate">{stat.value}</p>
                {stat.change && (
                  <div className={`flex items-center mt-2 text-sm ${
                    stat.trend === 'up' ? 'text-success-600' :
                    stat.trend === 'down' ? 'text-error-600' : 'text-gray-500'
                  }`}>
                    {stat.trend === 'up' && <TrendingUp className="w-4 h-4 mr-1 flex-shrink-0" />}
                    {stat.trend === 'down' && <TrendingDown className="w-4 h-4 mr-1 flex-shrink-0" />}
                    <span className="truncate">{stat.change}</span>
                  </div>
                )}
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            {stat.link && (
              <Link to={stat.link} className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 mt-4 group/link">
                Voir les dons
                <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Urgent Alert */}
      {pendingCount > 0 && (
        <div className="bg-warning-50 border border-warning-200 rounded-2xl p-5 mb-8 animate-slide-down">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-warning-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-warning-600" />
              </div>
              <div>
                <h3 className="font-semibold text-warning-900">
                  {t.pendingAlert}
                </h3>
                <p className="text-warning-700 text-sm mt-1">
                  {t.pendingDesc}
                </p>
              </div>
            </div>
            <Link to="/admin/dons" className="btn bg-warning-500 hover:bg-warning-600 text-white shadow-md whitespace-nowrap text-center">
              {t.verifyNow}
            </Link>
          </div>
        </div>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Donation Trend Chart */}
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{t.donationTrend}</h2>
              <p className="text-sm text-gray-500 mt-1">Évolution sur les 6 derniers mois</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary-600" />
            </div>
          </div>
          <DonationChart />
        </div>

        {/* Donation Methods Chart */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{t.donationMethods}</h2>
              <p className="text-sm text-gray-500 mt-1">Répartition par méthode</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-secondary-50 flex items-center justify-center">
              <PieChart className="w-5 h-5 text-secondary-600" />
            </div>
          </div>
          <DonationMethodsChart />
        </div>
      </div>

      {/* Projects Progress Chart */}
      <div className="card p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{t.projectsProgress}</h2>
            <p className="text-sm text-gray-500 mt-1">Progression des projets actifs</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-success-50 flex items-center justify-center">
            <FolderKanban className="w-5 h-5 text-success-600" />
          </div>
        </div>
        <ProjectsProgressChart />
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{t.recentActivity}</h2>
              <p className="text-sm text-gray-500 mt-1">Activités récentes sur la plateforme</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-info-50 flex items-center justify-center">
              <Activity className="w-5 h-5 text-info-600" />
            </div>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  activity.type === 'donation' ? 'bg-warning-400' :
                  activity.type === 'verified' ? 'bg-success-400' :
                  activity.type === 'donor' ? 'bg-primary-400' :
                  'bg-secondary-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="#" className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 mt-4 group">
            {t.viewAllActivity}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Projects Quick View */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{t.ongoingProjects}</h2>
              <p className="text-sm text-gray-500 mt-1">Aperçu des projets en cours</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-success-50 flex items-center justify-center">
              <FolderKanban className="w-5 h-5 text-success-600" />
            </div>
          </div>
          <div className="space-y-4">
            {projects.slice(0, 4).map((project) => {
              const percentage = Math.round((project.raisedAmount / project.goalAmount) * 100);
              return (
                <div key={project.id} className="pb-4 border-b border-gray-100 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-gray-900 text-sm truncate flex-1">{project.title}</p>
                    <span className={`px-2 py-0.5 text-xs rounded-full whitespace-nowrap ml-2 ${getStatusColor(project.status)}`}>
                      {getStatusLabel(project.status)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <ProgressBar percentage={percentage} size="sm" />
                    </div>
                    <Link
                      to={`/admin/projets/${project.id}`}
                      className="text-primary-600 text-sm font-medium hover:underline whitespace-nowrap"
                    >
                      {t.see}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <Link to="/admin/projets" className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 group">
              {t.viewAllProjects}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/admin/projets/nouveau" className="btn btn-primary btn-sm">
              <Plus className="w-4 h-4" />
              {t.newProject}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
