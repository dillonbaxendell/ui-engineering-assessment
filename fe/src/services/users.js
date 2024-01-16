import { tfGet } from '@/utils/apiClient.js';

/**
 * Gets events.
 *
 * @returns {Promise}
 */
export async function getUsers() {
  return tfGet('users');
}
