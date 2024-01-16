<template>
  <ElMenu
    mode="horizontal"
    :ellipsis="false"
  >
    <ElSubMenu index="1">
      <template #title>
        <ElIcon><Setting /></ElIcon>
      </template>
      <ElMenuItem
        @click="() => editEvent()"
      >
        <template #title>
          <ElIcon><Calendar /></ElIcon>
          Create new event
        </template>
      </ElMenuItem>
    </ElSubMenu>
  </ElMenu>
</template>

<script>
  import { mapActions } from 'pinia';
  import { useEventsStore } from '@/stores/events.js';

  export default {
    name: 'MainHeader',
    methods: {
      ...mapActions(useEventsStore, ['editEvent']),
    },
  };
</script>

<style lang="scss" scoped>
</style>
