import { Skill } from '@/types';
import { SkillFilters, SortOptions } from '../types';
import { getDbProvider } from '../client';

/**
 * Skills Repository
 * High-level functions for querying and manipulating skill data
 * These functions use the database provider under the hood
 */

/**
 * Get all skills with optional filtering and sorting
 */
export async function getSkills(
  filters?: SkillFilters,
  sort?: SortOptions
): Promise<Skill[]> {
  const provider = getDbProvider();
  return provider.getSkills(filters, sort);
}

/**
 * Get a single skill by ID
 */
export async function getSkillById(id: string): Promise<Skill | null> {
  const provider = getDbProvider();
  return provider.getSkillById(id);
}

/**
 * Get all skills in a specific category
 */
export async function getSkillsByCategory(categoryId: string): Promise<Skill[]> {
  const provider = getDbProvider();
  return provider.getSkillsByCategory(categoryId);
}

/**
 * Get skills that match any of the provided tags
 */
export async function getSkillsByTags(tags: string[]): Promise<Skill[]> {
  const provider = getDbProvider();
  return provider.getSkillsByTags(tags);
}

/**
 * Search skills by name or description
 */
export async function searchSkills(query: string): Promise<Skill[]> {
  const provider = getDbProvider();
  return provider.searchSkills(query);
}

/**
 * Get recently updated skills
 */
export async function getRecentlyUpdatedSkills(limit: number = 10): Promise<Skill[]> {
  const provider = getDbProvider();
  return provider.getRecentlyUpdatedSkills(limit);
}

/**
 * Get most popular skills by download count
 */
export async function getPopularSkills(limit: number = 10): Promise<Skill[]> {
  const provider = getDbProvider();
  return provider.getPopularSkills(limit);
}

/**
 * Get top-rated skills
 */
export async function getTopRatedSkills(limit: number = 10): Promise<Skill[]> {
  const provider = getDbProvider();
  return provider.getTopRatedSkills(limit);
}

/**
 * Get total download count across all skills
 */
export async function getTotalDownloads(): Promise<number> {
  const provider = getDbProvider();
  return provider.getTotalDownloads();
}

/**
 * Get total number of skills
 */
export async function getSkillCount(): Promise<number> {
  const provider = getDbProvider();
  return provider.getSkillCount();
}

/**
 * Get list of all unique authors
 */
export async function getUniqueAuthors(): Promise<string[]> {
  const provider = getDbProvider();
  return provider.getUniqueAuthors();
}

/**
 * Get all unique tags used across all skills
 */
export async function getAllTags(): Promise<string[]> {
  const provider = getDbProvider();
  return provider.getAllTags();
}

/**
 * Increment download count for a skill
 */
export async function incrementDownloads(skillId: string): Promise<void> {
  const provider = getDbProvider();
  return provider.incrementDownloads(skillId);
}

/**
 * Update the rating for a skill
 */
export async function updateRating(skillId: string, newRating: number): Promise<void> {
  const provider = getDbProvider();
  return provider.updateRating(skillId, newRating);
}

/**
 * Get free skills only
 */
export async function getFreeSkills(): Promise<Skill[]> {
  return getSkills({ maxPrice: 0 });
}

/**
 * Get skills by author
 */
export async function getSkillsByAuthor(author: string): Promise<Skill[]> {
  return getSkills({ author });
}

/**
 * Get featured skills (top rated with minimum downloads)
 */
export async function getFeaturedSkills(minDownloads: number = 1000): Promise<Skill[]> {
  const allSkills = await getSkills({ minRating: 4.5 });
  return allSkills
    .filter(skill => skill.downloads >= minDownloads)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);
}
