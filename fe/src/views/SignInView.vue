<template>
  <ElCard class="card">
    <template #header>
      Sign In
    </template>
    <ElForm
      ref="form"
      :model="signInForm"
      :rules="rules"
      label-width="120px"
    >
      <ElFormItem label="Email address" prop="email_address">
        <ElInput v-model="signInForm.email_address" />
      </ElFormItem>
    </ElForm>
    <template #footer>
      <ElButton
        type="primary"
        :disabled="!signInForm.email_address"
        @click="doSignIn"
      >
        Confirm
      </ElButton>
    </template>
  </ElCard>
</template>

<script>
  import { mapActions } from 'pinia';
  import { useAlertsStore } from '@/stores/alerts.js';
  import { signIn, setSignedIn } from '@/services/auth.js';
  import { useAuthStore } from '@/stores/auth.js';

  export default {
    name: 'SignInView',
    data() {
      return {
        signInForm: {},
        rules: {
          email_address: [{
            required: true,
            message: 'Required',
            trigger: 'blur',
          }],
        },
      };
    },
    methods: {
      ...mapActions(useAuthStore, ['setUser']),
      ...mapActions(useAlertsStore, ['addAlert']),

      async doSignIn() {
        try {
          const data = await signIn(this.signInForm.email_address);

          this.setUser(data);
          setSignedIn(data);
          this.$router.replace({ name: 'Home' });
        } catch {
          this.addAlert({
            title: 'User not found. Please verify your email address',
            type: 'error',
          });
        }
      },
    },
  };
</script>

<style scoped>
  .card {
    position: absolute;
    top: 200px;
    left: 50%;
    width: 420px;
    transform: translateX(-50%);
  }
</style>
