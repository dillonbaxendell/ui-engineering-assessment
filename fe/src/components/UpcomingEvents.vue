<template>
  <div
    v-if="events"
    class="event-cards"
  >
    <ElCard
      v-for="event in events"
      :key="event.id"
    >
      {{ event.name }}
    </ElCard>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'pinia';
  import { getEvents } from '@/services/events.js';
  import { useEventsStore } from '@/stores/events.js';
  import { useAlertsStore } from '@/stores/alerts.js';

  export default {
    name: 'UpcomingEvents',
    computed: {
      ...mapState(useEventsStore, ['events']),
    },
    async created() {
      await this.loadEvents();
    },
    methods: {
      ...mapActions(useEventsStore, ['setEvents']),
      ...mapActions(useAlertsStore, ['addAlert']),
      /**
       * Load events from the server.
       */
      async loadEvents() {
        try {
          const data = await getEvents();

          this.setEvents(data);
        } catch (error) {
          this.addAlert({
            title: 'Error retrieving events.',
            type: 'error',
          });
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .event-cards {
    display: inline-block;
    width: 900px;
    padding: 1em;

    &.el-card {
      width: 20px;
    }
  }
</style>
