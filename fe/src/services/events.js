import {
  tfDelete,
  tfGet,
  tfPatch,
  tfPost,
} from '@/utils/apiClient.js';

/**
 * Gets events
 *
 * @returns {Promise}
 */
export async function getEvents() {
  return tfGet('events');
}

/**
 * Gets single event
 *
 * @param {number} id
 * @returns {Promise}
 */
export async function getEvent(id) {
  return tfGet(`events/${id}`);
}

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
 * @param {number} eventId
 * @param {number} userId
 * @returns {Promise}
 */
export async function joinEvent(eventId, userId) {
  return tfPost(`users/${userId}/events/${eventId}`);
}

/**
 * Decline an event
 *
 * @param {number} eventId
 * @param {number} userId
 * @returns {Promise}
 */
export async function declineEvent(eventId, userId) {
  return tfDelete(`users/${userId}/events/${eventId}`);
}
