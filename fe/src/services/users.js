import {
  tfDelete,
  tfGet,
  tfPatch,
  tfPost,
} from '@/utils/apiClient.js';

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

/**
 * Save an event
 *
 * @param {object} payload
 * @returns {Promise}
 */
export async function saveUser(payload) {
  if (payload.id) {
    return tfPatch(`users/${payload.id}`, payload);
  }

  return tfPost('users', payload);
}
