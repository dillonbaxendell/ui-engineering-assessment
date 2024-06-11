<template>
  <section
    class="tabs"
  >
    <ElTabs
      v-model="$route.name"
      @tab-change="onTabClick"
    >
      <ElTabPane
        v-for="({ label, name }) in tabs"
        v-bind="{ label, name }"
        :key="label"
      />
    </ElTabs>
    <div class="button-container">
      <div v-if="isCardView" id="table-view-button" class="card-button">
        <ElTooltip
          effect="dark"
          content="Table view"
          placement="top"
        >
          <ElButton
            @click="toggleView"
          >
            <ElIcon><Grid /></ElIcon>
          </ElButton>
        </ElTooltip>
      </div>
      <div v-if="!isCardView" id="card-view-button" class="table-button">
        <ElTooltip
          effect="dark"
          content="Card view"
          placement="top"
        >
          <ElButton
            @click="toggleView"
          >
            <ElIcon><Postcard /></ElIcon>
          </ElButton>
          </ElButton>
        </ElTooltip>
      </div>
    </div>

    <!-- Card -->
    <!-- TODO: extract this into it's own component -->
    <div
      v-if="events && isCardView"
      class="event-cards"
    >
      <ElCard
        v-for="event in tableData"
        :key="event.id"
      >
        <template #header>
          <div class="card-header">
            <h3>
              <RouterLink :to="`/events/${event.id}`">
                {{ event.name }}
              </RouterLink>
            </h3>
            <div class="when-where">
              <div>
                <ElIcon><Calendar /></ElIcon>
                {{ cardDateFormatter(event.startDate) }}
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
                  v-if="event.userId === user.id"
                  data-test="edit-event-button"
                  type="primary"
                  @click="editEvent(event)"
                >
                  Edit
                </ElButton>
              </span>
            </div>
            <div v-if="eventsType === 'myEvents'" class="attendees-badge">
              <ElTag>{{ event.attendeesCount }} Going</ElTag>
            </div>
            <div v-if="eventsType === 'pastEvents'" class="attendees-badge">
              <ElTag>{{ event.attendeesCount }} Attended</ElTag>
            </div>
          </div>
        </template>
      </ElCard>
    </div>
    <!-- End Card -->

    <!-- Table -->
    <!-- TODO: extract this into it's own component -->
    <div v-if="!isCardView" class="events-table">
      <ElTable
        :data="tableData"
        @sort-change="doSort"
      >
        <ElTableColumn prop="id" label="ID" />
        <ElTableColumn prop="name" label="Name" sortable="custom" />
        <ElTableColumn prop="startDate" label="Date" :formatter="tableDateFormatter">
          <template #default="scope">
            <ElTooltip
              v-if="scope.row.status === 'cancelled'"
              :content="scope.row.comment"
              placement="top"
            >
              <s>
                {{ tableDateFormatter(scope.row, scope.column, scope.row.date) }}
              </s>
            </ElTooltip>
          </template>
        </ElTableColumn>
        <ElTableColumn
          v-if="eventsType === 'myEvents'"
        >
          <template #default="scope">
            <ElButton
              v-if="scope.row.userId === user.id"
              size="small"
              type="primary"
              @click="editEvent(scope.row)"
            >
              Edit
            </ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </div>
    <!-- End Table -->
  </section>
</template>

<script>
  import { mapActions, mapState } from 'pinia';
  import { useAuthStore } from '@/stores/auth.js';
  import { useEventsStore } from '@/stores/events.js';
  import { formatDate } from '@/utils/common.js';

  export default {
    name: 'EventsTable',
    inject: ['loadEvents'],
    props: {
      /**
       * Type of events to display, current or past
       */
      eventsType: {
        type: String,
        default: 'myEvents',
      },
    },
    data() {
      return {
        /**
         * Local event table data
         */
        localEvents: [],
        /**
         * Tabs definition
         */
        tabs: [
          {
            label: 'Your events',
            name: 'MyEvents',
          },
          {
            label: 'Past events',
            name: 'PastEvents',
          },
        ],
      };
    },
    computed: {
      ...mapState(useAuthStore, ['user', 'authenticated']),
      ...mapState(useEventsStore, ['events', 'isCardView']),
      /**
       * Filter events data based on eventsType
       *
       * @returns {Array}
       */
      tableData() {
        return this.eventsType === 'pastEvents'
          ? this.localEvents.filter(({ startDate }) => Date.parse(startDate) < Date.now())
          : this.localEvents.filter(({ startDate }) => Date.parse(startDate) >= Date.now());
      },
    },
    watch: {
      events: {
        /**
         * Watch events in store and copy changes to the local model
         */
        handler() {
          this.localEvents = this.events?.map((event) => event) || [];
        },
        immediate: true,
        deep: true,
      },
    },
    async created() {
      /**
       * Load event data into store
       */
      await this.loadEvents();
    },
    methods: {
      ...mapActions(useEventsStore, ['editEvent', 'toggleView']),
      /**
       * Route to the requested tab view on tab click
       *
       * @param {object} root
       * @param {string} root.name
       */
      async onTabClick({ name }) {
        await this.$router.push({ name });
      },
      /**
       * Sort table data
       *
       * @param {object} root
       * @param {string} root.prop
       * @param {string} root.order
       */
      doSort({ prop, order }) {
        if (order) {
          this.localEvents.sort((a, b) => {
            if (order === 'ascending') {
              return a[prop] > b[prop] ? 1 : -1;
            }

            return a[prop] < b[prop] ? 1 : -1;
          });
        } else {
          this.localEvents = this.events;
        }
      },
      /**
       * Format date helper for table
       *
       * @param {object} row
       * @param {object} column
       * @param {string} cellValue
       * @returns {Date}
       */
      tableDateFormatter(row, column, cellValue) {
        return formatDate(cellValue);
      },
      /**
       * Format date helper for card
       *
       * @param {string} value
       * @returns {Date}
       */
      cardDateFormatter(value) {
        return formatDate(value);
      },
    },
  };
</script>

<style lang="scss" scoped>
.tabs {
  flex: 1;
  margin: 0 1em;
}
.events-table {
  height: 100%;
  overflow: auto;
}

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

.button-container {
  width: 80em;
  padding-right: 1em;
  display: flex;
  justify-content: flex-end;
}
</style>
