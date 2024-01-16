<template>
  <section class="tabs">
    <ElTabs
      v-model="$route.name"
      @tab-change="onTabClick"
    >
      <ElTabPane
        v-for="({ label, name }) in dashboards"
        v-bind="{ label, name }"
        :key="label"
      />
    </ElTabs>
    <router-view />
  </section>
</template>

<script>
  export default {
    name: 'MainDashboard',
    data: () => ({
      dashboards: [
        {
          label: 'Your events',
          name: 'MyEvents',
        },
        {
          label: 'Past events',
          name: 'PastEvents',
        },
      ],
    }),
    methods: {
      /**
       * Evaluates the name to determine the correct route params to push.
       *
       * @param {object} root
       * @param {string} root.name
       */
      async onTabClick({ name }) {
        await this.$router.push({ name });
      },
    },
  };
</script>

<style lang="scss" scoped>
.tabs {
  flex: 1;
  margin: 0 1em;
}
</style>
