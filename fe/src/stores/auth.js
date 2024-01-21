import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    user: null,
  }),

  actions: {
    /**
     * @param {object} user
     */
    setUser(user) {
      this.user = user;
    },

    setAuthStatus(status) {
      this.authenticated = status;
    },
  },
});
