<template>
  <div class="main">
    <MainHeader />
    <router-view />
    <RegisterModal v-model="isRegisterModalVisible" />
  </div>
</template>

<script>
  import { mapWritableState } from 'pinia';
  import { useAuthStore } from '@/stores/auth.js';
  import MainHeader from '@/components/MainHeader.vue';
  import RegisterModal from '@/components/modals/RegisterModal.vue';

  export default {
    name: 'App',
    components: {
      MainHeader,
      RegisterModal,
    },
    computed: {
      ...mapWritableState(useAuthStore, ['isRegisterModalVisible']),
    },
  };
</script>

<style lang="scss">
  body, html {
    height: 100%;
    -ms-overflow-style: -ms-autohiding-scrollbar;
  }

  #app {
    display: flex;
    flex-direction: column;
  }
  .main {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
</style>
