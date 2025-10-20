'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import TagFilter from '@/components/TagFilter';
import SkillCard from '@/components/SkillCard';
import Footer from '@/components/Footer';
import { Skill, Category } from '@/types';

interface BrowseClientProps {
    initialSkills: Skill[];
    initialCategories: Category[];
}

export default function BrowseClient({ initialSkills, initialCategories }: BrowseClientProps) {
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
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

    // Get all unique tags from skills
    const allTags = useMemo(() => {
        const tagsSet = new Set<string>();
        initialSkills.forEach((skill) => {
            skill.tags.forEach((tag) => tagsSet.add(tag));
        });
        return Array.from(tagsSet).sort();
    }, [initialSkills]);

    const handleTagToggle = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const handleClearAllTags = () => {
        setSelectedTags([]);
    };

    const filteredSkills = useMemo(() => {
        let filtered = initialSkills;

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter((skill) => skill.category === selectedCategory);
        }

        // Filter by tags (skill must have ALL selected tags)
        if (selectedTags.length > 0) {
            filtered = filtered.filter((skill) =>
                selectedTags.every((tag) => skill.tags.includes(tag))
            );
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
    }, [initialSkills, searchQuery, selectedCategory, selectedTags, sortBy]);

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

            {/* Main Content with Sidebar */}
            <div className="container mx-auto px-4 py-8 flex-grow">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Sidebar - Filters */}
                    <aside className="lg:w-64 shrink-0">
                        <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                            {/* Categories Filter */}
                            <CategoryFilter
                                categories={initialCategories}
                                selectedCategory={selectedCategory}
                                onCategoryChange={setSelectedCategory}
                                variant="sidebar"
                            />

                            {/* Divider */}
                            <div className="my-6 border-t border-gray-200 dark:border-gray-700"></div>

                            {/* Tags Filter */}
                            <TagFilter
                                tags={allTags}
                                selectedTags={selectedTags}
                                onTagToggle={handleTagToggle}
                                onClearAll={handleClearAllTags}
                            />
                        </div>
                    </aside>

                    {/* Right Content - Skills List */}
                    <main className="flex-grow">
                        {/* Active Filters Display */}
                        {selectedTags.length > 0 && (
                            <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                                        Active Filters:
                                    </span>
                                    <button
                                        onClick={handleClearAllTags}
                                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {selectedTags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-flex items-center gap-1 px-2 py-1 bg-blue-600 text-white text-xs rounded-full"
                                        >
                                            {tag}
                                            <button
                                                onClick={() => handleTagToggle(tag)}
                                                className="hover:bg-blue-700 rounded-full p-0.5"
                                            >
                                                <svg
                                                    className="w-3 h-3"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Sort and Results Count */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
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

                        {/* Skills Grid */}
                        {filteredSkills.length > 0 ? (
                            <div className="flex flex-col gap-4">
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
                    </main>
                </div>
            </div>

            <Footer />
        </div>
    );
}
