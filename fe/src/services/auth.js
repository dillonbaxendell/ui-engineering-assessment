import {
  tfPost,
} from '@/utils/apiClient.js';
import { useAuthStore } from '@/stores/auth.js';
import { config } from '@/utils/config.js';

import { deleteCookie, setCookie } from '@/utils/cookies.js';

const cookieNameSpace = config.VITE_COOKIE_NAMESPACE;

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
 * Setting all the appropriate info for logging in a user: localStorage/cookies and pinia states
 *
 * @param {object} user
 * @param {number} user.id
 * @param {string} user.emailAddress
 * @param {string} user.firstName
 * @param {string} user.lastName
 */
export function setSignedIn(user) {
  if (!user.id) return;

  const authStore = useAuthStore();

  authStore.setAuthStatus(true);
  authStore.setUser(user);

  window.localStorage.setItem('auth', true);
  setCookie(`${cookieNameSpace}-user-id`, user.id);
}

/**
 * Sign the user in
 *
 * @param {string} emailAddress
 * @returns {object}
 */
export function signIn(emailAddress) {
  return tfPost('login', { emailAddress });
}

/**
 * Register a new user
 *
 * @param {object} form
 * @param {string} form.emailAddress
 * @param {string} form.firstName
 * @param {string} form.lastName
 * @returns {Promise}
 */
export function register(form) {
  return tfPost('users', form);
}
