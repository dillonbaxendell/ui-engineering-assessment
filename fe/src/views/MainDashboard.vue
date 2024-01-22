<template>
  <div class="main-container">
    <MainSidebar
      v-if="authenticated"
    />
    <div class="main-content">
      <router-view />
    </div>
    <EventModal />
  </div>
</template>

<script>
  import { mapActions, mapState } from 'pinia';
  import { useAuthStore } from '@/stores/auth.js';
  import { setSignedIn } from '@/services/auth.js';
  import { getUser } from '@/services/users.js';
  import EventModal from '@/components/modals/EventModal.vue';
  import MainSidebar from '@/components/MainSidebar.vue';
  import { getCookie } from '@/utils/cookies.js';
  import { config } from '@/utils/config.js';

  const cookieNameSpace = config.VITE_COOKIE_NAMESPACE;

  export default {
    name: 'MainDashboard',
    components: {
      EventModal,
      MainSidebar,
    },
    computed: {
      ...mapState(useAuthStore, ['authenticated']),
    },
    async created() {
      const auth = window.localStorage.getItem('auth') === 'true';

      if (auth) {
        const userId = getCookie(`${cookieNameSpace}-user-id`);

        if (userId) {
          const data = await getUser(userId);

          setSignedIn(data);
        }
      }
    },
    methods: {
      ...mapActions(useAuthStore, ['setUser']),
    },
  };
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  height: 100%;
}
.main-content {
  display: flex;
  flex: 1 0 auto;
  justify-content: center;
}
</style>
