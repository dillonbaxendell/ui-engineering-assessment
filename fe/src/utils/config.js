const getEnv = (name) => {
  const env = {
    VUE_APP_API_URL: import.meta.env.VUE_APP_API_URL,
    VUE_APP_ENV: import.meta.env.VUE_APP_ENV,
    VUE_APP_VERSION: import.meta.env.VUE_APP_VERSION,
  };

  return env[name];
};
const getConfig = () => {
  const config = {
    VUE_APP_API_URL: getEnv('VUE_APP_API_URL'),
    VUE_APP_ENV: getEnv('VUE_APP_ENV'),
    VUE_APP_VERSION: getEnv('VUE_APP_VERSION'),
  };

  return {
    ...config,
  };
};
const config = getConfig();

export { config };
