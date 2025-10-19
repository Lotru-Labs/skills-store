'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockSkills, mockCategories } from '@/data/mockData';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/browse?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/browse');
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/browse?category=${categoryId}`);
  };

  const totalDownloads = mockSkills.reduce((sum, skill) => sum + skill.downloads, 0);
  const recentSkills = [...mockSkills]
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <Header />
      
      {/* Hero Section with Prominent Search */}
      <section className="bg-white dark:bg-gray-900 py-16 md:py-24 border-b border-gray-200 dark:border-gray-800 flex-grow">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Find, install and publish robotics skills
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
              The Robotics Skills Index (RSI) is a repository of software for the robotics community.
            </p>
          </div>

          {/* Prominent Search Bar */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search skills"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-32 py-4 text-lg rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          <div className="text-center">
            <a
              href="/browse"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Or browse projects →
            </a>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gray-50 dark:bg-gray-800 py-6 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center max-w-4xl mx-auto">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {mockSkills.length.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">skills</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {totalDownloads.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">downloads</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {mockCategories.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Browse by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 bg-white dark:bg-gray-800 transition-colors text-left group"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1">
                  {category.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {category.count} skills
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Recently Updated */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Recently updated
            </h2>
            <a
              href="/browse?sort=recent"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              View all →
            </a>
          </div>
          <div className="space-y-3">
            {recentSkills.map((skill) => (
              <a
                key={skill.id}
                href={`/skill/${skill.id}`}
                className="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-blue-600 dark:text-blue-400 hover:underline truncate">
                        {skill.name}
                      </h3>
                      <span className="px-2 py-0.5 text-xs rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 flex-shrink-0">
                        v{skill.version}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                      {skill.description}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm text-gray-500 dark:text-gray-500">
                      {new Date(skill.lastUpdated).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Getting started
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Installing skills
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Use the robotics package manager to install skills:
              </p>
              <pre className="bg-gray-900 dark:bg-black text-gray-100 p-4 rounded text-sm overflow-x-auto">
                <code>rsi install skill-name</code>
              </pre>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Publishing skills
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Share your robotics skills with the community:
              </p>
              <pre className="bg-gray-900 dark:bg-black text-gray-100 p-4 rounded text-sm overflow-x-auto">
                <code>rsi publish</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
