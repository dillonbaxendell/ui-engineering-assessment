<template>
  <ElDialog
    v-model="showModal"
    title="Sign up"
    width="30%"
    append-to-body
    @close="() => $emit('update:value', false)"
  >
    <ElForm
      ref="form"
      :model="registerForm"
      :rules="rules"
      label-width="120px"
      @validate="validateHandler"
    >
      <ElFormItem label="First name" prop="first_name">
        <ElInput v-model="registerForm.first_name" />
      </ElFormItem>
      <ElFormItem label="Last name" prop="last_name">
        <ElInput v-model="registerForm.last_name" />
      </ElFormItem>
      <ElFormItem label="Email address" prop="email_address">
        <ElInput v-model="registerForm.email_address" />
      </ElFormItem>
    </ElForm>
    <template #footer>
      <ElButton
        type="primary"
        :disabled="!isFormValid"
        @click="doRegister"
      >
        Confirm
      </ElButton>
    </template>
  </ElDialog>
</template>

<script>
  import { mapActions } from 'pinia';
  import { useAlertsStore } from '@/stores/alerts.js';
  import { register, setSignedIn } from '@/services/auth.js';
  import { useAuthStore } from '@/stores/auth.js';

  export default {
    name: 'RegisterModal',
    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        /**
         * Modal visibility state
         */
        showModal: false,
        /**
         * Form field validity
         */
        formValidity: {
          first_name: false,
          last_name: false,
          email_address: false,
        },
        /**
         * Form data model
         */
        registerForm: {},
        /**
         * Form field validation rules
         */
        rules: {
          first_name: [{
            required: true,
            message: 'Required',
            trigger: 'blur',
          }],
          last_name: [{
            required: true,
            message: 'Required',
            trigger: 'blur',
          }],
          email_address: [{
            required: true,
            message: 'Required',
            trigger: 'blur',
          }],
        },
      };
    },
    computed: {
      /**
       * Check if the form is valid
       *
       * @returns {boolean}
       */
      isFormValid() {
        return this.formValidity.first_name
          && this.formValidity.last_name
          && this.formValidity.email_address;
      },
    },
    watch: {
      /**
       * Show/hide the modal
       */
      value() {
        this.showModal = this.value;
      },
    },
    methods: {
      ...mapActions(useAuthStore, ['setUser']),
      ...mapActions(useAlertsStore, ['addAlert']),

      /**
       * Call API to register a new user, sign them in, and redirect to Home
       */
      async doRegister() {
        try {
          const data = await register(this.registerForm);

          this.setUser(data);
          setSignedIn(data);
          this.$emit('update:value', false);
          this.$router.replace({ name: 'Home' });
        } catch {
          /**
           * Show error alert
           */
          this.addAlert({
            title: 'Error registering user. Have you already signed up?',
            type: 'error',
          });
        }
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
    },
  };
</script>
