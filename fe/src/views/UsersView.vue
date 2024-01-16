<template>
  <UsersTable
    class="users-table"
  />
</template>

<script>
  import UsersTable from '@/components/UsersTable.vue';

  export default {
    name: 'UsersView',
    components: {
      UsersTable,
    },
  };
</script>

<style lang="scss" scoped>
.users-table {
  width: 100%;
}
</style>
