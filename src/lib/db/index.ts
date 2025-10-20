/**
 * Database layer exports
 * Import database functions from this barrel file
 */

// Client
export { getDbProvider, resetDbProvider } from './client';

// Types
export type {
  DatabaseProvider,
  SkillFilters,
  SortOptions,
  CreateSkillInput,
  UpdateSkillInput,
} from './types';

// Skill Repository
export * as skillsRepo from './repositories/skills';

// Category Repository  
export * as categoriesRepo from './repositories/categories';
