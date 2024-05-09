<template>
  <ElDialog
    v-model="isModalVisible"
    :title="`${eventType} event`"
    width="30%"
    append-to-body
    @close="resetForm"
  >
    <ElForm
      ref="formRef"
      :model="eventForm"
      :rules="rules"
      @validate="validateHandler"
    >
      <ElFormItem label="Event name" prop="name">
        <ElInput v-model="eventForm.name" />
      </ElFormItem>
      <ElFormItem label="Location" prop="location">
        <ElInput v-model="eventForm.location" />
      </ElFormItem>
      <ElFormItem label="Date / Time" prop="startDate">
        <ElDatePicker
          v-model="eventForm.startDate"
          type="date"
          placeholder="Pick a day"
        />
      </ElFormItem>
      <ElFormItem
        class="desc-field"
        label="Event description"
        prop="description"
        label-width="100%"
      >
        <ElInput
          v-model="eventForm.description"
          autosize
          type="textarea"
        />
      </ElFormItem>
    </ElForm>
    <template #footer>
      <div class="modal-footer">
        <span>
          <ElButton
            @click="isModalVisible = false"
          >
            Cancel
          </ElButton>
          <ElButton
            type="primary"
            :disabled="!isFormValid"
            @click="saveEvent"
          >
            Save
          </ElButton>
        </span>
        <ElButton
          v-if="eventForm.id"
          link
          type="danger"
          @click="deleteEvent"
        >
          Delete Event
        </ElButton>
      </div>
    </template>
  </ElDialog>
</template>

<script>
  import { mapActions, mapState, mapWritableState } from 'pinia';
  import { useAuthStore } from '@/stores/auth.js';
  import { useEventsStore } from '@/stores/events.js';
  import { deleteEvent, saveEvent } from '@/services/events.js';

  export default {
    name: 'EventModal',
    emits: [
      'reload',
    ],
    data() {
      return {
        /**
         * Event form data model
         */
        eventForm: {
          name: '',
          location: '',
          startDate: '',
        },
        /**
         * Validity state of form fields
         */
        formValidity: {
          name: false,
          location: false,
          startDate: false,
        },
        /**
         * Form field validation rules
         */
        rules: {
          name: [{
            required: true,
            message: 'Required',
          }],
          location: [{
            required: true,
            message: 'Required',
          }],
          startDate: [{
            required: true,
            message: 'Required',
          }, {
            validator: this.checkDate,
          }],
        },
      };
    },
    computed: {
      ...mapState(useAuthStore, ['user']),
      ...mapState(useEventsStore, ['editingEvent']),
      ...mapWritableState(useEventsStore, ['isModalVisible']),

      /**
       * Helper for header text
       *
       * @returns {boolean}
       */
      eventType() {
        return this.editingEvent ? 'Edit' : 'New';
      },
      /**
       * Form validity helper
       *
       * @returns {boolean}
       */
      isFormValid() {
        return Object.values(this.formValidity).every((v) => !!v);
      },
    },
    watch: {
      /**
       * When an event is being edited, set the form values
       */
      async editingEvent() {
        this.eventForm = {
          name: '',
          location: '',
          startDate: '',
          ...this.editingEvent,
        };

        /**
         * Validate form fields on load when editing to enable Submit button
         */
        if (this.editingEvent) {
          this.$nextTick(async () => {
            await this.$refs.formRef.validate();
          });
        }
      },
    },
    methods: {
      ...mapActions(useEventsStore, ['cancelEdit']),

      /**
       * Call saveEvent service
       */
      async saveEvent() {
        await saveEvent({
          userId: this.user.id,
          ...this.eventForm,
        });
        this.isModalVisible = false;
        this.$emit('reload');
      },

      /**
       * Call delete event service
       */
      async deleteEvent() {
        if (this.editingEvent) {
          await deleteEvent(this.eventForm.id);
          this.isModalVisible = false;
          this.$emit('reload');
        }
      },
      /**
       * Custom form field validator
       * Validate that the selected date is not in the past
       *
       * @param {object} rule
       * @param {string} value
       * @param {Function} callback
       */
      checkDate(rule, value, callback) {
        if (Date.parse(value) <= Date.now()) {
          callback(new Error('Start date must be in the future.'));
        }
        callback();
      },
      /**
       * Set form field validity
       *
       * @param {string} propName
       * @param {boolean} isValid
       */
      validateHandler(propName, isValid) {
        this.formValidity[propName] = isValid;
      },
      /**
       * Reset form to default values when the modal closes
       */
      resetForm() {
        this.eventForm = {
          name: '',
          location: '',
          startDate: '',
        };
        this.formValidity = {
          name: false,
          location: false,
          startDate: false,
        };
      },
    },
  };
</script>

<style lang="scss" scoped>
:deep(.el-form-item__label) {
  width: 120px;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  flex-flow: row-reverse;
}

.desc-field {
  flex-direction: column;
  text-align: left;

  :deep(.el-form-item__label) {
    display: block;
  }
}
</style>
