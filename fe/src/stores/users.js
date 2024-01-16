import { defineStore } from 'pinia';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [],
  }),

  actions: {
    /**
     * Set event list.
     *
     * @param {string} users
     */
    setUsers(users) {
      this.users = users;
    },
  },
});
