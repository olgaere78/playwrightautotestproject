import dotenv from 'dotenv';

dotenv.config();

const DEFAULT_BASE_URL = 'https://demo.playwright.dev';

function getEnv(name: string, fallback?: string) {
  const value = process.env[name];
  if (value && value.trim()) return value;
  if (fallback !== undefined) return fallback;
  throw new Error(`${name} is not defined`);
}

export const env = {
  baseURL: getEnv('BASE_URL', DEFAULT_BASE_URL),
  todoMvcPath: '/todomvc/#/',
};
