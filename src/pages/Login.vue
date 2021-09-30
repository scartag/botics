<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <ExternalHeader />
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="md:bg-white py-8 px-4 md:shadow-lg sm:rounded-xl sm:px-10">
        <h4 class="text-xl font-bold text-gray-600 mt-0">Login to Dashboard</h4>
        <form class="space-y-6 mt-9">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email-address" class="sr-only">Email</label>
              <input
                v-model="email"
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
                :disabled="loading"
              />
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input
                v-model="password"
                id="password"
                name="password"
                type="password"
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
                  rounded-b-md
                  focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10
                  sm:text-sm
                "
                placeholder="Password"
                :disabled="loading"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input v-model="rememberMe" id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-cyan-500 focus:ring-cyan-600 border-gray-300 rounded" />
              <label for="remember-me" class="ml-2 block text-sm text-gray-700"> Keep me logged in </label>
            </div>

            <div class="text-sm">
              <router-link :to="{ name: routeNames.forgotPassword }" class="font-medium text-cyan-500 hover:text-cyan-600"> Forgot password? </router-link>
            </div>
          </div>

          <div>
            <button
              :disabled="loading || !valid"
              @click="login"
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

              <span class="mr-5">Login</span>
            </button>
          </div>

          <div class="text-center text-sm">
            <span>Don't have an account?</span>
            <router-link :to="{ name: routeNames.register }" class="ml-2 font-medium text-cyan-500 hover:text-cyan-600"> Register Now </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
  <ErrorNotification ref="error" />
</template>

<script>
import ExternalHeader from '@/components/ExternalHeader';
import { accountService } from '@/types/dependencies.type';
import ErrorNotification from '@/components/ErrorNotification';
import { routeNames } from '@/router/routes';

export default {
  name: 'Login',
  dependencies: [accountService],
  components: { ErrorNotification, ExternalHeader },
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      rememberMe: true,
      routeNames,
    };
  },
  computed: {
    valid() {
      return this.email.length > 0 && this.password.length > 0;
    },
  },
  methods: {
    async login() {
      this.$refs.error.hide();
      try {
        this.loading = true;
        await this.accountService.login({ email: this.email, password: this.password });
        if (this.accountService.isAuthenticated) {
          this.$router.push({ name: this.routeNames.dashboard });
        } else {
          this.$refs.error.show({ title: 'Login Failed', description: 'Invalid email or password combination' });
        }
      } catch {
        this.$refs.error.show({ title: 'Login Failed', description: 'Invalid email or password combination' });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped></style>
