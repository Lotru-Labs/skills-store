# Quick Reference: Database Layer

## Import the Repositories

```typescript
import * as skillsRepo from '@/lib/db/repositories/skills';
import * as categoriesRepo from '@/lib/db/repositories/categories';
```

## Common Operations

### Get All Skills
```typescript
const skills = await skillsRepo.getSkills();
```

### Filter Skills
```typescript
// By category
const navSkills = await skillsRepo.getSkillsByCategory('navigation');

// By tags
const aiSkills = await skillsRepo.getSkillsByTags(['ai', 'deep-learning']);

// Multiple filters
const skills = await skillsRepo.getSkills({
  category: 'vision',
  isPaid: false,
  minRating: 4.5,
  maxPrice: 50
});
```

### Search Skills
```typescript
const results = await skillsRepo.searchSkills('robot navigation');
```

### Sort Skills
```typescript
// Most popular
const popular = await skillsRepo.getPopularSkills(10);

// Top rated
const topRated = await skillsRepo.getTopRatedSkills(10);

// Recently updated
const recent = await skillsRepo.getRecentlyUpdatedSkills(10);

// Custom sort
const sorted = await skillsRepo.getSkills(
  undefined,
  { field: 'downloads', order: 'desc' }
);
```

### Get Categories
```typescript
const categories = await categoriesRepo.getCategories();
const category = await categoriesRepo.getCategoryById('navigation');
```

### Aggregations
```typescript
const totalDownloads = await skillsRepo.getTotalDownloads();
const skillCount = await skillsRepo.getSkillCount();
const allTags = await skillsRepo.getAllTags();
const authors = await skillsRepo.getUniqueAuthors();
```

## Filter Options

```typescript
interface SkillFilters {
  category?: string;       // e.g., 'navigation'
  tags?: string[];        // e.g., ['ai', 'slam']
  isPaid?: boolean;       // true or false
  minRating?: number;     // e.g., 4.5
  maxPrice?: number;      // e.g., 50.00
  author?: string;        // e.g., 'RoboTech Labs'
  search?: string;        // Full-text search
}
```

## Sort Options

```typescript
interface SortOptions {
  field: 'name' | 'downloads' | 'rating' | 'price' | 'lastUpdated';
  order: 'asc' | 'desc';
}
```

## Example: Complex Query

```typescript
// Get free, highly-rated AI skills, sorted by downloads
const skills = await skillsRepo.getSkills(
  {
    tags: ['ai', 'deep-learning'],
    isPaid: false,
    minRating: 4.5
  },
  {
    field: 'downloads',
    order: 'desc'
  }
);
```

## Using in React Components

```typescript
'use client';

import { useState, useEffect } from 'react';
import * as skillsRepo from '@/lib/db/repositories/skills';

export default function MyComponent() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSkills() {
      try {
        const data = await skillsRepo.getSkills();
        setSkills(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    loadSkills();
  }, []);

  if (loading) return <div>Loading...</div>;
  
  return <div>{/* render skills */}</div>;
}
```

## File Locations

- **JSON Data**: `src/data/db/skills.json`, `src/data/db/categories.json`
- **Repositories**: `src/lib/db/repositories/`
- **Provider**: `src/lib/db/providers/json.ts`
- **Types**: `src/lib/db/types.ts`
- **Client**: `src/lib/db/client.ts`

## Environment Variables

```bash
# Current (default)
DB_PROVIDER=json

# Future database providers
DB_PROVIDER=postgres
DATABASE_URL=postgresql://...
```

## Helpful Functions

| Function | Description |
|----------|-------------|
| `getSkills()` | Get all skills with optional filters/sort |
| `getSkillById()` | Get single skill |
| `getSkillsByCategory()` | Filter by category |
| `getSkillsByTags()` | Filter by tags |
| `searchSkills()` | Search by text |
| `getPopularSkills()` | Top downloads |
| `getTopRatedSkills()` | Highest ratings |
| `getRecentlyUpdatedSkills()` | Most recent |
| `getFreeSkills()` | Free only |
| `getPaidSkills()` | Paid only |
| `getTotalDownloads()` | Sum of all downloads |
| `getSkillCount()` | Total number |
| `getAllTags()` | All unique tags |
| `getCategories()` | All categories |

## Tips

💡 Use `Promise.all()` for parallel queries:
```typescript
const [skills, categories] = await Promise.all([
  skillsRepo.getSkills(),
  categoriesRepo.getCategories()
]);
```

💡 Cache is automatic - no need to manage it

💡 All functions return Promises - use async/await

💡 TypeScript types ensure type safety

💡 Error handling recommended:
```typescript
try {
  const skills = await skillsRepo.getSkills();
} catch (error) {
  console.error('Failed to load skills:', error);
}
```
