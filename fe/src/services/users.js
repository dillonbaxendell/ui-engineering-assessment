import { tfGet } from '@/utils/apiClient.js';

/**
 * Gets users.
 *
 * @returns {Promise}
 */
export async function getUsers() {
  return tfGet('users');
}

/**
 * Get the user info.
 *
 * @param {number} userId
 * @returns {Promise}
 */
export function getUser(userId) {
  return tfGet(`users/${userId}`);
}
