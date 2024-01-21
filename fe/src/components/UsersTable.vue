<template>
  <div class="users-table">
    <ElTable
      v-if="localUsers"
      :data="localUsers"
      @sort-change="doSort"
    >
      <ElTableColumn prop="id" label="ID" />
      <ElTableColumn prop="name" label="Name" sortable="custom" />
    </ElTable>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'pinia';
  import { getUsers } from '@/services/users.js';
  import { useUsersStore } from '@/stores/users.js';
  import { useAlertsStore } from '@/stores/alerts.js';

  export default {
    name: 'UsersTable',
    data() {
      return {
        localUsers: null,
      };
    },
    computed: {
      ...mapState(useUsersStore, ['users']),
    },
    watch: {
      users: {
        handler() {
          this.localUsers = this.users.map((user) => user);
        },
        immediate: true,
        deep: true,
      },
    },
    async created() {
      await this.loadUsers();
    },
    methods: {
      ...mapActions(useAlertsStore, ['addAlert']),
      ...mapActions(useUsersStore, ['setUsers']),

      /**
       * Load users from the server.
       */
      async loadUsers() {
        try {
          const data = await getUsers();

          this.setUsers(data);
        } catch (error) {
          this.addAlert({
            title: 'Error retrieving users.',
            type: 'error',
          });
        }
      },
      doSort({ prop, order }) {
        if (order) {
          this.localUsers.sort((a, b) => {
            if (order === 'ascending') {
              return a[prop] > b[prop] ? 1 : -1;
            }

            return a[prop] < b[prop] ? 1 : -1;
          });
        } else {
          this.localUsers = this.users;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
.users-table {
  height: 100%;
  width: 100%;
  overflow: auto;
}
</style>
