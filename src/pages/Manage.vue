<template>
  <header class="vld-parent">
    <loading v-model:active="loading" :is-full-page="fullPage" color="pink" />
    <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <h1 class="text-xl leading-6 font-semibold text-gray-900">Manage App</h1>
    </div>
  </header>
  <main>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 p-3">
      <div class="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
        <div class="px-4 py-5 sm:p-6 min-height-panel">
          <form class="space-y-8 divide-y divide-gray-200">
            <div class="">
              <div class="flex justify-between">
                <div>
                  <h3 class="text-lg leading-6 font-medium text-gray-900">App Information</h3>
                  <p class="mt-1 text-sm text-gray-500">Update your application details and manage any applicable subscription plans</p>
                </div>
                <div>
                  <button
                    type="button"
                    class="
                      del-button
                      ml-3
                      inline-flex
                      justify-center
                      py-2
                      px-4
                      border border-transparent
                      shadow-sm
                      text-sm
                      font-medium
                      rounded-md
                      text-white
                      bg-red-700
                      hover:bg-opacity-90
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700
                    "
                  >
                    Delete App
                  </button>
                </div>
              </div>

              <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div class="sm:col-span-3">
                  <label for="name" class="block text-sm font-medium text-gray-700"> Application Name </label>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <input v-model="app.name" type="text" name="name" id="name" autocomplete="off" class="flex-1 focus:ring-cyan-500 focus:border-cyan-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300" />
                  </div>
                </div>
                <div class="sm:col-span-3"></div>

                <div class="sm:col-span-3">
                  <label for="description" class="block text-sm font-medium text-gray-700"> Description </label>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <input
                      v-model="app.description"
                      type="text"
                      name="description"
                      id="description"
                      autocomplete="off"
                      class="flex-1 focus:ring-cyan-500 focus:border-cyan-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                    />
                  </div>
                </div>
                <div class="sm:col-span-3"></div>

                <div class="sm:col-span-3">
                  <label for="domain" class="block text-sm font-medium text-gray-700"> Domain Name </label>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <input v-model="app.domain_name" type="text" name="domain" id="domain" autocomplete="off" class="flex-1 focus:ring-cyan-500 focus:border-cyan-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300" />
                  </div>
                </div>
                <div class="sm:col-span-3"></div>

                <div class="sm:col-span-5">
                  <label class="block text-sm font-medium text-gray-700">Application Type</label>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <RadioGroup v-model="selected" class="w-full">
                      <RadioGroupLabel class="sr-only"> Privacy setting </RadioGroupLabel>
                      <div class="bg-white rounded-md -space-y-px">
                        <RadioGroupOption as="template" v-for="(option, optionIdx) in options" :key="option.name" :value="option" v-slot="{ checked, active }">
                          <div
                            :class="[
                              optionIdx === 0 ? 'rounded-tl-md ro  unded-tr-md' : '',
                              optionIdx === options.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                              checked ? 'bg-cyan-50 border-cyan-200 z-10' : 'border-gray-200',
                              'relative border p-4 flex cursor-pointer focus:outline-none',
                            ]"
                          >
                            <span
                              :class="[checked ? 'bg-cyan-600 border-transparent' : 'bg-white border-gray-300', active ? 'ring-2 ring-offset-2 ring-cyan-500' : '', 'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center']"
                              aria-hidden="true"
                            >
                              <span class="rounded-full bg-white w-1.5 h-1.5" />
                            </span>
                            <div class="ml-3 flex flex-col">
                              <RadioGroupLabel as="span" :class="[checked ? 'text-cyan-900' : 'text-gray-900', 'block text-sm font-medium']">
                                {{ option.name }}
                              </RadioGroupLabel>
                              <RadioGroupDescription as="span" :class="[checked ? 'text-cyan-700' : 'text-gray-500', 'block text-sm']">
                                {{ option.description }}
                              </RadioGroupDescription>
                            </div>
                          </div>
                        </RadioGroupOption>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </div>

            <div class="pt-5">
              <div class="flex justify-end">
                <button @click="cancel" type="button" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                  Back to App list
                </button>
                <button
                  type="button"
                  class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-400 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
          <div class="divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5">
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">Subscription</h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">Review, add, upgrade or downgrade the subscription plan for your app.</p>

              <div class="sm:col-span-5 mb-5 mt-5">
                <div class="mt-1 flex rounded-md shadow-sm">
                  <RadioGroup v-model="currentPlan" class="w-full">
                    <RadioGroupLabel class="sr-only"> Privacy setting </RadioGroupLabel>
                    <div class="bg-white rounded-md -space-y-px">
                      <RadioGroupOption as="template" v-for="(option, optionIdx) in subs" :key="option.name" :value="option" v-slot="{ checked, active }">
                        <div
                          :class="[
                            optionIdx === 0 ? 'rounded-tl-md ro  unded-tr-md' : '',
                            optionIdx === options.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                            checked ? 'bg-cyan-50 border-cyan-200 z-10' : 'border-gray-200',
                            'relative border p-4 flex cursor-pointer focus:outline-none',
                          ]"
                        >
                          <span
                            :class="[checked ? 'bg-cyan-600 border-transparent' : 'bg-white border-gray-300', active ? 'ring-2 ring-offset-2 ring-cyan-500' : '', 'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center']"
                            aria-hidden="true"
                          >
                            <span class="rounded-full bg-white w-1.5 h-1.5" />
                          </span>
                          <div class="ml-3 flex flex-col">
                            <RadioGroupLabel as="span" :class="[checked ? 'text-cyan-900' : 'text-gray-900', 'block text-sm font-medium']">
                              {{ option.name }}
                            </RadioGroupLabel>
                            <RadioGroupDescription as="span" :class="[checked ? 'text-cyan-700' : 'text-gray-500', 'block text-sm']">
                              <span>{{ option.description }}</span> - <span>${{ option.price }}/month</span>
                            </RadioGroupDescription>
                          </div>
                        </div>
                      </RadioGroupOption>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>

          <div class="pt-5">
            <div class="flex justify-end">
              <button
                type="submit"
                class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-400 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Add Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue';
import { routeNames } from '@/router/routes';
import { appService } from '@/types/dependencies.type';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

const options = [
  { type: 'Web', framework: 'Django', name: 'Web', description: 'A Django based web application' },
  { type: 'Mobile', framework: 'React Native', name: 'Mobile App', description: 'A mobile application built with React Native' },
];

const plans = [
  { name: 'Free', description: 'Free Plan', price: '0.00' },
  { name: 'Standard', description: 'Standard Plan', price: '10.00' },
  { name: 'Pro', description: 'Pro Plan', price: '20.00' },
];

export default {
  name: 'Manage',
  props: {
    id: String,
  },
  dependencies: [appService],
  components: {
    RadioGroup,
    RadioGroupDescription,
    RadioGroupLabel,
    RadioGroupOption,
    Loading,
  },
  data() {
    return {
      options,
      plans,
      loading: false,
      routeNames,
      currentPlan: null,
      sub: null,
      selected: null,
      app: {},
    };
  },
  methods: {
    cancel() {
      this.$router.push({ name: routeNames.dashboard });
    },
  },
  async mounted() {
    try {
      this.loading = true;
      const r = await this.appService.getApp(this.id);
      this.app = r.data;
      this.selected = this.options.find((p) => p.type === this.app.type);
    } catch (e) {
      this.cancel();
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped></style>
