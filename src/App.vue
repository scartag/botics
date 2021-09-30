<template>
  <div>
    <Disclosure v-slot="{ open }" as="nav" class="bg-white border-b-1 shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <router-link :to="{ name: routeNames.dashboard }">
                <img alt="Botics Logo" class="h-6 w-auto" src="./assets/horizonal_logo.png" />
              </router-link>
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4"></div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <button class="bg-transparent p-1 rounded-full text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" type="button">
                <span class="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" class="h-6 w-6" />
              </button>

              <button @click="logout" class="ml-4 bg-transparent p-1 rounded-full text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-300 focus:ring-white" type="button">
                <span class="sr-only">View notifications</span>
                <LogoutIcon aria-hidden="true" class="h-7 w-7" />
              </button>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton class="bg-gray-600 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" aria-hidden="true" class="block h-6 w-6" />
              <XIcon v-else aria-hidden="true" class="block h-6 w-6" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3"></div>
        <div class="pt-4 pb-3 border-t border-gray-700">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <UserIcon class="h-10 w-10 rounded-full" />
            </div>
            <button class="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" type="button">
              <span class="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" class="h-6 w-6" />
            </button>
            <button @click="logout" class="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-300 focus:ring-white" type="button">
              <span class="sr-only">View notifications</span>
              <LogoutIcon aria-hidden="true" class="h-6 w-6" />
            </button>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
    <router-view></router-view>
  </div>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { BellIcon, MenuIcon, XIcon, UserIcon, LogoutIcon } from '@heroicons/vue/outline';
import { routeNames } from '@/router/routes';
import { accountService } from '@/types/dependencies.type';

export default {
  name: 'App',
  dependencies: [accountService],
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    BellIcon,
    MenuIcon,
    XIcon,
    UserIcon,
    LogoutIcon,
  },
  data() {
    return {
      routeNames,
    };
  },
  methods: {
    async logout() {
      try {
        await this.accountService.logout();
      } finally {
        this.$router.push({ name: routeNames.login });
      }
    },
  },
};
</script>

<style scoped></style>
