import HomeClient from '@/components/HomeClient';
import * as skillsRepo from '@/lib/db/repositories/skills';
import * as categoriesRepo from '@/lib/db/repositories/categories';

export default async function Home() {
  // Fetch data on the server
  const [skills, categories] = await Promise.all([
    skillsRepo.getSkills(),
    categoriesRepo.getCategories(),
  ]);

  return <HomeClient initialSkills={skills} initialCategories={categories} />;
}

