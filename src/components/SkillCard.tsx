'use client';

import { Skill } from '@/types';

interface SkillCardProps {
  skill: Skill;
}

// Default icon to use when no skill-specific icon is provided
const DEFAULT_ICON = '📦';

// Get category default icons as fallback
const getCategoryIcon = (category: string): string => {
  const categoryIcons: { [key: string]: string } = {
    'navigation': '🧭',
    'manipulation': '🤖',
    'vision': '👁️',
    'speech': '💬',
    'planning': '🗺️',
    'control': '🎮',
    'perception': '📡',
    'integration': '🔗',
  };
  return categoryIcons[category] || DEFAULT_ICON;
};

export default function SkillCard({ skill }: SkillCardProps) {
  // Use skill.icon if available, otherwise fall back to category icon, then to default icon
  const displayIcon = skill.icon || getCategoryIcon(skill.category);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row gap-4 p-5">
        {/* Icon Section */}
        <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg text-5xl">
          {displayIcon}
        </div>
        
        {/* Main Content Section */}
        <div className="flex-grow min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {skill.name}
            </h3>
            <div className="flex items-center gap-1 text-yellow-500 flex-shrink-0">
              <span>⭐</span>
              <span className="text-sm font-medium">{skill.rating}</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            {skill.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {skill.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <span>👤</span>
              <span>{skill.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>↓</span>
              <span>{skill.downloads.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>v{skill.version}</span>
            </div>
          </div>
        </div>
        
        {/* Action Section */}
        <div className="flex-shrink-0 flex flex-col items-end justify-between gap-3 sm:min-w-[120px]">
          <div className="text-right">
            {skill.isPaid ? (
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                ${skill.price}
              </div>
            ) : (
              <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                FREE
              </div>
            )}
          </div>
          
          <button className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200">
            {skill.isPaid ? 'Buy Now' : 'Install'}
          </button>
        </div>
      </div>
    </div>
  );
}
