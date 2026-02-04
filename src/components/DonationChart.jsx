import React, { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useApp } from '../context/AppContext';

const DonationChart = () => {
  const { donations, formatCurrency, language } = useApp();
  const isRTL = language === 'ar';

  // Generate last 6 months of data
  const data = useMemo(() => {
    const monthNames = {
      ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
      fr: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
      en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    };

    const now = new Date();
    const months = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthIndex = date.getMonth();
      const year = date.getFullYear();

      // Calculate total donations for this month
      const monthDonations = donations.filter(d => {
        const dDate = new Date(d.date);
        return dDate.getMonth() === monthIndex &&
               dDate.getFullYear() === year &&
               d.status === 'verified';
      });

      const total = monthDonations.reduce((sum, d) => sum + d.amount, 0);
      const count = monthDonations.length;

      months.push({
        name: monthNames[language]?.[monthIndex] || monthNames.fr[monthIndex],
        amount: total,
        count: count,
        fullMonth: monthNames[language]?.[monthIndex] || monthNames.fr[monthIndex],
        year: year,
      });
    }

    return months;
  }, [donations, language]);

  // Calculate trend
  const trend = useMemo(() => {
    if (data.length < 2) return { direction: 'neutral', percentage: 0 };
    const current = data[data.length - 1].amount;
    const previous = data[data.length - 2].amount;
    if (previous === 0) return { direction: current > 0 ? 'up' : 'neutral', percentage: current > 0 ? 100 : 0 };
    const change = ((current - previous) / previous) * 100;
    return {
      direction: change > 0 ? 'up' : change < 0 ? 'down' : 'neutral',
      percentage: Math.abs(change).toFixed(1),
    };
  }, [data]);

  const totalAmount = useMemo(() => data.reduce((sum, d) => sum + d.amount, 0), [data]);
  const totalCount = useMemo(() => data.reduce((sum, d) => sum + d.count, 0), [data]);

  const translations = {
    ar: { 
      donations: 'التبرعات', 
      month: 'الشهر', 
      total: 'المجموع',
      donors: 'المتبرعين',
      vsLastMonth: 'مقارنة بالشهر الماضي'
    },
    fr: { 
      donations: 'Dons', 
      month: 'Mois', 
      total: 'Total',
      donors: 'Donateurs',
      vsLastMonth: 'vs mois dernier'
    },
    en: { 
      donations: 'Donations', 
      month: 'Month', 
      total: 'Total',
      donors: 'Donors',
      vsLastMonth: 'vs last month'
    },
  };

  const t = translations[language] || translations.fr;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-xl shadow-xl border border-gray-100">
          <p className="font-semibold text-gray-900 mb-2">{label} {data.year}</p>
          <div className="space-y-1">
            <p className="text-primary-600 font-medium">
              {t.donations}: {formatCurrency(payload[0].value)}
            </p>
            <p className="text-gray-500 text-sm">
              {data.count} {t.donors.toLowerCase()}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const TrendIcon = trend.direction === 'up' ? TrendingUp : trend.direction === 'down' ? TrendingDown : Minus;
  const trendColor = trend.direction === 'up' ? 'text-success-600' : trend.direction === 'down' ? 'text-error-600' : 'text-gray-500';

  return (
    <div className="w-full">
      {/* Stats Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-500 mb-1">{t.total} (6 {t.month.toLowerCase()})</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalAmount)}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">{t.donors}</p>
            <p className="text-lg font-semibold text-gray-900">{totalCount}</p>
          </div>
          <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-50 ${trendColor}`}>
            <TrendIcon className="w-4 h-4" />
            <span className="text-sm font-medium">{trend.percentage}%</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 md:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: isRTL ? 10 : 10,
              left: isRTL ? 0 : 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#E5E7EB" 
              vertical={false}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 11 }}
              tickFormatter={(value) => {
                if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
                return value;
              }}
              dx={isRTL ? -10 : 10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#3B82F6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorAmount)"
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DonationChart;
