import { defineStore } from 'pinia';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [],
    isRegisterModalVisible: false,
    isEditModalVisible: false,
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
    /**
     * Set currently editing user and show edit modal
     *
     * @param {object} user
     */
    editUser(user) {
      this.editingUser = user;
      this.isEditModalVisible = true;
    },
    /**
     * Clear editing user and hide modal
     */
    cancelEdit() {
      this.editingUser = null;
      this.isEditModalVisible = false;
    },
  },
});
