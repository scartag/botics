<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <ExternalHeader />
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="md:bg-white py-8 px-4 md:shadow-lg sm:rounded-xl sm:px-10">
        <h4 class="text-xl font-bold text-gray-600 mt-0">Create Account</h4>
        <div class="space-y-6 mt-9">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"> Full Name </label>
            <div class="mt-1">
              <input
                v-model="fullName"
                id="fullName"
                name="fullName"
                type="text"
                autocomplete="off"
                required=""
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"> Email address </label>
            <div class="mt-1">
              <input
                v-model="email"
                id="email"
                name="email"
                type="email"
                autocomplete="off"
                required=""
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="password"
                name="password"
                type="password"
                autocomplete="off"
                required=""
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700"> Confirm Password </label>
            <div class="mt-1 relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                v-model.trim.lazy="confirmPassword"
                autocomplete="off"
                required=""
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" v-if="!passwordsMatch">
                <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
              </div>
            </div>
            <div class="mt-2" style="height: 20px">
              <p class="text-sm text-red-600" v-if="!passwordsMatch">Your passwords do not match.</p>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input v-model="termsAgreement" id="terms" name="terms" type="checkbox" class="h-4 w-4 text-cyan-500 focus:ring-cyan-600 border-gray-300 rounded" />
              <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                I agree to the <a href="#" @click.prevent="() => {}" class="font-medium text-cyan-500 hover:text-cyan-600">terms of service</a> and
                <a href="#" @click.prevent="() => {}" class="font-medium text-cyan-500 hover:text-cyan-600">privacy policy</a>.
              </label>
            </div>
          </div>

          <div>
            <button
              @click="register"
              :disabled="loading || !valid"
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
              <span class="mr-5">Sign Up</span>
            </button>
          </div>

          <div class="text-center text-sm">
            <span>Already have an account?</span>
            <router-link :to="{ name: routeNames.login }" class="ml-2 font-medium text-cyan-500 hover:text-cyan-600"> Login Now </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ErrorNotification ref="error" />
</template>

<script>
import ExternalHeader from '@/components/ExternalHeader';
import { ExclamationCircleIcon } from '@heroicons/vue/solid';
import { routeNames } from '@/router/routes';
import { accountService } from '@/types/dependencies.type';
import ErrorNotification from '@/components/ErrorNotification';

export default {
  name: 'Register',
  dependencies: [accountService],
  components: { ErrorNotification, ExternalHeader, ExclamationCircleIcon },
  data() {
    return {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      routeNames,
      loading: false,
      termsAgreement: true,
    };
  },
  computed: {
    passwordsMatch() {
      if (this.password && this.confirmPassword) {
        return this.confirmPassword === this.password;
      } else {
        return true;
      }
    },
    valid() {
      return this.fullName.trim().length > 0 && this.email.trim().length > 0 && this.password.trim().length > 0 && this.confirmPassword.trim().length > 0 && this.passwordsMatch && this.termsAgreement;
    },
  },
  methods: {
    async register() {
      const request = {
        fullName: this.fullName,
        email: this.email,
        password: this.password,
      };
      this.$refs.error.hide();
      try {
        this.loading = true;
        await this.accountService.register(request);
        if (this.accountService.isAuthenticated) {
          this.$router.push({ name: this.routeNames.dashboard });
        } else {
          this.$refs.error.show({ title: 'Registration Failed!', description: 'Your account could not be created at this time.' });
        }
      } catch (e) {
        if (e.status === 400) {
          this.$refs.error.show({ title: 'Registration Failed!', description: e.data?.email[0] });
        } else {
          this.$refs.error.show({ title: 'Registration Failed!', description: 'Your account could not be created at this time.' });
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped></style>
