const getEnv = (name) => {
  const env = {
    API_URL: import.meta.env.API_URL,
  };

  return env[name];
};
const getConfig = () => {
  const config = {
    API_URL: getEnv('API_URL'),
  };

  return {
    ...config,
  };
};
const config = getConfig();

export { config };
