import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Card from '../components/Card';
import Badge from '../components/Badge';

// ============================================
// ADMIN DASHBOARD PAGE - Executive Overview
// ============================================

const AdminDashboard = () => {
  const { currentLanguage } = useApp();

  // Translations
  const translations = {
    ar: {
      welcome: 'مرحباً، مشرف',
      newProject: 'مشروع جديد',
      addDonation: 'إضافة تبرع',
      stats: {
        totalDonations: 'إجمالي التبرعات',
        activeProjects: 'المشاريع النشطة',
        totalDonors: 'إجمالي المتبرعين',
        pendingVerifications: 'التحقق المعلق',
      },
      trendUp: '+12%',
      trendDown: '-2%',
      steady: 'ثابت',
      actionRequired: 'يتطلب إجراء',
      donationTrends: 'اتجاهات التبرعات',
      activity30Days: 'النشاط لآخر 30 يوماً',
      daily: 'يومي',
      weekly: 'أسبوعي',
      recentDonations: 'أحدث التبرعات',
      viewAll: 'عرض الكل',
      donor: 'المتبرع',
      project: 'المشروع',
      amount: 'المبلغ',
      status: 'الحالة',
      statuses: {
        completed: 'مكتمل',
        processing: 'قيد المعالجة',
      },
    },
    fr: {
      welcome: 'Bienvenue, Admin',
      newProject: 'Nouveau Projet',
      addDonation: 'Ajouter Don',
      stats: {
        totalDonations: 'Dons Totaux',
        activeProjects: 'Projets Actifs',
        totalDonors: 'Donateurs Totaux',
        pendingVerifications: 'Vérifications En Attente',
      },
      trendUp: '+12%',
      trendDown: '-2%',
      steady: 'Stable',
      actionRequired: 'Action Requise',
      donationTrends: 'Tendances des Dons',
      activity30Days: 'Activité des 30 derniers jours',
      daily: 'Quotidien',
      weekly: 'Hebdomadaire',
      recentDonations: 'Dons Récents',
      viewAll: 'Voir Tout',
      donor: 'Donateur',
      project: 'Projet',
      amount: 'Montant',
      status: 'Statut',
      statuses: {
        completed: 'Terminé',
        processing: 'En Cours',
      },
    },
    en: {
      welcome: 'Welcome, Admin',
      newProject: 'New Project',
      addDonation: 'Add Donation',
      stats: {
        totalDonations: 'Total Donations',
        activeProjects: 'Active Projects',
        totalDonors: 'Total Donors',
        pendingVerifications: 'Pending Verifications',
      },
      trendUp: '+12%',
      trendDown: '-2%',
      steady: 'Steady',
      actionRequired: 'Action Required',
      donationTrends: 'Donation Trends',
      activity30Days: 'Activity for the last 30 days',
      daily: 'Daily',
      weekly: 'Weekly',
      recentDonations: 'Recent Donations',
      viewAll: 'View All',
      donor: 'Donor',
      project: 'Project',
      amount: 'Amount',
      status: 'Status',
      statuses: {
        completed: 'Completed',
        processing: 'Processing',
      },
    },
  };

  const t = translations[currentLanguage.code] || translations.en;

  // Mock stats data
  const stats = [
    { 
      label: t.stats.totalDonations, 
      value: '125,400 DH', 
      icon: 'account_balance_wallet', 
      trend: '+12%',
      trendType: 'up',
      borderColor: 'border-primary/20'
    },
    { 
      label: t.stats.activeProjects, 
      value: '12', 
      icon: 'rocket_launch', 
      trend: t.steady,
      trendType: 'neutral',
      borderColor: 'border-slate-200 dark:border-slate-700'
    },
    { 
      label: t.stats.totalDonors, 
      value: '458', 
      icon: 'groups', 
      trend: '+5.2%',
      trendType: 'up',
      borderColor: 'border-slate-200 dark:border-slate-700'
    },
    { 
      label: t.stats.pendingVerifications, 
      value: '3', 
      icon: 'pending_actions', 
      trend: t.actionRequired,
      trendType: 'warning',
      borderColor: 'border-orange-200 dark:border-orange-900/30',
      bgColor: 'bg-orange-50/50 dark:bg-orange-900/10'
    },
  ];

  // Mock recent donations
  const recentDonations = [
    { id: 1, donor: 'Mohammed Alami', initials: 'MA', project: 'Clean Water Init.', amount: '5,000 DH', status: 'completed' },
    { id: 2, donor: 'Sara Fassi', initials: 'SF', project: 'School Supplies', amount: '1,200 DH', status: 'processing' },
    { id: 3, donor: 'Yassine Kabbaj', initials: 'YK', project: 'Winter Relief', amount: '850 DH', status: 'completed' },
    { id: 4, donor: 'Leila Benani', initials: 'LB', project: 'Medical Aid', amount: '2,500 DH', status: 'completed' },
    { id: 5, donor: 'Amine Jilali', initials: 'AJ', project: 'Clean Water Init.', amount: '10,000 DH', status: 'completed' },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 justify-start lg:justify-end">
        <Link
          to="/admin/projects/new"
          className="flex-1 lg:flex-none flex min-w-[140px] items-center justify-center gap-2 rounded-xl h-12 px-6 bg-primary text-white text-sm font-bold shadow-sm hover:bg-primary/90 transition-colors"
        >
          <span className="material-symbols-outlined text-lg">add_circle</span>
          <span>{t.newProject}</span>
        </Link>
        <button className="flex-1 lg:flex-none flex min-w-[140px] items-center justify-center gap-2 rounded-xl h-12 px-6 bg-primary/10 text-primary text-sm font-bold border border-primary/20 hover:bg-primary/20 transition-colors">
          <span className="material-symbols-outlined text-lg">payments</span>
          <span>{t.addDonation}</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            padding="lg"
            className={`${stat.bgColor || ''} ${stat.borderColor ? `border ${stat.borderColor}` : ''}`}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.label}</p>
                <span className={`material-symbols-outlined ${stat.trendType === 'warning' ? 'text-orange-500' : 'text-primary/60'}`}>
                  {stat.icon}
                </span>
              </div>
              <p className={`text-xl font-bold ${stat.trendType === 'warning' ? 'text-orange-800 dark:text-orange-200' : 'text-text-primary dark:text-white'}`}>
                {stat.value}
              </p>
              <p className={`text-xs font-bold flex items-center gap-1 ${
                stat.trendType === 'up' ? 'text-green-600' : 
                stat.trendType === 'warning' ? 'text-orange-600' : 
                'text-slate-400'
              }`}>
                {stat.trendType === 'up' && <span className="material-symbols-outlined text-sm">trending_up</span>}
                {stat.trend}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Donation Trends Chart */}
      <Card padding="lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-text-primary dark:text-white text-lg font-bold">{t.donationTrends}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">{t.activity30Days}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-green-600 text-sm font-bold">
              <span className="material-symbols-outlined text-sm">trending_up</span> +8.5%
            </span>
            <select className="bg-slate-50 dark:bg-slate-800 border-none text-sm rounded-lg py-1 px-3">
              <option>{t.daily}</option>
              <option>{t.weekly}</option>
            </select>
          </div>
        </div>
        <div className="flex min-h-[180px] flex-col gap-4">
          <svg fill="none" height="180" preserveAspectRatio="none" viewBox="-3 0 478 150" width="100%" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z" fill="url(#paint0_linear)"></path>
            <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25" stroke="#0c7579" strokeLinecap="round" strokeWidth="3"></path>
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear" x1="236" x2="236" y1="1" y2="149">
                <stop stopColor="#0c7579" stopOpacity="0.2"></stop>
                <stop offset="1" stopColor="#0c7579" stopOpacity="0"></stop>
              </linearGradient>
            </defs>
          </svg>
          <div className="flex justify-between px-2 text-slate-400 text-xs font-bold">
            <span>Day 1</span>
            <span>Day 5</span>
            <span>Day 10</span>
            <span>Day 15</span>
            <span>Day 20</span>
            <span>Day 25</span>
            <span>Day 30</span>
          </div>
        </div>
      </Card>

      {/* Recent Donations Table */}
      <Card padding="none" className="overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-text-primary dark:text-white text-lg font-bold">{t.recentDonations}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">{t.donor}</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">{t.project}</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">{t.amount}</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">{t.status}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {recentDonations.map((donation) => (
                <tr key={donation.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                        {donation.initials}
                      </div>
                      <span className="text-sm font-medium text-text-primary dark:text-white">{donation.donor}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{donation.project}</td>
                  <td className="px-6 py-4 text-sm font-bold text-text-primary dark:text-white">{donation.amount}</td>
                  <td className="px-6 py-4">
                    <Badge 
                      variant={donation.status === 'completed' ? 'success' : 'warning'}
                      size="sm"
                      className="text-[10px]"
                    >
                      {donation.status === 'completed' ? t.statuses.completed : t.statuses.processing}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-center">
          <Link to="/admin/donations" className="text-primary text-sm font-bold hover:underline">
            {t.viewAll}
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
