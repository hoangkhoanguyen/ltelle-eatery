import { unstable_cache } from 'next/cache';

/**
 * Creates a cached version of a function using Next.js unstable_cache
 * 
 * @param fn - The async function to cache
 * @param keyParts - Static key parts for cache key generation
 * @param tags - Static cache tags
 * @param revalidate - Revalidation time in seconds (optional)
 * @returns Cached function
 */
export function createCachedFunction<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  keyParts: string[],
  tags: string[],
  revalidate?: number
) {
  return unstable_cache(
    fn,
    keyParts,
    {
      tags,
      revalidate
    }
  );
}

/**
 * Creates a cached function with dynamic keys and tags based on arguments
 * 
 * @param fn - The async function to cache
 * @param keyGenerator - Function to generate cache key from arguments
 * @param tagGenerator - Function to generate cache tags from arguments
 * @param revalidate - Revalidation time in seconds (optional)
 * @returns Cached function
 */
export function createDynamicCachedFunction<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  keyGenerator: (...args: T) => string[],
  tagGenerator: (...args: T) => string[],
  revalidate?: number
) {
  return async (...args: T): Promise<R> => {
    const keys = keyGenerator(...args);
    const tags = tagGenerator(...args);
    
    const cachedFn = unstable_cache(
      fn,
      keys,
      {
        tags,
        revalidate
      }
    );
    
    return cachedFn(...args);
  };
}

/**
 * Cache duration constants in seconds
 */
export const CACHE_DURATIONS = {
  REALTIME: 30,     // 30 seconds - for frequently changing data
  SHORT: 300,       // 5 minutes - for data that changes regularly
  MEDIUM: 900,      // 15 minutes - for data that changes occasionally
  LONG: 3600,       // 1 hour - for relatively stable data
  STATIC: 86400,    // 24 hours - for rarely changing data
} as const;
