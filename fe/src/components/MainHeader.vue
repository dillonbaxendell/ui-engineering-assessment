<template>
  <header class="main-header">
    <div class="header-title">
      <ElButton class="home-button" icon="House" @click="$router.push({ name: 'Home' })" />
      <h2>Event scheduler</h2>
    </div>
    <div class="alerts-container">
      <ElAlert
        v-for="(alert, index) in alerts"
        :key="`${index}-${alert.type}`"
        :title="alert.title"
        :type="alert.type"
        :closable="alert.type !== 'success'"
        effect="dark"
        @close="removeAlert(alert)"
      />
    </div>
    <HeaderMenu
      class="header-menu"
    />
  </header>
</template>

<script>
  import { mapActions, mapState } from 'pinia';
  import { useAlertsStore } from '@/stores/alerts.js';
  import HeaderMenu from '@/components/HeaderMenu.vue';

  export default {
    name: 'MainHeader',
    components: {
      HeaderMenu,
    },
    computed: {
      ...mapState(useAlertsStore, ['alerts']),
    },
    methods: {
      ...mapActions(useAlertsStore, ['removeAlert']),
    },
  };
</script>

<style lang="scss" scoped>
.main-header {
  position: sticky;
  top: 0;
  z-index: 2;
  padding: 0 0 0 1em;
  background: var(--tf-white);
  box-shadow: 0 1px 3px rgba(0, 0, 0, .25);
  display: flex;
  justify-content: space-between;

  .header-menu {
    border: none;
  }

  .header-title {
    display: flex;
    flex: 0 1 auto;
    align-items: center;
  }
}

.home-button {
  border: none;
  padding: 0;
  margin-right: 1em;

  :deep(.el-icon) {
    font-size: 24px;
    color: var(--el-color-primary);
  }
}

.alerts-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  :deep(.el-alert) {

    &:not(.el-alert--success) {
      padding: .5em 1.5em .5em .5em;
    }
  }
}

h2 {
  display: flex;
  align-items: center;
  height: var(--el-menu-horizontal-height);
  margin: 0;
}
</style>
