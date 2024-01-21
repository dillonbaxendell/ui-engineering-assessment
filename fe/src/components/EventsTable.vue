<template>
  <div class="events-table">
    <ElTable
      v-if="localEvents"
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
</template>

<script>
  import { mapActions, mapState } from 'pinia';
  import { getEvents } from '@/services/events.js';
  import { useEventsStore } from '@/stores/events.js';
  import { useAlertsStore } from '@/stores/alerts.js';

  export default {
    name: 'EventsTable',
    props: {
      eventsType: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        localEvents: null,
      };
    },
    computed: {
      ...mapState(useEventsStore, ['events']),
      tableData() {
        return this.eventsType === 'pastEvents'
          ? this.localEvents.filter(({ start_date }) => Date.parse(start_date) < Date.now())
          : this.localEvents.filter(({ start_date }) => Date.parse(start_date) >= Date.now());
      },
    },
    watch: {
      events: {
        handler() {
          this.localEvents = this.events?.map((event) => event) || [];
        },
        immediate: true,
        deep: true,
      },
    },
    methods: {
      ...mapActions(useEventsStore, ['setEvents', 'editEvent']),
      ...mapActions(useAlertsStore, ['addAlert']),
      /**
       * Load events from the server.
       */
      async loadEvents() {
        try {
          const data = await getEvents(this.eventsType);

          this.setEvents(data);
        } catch (error) {
          this.addAlert({
            title: 'Error retrieving events.',
            type: 'error',
          });
        }
      },
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
      dateFormatter(row, column, cellValue) {
        const timezoneOffset = new Date().getTimezoneOffset() / 60;
        const timezoneString = `${timezoneOffset > 0 ? '-' : '+'}${(`0${timezoneOffset}`).slice(-2)}:00`;

        try {
          return new Date(cellValue.replace(/Z$/, timezoneString)).toLocaleDateString('en-us', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });
        } catch {
          return 'Invalid date';
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
.events-table {
  height: 100%;
  overflow: auto;
}
</style>
