// Single event view

<template>
  <ElCard v-if="event" class="event-card">
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
              data-test="edit-event-button"
              type="primary"
              @click="editEvent(event)"
            >
              Edit
            </ElButton>
            <ElButton
              v-else-if="attending(event)"
              data-test="delete-event-button"
              type="danger"
            >
              Decline
            </ElButton>
            <ElButton
              v-else
              data-test="attend-event-button"
              type="success"
              @click="attendEvent(event)"
            >
              Attend
            </ElButton>
          </span>
          <ElButton
            v-else
            type="primary"
            data-test="sign-in-button"
            @click="() => $router.push({ name: 'SignIn' })"
          >
            Sign In to RSVP
          </ElButton>
          <strong>Attendees: {{ attendeesList }}</strong>
        </div>
      </div>
    </template>
  </ElCard>
</template>

<script>
  import { mapActions, mapState } from 'pinia';
  import { useAuthStore } from '@/stores/auth.js';
  import { useEventsStore } from '@/stores/events.js';
  import { getEvent, declineEvent, joinEvent } from '@/services/events.js';
  import { getUser } from '@/services/users.js';
  import { formatDate } from '@/utils/common.js';

  export default {
    name: 'UpcomingEvents',
    props: {
      eventId: {
        type: [Number, String],
        required: true,
      },
    },
    data() {
      return {
        event: null,
      };
    },
    computed: {
      ...mapState(useAuthStore, ['authenticated', 'user']),
      ...mapState(useEventsStore, ['events']),
      attendeesList() {
        return this.event.attendees?.map(({ first_name, last_name }) => `${first_name} ${last_name}`);
      },
    },
    async created() {
      /**
       * Load event data into store
       */
      await this.loadEvent();
    },
    methods: {
      ...mapActions(useAuthStore, ['setUser']),
      ...mapActions(useEventsStore, ['editEvent']),
      /**
       * Load event
       */
      async loadEvent() {
        this.event = await getEvent(this.eventId);
      },
      /**
       * Format date helper
       *
       * @param {string} dateString
       * @returns {Date}
       */
      dateFormatter(dateString) {
        return formatDate(dateString);
      },
      /**
       * Determine if the user is attending an event
       *
       * @param {object} root
       * @param {number} root.id
       * @returns {boolean}
       */
      attending({ id: eventId }) {
        return this.user.events?.findIndex(({ id }) => id === eventId) > -1;
      },
      /**
       * Call API to mark user as attending an event then reload events
       *
       * @param {object} event
       */
      async attendEvent(event) {
        await joinEvent(event.id, this.user.id);
        const user = await getUser(this.user.id);

        this.setUser(user);
      },
      /**
       * Unmark user as attending an event and reload events
       *
       * @param {object} root
       * @param {number} root.id
       */
      async declineEvent({ id }) {
        await declineEvent(id, this.user.id);
        const user = await getUser(this.user.id);

        this.setUser(user);
      },
    },
  };
</script>

<style lang="scss" scoped>
.event-card {
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

.footer-buttons {
  display: flex;
  flex: 1 0 auto;
  justify-content: space-between;
}

h3 {
  margin: 0;
}
</style>
