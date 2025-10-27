'use client';

import { Skill } from '@/types';
import Link from 'next/link';
import Image from 'next/image';

interface SkillCardProps {
  skill: Skill;
  variant?: 'full' | 'compact';
  onClick?: () => void;
}

// Get category default text as fallback
const getCategoryFallback = (category: string): string => {
  const categoryFallbacks: { [key: string]: string } = {
    'navigation': 'NAV',
    'manipulation': 'MAN',
    'vision': 'VIS',
    'speech': 'NLP',
    'planning': 'PLN',
    'control': 'CTL',
    'perception': 'PER',
    'integration': 'INT',
    'utilities': 'UTL',
  };
  return categoryFallbacks[category] || 'SKL';
};

export default function SkillCard({ skill, variant = 'full', onClick }: SkillCardProps) {
  // Determine what to display: icon as image URL or text
  const isImageUrl = skill.icon && (skill.icon.startsWith('http://') || skill.icon.startsWith('https://'));
  const displayText = !isImageUrl ? (skill.icon || getCategoryFallback(skill.category)) : '';

  // Compact variant for home page
  if (variant === 'compact') {
    return (
      <div 
        className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
        onClick={onClick}
      >
        <div className="flex items-start justify-between mb-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden ${!isImageUrl ? 'bg-slate-600 dark:bg-slate-700' : ''}`}>
            {isImageUrl && skill.icon ? (
              <Image 
                src={skill.icon}
                alt={skill.name}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white font-bold text-sm">
                {displayText}
              </span>
            )}
          </div>
          {skill.isOSS ? (
            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 text-xs font-semibold rounded">
              OPEN SOURCE
            </span>
          ) : skill.price === 0 ? (
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-xs font-semibold rounded">
              FREE
            </span>
          ) : (
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs font-semibold rounded">
              ${skill.price}
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {skill.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {skill.description}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <span>⭐</span>
            <span>{skill.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>⬇️</span>
            <span>{skill.downloads.toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  }

  // Full variant for browse page
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row gap-4 p-5">
        {/* Image/Text Section */}
        <div className={`flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-lg overflow-hidden ${!isImageUrl ? 'bg-slate-600 dark:bg-slate-700' : ''}`}>
          {isImageUrl && skill.icon ? (
            <Image 
              src={skill.icon} 
              alt={skill.name}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white font-bold text-xl">
              {displayText}
            </span>
          )}
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
            {skill.isOSS ? (
              <span className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 text-lg font-semibold rounded">
                OPEN SOURCE
              </span>
            ) : skill.price === 0 ? (
              <span className="px-3 py-1.5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-lg font-semibold rounded">
                FREE
              </span>
            ) : (
              <span className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xl font-bold rounded">
                ${skill.price}
              </span>
            )}
          </div>
          
          {skill.installUrl ? (
            <Link 
              href={skill.installUrl}
              className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 text-center"
            >
              {skill.price > 0 ? 'Buy for Robot' : 'Add to Robot'}
            </Link>
          ) : (
            <Link
              href="/coming-soon?feature=Skill Installation"
              className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 text-center"
            >
              {skill.price > 0 ? 'Buy for Robot' : 'Add to Robot'}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
