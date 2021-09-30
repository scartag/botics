<template>
  <div aria-live="assertive" class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start">
    <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="visible" class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <ExclamationCircleIcon class="h-6 w-6 text-red-700" aria-hidden="true" />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">{{ error.title }}</p>
                <p class="mt-1 text-sm text-gray-500">{{ error.description }}</p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button @click="hide" class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                  <span class="sr-only">Close</span>
                  <XIcon class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { ExclamationCircleIcon } from '@heroicons/vue/outline';
import { XIcon } from '@heroicons/vue/solid';

export default {
  name: 'ErrorNotification',
  components: {
    ExclamationCircleIcon,
    XIcon,
  },
  data() {
    return {
      visible: false,
      error: null,
    };
  },
  methods: {
    show(msg) {
      this.error = msg;
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
  },
};
</script>
