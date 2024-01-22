import {
  tfGet,
} from '@/utils/apiClient.js';
import { useAuthStore } from '@/stores/auth.js';
import { config } from '@/utils/config.js';

import { deleteCookie, setCookie } from '@/utils/cookies.js';

const cookieNameSpace = config.COOKIE_NAMESPACE;

/**
 * Log the user out by: update the Pinia Store, and remove cookies/local storage items
 */
export function signOut() {
  const authStore = useAuthStore();

  authStore.$reset();
  window.localStorage.removeItem('auth');
  deleteCookie(`${cookieNameSpace}-user-id`);
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
