function getEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not defined`);
  }
  return value;
}
export const env = {
  baseUrl: getEnv('BASE_URL'),
};
