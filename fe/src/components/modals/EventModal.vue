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
      @validate="validateHandler"
    >
      <ElFormItem label="Event name" prop="name">
        <ElInput v-model="eventForm.name" />
      </ElFormItem>
      <ElFormItem label="Location" prop="location">
        <ElInput v-model="eventForm.location" />
      </ElFormItem>
      <ElFormItem label="Date / Time" prop="start_date">
        <ElDatePicker
          v-model="eventForm.start_date"
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
          :disabled="!isFormValid"
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
  import { useAuthStore } from '@/stores/auth.js';
  import { useEventsStore } from '@/stores/events.js';
  import { saveEvent } from '@/services/events.js';

  export default {
    name: 'EventModal',
    emits: [
      'reload',
    ],
    data() {
      return {
        eventForm: {
          name: '',
          location: '',
          start_date: '',
        },
        formValidity: {
          name: false,
          location: false,
          start_date: false,
        },
        rules: {
          name: [{
            required: true,
            message: 'Required',
            trigger: 'blur',
          }],
          location: [{
            required: true,
            message: 'Required',
            trigger: 'blur',
          }],
          start_date: [{
            required: true,
            message: 'Required',
            trigger: 'blur',
          }, {
            validator: this.checkDate,
            trigger: 'blur',
          }],
        },
      };
    },
    computed: {
      ...mapState(useAuthStore, ['user']),
      ...mapState(useEventsStore, ['editingEvent']),
      ...mapWritableState(useEventsStore, ['isModalVisible']),

      eventType() {
        return this.editingEvent ? 'Edit' : 'New';
      },
      isFormValid() {
        return this.formValidity.name
          && this.formValidity.location
          && this.formValidity.start_date;
      },
    },
    watch: {
      editingEvent() {
        this.eventForm = {
          name: '',
          location: '',
          start_date: '',
          ...this.editingEvent,
        };
      },
    },
    methods: {
      ...mapActions(useEventsStore, ['cancelEdit']),

      confirmModal() {
        saveEvent({
          user_id: this.user.id,
          ...this.eventForm,
        });
        this.isModalVisible = false;
        this.$emit('reload');
      },
      checkDate(rule, value, callback) {
        if (Date.parse(value) <= Date.now()) {
          callback(new Error('Start date must be in the future.'));
        }
        callback();
      },
      validateHandler(propName, isValid) {
        this.formValidity[propName] = isValid;
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
