<template>
  <div
    v-if="events"
    class="event-cards"
  >
    <ElCard
      v-for="event in events"
      :key="event.id"
    >
      <template #header>
        <div class="card-header">
          <h3>{{ event.name }}</h3>
          <span>
            <ElIcon><Calendar /></ElIcon>
            {{ dateFormatter(event.start_date) }}
          </span>
        </div>
      </template>
      {{ event.description || 'No description' }}
      <template #footer>
        <ElButton
          v-if="authenticated"
          type="primary"
          @click="attendEvent(event)"
        >
          Attend
        </ElButton>
        <ElButton
          v-else
          type="primary"
          @click="() => $router.push({ name: 'SignIn' })"
        >
          Sign In to RSVP
        </ElButton>
      </template>
    </ElCard>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'pinia';
  import { getEvents } from '@/services/events.js';
  import { useAuthStore } from '@/stores/auth.js';
  import { useEventsStore } from '@/stores/events.js';
  import { useAlertsStore } from '@/stores/alerts.js';
  import { formatDate } from '@/utils/common.js';

  export default {
    name: 'UpcomingEvents',
    computed: {
      ...mapState(useAuthStore, ['authenticated']),
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
      dateFormatter(dateString) {
        return formatDate(dateString);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .event-cards {
    display: inline-block;
    width: 900px;
    padding: 1em;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
  }

  h3 {
    margin: 0;
  }
</style>
