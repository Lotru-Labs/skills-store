import { Suspense } from 'react';
import Header from '@/components/Header';
import BrowseClient from '@/components/BrowseClient';
import * as skillsRepo from '@/lib/db/repositories/skills';
import * as categoriesRepo from '@/lib/db/repositories/categories';

export default async function BrowsePage() {
  // Fetch data on the server
  const [skills, categories] = await Promise.all([
    skillsRepo.getSkills(),
    categoriesRepo.getCategories(),
  ]);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Header />
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
            </div>
          </div>
        </div>
      }
    >
      <BrowseClient initialSkills={skills} initialCategories={categories} />
    </Suspense>
  );
}
