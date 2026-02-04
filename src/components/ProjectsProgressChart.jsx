import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { FolderKanban, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ProjectsProgressChart = () => {
  const { projects, formatCurrency, language } = useApp();

  const data = useMemo(() => {
    return projects
      .filter(p => p.status === 'active')
      .slice(0, 5)
      .map(project => ({
        name: project.title.length > 20 ? project.title.substring(0, 20) + '...' : project.title,
        fullName: project.title,
        percentage: Math.round((project.raisedAmount / project.goalAmount) * 100),
        raised: project.raisedAmount,
        goal: project.goalAmount,
        donors: project.donorsCount,
        category: project.category,
      }))
      .sort((a, b) => b.percentage - a.percentage);
  }, [projects]);

  const averageProgress = useMemo(() => {
    if (data.length === 0) return 0;
    return Math.round(data.reduce((sum, p) => sum + p.percentage, 0) / data.length);
  }, [data]);

  const translations = {
    ar: { 
      progress: 'تقدم المشاريع',
      average: 'متوسط التقدم',
      raised: 'تم جمعه',
      goal: 'الهدف',
      donors: 'المتبرعين',
      ofGoal: 'من الهدف',
    },
    fr: { 
      progress: 'Progression des projets',
      average: 'Progression moyenne',
      raised: 'Collecté',
      goal: 'Objectif',
      donors: 'Donateurs',
      ofGoal: 'de l\'objectif',
    },
    en: { 
      progress: 'Projects Progress',
      average: 'Average Progress',
      raised: 'Raised',
      goal: 'Goal',
      donors: 'Donors',
      ofGoal: 'of goal',
    },
  };

  const t = translations[language] || translations.fr;

  const getBarColor = (percentage) => {
    if (percentage >= 100) return '#10B981';
    if (percentage >= 75) return '#F59E0B';
    if (percentage >= 50) return '#3B82F6';
    return '#6B7280';
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-xl shadow-xl border border-gray-100 max-w-xs">
          <p className="font-semibold text-gray-900 mb-2">{data.fullName}</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">{t.raised}:</span>
              <span className="font-medium text-gray-900">{formatCurrency(data.raised)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">{t.goal}:</span>
              <span className="font-medium text-gray-900">{formatCurrency(data.goal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">{t.donors}:</span>
              <span className="font-medium text-gray-900">{data.donors}</span>
            </div>
            <div className="pt-2 mt-2 border-t border-gray-100">
              <span className="text-primary-600 font-semibold">{data.percentage}% {t.ofGoal}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <FolderKanban className="w-12 h-12 mb-3 opacity-50" />
        <p className="text-sm">Aucun projet actif</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Stats Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-gray-500">{t.average}</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-gray-900">{averageProgress}%</p>
            <TrendingUp className="w-5 h-5 text-success-600" />
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Projets actifs</p>
          <p className="text-lg font-semibold text-gray-900">{data.length}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#E5E7EB" 
              horizontal={true}
              vertical={false}
            />
            <XAxis 
              type="number" 
              domain={[0, 100]}
              tick={{ fill: '#6B7280', fontSize: 11 }}
              tickFormatter={(value) => `${value}%`}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              width={100}
              tick={{ fill: '#374151', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="percentage" 
              radius={[0, 4, 4, 0]}
              animationDuration={1000}
              animationEasing="ease-out"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getBarColor(entry.percentage)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-success-500" />
          <span className="text-gray-600">≥ 100% (Complété)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-warning-500" />
          <span className="text-gray-600">75-99% (Presque)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-primary-500" />
          <span className="text-gray-600">50-74% (En cours)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-gray-500" />
          <span className="text-gray-600">{'<'} 50% (Début)</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectsProgressChart;
