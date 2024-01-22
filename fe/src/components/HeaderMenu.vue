<template>
  <ElMenu
    mode="horizontal"
    :ellipsis="false"
  >
    <ElSubMenu index="1">
      <template #title>
        <ElIcon><Setting /></ElIcon>
      </template>
      <template
        v-if="authenticated"
      >
        <ElMenuItem
          @click="() => editEvent()"
        >
          <template #title>
            <ElIcon><Calendar /></ElIcon>
            Create new event
          </template>
        </ElMenuItem>
        <ElMenuItem
          @click="signOut"
        >
          <template #title>
            <ElIcon><Unlock /></ElIcon>
            Sign Out
          </template>
        </ElMenuItem>
      </template>
      <ElMenuItem
        v-if="!authenticated"
        @click="() => $router.push({ name: 'SignIn' })"
      >
        <template #title>
          <ElIcon><Lock /></ElIcon>
          Sign In
        </template>
      </ElMenuItem>
    </ElSubMenu>
  </ElMenu>
</template>

<script>
  import { mapActions, mapState } from 'pinia';
  import { useAuthStore } from '@/stores/auth.js';
  import { useEventsStore } from '@/stores/events.js';
  import { signOut } from '@/services/auth.js';

  export default {
    name: 'MainHeader',
    computed: {
      ...mapState(useAuthStore, ['authenticated']),
    },
    methods: {
      ...mapActions(useEventsStore, ['editEvent']),

      async signOut() {
        signOut();
        await this.$router.push({ name: 'Home' });
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>
