'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import SkillCard from '@/components/SkillCard';
import Footer from '@/components/Footer';
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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
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
            <section className="container mx-auto px-4 py-8 flex-grow">
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

            <Footer />
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
