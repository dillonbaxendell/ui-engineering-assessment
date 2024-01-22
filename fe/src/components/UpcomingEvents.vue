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
  import { mapState } from 'pinia';
  import { useAuthStore } from '@/stores/auth.js';
  import { useEventsStore } from '@/stores/events.js';
  import { formatDate } from '@/utils/common.js';

  export default {
    name: 'UpcomingEvents',
    computed: {
      ...mapState(useAuthStore, ['authenticated']),
      ...mapState(useEventsStore, ['events']),
    },
    methods: {
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

    :deep(.el-card) {
      margin: 1em 0;
    }
  }

  .card-header {
    display: flex;
    justify-content: space-between;
  }

  h3 {
    margin: 0;
  }
</style>
