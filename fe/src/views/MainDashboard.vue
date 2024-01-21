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
  import { mapState } from 'pinia';
  import { useAuthStore } from '@/stores/auth.js';
  import { signOut } from '@/services/auth.js';
  import EventModal from '@/components/modals/EventModal.vue';
  import MainSidebar from '@/components/MainSidebar.vue';

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
      if (this.signOut) {
        await signOut();
      }
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
