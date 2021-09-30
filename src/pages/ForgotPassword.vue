<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <ExternalHeader />
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="md:bg-white py-8 px-4 md:shadow-lg sm:rounded-xl sm:px-10">
        <h4 class="text-xl font-bold text-gray-600 mt-0">Password Recovery</h4>
        <p class="text-md mt-3 text-gray-500 mt-3" v-if="!emailSent">Enter your e-mail address below, and we'll send you an e-mail allowing you to reset it.</p>
        <p class="text-md mt-3 text-gray-500 mt-3" v-if="emailSent">Your password reset instructions have been sent to your email.</p>
        <form class="space-y-6 mt-9">
          <div class="rounded-md shadow-sm -space-y-px">
            <div v-if="!emailSent">
              <label for="email-address" class="sr-only">Email</label>
              <input
                v-model="email"
                :disabled="loading"
                id="email-address"
                name="email"
                type="email"
                autocomplete="off"
                required=""
                class="
                  disabled:opacity-50
                  appearance-none
                  rounded-none
                  relative
                  block
                  w-full
                  px-3
                  py-2
                  border border-gray-300
                  placeholder-gray-500
                  text-gray-900
                  rounded-t-md
                  focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10
                  sm:text-sm
                "
                placeholder="Email"
              />
            </div>
          </div>

          <div v-if="!emailSent">
            <button
              :disabled="!valid || loading"
              @click="reset"
              type="button"
              class="
                disabled:opacity-50
                w-full
                flex
                justify-center
                py-2
                px-4
                border border-transparent
                rounded-md
                shadow-sm
                text-sm
                font-medium
                text-white
                bg-red-400
                hover:bg-opacity-90
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
              "
            >
              <div class="-ml-1 mr-3 h-5 w-5">
                <svg v-if="loading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <span class="mr-5">Reset Password</span>
            </button>
          </div>

          <div class="text-center text-sm">
            <span>Already have an account?</span>
            <router-link :to="{ name: routeNames.login }" class="ml-2 font-medium text-cyan-500 hover:text-cyan-600"> Login Now </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
  <ErrorNotification ref="error" />
</template>

<script>
import ExternalHeader from '@/components/ExternalHeader';
import { routeNames } from '@/router/routes';
import { accountService } from '@/types/dependencies.type';
import ErrorNotification from '@/components/ErrorNotification';

export default {
  name: 'ForgotPassword',
  components: { ErrorNotification, ExternalHeader },
  dependencies: [accountService],
  data() {
    return {
      email: '',
      loading: false,
      routeNames,
      emailSent: false,
    };
  },
  computed: {
    valid() {
      return this.email.trim().length > 0;
    },
  },
  methods: {
    reset: async function () {
      try {
        this.loading = true;
        await this.accountService.passwordReset({ email: this.email });
        this.emailSent = true;
      } catch (e) {
        if (e.status === 400) {
          let errorMessage = e.data?.email[0];
          errorMessage = errorMessage ? errorMessage : 'The password reset process was unsuccessful.';
          this.$refs.error.show({ title: 'Password Reset Failed!', description: errorMessage });
        } else {
          this.$refs.error.show({
            title: 'Password Reset Failed!',
            description: 'The password reset process was unsuccessful.',
          });
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped></style>
