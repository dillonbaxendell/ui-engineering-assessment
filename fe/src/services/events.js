import {
  tfDelete,
  tfGet,
  tfPatch,
  tfPost,
} from '@/utils/apiClient.js';

/**
 * Gets events.
 *
 * @returns {Promise}
 */
export async function getEvents() {
  return tfGet('events');
}

/**
 * Gets events for a particular user
 *
 * @param {number} id
 * @returns {Promise}
 */
// export async function getUserEvents(id) {
//   return tfGet(`users/${id}/events`);
// }

/**
 * Save an event
 *
 * @param {object} payload
 * @returns {Promise}
 */
export async function saveEvent(payload) {
  if (payload.id) {
    return tfPatch(`events/${payload.id}`, payload);
  }

  return tfPost('events', payload);
}

/**
 * Delete an event
 *
 * @param {number} id
 * @returns {Promise}
 */
export async function deleteEvent(id) {
  return tfDelete(`events/${id}`);
}

/**
 * Join an event
 *
 * @param {number} event_id
 * @param {number} userId
 * @returns {Promise}
 */
export async function joinEvent(event_id, userId) {
  return tfPost(`users/${userId}/events`, { event_id });
}
