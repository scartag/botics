<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-md">
    <ul role="list" class="divide-y divide-gray-200">
      <li v-for="app in apps" :key="app.id">
        <router-link :to="{ name: routeNames.manageApp, params: { id: app.id } }" class="block hover:bg-gray-50">
          <div class="flex items-center px-4 py-4 sm:px-6">
            <div class="min-w-0 flex-1 flex items-center">
              <div class="flex-shrink-0">
                <DeviceMobileIcon class="h-10 w-10 text-gray-600 rounded-full" v-if="app.type === 'Mobile'" />
                <GlobeAltIcon class="h-10 w-10 text-gray-600 rounded-full" v-if="app.type === 'Web'" />
              </div>
              <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                <div>
                  <p class="text-lg font-medium text-cyan-600 truncate">{{ app.name }}</p>
                  <p class="mt-2 flex items-center text-sm text-gray-500">
                    <span class="truncate">{{ app.description }}</span>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <ChevronRightIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { ChevronRightIcon } from '@heroicons/vue/solid';
import { DeviceMobileIcon, GlobeAltIcon } from '@heroicons/vue/outline';
import { routeNames } from '@/router/routes';

export default {
  name: 'AppList',
  components: {
    ChevronRightIcon,
    DeviceMobileIcon,
    GlobeAltIcon,
  },
  props: {
    apps: Array,
  },
  data() {
    return {
      routeNames,
    };
  },
};
</script>
