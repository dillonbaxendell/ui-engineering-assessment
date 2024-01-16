<template>
  <header class="main-header">
    <HeaderMenu
      class="header-menu"
    />
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
    <h1>Event scheduler</h1>
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

  .header-menu {
    float: right;
    border: none;
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
</style>
