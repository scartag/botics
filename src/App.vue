<template>
  <div>
    <Disclosure v-slot="{ open }" as="nav" class="bg-white border-b-1 shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <router-link to="/">
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

              <!-- Profile dropdown -->
              <Menu as="div" class="ml-3 relative">
                <div>
                  <MenuButton class="max-w-xs bg-gray-600 rounded-full flex items-center text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span class="sr-only">Open user menu</span>
                    <span class="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                      <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                  </MenuButton>
                </div>
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                      <router-link :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']" :to="item.to">
                        {{ item.name }}
                      </router-link>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
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
            <div class="ml-3">
              <div class="text-base font-medium text-white">{{ user.name }}</div>
              <div class="text-sm font-medium text-gray-400">{{ user.email }}</div>
            </div>
            <button class="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" type="button">
              <span class="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" class="h-6 w-6" />
            </button>
          </div>
          <div class="mt-3 px-2 space-y-1">
            <router-link v-for="item in userNavigation" :key="item.name" :to="item.to" class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
              {{ item.name }}
            </router-link>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
    <router-view></router-view>
  </div>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { BellIcon, MenuIcon, XIcon, UserIcon } from '@heroicons/vue/outline';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
};
const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Reports', href: '#', current: false },
];
const userNavigation = [
  { name: 'Your Profile', to: '/' },
  { name: 'Settings', to: '/' },
  { name: 'Sign out', to: '/login' },
];

export default {
  name: 'App',
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    BellIcon,
    MenuIcon,
    XIcon,
    UserIcon,
  },
  setup() {
    return {
      user,
      navigation,
      userNavigation,
    };
  },
};
</script>

<style scoped></style>
