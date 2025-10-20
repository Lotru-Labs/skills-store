import { DatabaseProvider } from './types';
import { JsonProvider } from './providers/json';

/**
 * Database client factory
 * Returns the appropriate database provider based on environment configuration
 */

let dbProviderInstance: DatabaseProvider | null = null;

/**
 * Get the database provider instance
 * Uses singleton pattern to ensure only one provider instance exists
 */
export function getDbProvider(): DatabaseProvider {
  if (dbProviderInstance) {
    return dbProviderInstance;
  }

  const providerType = process.env.DB_PROVIDER || 'json';

  switch (providerType) {
    case 'json':
      dbProviderInstance = new JsonProvider();
      break;
    // Future providers can be added here:
    // case 'postgres':
    //   dbProviderInstance = new PostgresProvider();
    //   break;
    // case 'mongodb':
    //   dbProviderInstance = new MongoProvider();
    //   break;
    default:
      console.warn(`Unknown DB_PROVIDER: ${providerType}, falling back to json`);
      dbProviderInstance = new JsonProvider();
  }

  return dbProviderInstance;
}

/**
 * Reset the provider instance (useful for testing)
 */
export function resetDbProvider(): void {
  dbProviderInstance = null;
}
