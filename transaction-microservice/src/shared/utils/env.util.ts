import 'dotenv/config';

/**
 * Checks if project is running in development env
 * @returns if env is in development
 */
export const isRunningInDevelopment = (): boolean =>
  process.env.NODE_ENV !== 'production';
