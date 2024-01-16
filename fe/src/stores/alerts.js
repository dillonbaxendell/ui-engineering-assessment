import { defineStore } from 'pinia';

export const useAlertsStore = defineStore('alerts', {
  state: () => ({
    alerts: [],
  }),

  actions: {
    /**
     * Add an alert object and remove it if it's a success message.
     *
     * @param {object} alert
     */
    addAlert(alert) {
      this.alerts.push(alert);

      if (alert.type === 'success') {
        setTimeout(() => {
          this.alerts.splice(this.alerts.indexOf(alert, 1));
        }, 3000);
      }
    },
    /**
     * Remove an alert when the user closes it.
     *
     * @param {object} alert
     */
    removeAlert(alert) {
      this.alerts.splice(this.alerts.indexOf(alert, 1));
    },
  },
});
