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
  import { useEventsStore } from '@/stores/events.js';
  import { formatDate } from '@/utils/common.js';

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
        localEvents: [],
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
      ...mapActions(useEventsStore, ['editEvent']),
      /**
       * Evaluates the name to determine the correct route params to push.
       *
       * @param {object} root
       * @param {string} root.name
       */
      async onTabClick({ name }) {
        await this.$router.push({ name });
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
