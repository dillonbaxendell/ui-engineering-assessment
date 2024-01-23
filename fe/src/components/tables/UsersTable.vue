<template>
  <div class="users-table">
    <ElTable
      v-if="localUsers"
      :data="localUsers"
      @sort-change="doSort"
    >
      <ElTableColumn prop="id" label="ID" />
      <ElTableColumn prop="first_name" label="First name" />
      <ElTableColumn prop="last_name" label="Last name" />
      <ElTableColumn prop="email_address" label="Email address" sortable="custom" />
      <ElTableColumn>
        <template #default="scope">
          <ElButton
            size="small"
            type="danger"
            @click="deleteUser(scope.row)"
          >
            Delete
          </ElButton>
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'pinia';
  import { getUsers, deleteUser } from '@/services/users.js';
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
      async deleteUser(user) {
        await deleteUser(user);
        this.loadUsers();
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
  padding: 0 1em;
}
</style>