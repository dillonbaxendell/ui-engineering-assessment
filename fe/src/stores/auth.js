import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    user: null,
    isRegisterModalVisible: false,
  }),

  actions: {
    /**
     * Set the current user
     *
     * @param {object} user
     */
    setUser(user) {
      this.user = user;
    },

    /**
     * Set users authentication status
     *
     * @param {boolean} status
     */
    setAuthStatus(status) {
      this.authenticated = status;
    },
  },
});
