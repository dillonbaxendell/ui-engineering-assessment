import { defineStore } from 'pinia';

export const useEventsStore = defineStore('events', {
  state: () => ({
    events: [],
    isModalVisible: false,
    editingEvent: null,
  }),

  actions: {
    /**
     * Set event list.
     *
     * @param {string} events
     */
    setEvents(events) {
      this.events.splice(0, this.events.length, ...events);
    },
    /**
     * Set currently editing event and show edit modal
     *
     * @param {object} event
     */
    editEvent(event) {
      this.editingEvent = event;
      this.isModalVisible = true;
    },
    /**
     * Clear editing event and hide modal
     */
    cancelEdit() {
      this.editingEvent = null;
      this.isModalVisible = false;
    },
  },
});
