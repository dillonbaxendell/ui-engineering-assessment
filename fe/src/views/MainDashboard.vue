<template>
  <div class="main-container">
    <MainSidebar />
    <div class="main-content">
      <router-view />
    </div>
    <EventModal />
  </div>
</template>

<script>
  import EventModal from '@/components/EventModal.vue';
  import MainSidebar from '@/components/MainSidebar.vue';

  export default {
    name: 'MainDashboard',
    components: {
      EventModal,
      MainSidebar,
    },
    computed: {
      activeTab() {
        return this.$route.name?.match(/event/i) ? 'Events' : 'Users';
      },
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
}
</style>
