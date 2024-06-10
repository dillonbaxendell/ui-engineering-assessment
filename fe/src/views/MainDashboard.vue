<template>
  <div :class="['main-container', { auth: authenticated }]">
    <MainSidebar
      v-if="authenticated"
    />
    <div class="main-content">
      <router-view />
    </div>
    <EventModal @reload="loadEvents" />
    <EditUserModal @reload="loadUsers" />
  </div>
</template>

<script>
  import { mapActions, mapState } from 'pinia';
  import { useAlertsStore } from '@/stores/alerts.js';
  import { useAuthStore } from '@/stores/auth.js';
  import { useEventsStore } from '@/stores/events.js';
  import { useUsersStore } from '@/stores/users.js';
  import { setSignedIn } from '@/services/auth.js';
  import { getEvents } from '@/services/events.js';
  import { getUsers, getUser } from '@/services/users.js';
  import EventModal from '@/components/modals/EventModal.vue';
  import EditUserModal from '@/components/modals/EditUserModal.vue';
  import MainSidebar from '@/components/MainSidebar.vue';
  import { getCookie } from '@/utils/cookies.js';
  import { config } from '@/utils/config.js';

  const cookieNameSpace = config.VITE_COOKIE_NAMESPACE;

  export default {
    name: 'MainDashboard',
    components: {
      EventModal,
      EditUserModal,
      MainSidebar,
    },
    provide() {
      return {
        /**
         * Provide load events method to child components
         */
        loadEvents: this.loadEvents,
        loadUsers: this.loadUsers,
      };
    },
    computed: {
      ...mapState(useAuthStore, ['authenticated']),
    },
    async created() {
      /**
       * Check user authentication status
       */
      const auth = window.localStorage.getItem('auth') === 'true';

      if (auth) {
        /**
         * Get user id from cookie
         */
        const userId = getCookie(`${cookieNameSpace}-user-id`);

        if (userId) {
          /**
           * Get user from API and save in store
           */
          const user = await getUser(userId);

          setSignedIn(user);
        }
      }
    },
    methods: {
      ...mapActions(useAuthStore, ['setUser']),
      ...mapActions(useEventsStore, ['setEvents']),
      ...mapActions(useUsersStore, ['setUsers']),
      ...mapActions(useAlertsStore, ['addAlert']),
      /**
       * Load events from the API
       */
      async loadEvents() {
        try {
          const data = await getEvents(this.eventsType);

          this.setEvents(data);
        } catch (error) {
          /**
           * Show error alert
           */
          this.addAlert({
            title: 'Error retrieving events.',
            type: 'error',
          });
        }
      },
      async loadUsers() {
        try {
          const data = await getUsers();

          this.setUsers(data);
        } catch (error) {
          /**
           * Show error alert
           */
          this.addAlert({
            title: 'Error retrieving events.',
            type: 'error',
          });
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  height: 100%;

  &.auth {
    margin-left: 60px;
  }
}
.main-content {
  display: flex;
  flex: 1 0 auto;
  justify-content: center;
}
</style>
