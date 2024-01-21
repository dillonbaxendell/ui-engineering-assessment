import { tfGet } from '@/utils/apiClient.js';

/**
 * Gets events.
 *
 * @returns {Promise}
 */
export async function getEvents() {
  return tfGet('events');
}
