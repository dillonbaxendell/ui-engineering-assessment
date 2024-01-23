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
  import { mapActions, mapState } from 'pinia';
  import { useAuthStore } from '@/stores/auth.js';
  import { useEventsStore } from '@/stores/events.js';
  import { declineEvent, joinEvent } from '@/services/events.js';
  import { getUser } from '@/services/users.js';
  import { formatDate } from '@/utils/common.js';

  export default {
    name: 'UpcomingEvents',
    inject: ['loadEvents'],
    computed: {
      ...mapState(useAuthStore, ['authenticated', 'user']),
      ...mapState(useEventsStore, ['events']),
    },
    methods: {
      ...mapActions(useAuthStore, ['setUser']),
      ...mapActions(useEventsStore, ['editEvent']),
      dateFormatter(dateString) {
        return formatDate(dateString);
      },
      attending({ id: eventId }) {
        return this.user.events?.findIndex(({ id }) => id === eventId) > -1;
      },
      async attendEvent(event) {
        await joinEvent(event.id, this.user.id);
        const user = await getUser(this.user.id);

        this.setUser(user);
        this.loadEvents();
      },
      async declineEvent({ id }) {
        await declineEvent(id, this.user.id);
        const user = await getUser(this.user.id);

        this.setUser(user);
        this.loadEvents();
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