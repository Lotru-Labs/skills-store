# Skills Data Split - Summary of Changes

## What Changed

The skills data has been split into two separate JSON files to distinguish between real production skills and mock development data.

## Files Modified

### ✅ Created Files
1. **`src/data/db/mockSkills.json`** - Contains 20 mock skills (IDs 1-20)
2. **`docs/MOCK_SKILLS_USAGE.md`** - Complete usage guide for the mock skills feature

### ✏️ Modified Files
1. **`src/data/db/skills.json`** - Now contains only 1 real skill (DV skill, ID 0)
2. **`src/lib/db/providers/json.ts`** - Updated to support loading mock skills optionally
3. **`src/lib/db/client.ts`** - Updated to accept `includeMockSkills` parameter
4. **`docs/DATABASE_LAYER.md`** - Updated documentation with mock skills information

## How It Works

### Automatic Behavior
- **Development mode**: Loads both `skills.json` + `mockSkills.json` (21 total skills)
- **Production mode**: Loads only `skills.json` (1 real skill)

### Manual Control
```typescript
// Use only real skills (even in development)
const db = getDbProvider(false);

// Include mock skills (even in production)
const db = getDbProvider(true);

// Auto-detect based on NODE_ENV (default)
const db = getDbProvider();
```

## Benefits

✨ **Clean separation** - Real skills separate from mock data
✨ **Development-friendly** - Mock data available for UI testing
✨ **Production-ready** - Only real skills in production
✨ **Future-proof** - Easy to add more real skills to `skills.json`
✨ **Flexible** - Can disable mock skills when needed

## Current State

- **Real Skills**: 1 (Dimensional Variable)
- **Mock Skills**: 20 (various categories for testing)
- **Total in Development**: 21 skills
- **Total in Production**: 1 skill

## Next Steps

When you add more real skills:
1. Add them to `src/data/db/skills.json`
2. Mock skills will continue to work alongside them in dev mode
3. Production will only show the real skills

## Documentation

- Full usage guide: `docs/MOCK_SKILLS_USAGE.md`
- Database layer docs: `docs/DATABASE_LAYER.md`
