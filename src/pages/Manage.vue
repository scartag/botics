<template>
  <header class="vld-parent">
    <loading v-model:active="loading" :is-full-page="true" color="pink" />
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
                    @click="deleteConfirm"
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
                        <RadioGroupOption as="template" v-for="(option, optionIdx) in appService.appOptions" :key="option.name" :value="option" v-slot="{ checked, active }">
                          <div
                            :class="[
                              optionIdx === 0 ? 'rounded-tl-md ro  unded-tr-md' : '',
                              optionIdx === appService.appOptions.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
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
                  @click="update"
                  :disabled="!valid || loading"
                  type="button"
                  class="
                    disabled:opacity-50
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
                    bg-red-400
                    hover:bg-opacity-90
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                  "
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
                      <RadioGroupOption as="template" v-for="(option, optionIdx) in plans" :key="option.name" :value="option" v-slot="{ checked, active }">
                        <div
                          :class="[
                            optionIdx === 0 ? 'rounded-tl-md ro  unded-tr-md' : '',
                            optionIdx === plans.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
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
                @click="subscribe"
                :disabled="!subButtonValid"
                type="button"
                class="
                  disabled:opacity-50
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
                  bg-red-400
                  hover:bg-opacity-90
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                "
              >
                {{ subscriptionButtonText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <ErrorNotification ref="error" />
  <DeleteConfirmation ref="confirm" @activateAction="doDelete" />
</template>

<script>
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue';
import { routeNames } from '@/router/routes';
import { appService } from '@/types/dependencies.type';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import ErrorNotification from '@/components/ErrorNotification';
import DeleteConfirmation from '@/components/DeleteConfirmation';

export default {
  name: 'Manage',
  props: {
    id: String,
  },
  dependencies: [appService],
  components: {
    DeleteConfirmation,
    ErrorNotification,
    RadioGroup,
    RadioGroupDescription,
    RadioGroupLabel,
    RadioGroupOption,
    Loading,
  },
  data() {
    return {
      plans: [],
      loading: false,
      routeNames,
      currentPlan: null,
      previousPlan: null,
      sub: null,
      selected: null,
      app: {},
    };
  },
  computed: {
    valid() {
      return this.app && this.app?.name?.trim().length > 0 && this.selected;
    },
    isUpgrade() {
      if (this.currentPlan && this.previousPlan) {
        const current = parseFloat(this.currentPlan.price);
        const previous = parseFloat(this.previousPlan.price);
        return current > previous;
      }
      return false;
    },
    subButtonValid() {
      return this.currentPlan !== null && this.currentPlan.id !== this.previousPlan?.id;
    },
    subscriptionButtonText() {
      return this.previousPlan == null ? 'Add Plan' : this.isUpgrade ? 'Upgrade Plan' : this.currentPlan.id === this.previousPlan.id ? 'Add Plan' : 'Downgrade Plan';
    },
  },
  methods: {
    deleteConfirm() {
      this.$refs.confirm.show();
    },
    async doDelete() {
      this.$refs.error.hide();
      try {
        this.loading = true;
        await this.appService.deleteApp(this.app.id);
        this.$router.push({ name: this.routeNames.dashboard });
      } catch {
        this.$refs.error.show({ title: 'Error!', description: 'The app deletion process failed.' });
      } finally {
        this.loading = false;
      }
    },
    async update() {
      const request = {
        name: this.app.name,
        description: this.app.description,
        type: this.selected.type,
        framework: this.selected.framework,
        domain_name: this.app.domain_name,
      };
      this.$refs.error.hide();
      try {
        this.loading = true;
        await this.appService.updateApp(this.app.id, request);
      } catch {
        this.$refs.error.show({ title: 'Error!', description: 'The app update process failed.' });
      } finally {
        this.loading = false;
      }
    },
    cancel() {
      this.$router.push({ name: routeNames.dashboard });
    },
    async subscribe() {
      if (this.sub) {
        await this.updateSub();
      } else {
        await this.addSub();
      }
    },
    async addSub() {
      const request = {
        plan: this.currentPlan.id,
        app: this.app.id,
        active: true,
      };
      this.$refs.error.hide();
      try {
        this.loading = true;
        const r = await this.appService.addSub(request);
        this.sub = r.data;
        this.updateCurrentPlan(this.sub);
      } catch (e) {
        console.log(e);
        this.$refs.error.show({ title: 'Error!', description: 'The subscription process failed.' });
      } finally {
        this.loading = false;
      }
    },
    async updateSub() {
      const request = {
        plan: this.currentPlan.id,
        app: this.app.id,
        active: true,
      };
      this.$refs.error.hide();
      try {
        this.loading = true;
        const r = await this.appService.updateSub(this.sub.id, request);
        this.sub = r.data;
        this.updateCurrentPlan(this.sub);
      } catch {
        this.$refs.error.show({ title: 'Error!', description: 'The subscription update process failed.' });
      } finally {
        this.loading = false;
      }
    },
    updateCurrentPlan(sub) {
      const plan = this.plans.find((x) => x.id === sub.plan);
      const index = this.plans.findIndex((x) => x.id === sub.plan);
      this.currentPlan = this.plans[index];
      this.previousPlan = { ...plan };
    },
  },
  async mounted() {
    try {
      this.loading = true;
      const r = await this.appService.getApp(this.id);
      this.app = r.data;
      this.selected = this.appService.appOptions.find((p) => p.type === this.app.type);
      const p = await this.appService.getPlans();
      this.plans = [...p.data];
      if (this.app.subscription) {
        const s = await this.appService.getSub(this.app.subscription);
        this.sub = s.data;
        this.updateCurrentPlan(this.sub);
      }
    } catch (e) {
      this.cancel();
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped></style>
