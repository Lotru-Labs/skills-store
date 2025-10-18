'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import SkillCard from '@/components/SkillCard';
import { mockSkills, mockCategories } from '@/data/mockData';

function BrowseContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'popular' | 'recent' | 'rating'>('popular');

  useEffect(() => {
    const q = searchParams.get('q');
    const category = searchParams.get('category');
    const sort = searchParams.get('sort');

    if (q) setSearchQuery(q);
    if (category) setSelectedCategory(category);
    if (sort && (sort === 'popular' || sort === 'recent' || sort === 'rating')) {
      setSortBy(sort);
    }
  }, [searchParams]);

  const filteredSkills = useMemo(() => {
    let filtered = mockSkills;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((skill) => skill.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (skill) =>
          skill.name.toLowerCase().includes(query) ||
          skill.description.toLowerCase().includes(query) ||
          skill.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          skill.author.toLowerCase().includes(query)
      );
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.downloads - a.downloads;
        case 'recent':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      {/* Page Title */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-6">
        <div className="container mx-auto px-4 flex items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Browse Skills
            </h1>
            <div className="w-full md:w-96">
                <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white dark:bg-gray-900 py-4 sticky top-[57px] z-40 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
            
            <CategoryFilter
              categories={mockCategories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {filteredSkills.length} skill{filteredSkills.length !== 1 ? 's' : ''} found
            </div>
            
            <div className="flex gap-2 items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="popular">Most Popular</option>
                <option value="recent">Recently Updated</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="container mx-auto px-4 py-8">
        {filteredSkills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              No skills found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16 border-t border-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Help</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Installing skills</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Publishing skills</a></li>
                <li><a href="#" className="hover:text-white transition-colors">User guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">About RSI</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">RSI Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Infrastructure</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sponsor</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Forums</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mailing lists</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Code of Conduct</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contributing</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Bugs and feedback</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contribute on GitHub</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Development credits</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="mb-4 md:mb-0">
              © 2025 Robotics Skills Index. Powered by the robotics community.
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Status</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <BrowseContent />
    </Suspense>
  );
}
