import 'dotenv/config';

/**
 * Safely parse environment variables
 * @param key The key
 * @param defaultValue An optional default value if the environment variable does not exist
 */
export function validateEnv<T extends string = string>(key: keyof NodeJS.ProcessEnv, defaultValue?: T): T {
  const value = process.env[key] as T | undefined;

  if (!value) {
    if (typeof defaultValue !== 'undefined') {
      return defaultValue;
    } else {
      throw new Error(`${key} is not defined in environment variables`);
    }
  }

  return value;
}

// ENV
export const JWT_SECRET = validateEnv('JWT_SECRET');
export const PORT = validateEnv<`${number}`>('PORT', '8080');
export const NODE_ENV = validateEnv<'development' | 'production'>('NODE_ENV', 'production');

export const REDIS_URL = validateEnv('REDIS_URL');

// URLs
export const LANDING_URI = validateEnv('LANDING_URI', 'https://www.example.com');
export const DASHBOARD_URI = validateEnv('DASHBOARD_URI', 'https://app.example.com');
