import { Skill, Category } from '@/types';

/**
 * Filters for querying skills
 */
export interface SkillFilters {
  category?: string;
  tags?: string[];
  isPaid?: boolean;
  minRating?: number;
  maxPrice?: number;
  author?: string;
  search?: string;
}

/**
 * Sort options for skill queries
 */
export interface SortOptions {
  field: 'name' | 'downloads' | 'rating' | 'price' | 'lastUpdated';
  order: 'asc' | 'desc';
}

/**
 * Input type for creating a new skill
 */
export type CreateSkillInput = Omit<Skill, 'id' | 'downloads' | 'rating'>;

/**
 * Input type for updating a skill
 */
export type UpdateSkillInput = Partial<Omit<Skill, 'id'>>;

/**
 * Database provider interface
 * All database implementations must conform to this interface
 */
export interface DatabaseProvider {
  // Skill query operations
  getSkills(filters?: SkillFilters, sort?: SortOptions): Promise<Skill[]>;
  getSkillById(id: string): Promise<Skill | null>;
  getSkillsByCategory(categoryId: string): Promise<Skill[]>;
  getSkillsByTags(tags: string[]): Promise<Skill[]>;
  searchSkills(query: string): Promise<Skill[]>;
  getRecentlyUpdatedSkills(limit: number): Promise<Skill[]>;
  getPopularSkills(limit: number): Promise<Skill[]>;
  getTopRatedSkills(limit: number): Promise<Skill[]>;

  // Category operations
  getCategories(): Promise<Category[]>;
  getCategoryById(id: string): Promise<Category | null>;

  // Aggregation operations
  getTotalDownloads(): Promise<number>;
  getSkillCount(): Promise<number>;
  getUniqueAuthors(): Promise<string[]>;
  getAllTags(): Promise<string[]>;

  // Mutation operations
  incrementDownloads(skillId: string): Promise<void>;
  updateRating(skillId: string, newRating: number): Promise<void>;
  
  // Future: Full CRUD operations
  createSkill?(skill: CreateSkillInput): Promise<Skill>;
  updateSkill?(id: string, updates: UpdateSkillInput): Promise<Skill>;
  deleteSkill?(id: string): Promise<void>;
}
