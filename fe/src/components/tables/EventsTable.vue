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
    <div class="events-table">
      <ElTable
        :data="tableData"
        @sort-change="doSort"
      >
        <ElTableColumn prop="id" label="ID" />
        <ElTableColumn prop="name" label="Name" sortable="custom" />
        <ElTableColumn prop="start_date" label="Date" :formatter="dateFormatter">
          <template #default="scope">
            <ElTooltip
              v-if="scope.row.status === 'cancelled'"
              :content="scope.row.comment"
              placement="top"
            >
              <s>
                {{ dateFormatter(scope.row, scope.column, scope.row.date) }}
              </s>
            </ElTooltip>
          </template>
        </ElTableColumn>
        <ElTableColumn
          v-if="eventsType === 'myEvents'"
        >
          <template #default="scope">
            <ElButton
              v-if="scope.row.user_id === user.id"
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
      ...mapState(useAuthStore, ['user']),
      ...mapState(useEventsStore, ['events']),
      /**
       * Filter events data based on eventsType
       *
       * @returns {Array}
       */
      tableData() {
        return this.eventsType === 'pastEvents'
          ? this.localEvents.filter(({ start_date }) => Date.parse(start_date) < Date.now())
          : this.localEvents.filter(({ start_date }) => Date.parse(start_date) >= Date.now());
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
      ...mapActions(useEventsStore, ['editEvent']),
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

            return a[prop] > b[prop] ? 1 : -1;
          });
        } else {
          this.localEvents = this.events;
        }
      },
      /**
       * Format date helper
       *
       * @param {object} row
       * @param {object} column
       * @param {string} cellValue
       * @returns {Date}
       */
      dateFormatter(row, column, cellValue) {
        return formatDate(cellValue);
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
</style>
