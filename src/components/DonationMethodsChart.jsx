import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CreditCard, Building2, Smartphone, Wallet } from 'lucide-react';
import { useApp } from '../context/AppContext';

const DonationMethodsChart = () => {
  const { donations, formatCurrency, language } = useApp();

  const data = useMemo(() => {
    const methods = {
      card: { count: 0, amount: 0, label: 'Carte bancaire', icon: CreditCard, color: '#3B82F6' },
      bank: { count: 0, amount: 0, label: 'Virement bancaire', icon: Building2, color: '#10B981' },
      paypal: { count: 0, amount: 0, label: 'PayPal', icon: Wallet, color: '#F59E0B' },
      cash: { count: 0, amount: 0, label: 'Espèces', icon: Wallet, color: '#8B5CF6' },
      other: { count: 0, amount: 0, label: 'Autre', icon: Smartphone, color: '#6B7280' },
    };

    const translations = {
      ar: {
        card: 'بطاقة بنكية',
        bank: 'تحويل بنكي',
        paypal: 'باي بال',
        cash: 'نقدي',
        other: 'أخرى',
      },
      fr: {
        card: 'Carte bancaire',
        bank: 'Virement bancaire',
        paypal: 'PayPal',
        cash: 'Espèces',
        other: 'Autre',
      },
      en: {
        card: 'Credit Card',
        bank: 'Bank Transfer',
        paypal: 'PayPal',
        cash: 'Cash',
        other: 'Other',
      },
    };

    const t = translations[language] || translations.fr;

    donations.filter(d => d.status === 'verified').forEach(donation => {
      const method = donation.method || 'other';
      if (methods[method]) {
        methods[method].count += 1;
        methods[method].amount += donation.amount;
      } else {
        methods.other.count += 1;
        methods.other.amount += donation.amount;
      }
    });

    return Object.entries(methods)
      .filter(([_, data]) => data.count > 0)
      .map(([key, data]) => ({
        name: t[key] || data.label,
        value: data.amount,
        count: data.count,
        color: data.color,
        icon: data.icon,
      }));
  }, [donations, language]);

  const totalAmount = useMemo(() => data.reduce((sum, d) => sum + d.value, 0), [data]);
  const totalCount = useMemo(() => data.reduce((sum, d) => sum + d.count, 0), [data]);

  const translations = {
    ar: { 
      distribution: 'توزيع طرق التبرع',
      byAmount: 'حسب المبلغ',
      byCount: 'حسب العدد',
    },
    fr: { 
      distribution: 'Répartition des méthodes de don',
      byAmount: 'Par montant',
      byCount: 'Par nombre',
    },
    en: { 
      distribution: 'Donation Methods Distribution',
      byAmount: 'By Amount',
      byCount: 'By Count',
    },
  };

  const t = translations[language] || translations.fr;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / totalAmount) * 100).toFixed(1);
      return (
        <div className="bg-white p-4 rounded-xl shadow-xl border border-gray-100">
          <p className="font-semibold text-gray-900 mb-2">{data.name}</p>
          <div className="space-y-1 text-sm">
            <p className="text-primary-600 font-medium">
              {formatCurrency(data.value)} ({percentage}%)
            </p>
            <p className="text-gray-500">
              {data.count} donation{data.count > 1 ? 's' : ''}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry, index) => {
          const percentage = ((entry.payload.value / totalAmount) * 100).toFixed(0);
          return (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-600">
                {entry.value} ({percentage}%)
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <Wallet className="w-12 h-12 mb-3 opacity-50" />
        <p className="text-sm">Aucune donnée disponible</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Stats Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-gray-500">Total des dons vérifiés</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalAmount)}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Nombre de dons</p>
          <p className="text-lg font-semibold text-gray-900">{totalCount}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
              animationDuration={1000}
              animationEasing="ease-out"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  strokeWidth={0}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Method Details */}
      <div className="mt-4 space-y-2">
        {data.map((item, index) => {
          const Icon = item.icon;
          const percentage = ((item.value / totalAmount) * 100).toFixed(1);
          return (
            <div 
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <Icon className="w-4 h-4" style={{ color: item.color }} />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.count} donation{item.count > 1 ? 's' : ''}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900 text-sm">{formatCurrency(item.value)}</p>
                <p className="text-xs text-gray-500">{percentage}%</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DonationMethodsChart;
