<template>
  <div class="main">
    <MainHeader />
    <router-view />
  </div>
</template>

<script>
  import MainHeader from '@/components/MainHeader.vue';

  export default {
    name: 'App',
    components: {
      MainHeader,
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
</style>
