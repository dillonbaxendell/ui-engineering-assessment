<template>
  <ElDialog
    v-model="isEditModalVisible"
    :title="`Edit User`"
    width="30%"
    append-to-body
  >
    <ElForm
      ref="formRef"
      :model="userForm"
      :rules="rules"
      @validate="validateHandler"
    >
      <ElFormItem label="First name" prop="firstName">
        <ElInput v-model="userForm.firstName" />
      </ElFormItem>
      <ElFormItem label="Last name" prop="lastName">
        <ElInput v-model="userForm.lastName" />
      </ElFormItem>
      <ElFormItem label="Email address" prop="emailAddress">
        <ElInput v-model="userForm.emailAddress" />
      </ElFormItem>
    </ElForm>
    <template #footer>
      <div class="modal-footer">
        <span>
          <ElButton
            @click="isEditModalVisible = false"
          >
            Cancel
          </ElButton>
          <ElButton
            type="primary"
            :disabled="!isFormValid"
            @click="saveUser"
          >
            Confirm Edits
          </ElButton>
        </span>
      </div>
    </template>
  </ElDialog>
</template>

  <script>
  import { mapActions, mapState, mapWritableState } from 'pinia';
  import { useAuthStore } from '@/stores/auth.js';
  import { useUsersStore } from '@/stores/users.js';
  import { saveUser } from '@/services/users.js';

  export default {
    name: 'EditUserModal',
    emits: [
      'reload',
    ],
    data() {
      return {
        /**
         * User form data model
         */
        userForm: {
          firstName: '',
          lastName: '',
          emailAddress: '',
        },
        /**
         * Validity state of form fields
         */
        formValidity: {
          firstName: false,
          lastName: false,
          emailAddress: false,
        },
        /**
         * Form field validation rules
         */
        rules: {
          firstName: [{
            required: true,
            message: 'Required',
          }],
          lastName: [{
            required: true,
            message: 'Required',
          }],
          emailAddress: [{
            required: true,
            message: 'Required',
          }, {
            validator: this.emailAddress,
          }],
        },
      };
    },
    computed: {
      ...mapState(useAuthStore, ['user']),
      ...mapState(useUsersStore, ['editingUser']),
      ...mapWritableState(useUsersStore, ['isEditModalVisible']),

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
       * If editing, validate form fields when modal is first opened.
       * If adding event, reset form fields when opening modal.
       *
       * @param {boolean} isVisible
       */
      async isEditModalVisible(isVisible) {
        if (!isVisible) return;

        if (this.editingUser) {
          this.userForm = { ...this.editingUser };
          this.$nextTick(async () => {
            await this.$refs.formRef.validate();
          });
        } else {
          this.resetForm();
          this.$refs.formRef.resetFields();
        }
      },
    },
    methods: {
      ...mapActions(useUsersStore, ['cancelEdit']),

      /**
       * Call saveUser service
       */
      async saveUser() {
        await saveUser({
          userId: this.user.id,
          ...this.userForm,
        });
        this.isEditModalVisible = false;
        this.$emit('reload');
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
        this.userForm = {
          firstName: '',
          lastName: '',
          emailAddress: '',
        };
        this.formValidity = {
          firstName: false,
          lastName: false,
          emailAddress: false,
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
