<template>
  <ElDialog
    v-model="isModalVisible"
    :title="`${eventType} event`"
    width="30%"
    append-to-body
    @close="cancelEdit"
  >
    <ElForm
      ref="form"
      :model="eventForm"
      :rules="rules"
      label-width="120px"
    >
      <ElFormItem label="Event name" prop="name">
        <ElInput v-model="eventForm.name" />
      </ElFormItem>
      <ElFormItem label="Event date" prop="date">
        <ElDatePicker
          v-model="eventForm.date"
          type="date"
          placeholder="Pick a day"
        />
      </ElFormItem>
    </ElForm>
    <template #footer>
      <span class="modal-footer">
        <ElButton
          @click="isModalVisible = false"
        >
          Cancel
        </ElButton>
        <ElButton
          type="primary"
          :disabled="isFormDisabled"
          @click="confirmModal"
        >
          Confirm
        </ElButton>
      </span>
    </template>
  </ElDialog>
</template>

<script>
  import { mapActions, mapState, mapWritableState } from 'pinia';
  import { useEventsStore } from '@/stores/events.js';

  export default {
    name: 'EventModal',
    data() {
      return {
        eventForm: null,
        rules: {
          name: [{
            required: true,
            message: 'Required',
            trigger: 'blur',
          }],
        },
      };
    },
    computed: {
      ...mapState(useEventsStore, ['editingEvent']),
      ...mapWritableState(useEventsStore, ['isModalVisible']),

      eventType() {
        return this.editingEvent ? 'Edit' : 'New';
      },
      isFormDisabled() {
        console.log(this.$refs.form);

        return true;
      },
    },
    watch: {
      editingEvent() {
        this.eventForm = {
          name: '',
          date: '',
          ...this.editingEvent,
        };
      },
    },
    methods: {
      ...mapActions(useEventsStore, ['cancelEdit']),

      confirmModal() {
        this.isModalVisible = false;
      },
      checkDate(rule, value, callback) {
        return callback(new Error('Required'));
      },
    },
  };
</script>

<style lang="scss" scoped>
.main-header {
  position: sticky;
  top: 0;
  z-index: 2;
  padding: 0 0 0 1em;
  background: var(--tf-white);
  box-shadow: 0 1px 3px rgba(0, 0, 0, .25);

  .header-menu {
    float: right;
    border: none;
  }
}
.alerts-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  :deep(.el-alert) {

    &:not(.el-alert--success) {
      padding: .5em 1.5em .5em .5em;
    }
  }
}
</style>
