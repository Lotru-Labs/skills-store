'use client';

import { Category } from '@/types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        onClick={() => onCategoryChange('all')}
        className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
          selectedCategory === 'all'
            ? 'bg-blue-600 text-white shadow-lg'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        All Skills
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
            selectedCategory === category.id
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <span>{category.icon}</span>
          <span>{category.name}</span>
          <span className="text-xs opacity-75">({category.count})</span>
        </button>
      ))}
    </div>
  );
}
