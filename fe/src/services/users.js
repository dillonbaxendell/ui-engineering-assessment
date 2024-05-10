import {
  tfDelete,
  tfGet,
  tfPatch,
  tfPost,
} from '@/utils/apiClient.js';

/**
 * Gets all users
 *
 * @returns {Promise}
 */
export async function getUsers() {
  return tfGet('users');
}

/**
 * Get the user info for a given user id
 *
 * @param {number} userId
 * @returns {Promise}
 */
export function getUser(userId) {
  return tfGet(`users/${userId}`);
}

/**
 * Delete a user by id
 *
 * @param {number} userId
 * @returns {Promise}
 */
export function deleteUser(userId) {
  return tfDelete(`users/${userId}`);
}

/**
 * Save changes to a user
 *
 * @param {object} payload
 * @param {number} payload.id
 * @param {string} payload.emailAddress
 * @param {string} payload.firstName
 * @param {string} payload.lastName
 * @returns {Promise}
 */
export async function saveUser(payload) {
  if (payload.id) {
    return tfPatch(`users/${payload.id}`, payload);
  }

  return tfPost('users', payload);
}
