import { promises as fs } from 'fs';
import path from 'path';
import { Skill, Category } from '@/types';
import { DatabaseProvider, SkillFilters, SortOptions } from '../types';

/**
 * JSON File Provider
 * Reads data from JSON files with in-memory caching
 * This is the initial implementation before moving to a real database
 */
export class JsonProvider implements DatabaseProvider {
  private skillsCache: Skill[] | null = null;
  private categoriesCache: Category[] | null = null;
  private lastSkillsLoad: number = 0;
  private lastCategoriesLoad: number = 0;
  private readonly CACHE_TTL = 60000; // 1 minute cache in dev mode

  private readonly skillsPath = path.join(process.cwd(), 'src/data/db/skills.json');
  private readonly categoriesPath = path.join(process.cwd(), 'src/data/db/categories.json');

  /**
   * Load skills from JSON file with caching
   */
  private async loadSkills(): Promise<Skill[]> {
    const now = Date.now();
    
    // Return cache if still valid
    if (this.skillsCache && (now - this.lastSkillsLoad) < this.CACHE_TTL) {
      return this.skillsCache;
    }

    try {
      const data = await fs.readFile(this.skillsPath, 'utf-8');
      this.skillsCache = JSON.parse(data);
      this.lastSkillsLoad = now;
      return this.skillsCache!;
    } catch (error) {
      console.error('Error loading skills from JSON:', error);
      throw new Error('Failed to load skills data');
    }
  }

  /**
   * Load categories from JSON file with caching
   */
  private async loadCategories(): Promise<Category[]> {
    const now = Date.now();
    
    // Return cache if still valid
    if (this.categoriesCache && (now - this.lastCategoriesLoad) < this.CACHE_TTL) {
      return this.categoriesCache;
    }

    try {
      const data = await fs.readFile(this.categoriesPath, 'utf-8');
      this.categoriesCache = JSON.parse(data);
      this.lastCategoriesLoad = now;
      return this.categoriesCache!;
    } catch (error) {
      console.error('Error loading categories from JSON:', error);
      throw new Error('Failed to load categories data');
    }
  }

  /**
   * Apply filters to skills array
   */
  private applyFilters(skills: Skill[], filters?: SkillFilters): Skill[] {
    if (!filters) return skills;

    let filtered = skills;

    if (filters.category) {
      filtered = filtered.filter(skill => skill.category === filters.category);
    }

    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(skill =>
        filters.tags!.some(tag => skill.tags.includes(tag))
      );
    }

    if (filters.isPaid !== undefined) {
      filtered = filtered.filter(skill => skill.isPaid === filters.isPaid);
    }

    if (filters.minRating !== undefined) {
      filtered = filtered.filter(skill => skill.rating >= filters.minRating!);
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(skill => skill.price <= filters.maxPrice!);
    }

    if (filters.author) {
      filtered = filtered.filter(skill => skill.author === filters.author);
    }

    if (filters.search) {
      const query = filters.search.toLowerCase();
      filtered = filtered.filter(skill =>
        skill.name.toLowerCase().includes(query) ||
        skill.description.toLowerCase().includes(query) ||
        skill.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }

  /**
   * Apply sorting to skills array
   */
  private applySort(skills: Skill[], sort?: SortOptions): Skill[] {
    if (!sort) return skills;

    const sorted = [...skills].sort((a, b) => {
      let comparison = 0;

      switch (sort.field) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'downloads':
          comparison = a.downloads - b.downloads;
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'lastUpdated':
          comparison = new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
          break;
      }

      return sort.order === 'desc' ? -comparison : comparison;
    });

    return sorted;
  }

  // Skill query operations
  async getSkills(filters?: SkillFilters, sort?: SortOptions): Promise<Skill[]> {
    const skills = await this.loadSkills();
    const filtered = this.applyFilters(skills, filters);
    return this.applySort(filtered, sort);
  }

  async getSkillById(id: string): Promise<Skill | null> {
    const skills = await this.loadSkills();
    return skills.find(skill => skill.id === id) ?? null;
  }

  async getSkillsByCategory(categoryId: string): Promise<Skill[]> {
    return this.getSkills({ category: categoryId });
  }

  async getSkillsByTags(tags: string[]): Promise<Skill[]> {
    return this.getSkills({ tags });
  }

  async searchSkills(query: string): Promise<Skill[]> {
    return this.getSkills({ search: query });
  }

  async getRecentlyUpdatedSkills(limit: number): Promise<Skill[]> {
    const skills = await this.getSkills(undefined, {
      field: 'lastUpdated',
      order: 'desc',
    });
    return skills.slice(0, limit);
  }

  async getPopularSkills(limit: number): Promise<Skill[]> {
    const skills = await this.getSkills(undefined, {
      field: 'downloads',
      order: 'desc',
    });
    return skills.slice(0, limit);
  }

  async getTopRatedSkills(limit: number): Promise<Skill[]> {
    const skills = await this.getSkills(undefined, {
      field: 'rating',
      order: 'desc',
    });
    return skills.slice(0, limit);
  }

  // Category operations
  async getCategories(): Promise<Category[]> {
    return this.loadCategories();
  }

  async getCategoryById(id: string): Promise<Category | null> {
    const categories = await this.loadCategories();
    return categories.find(cat => cat.id === id) ?? null;
  }

  // Aggregation operations
  async getTotalDownloads(): Promise<number> {
    const skills = await this.loadSkills();
    return skills.reduce((total, skill) => total + skill.downloads, 0);
  }

  async getSkillCount(): Promise<number> {
    const skills = await this.loadSkills();
    return skills.length;
  }

  async getUniqueAuthors(): Promise<string[]> {
    const skills = await this.loadSkills();
    const authors = new Set(skills.map(skill => skill.author));
    return Array.from(authors).sort();
  }

  async getAllTags(): Promise<string[]> {
    const skills = await this.loadSkills();
    const tags = new Set<string>();
    skills.forEach(skill => {
      skill.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }

  // Mutation operations (for JSON provider, these are in-memory only)
  async incrementDownloads(skillId: string): Promise<void> {
    const skills = await this.loadSkills();
    const skill = skills.find(s => s.id === skillId);
    if (skill) {
      skill.downloads += 1;
      // In a real implementation, we would persist this change
      // For now, it only updates the cache
      console.warn('incrementDownloads: Changes not persisted to JSON file');
    }
  }

  async updateRating(skillId: string, newRating: number): Promise<void> {
    const skills = await this.loadSkills();
    const skill = skills.find(s => s.id === skillId);
    if (skill) {
      skill.rating = newRating;
      // In a real implementation, we would persist this change
      console.warn('updateRating: Changes not persisted to JSON file');
    }
  }

  /**
   * Clear the cache (useful for development/testing)
   */
  clearCache(): void {
    this.skillsCache = null;
    this.categoriesCache = null;
    this.lastSkillsLoad = 0;
    this.lastCategoriesLoad = 0;
  }
}
