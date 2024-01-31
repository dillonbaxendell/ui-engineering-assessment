import { defineStore } from 'pinia';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [],
    isRegisterModalVisible: false,
  }),

  actions: {
    /**
     * Set users list.
     *
     * @param {string} users
     */
    setUsers(users) {
      this.users = users;
    },
  },
});
