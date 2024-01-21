import { tfGet } from '@/utils/apiClient.js';
// import { config } from '@/utils/config.js';

/**
 * Gets events.
 *
 * @returns {Promise}
 */
export async function getEvents() {
  return tfGet('events');
}
