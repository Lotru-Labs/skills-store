'use client';

import { Skill } from '@/types';

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-6xl">
        {skill.category === 'navigation' && '🧭'}
        {skill.category === 'manipulation' && '🤖'}
        {skill.category === 'vision' && '👁️'}
        {skill.category === 'speech' && '💬'}
        {skill.category === 'planning' && '🗺️'}
        {skill.category === 'control' && '🎮'}
        {skill.category === 'perception' && '📡'}
        {skill.category === 'integration' && '🔗'}
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
            {skill.name}
          </h3>
          <div className="flex items-center gap-1 text-yellow-500">
            <span>⭐</span>
            <span className="text-sm font-medium">{skill.rating}</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
          {skill.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {skill.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-600">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <div>{skill.author}</div>
            <div className="text-xs">↓ {skill.downloads.toLocaleString()}</div>
          </div>
          
          <div className="text-right">
            {skill.isPaid ? (
              <div className="text-xl font-bold text-green-600 dark:text-green-400">
                ${skill.price}
              </div>
            ) : (
              <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                FREE
              </div>
            )}
            <div className="text-xs text-gray-500 dark:text-gray-400">
              v{skill.version}
            </div>
          </div>
        </div>
        
        <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
          {skill.isPaid ? 'Buy Now' : 'Install'}
        </button>
      </div>
    </div>
  );
}
