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
          <div class="when-where">
            <div>
              <ElIcon><Calendar /></ElIcon>
              {{ dateFormatter(event.start_date) }}
            </div>
            <b>
              {{ event.location }}
            </b>
          </div>
        </div>
      </template>
      {{ event.description || 'No description' }}
      <template #footer>
        <div class="card-footer">
          <div class="footer-buttons">
            <span v-if="authenticated">
              <ElButton
                v-if="event.user_id === user.id"
                type="primary"
                @click="editEvent(event)"
              >
                Edit
              </ElButton>
              <ElButton
                v-else-if="attending(event)"
                type="danger"
                @click="declineEvent(event)"
              >
                Decline
              </ElButton>
              <ElButton
                v-else
                type="success"
                @click="attendEvent(event)"
              >
                Attend
              </ElButton>
            </span>
            <ElButton
              v-else
              type="primary"
              @click="() => $router.push({ name: 'SignIn' })"
            >
              Sign In to RSVP
            </ElButton>
          </div>
          <div class="attendees-badge">
            <ElTag>{{ event.attendee_count }} Going</ElTag>
          </div>
        </div>
      </template>
    </ElCard>
  </div>
</template>

<script>
  import { mapState } from 'pinia';
  import { useAuthStore } from '@/stores/auth.js';
  import { useEventsStore } from '@/stores/events.js';
  import { joinEvent } from '@/services/events.js';
  import { formatDate } from '@/utils/common.js';

  export default {
    name: 'UpcomingEvents',
    computed: {
      ...mapState(useAuthStore, ['authenticated', 'user']),
      ...mapState(useEventsStore, ['events']),
    },
    methods: {
      dateFormatter(dateString) {
        return formatDate(dateString);
      },
      attending({ id: eventId }) {
        return this.user.events?.findIndex(({ id }) => id === eventId);
      },
      async attendEvent(event) {
        await joinEvent(event.id, this.user.id);
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

    .when-where {
      text-align: right;
    }
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
  }

  h3 {
    margin: 0;
  }
</style>
