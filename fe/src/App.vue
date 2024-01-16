<template>
  <div class="main">
    <MainHeader />
    <div class="main-container">
      <MainSidebar />
      <div class="main-content">
        <router-view />
      </div>
    </div>
    <EventModal />
  </div>
</template>

<script>
  import EventModal from '@/components/EventModal.vue';
  import MainHeader from '@/components/MainHeader.vue';
  import MainSidebar from '@/components/MainSidebar.vue';

  export default {
    name: 'App',
    components: {
      EventModal,
      MainHeader,
      MainSidebar,
    },
    computed: {
      activeTab() {
        return this.$route.name?.match(/event/i) ? 'Events' : 'Users';
      },
    },
  };
</script>

<style lang="scss">
  body, html {
    height: 100%;
    -ms-overflow-style: -ms-autohiding-scrollbar;
  }

  #app {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .main {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .main-container {
    display: flex;
    height: 100%;
  }
  .main-content {
    display: flex;
    flex: 1 0 auto;
  }
  .sidebar {
    display: flex;
    .el-menu {
      flex: 1;
    }
  }
</style>
