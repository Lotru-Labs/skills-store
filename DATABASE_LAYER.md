# Database Layer Documentation

This document describes the database layer implementation for the Skills Store application.

## Overview

The database layer provides an abstraction over data access, allowing the application to start with JSON files and seamlessly migrate to a real database in the future without changing application code.

## Architecture

```
src/
├── data/db/              # JSON database files
│   ├── skills.json       # Skills data
│   └── categories.json   # Categories data
├── lib/db/               # Database layer
│   ├── index.ts          # Barrel exports
│   ├── client.ts         # Provider factory
│   ├── types.ts          # Interfaces and types
│   ├── providers/        # Database providers
│   │   └── json.ts       # JSON file provider
│   └── repositories/     # Data access functions
│       ├── skills.ts     # Skill operations
│       └── categories.ts # Category operations
```

## Key Components

### 1. Database Provider Interface

All database providers must implement the `DatabaseProvider` interface defined in `src/lib/db/types.ts`. This ensures consistency across different database backends.

```typescript
interface DatabaseProvider {
  // Skill operations
  getSkills(filters?: SkillFilters, sort?: SortOptions): Promise<Skill[]>;
  getSkillById(id: string): Promise<Skill | null>;
  // ... more operations
}
```

### 2. JSON Provider

The current implementation (`src/lib/db/providers/json.ts`) reads from JSON files with:
- **In-memory caching**: Reduces file system reads (1-minute TTL)
- **Filtering support**: Category, tags, price, rating, search
- **Sorting support**: By name, downloads, rating, price, lastUpdated
- **Aggregations**: Total downloads, skill count, unique tags/authors

### 3. Repositories

Repositories in `src/lib/db/repositories/` provide high-level functions for data access:

#### Skills Repository
- `getSkills()` - Get all skills with optional filters and sorting
- `getSkillById()` - Get a single skill
- `getSkillsByCategory()` - Filter by category
- `getSkillsByTags()` - Filter by tags
- `searchSkills()` - Full-text search
- `getRecentlyUpdatedSkills()` - Recently updated
- `getPopularSkills()` - Most downloaded
- `getTopRatedSkills()` - Highest rated
- `getTotalDownloads()` - Aggregate downloads
- `getSkillCount()` - Total skill count
- `getAllTags()` - All unique tags
- `incrementDownloads()` - Update download count
- And more...

#### Categories Repository  
- `getCategories()` - Get all categories
- `getCategoryById()` - Get a single category
- `getCategoriesByPopularity()` - Sorted by skill count

### 4. Client Factory

The `client.ts` file provides a singleton pattern for the database provider:

```typescript
export function getDbProvider(): DatabaseProvider {
  // Returns the configured provider
}
```

Provider selection is controlled via environment variable:
```bash
DB_PROVIDER=json  # Default
# Future: DB_PROVIDER=postgres
```

## Usage Examples

### In Components

```typescript
import * as skillsRepo from '@/lib/db/repositories/skills';
import * as categoriesRepo from '@/lib/db/repositories/categories';

// Load all skills
const skills = await skillsRepo.getSkills();

// Filter and sort
const filteredSkills = await skillsRepo.getSkills(
  { category: 'navigation', minRating: 4.5 },
  { field: 'downloads', order: 'desc' }
);

// Search
const results = await skillsRepo.searchSkills('robot');

// Get categories
const categories = await categoriesRepo.getCategories();
```

### Advanced Filtering

```typescript
const filters: SkillFilters = {
  category: 'vision',
  tags: ['deep-learning', 'detection'],
  isPaid: false,
  minRating: 4.0,
  maxPrice: 50.00,
  author: 'OpenRobotics',
  search: 'object'
};

const skills = await skillsRepo.getSkills(filters);
```

## Data Files

### skills.json
Location: `src/data/db/skills.json`

Contains an array of skill objects with properties:
- id, name, description, category
- price, isPaid, author
- downloads, rating, version
- tags, compatibility
- imageUrl, lastUpdated, icon

### categories.json
Location: `src/data/db/categories.json`

Contains an array of category objects with properties:
- id, name, icon, count

## Caching

The JSON provider implements a 1-minute cache to improve performance:
- Skills and categories are cached separately
- Cache is automatically refreshed after TTL expires
- Cache can be manually cleared (useful for development)

```typescript
const provider = getDbProvider();
if (provider instanceof JsonProvider) {
  provider.clearCache();
}
```

## Future Database Migration

### Adding a New Provider

1. Create a new provider file: `src/lib/db/providers/postgres.ts`
2. Implement the `DatabaseProvider` interface
3. Update `client.ts` to include the new provider:

```typescript
switch (providerType) {
  case 'json':
    return new JsonProvider();
  case 'postgres':
    return new PostgresProvider();
  // ...
}
```

4. Set the environment variable: `DB_PROVIDER=postgres`

### Example: PostgreSQL Provider

```typescript
export class PostgresProvider implements DatabaseProvider {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }

  async getSkills(filters?: SkillFilters): Promise<Skill[]> {
    const query = buildSQLQuery(filters);
    const result = await this.pool.query(query);
    return result.rows;
  }
  
  // ... implement other methods
}
```

## Testing

When writing tests, you can:

1. Mock the repositories:
```typescript
jest.mock('@/lib/db/repositories/skills');
```

2. Use a test provider:
```typescript
import { resetDbProvider } from '@/lib/db/client';

beforeEach(() => {
  resetDbProvider(); // Clear singleton
});
```

## Performance Considerations

- **JSON Provider**: Best for <1000 records, development, and prototyping
- **Database Provider**: Recommended for production with >1000 records
- **Caching**: Reduces repeated file reads; adjust TTL based on needs
- **Lazy Loading**: Data is only loaded when first accessed

## Environment Variables

```bash
# Database provider type (default: json)
DB_PROVIDER=json

# Future database configuration
DATABASE_URL=postgresql://user:password@localhost:5432/skills
REDIS_URL=redis://localhost:6379
```

## Migration Checklist

When migrating from JSON to a real database:

- [ ] Choose database (PostgreSQL, MongoDB, Supabase, etc.)
- [ ] Create database schema/migrations
- [ ] Implement new provider in `src/lib/db/providers/`
- [ ] Update `client.ts` to support new provider
- [ ] Set `DB_PROVIDER` environment variable
- [ ] Test all repository functions
- [ ] Update deployment configuration
- [ ] Migrate data from JSON files
- [ ] Add connection pooling and error handling
- [ ] Implement proper transaction support
- [ ] Add database monitoring and logging

## API Compatibility

All repository functions return Promises, making them compatible with:
- React Server Components (Next.js 13+)
- API Routes
- Server Actions
- Client Components (with useEffect)

## Best Practices

1. **Always use repositories**: Never import providers directly in components
2. **Handle errors**: Wrap repository calls in try-catch blocks
3. **Use TypeScript**: Leverage type safety for filters and sorts
4. **Cache wisely**: Adjust cache TTL based on data update frequency
5. **Test thoroughly**: Test with both JSON and future database providers
6. **Document changes**: Update this file when adding new functions

## Troubleshooting

### "Cannot find module '../client'" error
- Ensure all relative imports use `.js` extension for ESM compatibility
- Run `pnpm run dev` to rebuild TypeScript

### Data not updating
- Clear cache: Check cache TTL or manually clear cache
- Check file permissions on JSON files
- Verify JSON syntax is valid

### Performance issues
- Consider migrating to a real database
- Adjust cache TTL
- Add indexes (for database providers)
- Implement pagination

## Support

For questions or issues, please refer to:
- Main project README
- Repository pattern documentation
- Next.js data fetching guides
