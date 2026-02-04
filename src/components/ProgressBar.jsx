import React from 'react';

const ProgressBar = ({ 
  percentage, 
  size = 'md', 
  showLabel = false,
  className = '',
  color = 'primary',
  animated = true
}) => {
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
  
  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const colorStyles = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600',
    success: 'bg-gradient-to-r from-success-500 to-success-600',
    warning: 'bg-gradient-to-r from-warning-500 to-warning-600',
    error: 'bg-gradient-to-r from-error-500 to-error-600',
    secondary: 'bg-gradient-to-r from-secondary-400 to-secondary-500',
  };

  // Determine color based on percentage if not explicitly set
  const getBarColor = () => {
    if (color !== 'primary') return colorStyles[color];
    if (clampedPercentage >= 100) return colorStyles.success;
    if (clampedPercentage >= 80) return colorStyles.warning;
    return colorStyles.primary;
  };

  return (
    <div className={`w-full ${className}`}>
      <div className={`
        w-full ${sizes[size]} bg-gray-200 rounded-full overflow-hidden
        ${size === 'lg' ? 'shadow-inner' : ''}
      `}>
        <div
          className={`
            ${sizes[size]} ${getBarColor()} rounded-full transition-all duration-700 ease-out-expo
            ${animated ? 'animate-pulse-slow' : ''}
          `}
          style={{ width: `${clampedPercentage}%` }}
          role="progressbar"
          aria-valuenow={clampedPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progression: ${clampedPercentage}%`}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between items-center mt-1.5">
          <span className="text-sm font-semibold text-gray-900">
            {clampedPercentage}%
          </span>
          {clampedPercentage >= 100 && (
            <span className="text-xs font-medium text-success-600">
              Complété ✓
            </span>
          )}
        </div>
      )}
    </div>
  );
};

// Circular Progress for different use cases
export const CircularProgress = ({ 
  percentage, 
  size = 60, 
  strokeWidth = 4,
  color = 'primary',
  showPercentage = true,
  className = ''
}) => {
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (clampedPercentage / 100) * circumference;

  const colors = {
    primary: '#3B82F6',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    secondary: '#F59E0B',
  };

  const getColor = () => {
    if (color !== 'primary') return colors[color];
    if (clampedPercentage >= 100) return colors.success;
    if (clampedPercentage >= 80) return colors.warning;
    return colors.primary;
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out-expo"
        />
      </svg>
      {showPercentage && (
        <span className="absolute text-sm font-semibold text-gray-900">
          {Math.round(clampedPercentage)}%
        </span>
      )}
    </div>
  );
};

export default ProgressBar;
