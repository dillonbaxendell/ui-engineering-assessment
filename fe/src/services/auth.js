import {
  tfGet,
} from '@/utils/apiClient.js';
import { useAuthStore } from '@/stores/auth.js';
import { config } from '@/utils/config.js';

import { deleteCookie, getCookie, setCookie } from '@/utils/cookies.js';

const cookieNameSpace = config.COOKIE_NAMESPACE;

/**
 * Log the user out by: update the Pinia Store, and remove cookies/local storage items
 *
 * @returns {Promise}
 */
export function signOut() {
  const authStore = useAuthStore();

  authStore.$reset();
  window.localStorage.setItem('auth', false);
  deleteCookie(`${cookieNameSpace}-user-id`);

  return new Promise((resolve) => {
    resolve();
  });
}

/**
 * Get the user info.
 *
 * @returns {Promise}
 */
export function getUser() {
  const userId = getCookie(`${cookieNameSpace}-user-id`);

  return tfGet(`users/${userId}`);
}

/**
 * Setting all the appropriate info for logging in a user: localstorage/cookies and pinia states
 *
 * @param {object} user
 */
export function setSignedIn(user) {
  const authStore = useAuthStore();

  authStore.setAuthStatus(true);
  authStore.setUser(user);
  window.localStorage.setItem('auth', true);
  setCookie(`${cookieNameSpace}-user-id`, user.id);
}

/**
 * Sign the user in.
 *
 * @returns {object}
 */
export function signIn() {
  return tfGet('users/1');
}
