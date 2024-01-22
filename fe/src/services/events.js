import { tfGet, tfPost } from '@/utils/apiClient.js';

/**
 * Gets events.
 *
 * @returns {Promise}
 */
export async function getEvents() {
  return tfGet('events');
}

/**
 * Save an event
 *
 * @param {object} payload
 * @returns {Promise}
 */
export async function saveEvent(payload) {
  return tfPost('events', payload);
}
