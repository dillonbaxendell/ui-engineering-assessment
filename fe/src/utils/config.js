/**
 * Helper for retrieving environment variables
 *
 * @param {string} name
 * @returns {string}
 */
const getEnv = (name) => {
  const env = {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    VITE_COOKIE_NAMESPACE: import.meta.env.VITE_COOKIE_NAMESPACE,
  };

  return env[name];
};
/**
 * Get environment variables
 *
 * @returns {object}
 */
const getConfig = () => {
  const config = {
    VITE_API_URL: getEnv('VITE_API_URL'),
    VITE_COOKIE_NAMESPACE: getEnv('VITE_COOKIE_NAMESPACE'),
  };

  return {
    ...config,
  };
};
const config = getConfig();

export { config };
