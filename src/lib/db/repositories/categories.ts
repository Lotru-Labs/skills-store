import { Category } from '@/types';
import { getDbProvider } from '../client';

/**
 * Categories Repository
 * High-level functions for querying category data
 */

/**
 * Get all categories
 */
export async function getCategories(): Promise<Category[]> {
  const provider = getDbProvider();
  return provider.getCategories();
}

/**
 * Get a single category by ID
 */
export async function getCategoryById(id: string): Promise<Category | null> {
  const provider = getDbProvider();
  return provider.getCategoryById(id);
}

/**
 * Get categories sorted by skill count
 */
export async function getCategoriesByPopularity(): Promise<Category[]> {
  const categories = await getCategories();
  return categories.sort((a, b) => b.count - a.count);
}

/**
 * Get category name by ID
 */
export async function getCategoryName(id: string): Promise<string | null> {
  const category = await getCategoryById(id);
  return category?.name ?? null;
}
