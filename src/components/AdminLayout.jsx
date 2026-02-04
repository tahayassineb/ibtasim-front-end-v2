import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  Heart,
  Users,
  Settings,
  Menu,
  X,
  ChevronRight,
  LogOut,
  Bell,
  Search,
  User
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, getPendingDonations, language } = useApp();

  const pendingCount = getPendingDonations().length;
  const isRTL = language === 'ar';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Navigation items with icons and labels
  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Tableau de bord', exact: true },
    { path: '/admin/projets', icon: FolderKanban, label: 'Projets' },
    { path: '/admin/dons', icon: Heart, label: 'Dons', badge: pendingCount > 0 ? pendingCount : null },
    { path: '/admin/donateurs', icon: Users, label: 'Donateurs' },
    { path: '/admin/parametres', icon: Settings, label: 'Paramètres' },
  ];

  const isActive = (path, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-surface-secondary" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 bottom-0 z-50 w-64 bg-white border-r border-gray-200
          transition-transform duration-300 ease-out-expo
          ${isRTL ? 'right-0 border-l border-r-0' : 'left-0'}
          ${isSidebarOpen ? 'translate-x-0' : isRTL ? 'translate-x-full lg:translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
              <img src="/logo.png" alt="" className="w-6 h-6 object-contain" />
            </div>
            <span className="font-bold text-gray-900">Admin</span>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="Fermer le menu"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1" aria-label="Navigation admin">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path, item.exact);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                  transition-all duration-200 group
                  ${active
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
                aria-current={active ? 'page' : undefined}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-error-500 rounded-full">
                    {item.badge}
                  </span>
                )}
                {active && (
                  <ChevronRight className={`w-4 h-4 text-primary-400 ${isRTL ? 'rotate-180' : ''}`} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50">
            <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-primary-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full mt-3 flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-error-600 hover:bg-error-50 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Se déconnecter
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={isRTL ? 'lg:mr-64' : 'lg:ml-64'}>
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Left side */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 touch-target"
                aria-label="Ouvrir le menu"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-lg font-semibold text-gray-900 hidden sm:block">
                Administration
              </h1>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="hidden md:flex items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="pl-9 pr-4 py-2 text-sm bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-primary-500 w-64"
                  />
                </div>
              </div>

              {/* Notifications */}
              <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors touch-target">
                <Bell className="w-5 h-5 text-gray-600" />
                {pendingCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error-500 rounded-full" />
                )}
              </button>

              {/* Back to site */}
              <Link
                to="/"
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
              >
                Voir le site
                <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
