<template>
  <nav
    class="sidebar"
  >
    <ElMenu
      :default-active="activeTab"
      :collapse="true"
    >
      <ElMenuItem
        index="Events"
        @click="$router.push({ name: 'Events' })"
      >
        <ElIcon><Calendar /></ElIcon>
        <template #title>
          Events
        </template>
      </ElMenuItem>
      <ElMenuItem
        index="Users"
        @click="$router.push({ name: 'Users' })"
      >
        <ElIcon><User /></ElIcon>
        <template #title>
          Users
        </template>
      </ElMenuItem>
    </ElMenu>
  </nav>
</template>

<script>
  export default {
    name: 'App',
    computed: {
      activeTab() {
        return this.$route.name?.match(/event/i) ? 'Events' : 'Users';
      },
    },
  };
</script>

<style lang="scss">
  .sidebar {
    display: flex;
    .el-menu {
      flex: 1;
    }
  }
</style>
