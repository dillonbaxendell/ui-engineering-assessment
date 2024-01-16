import { tfGet } from '@/utils/apiClient.js';

/**
 * Gets events.
 *
 * @param {string} eventsType
 * @returns {Promise}
 */
export async function getEvents(eventsType) {
  if (eventsType === 'pastEvents') {
    return tfGet('past-events');
  }

  return tfGet('my-events');
}
