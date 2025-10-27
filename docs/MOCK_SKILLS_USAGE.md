# Mock Skills Usage Guide

This guide explains how to use the mock skills feature in the Skills Store application.

## Overview

The skills data is split into two JSON files:
- **`skills.json`**: Contains real, production-ready skills
- **`mockSkills.json`**: Contains mock/sample skills for development

## Automatic Behavior

By default, the system automatically determines whether to include mock skills based on the environment:

- **Development** (`NODE_ENV !== 'production'`): Both `skills.json` and `mockSkills.json` are loaded
- **Production**: Only `skills.json` is loaded

## Manual Control

You can explicitly control whether to include mock skills when initializing the database provider:

### Example 1: Using Only Real Skills in Development

```typescript
import { getDbProvider } from '@/lib/db/client';

// Force exclude mock skills, even in development
const db = getDbProvider(false);

// Now all queries will only return real skills
const skills = await db.getSkills();
// Result: Only the DV skill from skills.json
```

### Example 2: Including Mock Skills

```typescript
import { getDbProvider } from '@/lib/db/client';

// Explicitly include mock skills
const db = getDbProvider(true);

const skills = await db.getSkills();
// Result: DV skill + all 20 mock skills
```

### Example 3: Default Behavior

```typescript
import { getDbProvider } from '@/lib/db/client';

// Use default behavior (auto-detect based on NODE_ENV)
const db = getDbProvider();

const skills = await db.getSkills();
// Development: 21 skills (1 real + 20 mock)
// Production: 1 skill (only real)
```

## Use Cases

### Development & Testing
Mock skills are useful for:
- Testing UI components with diverse data
- Developing filtering and sorting features
- Demonstrating the application with sample content
- Testing edge cases (different categories, price ranges, ratings)

### Production
In production, you want only real skills:
- Accurate skill listings
- Real download counts and ratings
- Actual author information

## File Structure

```
src/data/db/
├── skills.json      # Real skills (currently: DV skill)
├── mockSkills.json  # Mock skills (20 sample skills)
└── categories.json  # All categories
```

## Adding New Real Skills

When you're ready to add more real skills, simply add them to `skills.json`:

```json
[
  {
    "id": 0,
    "name": "Dimensional Variable (DV)",
    ...
  },
  {
    "id": 21,
    "name": "Your New Real Skill",
    "description": "...",
    ...
  }
]
```

The mock skills will continue to work alongside the real ones in development mode.

## Environment Variables

You can also control this behavior via environment variables:

```bash
# .env.local
NODE_ENV=production  # Excludes mock skills
NODE_ENV=development # Includes mock skills
```

## Repository Usage

The repository functions work transparently with or without mock skills:

```typescript
import * as skillsRepo from '@/lib/db/repositories/skills';

// All repository functions respect the mock skills setting
const allSkills = await skillsRepo.getSkills();
const popularSkills = await skillsRepo.getPopularSkills(5);
const searchResults = await skillsRepo.searchSkills('navigation');
```

## Notes

- The singleton pattern ensures the `getDbProvider()` configuration is consistent across your application
- Mock skills are only loaded if the file exists; if `mockSkills.json` is missing, only real skills are loaded (with a warning)
- Changing the mock skills setting requires restarting your development server to clear the cache
