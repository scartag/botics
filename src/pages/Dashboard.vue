<template>
  <header class="vld-parent">
    <loading v-model:active="loading" :is-full-page="true" color="pink" />
    <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <h1 class="text-xl leading-6 font-semibold text-gray-900">Dashboard</h1>
    </div>
  </header>
  <main>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 p-3">
      <!-- Replace with your content -->
      <div class="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
        <div class="px-4 py-5 sm:px-6 flex justify-end">
          <button
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-400 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            type="button"
            @click="
              () => {
                this.$router.push({ path: '/create-app' });
              }
            "
          >
            <PlusIcon aria-hidden="true" class="-ml-1 mr-2 h-5 w-5" />
            Create an App
          </button>
        </div>
        <div class="px-4 py-5 sm:p-6 min-height-panel">
          <!-- Content goes here -->
          <AppList :apps="apps" v-if="!loading && hasApps" />
          <NoContent v-if="!loading && !hasApps" />
        </div>
      </div>
      <!-- /End replace -->
    </div>
  </main>
</template>

<script>
import AppList from '@/components/AppList';
import { PlusIcon } from '@heroicons/vue/solid';
import NoContent from '@/components/NoContent';
import { appService } from '@/types/dependencies.type';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'Dashboard',
  dependencies: [appService],
  components: { NoContent, AppList, PlusIcon, Loading },
  data() {
    return {
      loading: false,
      apps: null,
    };
  },
  computed: {
    hasApps() {
      return this.apps && this.apps.length > 0;
    },
  },
  async mounted() {
    this.loading = true;
    try {
      const r = await this.appService.getApps();
      this.apps = [...r.data];
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped></style>
