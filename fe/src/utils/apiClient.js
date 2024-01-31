import axios from 'axios';

/**
 * A customized axios method that returns response or throws an error. This is used when the full response schema and error handling are handled elsewhere.
 * The supported order of parameters is:
 * - method: This is 'get' by default so is not required
 * - url
 * - data payload: This is only required for non-get/delete requests.
 * - request configs: https://axios-http.com/docs/req_config
 *
 * @param {...any} config
 * @returns {Promise}
 */
export function tfFetch(...config) {
  const methodBypassed = !['patch', 'post', 'delete', 'get'].includes(config[0]);
  const method = methodBypassed ? 'get' : config[0];
  let requestConfigs = {};

  if (['get', 'delete'].includes(method)) {
    requestConfigs = methodBypassed ? config[1] : config[2];
  } else {
    [, , , requestConfigs] = config;
  }

  return axios({
    method,
    url: methodBypassed ? config[0] : config[1],
    data: ['get', 'delete'].includes(method) ? {} : config[2],
    ...requestConfigs,
  });
}

/**
 * A common method for the axios functions that don't require any data in axios' request config and returns the response data.
 *
 * @param {string} method
 * @param {string} url
 *
 * @returns {object}
 */
async function getAxiosDataWithoutPayload(method, url) {
  const { data } = await axios({ method, url: `/v1/${url}` });

  return data;
}

/**
 * Custom "get" that returns data or throws an error.
 *
 * @param {string} url
 * @returns {Promise}
 */
export async function tfGet(url) {
  return getAxiosDataWithoutPayload('get', url);
}

/**
 * Custom "delete" that returns data or throws an error.
 *
 * @param {string} url
 * @param {object} config
 * @returns {Promise}
 */
export async function tfDelete(url, config) {
  return getAxiosDataWithoutPayload('delete', url, config);
}

/**
 * A common method for the axios functions that require data in axios' request config and returns the response data.
 *
 * @param {string} method
 * @param {string} url
 * @param {string} payload
 * @param {string} config
 * @returns {object}
 */
async function getAxiosDataWithPayload(
  method,
  url,
  payload = {},
  config = {},
) {
  const { data } = await axios({
    method,
    url: `/v1/${url}`,
    data: payload,
    ...config,
  });

  return data;
}

/**
 * Custom "patch" that returns data or throws an error.
 *
 * @param {string} url
 * @param {object} payload
 * @param {object} config
 * @returns {Promise}
 */
export async function tfPatch(url, payload, config) {
  return getAxiosDataWithPayload('patch', url, payload, config);
}

/**
 * Custom "post" that returns data or throws an error.
 *
 * @param {string} url
 * @param {object} payload
 * @param {object} config
 * @returns {Promise}
 */
export async function tfPost(url, payload, config) {
  return getAxiosDataWithPayload('post', url, payload, config);
}

/**
 * Custom "put" that returns data or throws an error.
 *
 * @param {string} url
 * @param {object} payload
 * @param {object} config
 * @returns {Promise}
 */
export async function tfPut(url, payload, config) {
  return getAxiosDataWithPayload('put', url, payload, config);
}
