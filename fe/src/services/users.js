import { tfDelete, tfGet } from '@/utils/apiClient.js';

/**
 * Gets users
 *
 * @returns {Promise}
 */
export async function getUsers() {
  return tfGet('users');
}

/**
 * Get the user info
 *
 * @param {number} userId
 * @returns {Promise}
 */
export function getUser(userId) {
  return tfGet(`users/${userId}`);
}

/**
 * Delete user
 *
 * @param {object} user
 * @param {number} user.id
 * @returns {Promise}
 */
export function deleteUser({ id }) {
  return tfDelete(`users/${id}`);
}
